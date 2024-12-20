import { Router } from 'express'
import { shopifySessionMiddleware } from '#middlewares/validateShopifySession'
import { TestControlle } from '#controllers/test.controller'
import { Routes } from '#interfaces/routes.interface'

export class TestRoute implements Routes {
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`/test/count`, shopifySessionMiddleware, TestControlle.getAll)
        this.router.post(`/test`, shopifySessionMiddleware, TestControlle.create)
    }
}
