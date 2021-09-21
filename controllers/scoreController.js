const { score, students } = require("../models");
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
            });

            const { error } = schema.validate({
                math: body.math,
                physics: body.physics,
                algoritm: body.algoritm,
                programming: body.programming,
                studentId: body.studentId,
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
            const check = await score.create({
                math: body.math,
                physics: body.physics,
                algoritm: body.algoritm,
                programming: body.programming,
                studentId: body.studentId,
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
                message: "Internal Server Error" //bad request semestinya supaya pada bagian interface tidak jelek
            });
        }
    },

    getScore: async (req, res) => {
        try {
            const Scores = await score.findAll({
                include: {
                    as: "Student",
                    model: students
                },
                attributes : {
                    exclude : ["studentId", "updatedAt"]
                }
            });

            if (!Scores) {
                res.status(404).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                });
            }

            return res.status(200).json({
                status: "Success",
                message: "Successfuly Retrieved Students Data",
                data: Scores
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    },

    getOne: async (req, res) => {
        try {
            const Scores = await score.findOne({
                where: {
                    id: req.params.id,
                  },
                attributes : {
                    exclude : ["idBrand", "updatedAt"]
                },
                include: [
                  {
                    as: "Student",
                    model: students,
                  },
                ],
              });

            if (!Scores) {
                res.status(404).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                });
            }

            return res.status(200).json({
                status: "Success",
                message: "Successfuly Retrieved Students Data",
                data: Scores
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
                math: Joi.number(),
                physics: Joi.number(),
                algoritm: Joi.number(),
                programming: Joi.number(),
                studentId: Joi.number()
            });

            const { error } = schema.validate({
                math: body.math,
                physics: body.physics,
                algoritm: body.algoritm,
                programming: body.programming,
                studentId: body.studentId,
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
            const scoreUpdates = await score.update(
                { ...body },
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
            );

            if (!scoreUpdates[0]) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Update Database"
                });
            }
            const data = await score.findOne({
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
            const check = await score.destroy({
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
                message: "Successfuly Delete Students Data"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    }
};