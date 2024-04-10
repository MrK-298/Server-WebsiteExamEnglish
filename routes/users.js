var express = require('express');
var router = express.Router();

var userModel = require('../models/userDatabase');

router.get('/', async (req, res,next) => {
    try {
        let users = await userModel.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng' });
    }
});
router.get('/:id', async (req, res,next) => {
    try {
        let users = await userModel.findById(req.params.id);
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng' });
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
router.post('/',async(req,res,next)=>{
    try{      
            await userModel.create({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              verificationCode: "",
              image: "",
            })
            res.status(201).send("tạo tài khoản thành công");
        }    
    catch{
        console.error(err);
        res.status(400).json({ message: 'Lỗi khi tạo người dùng mới' });
    }
});
router.put('/:id', async(req, res, next) => {
    try {
      var user = await userModel.findByIdAndUpdate(req.params.id,
        req.body, {
        new: true
      });
      res.status(201).send(user);
    } catch (error) {
        console.error(err);
        res.status(400).json({ message: 'Lỗi khi cập nhật' });
    }
});
module.exports = router;
