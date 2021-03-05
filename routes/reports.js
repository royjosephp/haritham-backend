const express = require("express");
const { protect } = require('../middleware/auth');
var multer = require('multer');

// Controllers
const {
    getReports,
    getOwnReports,
    getReportById,
    addReport,
    deleteReportById
  } = require("../controllers/report");

const router = express.Router();

// Image Upload
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filter and accept images only
let fileFilter = function (req, file, cb) {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png image files are allowed.'
        }, false);
    }
};
 
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 200 * 1024 * 1024
    },
    fileFilter: fileFilter
});

// Auth Check
router.use(protect);

router.route("/").get(getReports);

router.route("/_self").get(getOwnReports);

router.route("/:id").get(getReportById);

router.route("/").post(upload.single('image'), addReport);

router.route("/:id").delete(deleteReportById);
  
module.exports = router;