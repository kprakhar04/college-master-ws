const express = require('express')
const {
    getColleges,
    getCourses,
    getCollegesByCourse,
    getCollege
} = require('../controllers/colleges');

const router = express.Router();

router.route('/').get(getColleges);
router.route('/courses').get(getCourses);
router.route('/college/:id').get(getCollege);
router.route('/course/colleges').get(getCollegesByCourse);

module.exports = router;