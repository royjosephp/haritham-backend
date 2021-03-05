const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const {sendSMS} = require("../utils/sendSMS");

// @desc    Verify Password
exports.verifyPassword = async (req, res, next) => {

  const { password } = req.body;

  try {

    const user = await User.findOne({
      oneTimePassword : password,
      oneTimePasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.oneTimePassword = undefined;
    user.oneTimePasswordExpire = undefined;
    user.verified = true;

    await user.save();

    res.status(201).json({
      success: true,
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Generate Password
exports.generatePassword = async (req, res, next) => {
  const { phone } = req.body;

  try {

    let user = await User.findOne({ phone });

    if(!user){
      user = await User.create({
        phone
      });
    }

    // Generate OTP and add it to db
    const OTPString = user.getOneTimePasswordToken();

    await user.save();

    try {
      sendSMS(phone, OTPString);

      res.status(200).json({ success: true, data: "SMS Sent" });
    } catch (err) {
      console.log(err);

      user.oneTimePassword = undefined;
      user.oneTimePasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("SMS could not be sent", 500));
    }

  } catch (err) {
    next(err);
  }
};