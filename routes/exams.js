var express = require('express');
var router = express.Router();
var Res = require('../helpers/ResRender');
var Exam = require('../models/examDatabase');
var checkLogin = require('../middleware/checkLogin');
var checkAdmin = require('../middleware/checkAdmin');
router.get('/', async (req, res, next) => {
    try {
        let exam = await Exam.find({isDelete:false});
        if (!exam) {
            Res.ResRend(res,false,err)
        }
        return res.json(exam);
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.get('/getExam/:examName',checkLogin, async (req, res, next) => {
    try {
        let examName = req.params.examName;
        let exam = await Exam.findOne({ name: examName, isDelete:false });
        if (!exam) {
            Res.ResRend(res,false,err)
        }
        return res.json(exam);
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.put('/edit/:examName',checkAdmin,async function (req, res, next) {
    try{
        let exam = await Exam.findOne({
            name: req.params.examName
        })
        exam.name = req.body.name;
        exam.questions = undefined;
        await exam.save();
        Res.ResRend(res,true,exam)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.delete('/delete/:examName',checkAdmin,async function (req, res, next) {
    try{
        let exam = await Exam.findOne({
            name: req.params.examName
        })
        exam.isDelete = true;
        exam.questions = undefined;
        await exam.save();
        Res.ResRend(res,true,exam)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.put('/recover/:examName',checkAdmin,async function (req, res, next) {
    try{
        let exam = await Exam.findOne({
            name: req.params.examName
        })
        exam.isDelete = false;
        exam.questions = undefined;
        await exam.save();
        Res.ResRend(res,true,exam)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
module.exports = router;