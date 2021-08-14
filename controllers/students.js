const Student = require('../models/Student');

exports.getStudents = async (req, res, next) => {
    const parsed = req.query;
    try{
        const students = await Student.find(parsed);
        return res.status(200).json({
            success: true,
            data: students
        });
    }
    catch (error) {
        return res.status(500).json({ MSG : "404 Not Found !" });
    }
}
