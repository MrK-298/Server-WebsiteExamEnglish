var express = require('express');
var router = express.Router();
var detailExam = require('../models/detailExamDatabase');
var userModel = require('../models/userDatabase');
var Exam = require('../models/examDatabase');
var Res = require('../helpers/ResRender');
const moment = require('moment-timezone');
router.post('/', async (req, res, next) => {
    try {
        const now = moment().tz('Asia/Ho_Chi_Minh');
        const currentDate = now.format('YYYY-MM-DD');
        const currentHour = now.format('HH');
        const currentMinute = now.format('mm');
        const currentSecond = now.format('ss');
        const dateTimeString = `${currentDate} ${currentHour}:${currentMinute}:${currentSecond}`;
        let { username, exam, arr , score} = req.body;
        let user = await userModel.findOne({ username: username });
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
        let {username, exam} = req.body;
        let user = await userModel.findOne({ username: username });
        let exams = await Exam.findOne({ name: exam });
        let existingDetailExam = await detailExam.findOne({ userId: user._id, examId: exams._id });
        return res.json(existingDetailExam);
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
module.exports = router;