import { Router } from 'express'
import { VideoController } from '#controllers/video.controller'
import { Routes } from '#interfaces/routes.interface'

export class VideoRoute implements Routes {
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`/videos`, VideoController.getAll)
        this.router.get(`/videos/:id`, VideoController.getById)
        this.router.post(`/videos`, VideoController.create)
        this.router.put(`/videos/:id`, VideoController.update)
        this.router.delete(`/videos/:id`, VideoController.delete)
    }
}
