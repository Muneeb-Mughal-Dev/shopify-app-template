import { Router } from 'express'
import { VideoController } from '#controllers/video.controller'
import { Routes } from '#interfaces/routes.interface'

export class ExtensionVideoRoute implements Routes {
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`/extension/videos`, VideoController.getAll)
        this.router.get(`/extension/videos/:id`, VideoController.getById)
    }
}
