const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    text: String,
    isTrue: Boolean
});

const subQuestionSchema = new mongoose.Schema({
    text: String,
    answers: [answerSchema]
});

const questionSchema = new mongoose.Schema({
    questionText: String,
    imageUrl: String,
    subQuestions: [subQuestionSchema]
});

const examSchema = new mongoose.Schema({
    name: String,
    isDelete: Boolean,
    questions: [questionSchema]
},
{
    versionKey : false,
    collection: 'Exam'
});


module.exports = mongoose.model('Exam', examSchema);
