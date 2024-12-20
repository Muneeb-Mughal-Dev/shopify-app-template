import { Router } from 'express'
import { ShopController } from '#controllers/shop.controller'
import { Routes } from '#interfaces/routes.interface'

export class ExtensionShopRoute implements Routes {
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`/extension/shops`, ShopController.getAll)
        this.router.get(`/extension/shops/:id`, ShopController.getById)
    }
}
