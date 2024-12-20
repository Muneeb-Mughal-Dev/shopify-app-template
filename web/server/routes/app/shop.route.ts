import { Router } from 'express'
import { shopifySessionMiddleware } from '#middlewares/validateShopifySession'
import { ValidationMiddleware } from '#middlewares/validation.middleware'
import { ShopController } from '#controllers/shop.controller'
import { createShopSchema, updateShopSchema } from '#schema/shop.schema'
import { Routes } from '#interfaces/routes.interface'

export class ShopRoute implements Routes {
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`/shops`, shopifySessionMiddleware, ShopController.getAll)
        this.router.get(`/shops/:id`, ShopController.getById)
        this.router.post(`/shops`, ValidationMiddleware(createShopSchema), ShopController.create)
        this.router.put(`/shops/:id`, ValidationMiddleware(updateShopSchema), ShopController.update)
        this.router.delete(`/shops/:id`, ShopController.delete)
    }
}
