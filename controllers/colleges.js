const College = require('../models/College');

exports.getColleges = async (req, res, next) => {
    const parsed = req.query;
    try{
        const colleges = await College.find(parsed);
        return res.status(200).json({
            success: true,
            data: colleges
        });
    } 
    catch (error) {
        return res.status(500).json({ MSG : "404 Not Found !" });
    }
}

exports.getCollegesByCourse = async (req, res, next) => {
    const { course } = req.query;
    try{
        const colleges = await College.find({
            courses: {
                $elemMatch: {
                    $eq: course
                }
            }
        }).select('-courses');
        return res.status(200).json({
            success: true,
            data: colleges
        });
    }
    catch (error) {
        return res.status(500).json({ MSG : "404 Not Found !" });
    }
}

exports.getCourses = async (req, res, next) => {
    try{
        const coursesWithState = await College.find({}).select('state courses');
        const data = {};
        data['courses'] = constructFreqMap(coursesWithState, 'courses');
        data['state'] = constructFreqMap(coursesWithState, 'state');
        return res.status(200)
            .json({
                success: true,
                data
            });
    }
    catch (error) {
        return res.status(500).json({ MSG : "404 Not Found !" });
    }
}

exports.getCollege = async (req, res, next) => {
    const { id } = req.params;
    try{
        const college = await College.findById(id).populate('students');
        const lowerLimit = college.noOfStudents - 100;
        const upperLimit = college.noOfStudents + 100;
        const similarColleges = await College.find
            (
                {
                    $and:
                        [
                            {
                                _id: {
                                    $ne: college._id
                                }
                            },
                            {
                                state: college.state
                            },
                            {
                                noOfStudents: {
                                    $gte: lowerLimit,
                                    $lte: upperLimit
                                }
                            },
                            {
                                courses: {
                                    $in: college.courses
                                }
                            }
                        ]
                }
            ).select('name');
        return res.status(200)
            .json({
                success: true,
                data: { college, similarColleges }
            });
    }
    catch (error) {
        return res.status(500).json({ MSG : "404 Not Found !" });
    }

}

const constructFreqMap = (data, findBy) => {
    const map = {};
    for (let part of data) {
        const vals = part[findBy];
        if (typeof (vals) === "object") {
            for (let val of vals) {
                map[val] ? map[val]++ : map[val] = 1;
            }
        } else {
            map[vals] ? map[vals]++ : map[vals] = 1;
        }
    }
    return map;
}