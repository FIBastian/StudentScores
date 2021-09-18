const { students, score } = require("../models");
const Joi = require("joi");


module.exports = {
    postStudents: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                dob: Joi.string().required(),
                address: Joi.string().required(),
                photo: Joi.string().required(),
            });

            const { error } = schema.validate({
                name: body.name,
                dob: body.dob,
                address: body.address,
                photo: req.file.path,
            },
                { abortEarly: false }
            );

            if (error) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                });
            }
            const check = await students.create({
                name: body.name,
                dob: body.dob,
                address: body.address,
                photo: body.req.file.path,
            });

            if (!check) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to save data to database"
                });
            }
            return res.status(200).json({
                status: "Success",
                message: "Successfully saved to database",
                data: check
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    },

    getStudents: async (req, res) => {
        try {
            const Students = await students.findAll({
                include: [{
                    as: "scores",
                    model: score
                }]
            });
            if (!Students) {
                res.status(404).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                });
            }

            return res.status(200).json({
                status: "Success",
                message: "Successfuly Retrieved Students Data",
                data: Students
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    },

    updateStudents: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                name: Joi.string(),
                dob: Joi.string(),
                address: Joi.string().required(),
                photo: Joi.string().required()
            });

            const { error } = schema.validate({
                name: body.name,
                dob: body.dob,
                address: body.address,
                photo: req.file ? req.file.path : "photo"
            },
                { abortEarly: false }
            );

            if (error) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                });
            }
            const studentsUpdates = await students.update(
                {
                    ...body,
                    [req.file ? "photo" : null]: req.file ? req.file.path : null
                },
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
            );

            if (!studentsUpdates[0]) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Update Database"
                });
            }
            const data = await students.findOne({
                where: {
                    id: req.params.id
                },
            });

            return res.status(200).json({
                status: "Success",
                message: "Successfuly Retrieved Students Data",
                data: data
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    },

    deleteStudents: async (req, res) => {
        const id = req.params.id;
        try {
            const check = await students.destroy({
                where: {
                    id // id equal to id :id
                },
            });

            if (!check) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Delete the Data"
                });
            }

            return res.status(200).json({
                status: "Success",
                message: "Data Deleted Successfully"
            });

        } catch (error) {

        }
    }
};