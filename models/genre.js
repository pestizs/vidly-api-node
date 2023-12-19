import mongoose from 'mongoose';
import Joi from 'joi';

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
});

const Genre = mongoose.model('genres', genreSchema);

function validateGenre(genre) {
    const joiSchema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });
    return joiSchema.validate(genre);
}

export {Genre, genreSchema, validateGenre};