const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    email: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 13,
    },
    adress: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    }
});

exports.Customer = mongoose.model("customers", customerSchema);