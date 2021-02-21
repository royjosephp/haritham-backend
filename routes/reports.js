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
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

// Auth Check
router.use(protect);

router.route("/").get(getReports);

router.route("/_self").get(getOwnReports);

router.route("/:id").get(getReportById);

router.route("/").post(upload.single('image'), addReport);

router.route("/:id").delete(deleteReportById);
  
module.exports = router;