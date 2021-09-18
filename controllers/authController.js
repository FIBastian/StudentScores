const Joi = require('joi')
const { admin } = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



module.exports = {
    register: async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                username: Joi.string().min(5).required(),
                password: Joi.string().min(5).required()
            });

            const check = schema.validate({ ...body }, { abortEarly: false });

            if (check.error) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Bad Request",
                    errors: check.error["details"][0]["message"]
                });
            }

            const checkEmail = await admin.findOne({
                where: {
                    email: body.email
                },
            });

            if (checkEmail) {
                return res.status(400).json({
                    status: "Fail",
                    message: "Email already used, please use another email, or login"
                });
            }

            const hashedPassword = await bcrypt.hash(body.password, 10);

            const admin = await admin.create({
                email: body.email,
                password: hashedPassword
            });

            const payload = {
                email: admin.dataValues.email,
                id: admin.dataValues.id,
            };

            jwt.sign(payload, "passwordKita", { expiresIn: 3600 }, (err, token) => {
                return res.status(200).json({
                    status: "Success",
                    message: "Registered Successfully",
                    data: token
                });
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    },
    login: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(7).required()
            });

            const { error } = schema.validate({ ...body });

            if (error) {
                return res.status(400).json({
                    status: "Failed",
                    message: error.message
                });
            }

            const checkEmail = await admin.findOne({
                where: {
                    email: body.email
                },
            });

            if (!checkEmail) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Invalid email or password"
                });
            }

            const checkPassword = await bcrypt.compare(body.password, checkEmail.dataValues.password);

            if (!checkPassword) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Invalid email or password"
                });
            }

            const payload = {
                email: checkEmail.dataValues.email,
                id: checkEmail.dataValues.id
            };

            jwt.sign(payload, "passwordKita", { expiresIn: 3600 }, (err, token) => {
                return res.status(200).json({
                    status: "Success",
                    message: "Loggen in successfully",
                    data: token
                });
            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    },
};