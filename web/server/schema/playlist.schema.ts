import Joi from 'joi'
import { Interaction, Status, Visibility } from '#enum/enum'

// Adjust the path as needed

export const createPlaylistSchema = Joi.object({
    shop_id: Joi.number().optional(),
    video_id: Joi.number().optional(),
    title: Joi.string().min(1).max(255).required(),
    visibility: Joi.string().valid(Visibility.Public, Visibility.Private).required(),
    status: Joi.string().valid(Status.Active, Status.Inactive).required(),
    interaction: Joi.string().valid(Interaction.ProductCard, Interaction.HomePage).required(),
    video: Joi.object({
        title: Joi.string().min(1).max(255).required(),
        video: Joi.string().uri().required(),
    }).required(),
    shop: Joi.object({
        shop: Joi.string().min(1).max(255).required(),
        brandName: Joi.string().min(1).max(255).required(),
    }).required(),
})

export const updatePlaylistSchema = Joi.object({
    shop_id: Joi.number().optional(),
    video_id: Joi.number().optional(),
    title: Joi.string().min(1).max(255).optional(),
    visibility: Joi.string().valid(Visibility.Public, Visibility.Private).optional(),
    status: Joi.string().valid(Status.Active, Status.Inactive).optional(),
    interaction: Joi.string().valid(Interaction.ProductCard, Interaction.HomePage).optional(),
    video: Joi.object({
        title: Joi.string().min(1).max(255).required(),
        video: Joi.string().uri().required(),
    }).optional(),
})
