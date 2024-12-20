import { Router } from 'express'
import { shopifySessionMiddleware } from '#middlewares/validateShopifySession'
import { ValidationMiddleware } from '#middlewares/validation.middleware'
import { PlaylistController } from '#controllers/playlist.controller'
import { createPlaylistSchema, updatePlaylistSchema } from '#schema/playlist.schema'
import { Routes } from '#interfaces/routes.interface'

export class PlaylistRoute implements Routes {
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`/playlists`, shopifySessionMiddleware, PlaylistController.getAll)
        this.router.get(`/playlist/:id`, shopifySessionMiddleware, PlaylistController.getById)
        this.router.post(
            `/playlists`,
            shopifySessionMiddleware,
            ValidationMiddleware(createPlaylistSchema),
            PlaylistController.create,
        )
        this.router.put(
            `/playlists/:id`,
            shopifySessionMiddleware,
            ValidationMiddleware(updatePlaylistSchema),
            PlaylistController.update,
        )
        this.router.delete(`/playlists/:id`, shopifySessionMiddleware, PlaylistController.delete)
    }
}
