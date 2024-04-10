var express = require('express');
var router = express.Router();
var detailExam = require('../models/detailExamDatabase');
var userModel = require('../models/userDatabase');
var Exam = require('../models/examDatabase');
var Res = require('../helpers/ResRender');
router.post('/', async (req, res, next) => {
    try {
        let now = new Date();
        let currentDate = now.toISOString().slice(0, 10);
        let currentHour = now.getHours().toString().padStart(2, '0');
        let currentMinute = now.getMinutes().toString().padStart(2, '0');
        let currentSecond = now.getSeconds().toString().padStart(2, '0');
        let dateTimeString = currentDate + ' ' + currentHour + ':' + currentMinute + ':' + currentSecond;
        let { email, exam, arr , score} = req.body;
        let user = await userModel.findOne({ email: email });
        let exams = await Exam.findOne({ name: exam });
        let existingDetailExam = await detailExam.findOne({ userId: user._id, examId: exams._id });
        if (existingDetailExam) {
            await detailExam.updateOne(
                { userId: user._id, examId: exams._id },
                { $set: { Answers: JSON.parse(arr), score: score , create_at:dateTimeString} }
            );
        } else {
            await detailExam.create({
                userId: user._id,
                examId: exams._id,
                Answers: JSON.parse(arr),
                score: score,
                create_at:dateTimeString
            });
        }       
        Res.ResRend(res,true,detailExam)
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.post('/getDetailExam/', async (req, res, next) => {
    try {
        let { email, exam} = req.body;
        let user = await userModel.findOne({ email: email });
        let exams = await Exam.findOne({ name: exam });
        let existingDetailExam = await detailExam.findOne({ userId: user._id, examId: exams._id });
        return res.json(existingDetailExam);
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
module.exports = router;