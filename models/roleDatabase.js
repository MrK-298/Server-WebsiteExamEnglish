const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
   roleId: String,
   name: String,
   isDelete: Boolean,
},
{
    versionKey : false,
    collection: 'Roles'
});
module.exports = mongoose.model('Roles', roleSchema);