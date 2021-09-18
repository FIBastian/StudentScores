const multer = require("multer");
const path = require("path");

module.exports = (fieldName) => {
    try {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./pictures");
            },
            // uniqueSuffix digunakan untuk mencegah penimpaan file
            filename: function (req, file, cb) {
                const uniqueSuffix = new Date().getTime();
                cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
            },
        });

        const upload = multer({ storage: storage }).single(fieldName);

        return (req, res, next) => {
            upload(req, res, (err) => {
                return next();
            });
        };
    } catch (error) {

    }
}