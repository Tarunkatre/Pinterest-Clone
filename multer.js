var multer = require('multer');
let {v4:uuidv4} = require('uuid')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/upload')
    },
    filename: function (req, file, cb) {
        const uniqueFile = uuidv4()
         cb(null,uniqueFile + path.extname(file.originalname))
    }
})

module.exports = multer({ storage: storage })