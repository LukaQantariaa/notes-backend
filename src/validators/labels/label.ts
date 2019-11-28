import * as Joi from '@hapi/joi'

export const labelSchema = Joi.object({
    userId: Joi.number()
        .required(),
    title: Joi.string()
        .required(),
    is_active: Joi.boolean()
        .required()
})