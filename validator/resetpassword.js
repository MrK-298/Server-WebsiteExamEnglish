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
    }
}

let Notifies = {
    NOTI_PASSWORD_OLD: "password phai dai it nhat %d ky tu, trong do co it nhat %d so, %d chu hoa, %d chu thuong, %d ki tu",
}


module.exports = function () {
    return [
        check("password", util.format(Notifies.NOTI_PASSWORD_OLD,options.password.minLength,options.password.minNumbers,options.password.minUppercase,options.password.minLowercase,options.password.minSymbols)).isStrongPassword(options.password),
    ]
}