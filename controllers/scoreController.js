const { score } = require("../models/score");
const Joi = require("joi");

module.exports = {
    postScore: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                math: Joi.number().required(),
                physics: Joi.number().required(),
                algoritm: Joi.number().required(),
                programming: Joi.number().required(),
                studentId: Joi.number().required(),
                scoreId: Joi.number().required()
            });

            const { error } = schema.validate({
                math: body.math,
                physics: body.physics,
                algoritm: body.algoritm,
                programming: body.programming,
                studentId: body.studentId,
                scoreId: body.scoreId
            },
                { abortEarly: false }
            );

            if (error) {
                return res.stauts(400).json({
                    status: "Failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                });
            }
            const check = await students.create({
                math: body.math,
                physics: body.physics,
                algoritm: Joi.algoritm,
                programming: body.programming,
                studentId: body.studentId,
                scoreId: body.scoreId
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

    getScore: async (req, res) => {
        try {
            const Students = await students.findAll();
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

    updateScore: async (req, res) => {
        const body = req.body;
        try {
            const schema = Joi.object({
                math: Joi.number().required(),
                physics: Joi.number().required(),
                algoritm: Joi.number().required(),
                programming: Joi.number().required(),
                studentId: Joi.number().required(),
                scoreId: Joi.number().required()
            });

            const { error } = schema.validate({
                math: body.math,
                physics: body.physics,
                algoritm: body.algoritm,
                programming: body.programming,
                studentId: body.studentId,
                scoreId: body.scoreId
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
                { ...body },
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

    deleteScore: async (req, res) => {
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
                message: "Successfuly Retrieved Students Data"
            });

        } catch (error) {

        }
    }
};