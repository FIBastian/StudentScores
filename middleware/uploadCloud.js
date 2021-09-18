const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: "djw7eloev",
    api_key: "931319434814294",
    api_secret: "aJM9eV5YF6ITTLR-NgvxhtiP558"
});

module.exports = (fieldName) => {
    try {
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params:{
                folder: "Students",
                resource_type: "raw",
                public_id: (req, file) => "image - " + new Date().getTime() + path.extname(file.originalname)
            },
        });

        const upload = multer({ storage: storage}).single(fieldName);

        return (req, res, next) => {
            upload(req,res, (err)=>{
                return next();
            });
        };
    } catch (error) {}
};