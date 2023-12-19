import mongoose from 'mongoose';
import Joi from 'joi';
import joiObjectId from 'joi-objectid';
const JoiObjectId = joiObjectId(Joi);

const Rental = mongoose.model('rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlegth: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlegth: 5,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                minlength: 0,
                maxlength: 255,
            },
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const joiSchema = Joi.object({
        customerId: JoiObjectId().required(),
        movieId: JoiObjectId().required(),
    });
    return joiSchema.validate(rental);
}

export { Rental, validateRental };