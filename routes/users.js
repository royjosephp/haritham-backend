var express = require('express');
const { protect } = require('../middleware/auth');
var router = express.Router();

router.use(protect);

/* GET users listing. */
router.get('/_self', function(req, res) {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
