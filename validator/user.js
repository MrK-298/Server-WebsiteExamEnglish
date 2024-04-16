const e = require('express');
let { check } = require('express-validator');
let util = require('util')

let options = {
    password: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    }, username: {
        min: 6,
        max: 42
    }, 
    name: {
        min: 8,
        max: 30
    }
}

let Notifies = {
    NOTI_EMAIL: "email phai dung dinh dang",
    NOTI_USERNAME: "username phai dai tu %d den %d ky tu",
    NOTI_PASSWORD: "password phai dai it nhat %d ky tu, trong do co it nhat %d so, %d chu hoa, %d chu thuong, %d ki tu",
    NOTI_NAME: "ho va ten phai dai tu %d den %d ky tu"
}


module.exports = function () {
    return [
        check('email', Notifies.NOTI_EMAIL).isEmail(),
        check("username", util.format(Notifies.NOTI_USERNAME, options.username.min, options.username.max)).isLength(options.username),
        check("password", util.format(Notifies.NOTI_PASSWORD,options.password.minLength,options.password.minNumbers,options.password.minUppercase,options.password.minLowercase,options.password.minSymbols)).isStrongPassword(options.password),
        check("name", util.format(Notifies.NOTI_NAME, options.name.min, options.name.max)).isLength(options.name)
    ]
}