const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    description:{
        type: String
    }
});

const imageSchema = new mongoose.Schema({
    data: {
        type: Buffer,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
})

const ReportSchema = new mongoose.Schema({
    location: {
        type: pointSchema,
        required: true
    },
    image: {
        type: imageSchema,
        required: true,
        select: false
    },
    state:{
        type: String,
        required: true
    },
    district :{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.ObjectId
    }
});


const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;