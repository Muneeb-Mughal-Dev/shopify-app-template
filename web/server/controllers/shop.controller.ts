import { NextFunction, Request, Response } from 'express'
import { HttpException } from '#exceptions/HttpException'
import ShopModel from '#models/shop.model'
import HttpCodes from '#server/enum/httpStatusCods'
import { Shop } from '#server/interfaces/shops.interface'

export const ShopController = {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const shops: Shop[] = await ShopModel.query().select().from('shops').where('shop', res.locals?.shop.shop)

            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Fetched all shops successfully.',
                data: shops,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const shopId = Number(req.params.id)
            const shop = await ShopModel.query().findById(shopId)
            if (!shop) {
                return next(new HttpException(404, "Shop doesn't exist"))
            }
            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Fetched shop successfully.',
                data: shop,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newShop: Shop = req.body
            const { shop, brandName } = newShop
            const createdShop = await ShopModel.query().insert(newShop).from('shops')
            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Shop created successfully.',
                data: createdShop,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const shopId = Number(req.params.id)
            const data: Shop = req.body
            const { shop, brandName } = data
            const shopExists = await ShopModel.query().findById(shopId)
            if (!shopExists) {
                return next(new HttpException(404, "Shop doesn't exist"))
            }
            await ShopModel.query().update(data).where('id', shopId)
            const updatedShop: Shop = await ShopModel.query().findById(shopId)
            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Shop updated successfully.',
                data: updatedShop,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const shopId = Number(req.params.id)
            const shop: Shop | undefined = await ShopModel.query().findById(shopId)
            if (!shop) {
                return next(new HttpException(404, "Shop doesn't exist"))
            }
            await ShopModel.query().delete().where('id', shopId)
            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Shop deleted successfully.',
                data: shop,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
}
