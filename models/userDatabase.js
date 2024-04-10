var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoinguyen29082002:khoibia123@hoangkhoi.9ehzu5m.mongodb.net/WebTiengAnh')
    .then(() => console.log('Đã kết nối đến MongoDB'))
    .catch(err => console.error('Lỗi kết nối đến MongoDB:', err));

const Schema = mongoose.Schema;
const userSchema = new Schema({
        username: String,
        password: String,
        email: String,
        verificationCode: String,
        image: String,
},
{
    versionKey : false,
    collection: 'User'
});

const User = mongoose.model('User', userSchema);
module.exports = User;