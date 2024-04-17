var express = require('express');
var router = express.Router();
var Res = require('../helpers/ResRender');
var User = require('../models/userDatabase');
var checkAdmin = require('../middleware/checkAdmin');

router.get('/',checkAdmin, async (req, res,next) => {
    try {
        let users = await User.find({isDelete:false});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng' });
    }
});
router.put('/edit/:username', checkAdmin, async function (req, res, next) {
    try{
        let username = await User.findOne({
            username: req.params.username
        })
        username.email = req.body.email;
        username.name = req.body.name;
        username.roleId = req.body.roleId;

        await username.save();
        Res.ResRend(res,true,username)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.delete('/delete/:username',checkAdmin, async function (req, res, next) {
    try{
        let username = await User.findOne({
            username: req.params.username
        })
        username.isDelete = true;
        await username.save();
        Res.ResRend(res,true,username)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.put('/recover/:username', checkAdmin, async function (req, res, next) {
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


router.get('/findbyEmail/:email', async (req, res, next) => {
    try {
        let users = await userModel.find({ email: req.params.email });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng' });
    }
});

module.exports = router;