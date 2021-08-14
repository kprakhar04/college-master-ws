const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Student Id Required !']
    },
    name: {
        type: String,
        required: [true, 'Student Name Required !']
    },
    yearOfBatch: {
        type: Number,
        required: [true, 'Batch Required !']
    },
    courseName: {
        type: String,
        required: [true, 'Course Name Required !']
    },
    collegeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'College',
        required: true
    },
    skills: {
        type: [String],
        required: [true, 'Skills Required !']
    }
});

module.exports = mongoose.model('Student', StudentSchema);