const express = require("express");
const router = express.Router();
const data = {};
data.students = require("../../model/students.json");

router.get("/", (req, res) =>{
    res.send(data.students);
});

module.exports = router;