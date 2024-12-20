import Joi from 'joi'

// Adjust the path as needed

export const createShopSchema = Joi.object({
    shop: Joi.string().min(1).max(255).required(),
    brandName: Joi.string().min(1).max(255).required(),
})

export const updateShopSchema = Joi.object({
    shop: Joi.string().min(1).max(255).required(),
    brandName: Joi.string().min(1).max(255),
})
