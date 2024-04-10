var express = require('express');
var router = express.Router();
var Res = require('../helpers/ResRender');
var Exam = require('../models/examDatabase');
var Res = require('../helpers/ResRender');
router.get('/', async (req, res, next) => {
    try {
        let exam = await Exam.find();
        if (!exam) {
            Res.ResRend(res,false,err)
        }
        return res.json(exam);
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.get('/getExam/:examName', async (req, res, next) => {
    try {
        let examName = req.params.examName;
        let exam = await Exam.findOne({ name: examName });
        if (!exam) {
            Res.ResRend(res,false,err)
        }
        return res.json(exam);
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
module.exports = router;