const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({ path: "./config/config.env" });
dbConnect();

const colleges = require("./routes/colleges");
const students = require("./routes/students");

app.use("/api/colleges", colleges);
app.use("/api/students", students);

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server Running In ${process.env.NODE_ENV} Mode On Port ${PORT}`)
);
