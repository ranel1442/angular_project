const joi = require('joi');
const {Customer}=require('../models/Customer');




module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await Customer.find({});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting customers' });
        }
    },

    getOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error get details`;
            }

            const customers = await Customer.findById(value.id);
            if (!customers) throw "Invalid customers id, no such customers.";
            res.json(customers);
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },

    addNew: async function (req, res, next) {
        try {
            const schema = joi.object({
                name: joi.string().min(2).max(256).required(),
                lastname: joi.string().min(2).max(256).required(),
                email: joi.string().min(6).max(256).required().email(),
                phone: joi.string().min(9).max(13).required(),
                adress: joi.string().min(2).max(256).required(),

            });

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error add customers';
            }

            const customers = new Customer(value);
            const newCustomer = await customers.save();
            res.json(newCustomer);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error adding customes` });
        }
    },

    updateDetails: async function (req, res, next) {
        try {
            const schema = joi.object({
                name: joi.string().min(2).max(256).required(),
                lastname: joi.string().min(2).max(256).required(),
                email: joi.string().min(6).max(256).required().email(),
                phone: joi.string().min(9).max(13).required(),
                adress: joi.string().min(2).max(256).required(),
            }).min(1);

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error updating customers';
            }

            const filter = {
                _id: req.params.id
            };

            const customers= await Customer.findOneAndUpdate(filter, value);
            if (!customers) throw "No customers with this ID in the database";
            const updated = await Customer.findById(customers._id);
            res.json(updated);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error updating details` });
        }
    },

    deleteOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error delete customer`;
            }

            const deleted = await Customer.findOneAndRemove({
                _id: value.id
            });

            if (!deleted) throw "failed to delete";
            res.json(deleted);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error delete customer` });
        }
    },
}