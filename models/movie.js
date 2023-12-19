import mongoose from 'mongoose';
import Joi from 'joi';
//Validating ObjectId-s
import joiObjectId from 'joi-objectid';
const JoiObjectId = joiObjectId(Joi);
import { genreSchema } from './genre.js';

const Movie = mongoose.model('movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const joiSchema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: JoiObjectId().required(),
        numberInStock: Joi.number().min(0).max(500).required(),
        dailyRentalRate: Joi.number().min(0).max(500).required()
    });
    return joiSchema.validate(movie);
}

export { Movie, validateMovie };