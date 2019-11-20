import * as Joi from '@hapi/joi'

export const noteSchema = Joi.object({
    imagePath: Joi.string(),
    labels: Joi.array(),
    title: Joi.string()
        .min(3)
        .max(32)
        .required(),
    notes: Joi.array()
        .required(),
    color: Joi.string(),
    archived: Joi.boolean()
        .required(),
    done: Joi.boolean()
        .required(),
    is_active: Joi.boolean()
        .required()
})