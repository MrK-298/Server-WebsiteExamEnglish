var Res = require('../helpers/ResRender');
var jwt = require('jsonwebtoken')
var config = require('../config/config')
var userModel = require('../models/userDatabase')
module.exports = async function (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        if (req.cookies.kento) {
            token = req.cookies.kento;
        }
    }
    if (!token) {
        Res.ResRend(res, false, "Bạn chưa đăng nhập");
        return;
    }
    try {
        var result = jwt.verify(token, config.JWT_SECRETKEY);
        if (result.exp * 1000 >= Date.now()) {
            let user = await userModel.findById(result.id);
            req.user = user;
            if (user.roleId.equals("admin")) {
                next();
            }else {
                Res.ResRend(res, false, "Bạn không có quyền truy cập");
            }
        } else {
            Res.ResRend(res, false, "Phiên đăng nhập của bạn đã hết hạn");
            return;
        }
    } catch (error) {
        Res.ResRend(res, false, "Lỗi xác thực token");
        return;
    }
}