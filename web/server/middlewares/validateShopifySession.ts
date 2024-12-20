import { NextFunction, Request, Response } from 'express'
import { error } from 'console'
import HttpCodes from '#enum/httpStatusCods'
import ResponseMessages from '#enum/responseMessage'
import ShopModel from '#models/shop.model'
import { logger } from '#utils/logger'

/**
 * Middleware to validate and manage the Shopify session.
 * - Ensures a valid Shopify session exists.
 * - Validates the `shop` parameter and manages its presence in the database.
 */

export const shopifySessionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paramsShop = req.query.shop as string

        const session = res.locals.shopify?.session

        if (!paramsShop && !session) {
            return res.status(HttpCodes.BAD_REQUEST).json({
                error: ResponseMessages.BAD_REQUEST,
                message: 'Shopify session not found or shop parameter missing',
            })
        }

        /**
         * Determine the shop identifier:
         * - If the base URL is `/api`, prioritize the session's shop value.
         * - If the base URL is `/extension`, prioritize the `shop` query parameter.
         * - Otherwise, null.
         */

        const shop =
            req.baseUrl === '/api' ? session?.shop
            : req.baseUrl === '/extension' ? paramsShop
            : null

        if (!shop) {
            return res.status(HttpCodes.BAD_REQUEST).json({
                error: ResponseMessages.BAD_REQUEST,
                message: 'Shop not provided in session or query parameter',
            })
        }

        if (session) res.locals.session = session

        const brandName = shop.split('.')[0]

        const existingShops = await ShopModel.query().select('shops.*').where('shops.shop', shop)

        if (existingShops.length === 0) {
            const createdShop = await ShopModel.query().insert({ shop, brandName }).from('shops')
            res.locals.shop = createdShop
        } else {
            res.locals.shop = existingShops[0]
        }

        logger.info(`Session Validated for shop: ${shop}`)
        next()
    } catch (error) {
        console.error('Error loading Shopify session:', error)
        return res.status(HttpCodes.SUCCESS).json({ error: ResponseMessages.SERVER_ERROR })
    }
}
