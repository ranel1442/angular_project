const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 5,
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
    birthday: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    }
});

exports.Employees = mongoose.model("employees", employeesSchema);