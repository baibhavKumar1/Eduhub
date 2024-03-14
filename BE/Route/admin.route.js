const express = require('express');
const auth = require('../Middleware/auth.middleware');
const AdminModel = require('../Model/admin.model');
const CourseModel = require('../Model/course.model');
const AdminRouter = express.Router();

AdminRouter.get('/', (req, res) => {
    res.status(200).send('on admin')
})

AdminRouter.post('/create', auth, async (req, res) => {
    try {
        const user = await AdminModel.findById(req.body.userID);
        if (!user) {
            res.status(400).json({ message: "Not Found" })
        }
        else {
            const { title, duration, description } = req.body;
            const course = new CourseModel({
                title, duration, description
            })
            await course.save();
            res.status(200).json({ message: "course created", course })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
})
AdminRouter.delete('/:id',auth,async(req,res)=>{
    try {
        const user = await AdminModel.findById(req.body.userID);
        if (!user) {
            res.status(400).json({ message: "Not Found" })
        }
        else {
            const course = await CourseModel.findByID(req.params.id);
            if(!course){
                res.status(400).json({message:"Course Not Available"})
            }
            else{
                await CourseModel.findByIdAndDelete(req.params.id);
            }
            res.status(200).json({ message: "course deleted", course })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
})
module.exports = AdminRouter