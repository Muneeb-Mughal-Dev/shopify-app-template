import { NextFunction, Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { HttpException } from '#exceptions/HttpException'
import VideoModel from '#models/video.model'
import { Env } from '#server/configs/env'
import HttpCodes from '#server/enum/httpStatusCods'
import { Video } from '#server/interfaces/video.interface'

export const VideoController = {
    /*** Get All Videos ***/

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const videos: Video[] = await VideoModel.query().select()
            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Fetched all videos successfully.',
                data: videos,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },

    /*** Get Single Video by ID ***/
    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const videoId = Number(req.params.id)
            const video: Video | undefined = await VideoModel.query().findById(videoId)

            if (!video) {
                return next(new HttpException(404, "Video doesn't exist"))
            }

            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Fetched video successfully.',
                data: video,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, video } = req.body
            if (!title || !video) {
                return next(new HttpException(HttpCodes.BAD_REQUEST, 'Title and video are required.'))
            }
            const newVideo = {
                title,
                video,
            }

            const createdVideo = await VideoModel.query().insert(newVideo)

            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Video created successfully.',
                data: {
                    title: createdVideo.title,
                    video: createdVideo.video,
                    id: createdVideo.id,
                },
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },

    /*** Update Video ***/
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const videoId = Number(req.params.id)
            const { title, video } = req.body

            const videoExists = await VideoModel.query().findById(videoId)
            if (!videoExists) {
                return next(new HttpException(HttpCodes.NOT_FOUND, "Video doesn't exist"))
            }

            const updatedData: Partial<Video> = {}
            if (title) updatedData.title = title
            if (video) updatedData.video = video

            await VideoModel.query().update(updatedData).where('id', videoId)

            const updatedVideo: Video = await VideoModel.query().findById(videoId)

            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Video updated successfully.',
                data: updatedVideo,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },

    /*** Delete Video ***/
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const videoId = Number(req.params.id)
            const video: Video | undefined = await VideoModel.query().findById(videoId)

            if (!video) {
                return next(new HttpException(404, "Video doesn't exist"))
            }

            await VideoModel.query().delete().where('id', videoId)

            res.status(HttpCodes.SUCCESS).json({
                code: HttpCodes.SUCCESS,
                message: 'Video deleted successfully.',
                data: video,
            })
        } catch (error) {
            next(new HttpException(HttpCodes.SERVER_ERROR, error.toString()))
        }
    },
}
