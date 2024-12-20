import { Router } from 'express'
import { PlaylistController } from '#controllers/playlist.controller'
import { Routes } from '#interfaces/routes.interface'

export class ExtensionPlaylistRoute implements Routes {
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`/extension/playlists/:shop`, PlaylistController.getAll)
        this.router.get(`/extension/playlists/:id/:shop`, PlaylistController.getById)
    }
}
