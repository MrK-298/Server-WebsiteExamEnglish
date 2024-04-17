var mongoose = require('mongoose');
var crypto = require('crypto');
mongoose.connect('mongodb+srv://khoinguyen29082002:khoibia123@hoangkhoi.9ehzu5m.mongodb.net/WebTiengAnh')
    .then(() => console.log('Đã kết nối đến MongoDB'))
    .catch(err => console.error('Lỗi kết nối đến MongoDB:', err));
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
const Schema = mongoose.Schema;
const userSchema = new Schema({
        username: String,
        password: String,
        email: String,
        name: String,
        isDelete: Boolean,
        roleId: {
            type: String,
            ref: 'Roles'
        }, 
        verificationCode: String,
        tokenResetPassword: String,
        tokenResetPasswordExp: String
},
{
    versionKey : false,
    collection: 'Users'
});
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 10);
})

userSchema.methods.genJWT = function () {
    return jwt.sign({
        id: this._id,
        username: this.username,
        name: this.name,
        role: this.roleId
    }, config.JWT_SECRETKEY, {
        expiresIn: config.JWT_EXP
    })
}
userSchema.methods.genResetToken = function () {
    this.tokenResetPassword = crypto.randomBytes(30).toString('hex');
    this.tokenResetPasswordExp = Date.now() + 10 * 60 * 1000;
    return this.tokenResetPassword;
}
userSchema.methods.decodeJWT = function(token) {
    const decoded = jwt.verify(token, config.JWT_SECRETKEY);
    return decoded;
};
const User = mongoose.model('Users', userSchema);
module.exports = User;