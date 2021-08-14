const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'College Id Required !']
    },
    name: {
        type: String,
        required: [true, 'College Name Required !']
    },
    yearFounded: {
        type: Number,
    },
    city: {
        type: String,
        required: [true, 'City Required !']
    },
    state: {
        type: String,
        ref: 'College',
        required: [true, 'State Required !']
    },
    country: {
        type: String,
        required: [true, 'Country Required !']
    },
    noOfStudents: {
        type: Number
    },
    courses: {
        type: [String],
        required: [true, 'Courses Required !']
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true
    }
});

CollegeSchema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'collegeId',
    justOne: false
});

module.exports = mongoose.model('College', CollegeSchema);