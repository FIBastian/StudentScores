const Joi = require('joi')

module.exports = {
    register : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                name : Joi.string().required(),
                
            })
        } catch (error) {
            
        }
    }
}