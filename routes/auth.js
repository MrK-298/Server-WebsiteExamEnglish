var express = require('express');
var router = express.Router();
var userModel = require('../models/userDatabase');
var Res = require('../helpers/ResRender');
var { validationResult } = require('express-validator');
var checkUser = require('../validator/auth')
var checkPassword = require('../validator/changepassword')
var bcrypt = require("bcrypt")
var checkLogin = require('../middleware/checkLogin');
const sendMail = require('../helpers/sendMail');
const User = require('../models/userDatabase');
router.get('/decodeToken/:token',async function(req, res, next){
  try
  {
    let token =  req.params.token;
    let user = new User();
    let decodeToken = user.decodeJWT(token);
    Res.ResRend(res, true, decodeToken);
  }catch (error) {
    Res.ResRend(res, false, error)
  }
})
router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    Res.ResRend(res, false, "thieu thong tin");
    return;
  }
  let user = await userModel.findOne({ username: username , isDelete:false })
  if (!user) {
    Res.ResRend(res, false, "username khong ton tai hoac tai khoan da bi khoa");
    return;
  }
  let result = bcrypt.compareSync(password, user.password);
  if (result) {
    let token = user.genJWT();
      res.status(200).cookie("kento", token, {
        expires: new Date(Date.now() + 3600 * 1000),
        httpOnly: true
      }).send({
        success: true,
        data: token,
        role: user.roleId
      })
  } else {
    Res.ResRend(res, false, "username hoặc password không chính xác");
  }
});
router.post('/register', checkUser(), async function (req, res, next) {
  var result = validationResult(req);
  if (result.errors.length > 0) {
    Res.ResRend(res, false, result.errors);
    return;
  }
  try {
    var newUser = new userModel({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      roleId: "user",
      verificationCode: null     
    })
    await newUser.save();
    Res.ResRend(res, true, newUser)
  } catch (error) {
    Res.ResRend(res, false, error)
  }
});
router.put('/resetPassword/:token',async function (req, res, next) {
  try{
    let user = await userModel.findOne({
      tokenResetPassword: req.params.token
    })
    if (!user) {
      Res.ResRend(res, false, "URL khong hop le")
      return;
    }
    if (user.tokenResetPasswordExp > Date.now) {
      Res.ResRend(res, false, "URL khong hop le")
      return;
    }
    user.password = req.body.password;
    user.tokenResetPassword = undefined;
    user.tokenResetPasswordExp = undefined;
    await user.save();
    Res.ResRend(res, true, "cap nhat thanh cong")
  }
  catch (error) {
    Res.ResRend(res, false, error)
  }
});
router.post('/forgotPassword', async function (req, res, next) {
    let user = await userModel.findOne({
      email: req.body.email
    })
    if (!user) {
      Res.ResRend(res, false, "email khong ton tai")
      return;
    }
    let token = user.genResetToken();
    await user.save(); 
    let url = `http://127.0.0.1:5500/views/resetPassword.html?token=${token}`;
    await sendMail(user.email,url);
    Res.ResRend(res, true, "check mail bo` li")
});
module.exports = router;