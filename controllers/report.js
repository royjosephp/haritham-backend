const Report = require("../models/Report");
const fs = require('fs')
const path = require('path')

exports.getReports = async (req, res, next) => {
    try {
  
      const reports = await Report.find({});
      res.status(200).json({
        success: true,
        reports: reports,
      });
    } catch (err) {
      next(err);
    }
};

exports.getOwnReports = async (req, res, next) => {
    try {
      
      const reports = await Report.find({user: req.user._id});
      res.status(200).json({
        success: true,
        reports: reports,
      });
    } catch (err) {
      next(err);
    }
};

exports.getReportById = async (req, res, next) => {
    const { id } = req.params;

    try{
        const report = await Report.findById(id).select("+image");
        res.status(200).json({
            success: true,
            report: report,
          });
    } catch(err){
        next(err)
    }
}

exports.addReport = async (req, res, next) => {
    const { location, state, district, type, description } = req.body;
    const { filename, mimetype } = req.file;

    console.log(location)

    try {
      console.log(req.file.path);
      console.log(req.get('host'));
      console.log(req.protocol);
        const report = await Report.create({
            location : JSON.parse(location),
            state,
            district,
            type,
            description,
            image: {
                data: req.protocol + '://' + req.get('host') + "/uploads/" + filename,
                contentType: mimetype
            },
            user : req.user._id});
        res.status(201).json({
            success: true,
            report: report,
        });
    } catch(err){
    next(err)
    }
}

exports.deleteReportById = async (req, res, next) => {
    const { id } = req.params;
    try{
        const report = await Report.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            report: report,
          });
    } catch(err){
        next(err)
    }
}