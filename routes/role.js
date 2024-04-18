express = require('express');
var router = express.Router();
var roleModel = require('../models/roleDatabase');
var Res = require('../helpers/ResRender');
var checkAdmin = require('../middleware/checkAdmin');

router.post('/add',checkAdmin,async function (req, res, next) {
    try{
        await roleModel.create({
            roleId : req.body.roleId,
            name : req.body.name,
            isDelete: false
        });
        Res.ResRend(res,true,roleModel)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.get('/getAll',async function (req, res, next) {
    try{
        let role = await roleModel.find({isDelete:false});
        if(!role){
            Res.ResRend(res,false,"Không tìm thấy role")
        }
        Res.ResRend(res,true,role)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.put('/edit/:roleId',checkAdmin,async function (req, res, next) {
    try{
        let role = await roleModel.findOne({
            roleId: req.params.roleId
        })
        role.roleId = req.body.roleId;
        role.name = req.body.name;
        await role.save();
        Res.ResRend(res,true,role)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
router.delete('/delete/:roleId',checkAdmin,async function (req, res, next) {
    try{
        let role = await roleModel.findOne({
            roleId: req.params.roleId
        })
        role.isDelete = true;
        await role.save();
        Res.ResRend(res,true,role)
    }
    catch (err) {
        Res.ResRend(res,false,err)
    }
});
module.exports = router;