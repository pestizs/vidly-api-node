import mongoose from 'mongoose';
import Joi from 'joi';

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
}));

function validateCustomer(customer) {
    const joiSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });
    return joiSchema.validate(customer);
}


export { Customer, validateCustomer };