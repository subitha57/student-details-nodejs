// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST (Create) a new student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,
        marks: req.body.marks ,
        enrolled: req.body.enrolled
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH (Update) a student by ID
router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        student.marks = req.body.marks;
        if (req.body.name != null) student.name = req.body.name;
        if (req.body.age != null) student.age = req.body.age;
        if (req.body.grade != null) student.grade = req.body.grade;
        if (req.body.enrolled != null) student.enrolled = req.body.enrolled;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
