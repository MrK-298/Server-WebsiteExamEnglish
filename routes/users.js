var express = require('express');
var router = express.Router();
var Res = require('../helpers/ResRender');
var User = require('../models/userDatabase');
var checkAdmin = require('../middleware/checkAdmin');

router.get('/',checkAdmin, async (req, res,next) => {
    try {
        let users = await User.find({isDelete:false});
        Res.ResRend(res,true,users)
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.get('/getUserDelete',checkAdmin, async (req, res,next) => {
    try {
        let users = await User.find({isDelete:true});
        Res.ResRend(res,true,users)
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.put('/edit/:username', async function (req, res, next) {
    try{
        let user = await User.findOne({
            username: req.params.username
        })
        console.log(user);
        user.email = req.body.email;
        user.name = req.body.name;
        user.roleId = req.body.roleId;
        await user.save();
        Res.ResRend(res,true,user)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.delete('/delete/:username', async function (req, res, next) {
    try{
        let user = await User.findOne({
            username: req.params.username
        })
        user.isDelete = true;
        await user.save();
        Res.ResRend(res,true,user)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.put('/recover/:username', async function (req, res, next) {
    try{
        let username = await User.findOne({
            username: req.params.username
        })
        username.isDelete = false;
        await username.save();
        Res.ResRend(res,true,username)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});


router.get('/findbyUsername/:username',checkAdmin, async (req, res, next) => {
    try {
        let users = await User.findOne({ username: req.params.username });
        Res.ResRend(res,true,users)
    } catch (err) {
        Res.ResRend(res,false,err)
    }
});
module.exports = router;