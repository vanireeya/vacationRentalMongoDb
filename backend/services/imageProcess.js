const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        console.log(file)
        // const newFilename = `test${path.extname(file.originalname)}`;
        const newFilename = file.originalname;

        cb(null, newFilename);
    },
});
// const upload = multer({ storage });
module.exports.upload = multer({ storage }).array('photos', 5);
const upload1 = multer({ storage });




module.exports.changeFormat = (filename) => {
    return new Promise((resolve, reject) => {
        // console.log("filename:" + filename)
        var file = filename;
        // console.log(__dirname + '/../uploads')
        // var fileLocation = path.join(__dirname +  '..\uploads', file);
        var fileLocation = path.join(__dirname + '/../uploads', file);
        var img = fs.readFileSync(fileLocation);
        var base64img = "data:image/jpg;base64, " + new Buffer(img).toString('base64');

        if (base64img) {
            resolve(base64img);
        } else {
            reject(base64img);
        }
    });
};