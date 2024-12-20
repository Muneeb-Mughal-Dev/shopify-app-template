import Joi from 'joi'

// Schema for creating a new video
export const createVideoSchema = Joi.object({
    shop_id: Joi.number().optional(),
    title: Joi.string().min(1).max(255).required(),
    video: Joi.any().required(),
})
