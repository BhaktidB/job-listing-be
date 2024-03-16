const mongoose = require('mongoose');

const jobDetailSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    locationType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    skills: [{
        type: String,
        required: true
    }],
    information: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
});

const JobDetail = mongoose.model("JobDetail", jobDetailSchema);

module.exports = JobDetail;
