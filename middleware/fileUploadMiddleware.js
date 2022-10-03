const multer = require("multer");
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images')
    },
    filename: (req, file, cb) => {
        // console.log(file);

        const imageName = Date.now() + "_" + file.originalname
        console.log("imageName", imageName, file.originalname);
        cb(null, imageName)
    }
})


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("jojo", file.originalname);

        var filetypes = /jpg|JPG|jpeg|''/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // if (!file.originalname) {
        //     console.log("fileeeeee");
        //     cb("No file", false);
        //     // return res.status(404).json("NO FILE");
        // }

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("file-type-error", false);
    },
    limits: { fileSize: 3000000 }

});



const fileErrorHandling = (err, req, res, next) => {
    console.log("THE ERROR", err);

    if (err == "file-type-error")
        return res.status(415).json("Invalied file type");
    if (err.code == "LIMIT_FILE_SIZE")
        return res.status(413).json("File size too large");
    next();
}

// const validateFormData = (req, res, next) => {
//     console.log("hi", req.file);
//     // console.log("hi", req.data);
//     // if (req.files) {
//     //     // File does not exist.
//     //     console.log("No file",req.files);
//     //     return res.status(400).json("Image Required");

//     // }
//     next()

// }

module.exports = {
    upload,
    fileErrorHandling,
    // validateFormData
}