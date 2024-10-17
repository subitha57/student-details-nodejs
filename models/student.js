// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    marks: [
        {
            subject: String,
            score: Number
        }
    ],
    enrolled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
