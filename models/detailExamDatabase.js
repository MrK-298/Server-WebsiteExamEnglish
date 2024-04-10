const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    selectedValue: String,
    correctAnswer: String
});
const detailexamSchema = new mongoose.Schema({
    examId : mongoose.Schema.Types.ObjectId,
    userId : mongoose.Schema.Types.ObjectId,
    score: Number,
    create_at: String,
    Answers: [answerSchema]
},
{
    versionKey : false,
    collection: 'DetailExam'
});


module.exports = mongoose.model('detailExam', detailexamSchema);