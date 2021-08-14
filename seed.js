const mongoose = require('mongoose');
const dotenv = require('dotenv');
const faker = require('faker/locale/en_IND');
dotenv.config({ path: './config/config.env' });

const Student = require('./models/Student');
const College = require('./models/College');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const importData = async () => {

    try {
        await College.deleteMany({});
        await Student.deleteMany({});

        for (let i = 0; i < 100; i++) {
            let courses = ["Civil", "IT", "CSE", "ECE", "Mechanical", "EEE", "Aerospace", "Metallurgy","Software", "Mining"];
            let cou = [];
            let max = fetchRandInt(1, 5);
            let k = 0;
            while (k < max) {
                let temp = courses[fetchRandInt(0, 9)];
                if (!cou.includes(temp)) {
                    cou[k] = temp;
                    k++;
                }
            }
            const college = new College(
                {
                    "id": "CLG-" + makeId(10),
                    "name": faker.company.companyName(),
                    "yearFounded": fetchRandInt(1990, 2000),
                    "city": faker.address.city(),
                    "state": faker.address.state(),
                    "country": faker.address.country(),
                    "noOfStudents": fetchRandInt(80, 120),
                    "courses": cou
                }
            )
            await college.save().then(async savedDoc => {
                for (let j = 0; j < savedDoc.noOfStudents; j++) {
                    let skills = ["Java", "Jinja", "Phantom", "Python", "JavaScript", "PHP", "Flask", "Laravel", "Node", "MongoDB"];
                    let ski = [];
                    let m = fetchRandInt(1, 5);
                    let l = 0;
                    while (l < m) {
                        let temp = skills[fetchRandInt(0, 9)];
                        if (!ski.includes(temp)) {
                            ski[l] = temp;
                            l++;
                        }
                    }
                    const student = new Student(
                        {
                            "id": "STD-" + makeId(6),
                            "name": faker.name.findName(),
                            "yearOfBatch": fetchRandInt(2015, 2020),
                            "courseName": cou[fetchRandInt(0, cou.length - 1)],
                            "collegeId": savedDoc._id,
                            "skills": ski
                        }
                    )
                    await student.save();
                }
            });
        }
        console.log("Data Inserted !");
    } catch (err) {
        console.log(err);
    }
}

function fetchRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

//run 'node seed -i'
if (process.argv[2] === '-i') {
    importData();
}
