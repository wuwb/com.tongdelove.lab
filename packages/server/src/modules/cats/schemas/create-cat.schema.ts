import * as Joi from 'joi';

export const createCatSchema = Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().integer().min(1).max(130).required(),
    breed: Joi.string(),
});
