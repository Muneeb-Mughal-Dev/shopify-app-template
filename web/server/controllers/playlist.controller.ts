import { NextFunction, Request, Response } from 'express'
import { HttpException } from '#exceptions/HttpException'
import PlaylistModel from '#models/playlist.model'
import VideoModel from '#models/video.model'
import HttpCodes from '#server/enum/httpStatusCods'
import { Playlist } from '#server/interfaces/playlist.interface'
import ShopModel from '#server/models/shop.model'

export const PlaylistController = {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const shop = res.locals.shop

            const playlists: Playlist[] = await PlaylistModel.query()
                .select('playlists.*')
                .join('shops', 'playlists.shop_id', 'shops.id')
                .where('shops.id', shop.id)
                .withGraphFetched('videos')
            if (playlists.length === 0) {
                return next(new HttpException(HttpCodes.NOT_FOUND, `Not found!`))
            }
            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Fetched playlists successfully.',
                data: playlists,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const playlistId = Number(req.params.id)
            const { shop } = req.params
            const playlist: Playlist | undefined = await PlaylistModel.query()
                .findById(playlistId)
                .withGraphFetched('[shop,videos]')
            if (!playlist) {
                return next(new HttpException(404, "Playlist doesn't exist"))
            }
            if (playlist.shop?.shop !== shop) {
                return next(new HttpException(HttpCodes.FORBIDDEN, 'This playlist does not belong to the specified shop.'))
            }
            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Fetched playlist successfully.',
                data: playlist,
            })
        } catch (error) {
            console.error('Error fetching playlist:', error)
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { interaction, status, title, visibility, video, shop }: Playlist = req.body

            const existingPlaylist = await PlaylistModel.query().findOne({ title })
            if (existingPlaylist) {
                res.status(HttpCodes.CONFLICTS).json({
                    code: HttpCodes.CONFLICTS,
                    message: 'A playlist with this title already exists.',
                })
                return
            }

            const existingShop = await ShopModel.query().findOne({ shop: shop.shop })
            if (existingShop) {
                res.status(HttpCodes.CONFLICTS).json({
                    code: HttpCodes.CONFLICTS,
                    message: 'A shop with this Name already exists.',
                })
                return
            }

            if (!video || !video.title || !video.video) {
                res.status(HttpCodes.BAD_REQUEST).json({
                    code: HttpCodes.BAD_REQUEST,
                    message: 'Video information is required.',
                })
                return
            }

            const createdVideo = await VideoModel.query().insert({
                title: video.title,
                video: video.video,
            })

            const createdShop = await ShopModel.query().insert({
                shop: shop.shop,
                brandName: shop.brandName,
            })

            const createdPlaylist = await PlaylistModel.query().insert({
                interaction,
                status,
                title,
                visibility,
                video_id: createdVideo.id,
                shop_id: createdShop.id,
            })

            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Playlist created successfully.',
                data: createdPlaylist,
            })
        } catch (error) {
            console.error(error)
            next(new HttpException(HttpCodes.SERVER_ERROR, error.message || error.toString()))
        }
    },

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const playlistId = Number(req.params.id)
            const { shop } = req.params
            const data: Playlist = req.body

            const playlistExists: Playlist | undefined = await PlaylistModel.query().findById(playlistId).withGraphFetched('shop')

            if (!playlistExists) {
                return next(new HttpException(404, "Playlist doesn't exist"))
            }

            if (playlistExists.shop?.shop !== shop) {
                return next(new HttpException(HttpCodes.FORBIDDEN, 'This playlist does not belong to the specified shop.'))
            }

            await PlaylistModel.query().update(data).where('id', playlistId)

            const updatedPlaylist: Playlist = await PlaylistModel.query().findById(playlistId).withGraphFetched(' video')

            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Playlist updated successfully.',
                data: updatedPlaylist,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const playlistId = Number(req.params.id)
            const { shop } = req.params

            const playlist: Playlist | undefined = await PlaylistModel.query()
                .findById(playlistId)
                .withGraphFetched('[shop,videos]')

            if (!playlist) {
                return next(new HttpException(404, "Playlist doesn't exist"))
            }

            if (playlist.shop?.shop !== shop) {
                return next(new HttpException(HttpCodes.FORBIDDEN, 'This playlist does not belong to the specified shop.'))
            }
            await PlaylistModel.query().delete().where('id', playlistId)

            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Playlist deleted successfully.',
                data: playlist,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
}
