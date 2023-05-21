const joi = require('joi');
const {Employees}=require('../models/Employee');




module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await Employees.find({});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting employees' });
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

            const employees = await Employees.findById(value.id);
            if (!employees) throw "Invalid employees id, no such employees.";
            res.json(employees);
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },

    addNew: async function (req, res, next) {
        try {
            const schema = joi.object({
                fullname: joi.string().min(5).max(256).required(),
                email: joi.string().min(6).max(256).required().email(),
                phone: joi.string().min(9).max(13).required(),
                birthday: joi.string().min(2).max(256).required(),

            });

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error add employees';
            }

            const employees = new Employees(value);
            const newEmployees = await employees.save();
            res.json(newEmployees);
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
                birthday: joi.string().min(2).max(256).required(),
            }).min(1);

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error updating employees';
            }

            const filter = {
                _id: req.params.id
            };

            const employees= await Employees.findOneAndUpdate(filter, value);
            if (!employees) throw "No employees with this ID in the database";
            const updated = await Employees.findById(Employees._id);
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
                throw `error delete employees`;
            }

            const deleted = await Employees.findOneAndRemove({
                _id: value.id
            });

            if (!deleted) throw "failed to delete";
            res.json(deleted);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error delete employees` });
        }
    },
}