const express = require('express');
const LectureModel = require('../Model/lecture.model');
const UserModel = require('../Model/user.model');
const auth = require('../Middleware/auth.middleware');
const AssignmentModel = require('../Model/assignment.model');
const DiscussionModel = require('../Model/discussion.model');
const LectureRouter = express.Router();

LectureRouter.get('/student',auth, async(req,res)=>{
    try{
        const user = await UserModel.findById(req.body.userID).populate('courses');
        if(!user){
            res.status(400).json({message:"User not found"})
        }
        else{
            const lectures=[];
            for(const course of user.courses){
                const courseLecture = await LectureModel.find({_id:{$in:course.lectures}});
                lectures.push(...courseLecture);
            }
            res.status(200).json({lectures:lectures})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
})

LectureRouter.post('/create',auth,async(req,res)=>{
    try{
        const user = await UserModel.findById(req.body.userID);
        if(!user || user.role == "Student"){
            res.status(400).json({message:"Not Authorized"})
        }
        else{
            const {title,url,duration,course} = req.body;
            const lecture = new LectureModel({
                title,url,duration,course,creator:user._id
            })
            await lecture.save();
            res.status(200).json({message:"Lecture Created",lecture})
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

LectureRouter.post('/:id/assignment',auth, async(req,res)=>{
    try{
        const user = await UserModel.findById(req.body.userID);
        if(!user || user?.role == "Student"){
            res.status(400).json({message:"Not Authorized"})
        }else{
            const {content,deadline} = req.body;
            const assignment = new AssignmentModel({
                lecture:req.params.id,content,creator:req.body.userID,deadline
            })
            const lecture = await LectureModel.findById(req.params.id);
            lecture.assignment.push(assignment._id)
            await lecture.save()
            await assignment.save()
            res.status(200).json({message:"Assignment Created",assignment})
        }
    }catch(err){
console.log(err.message);
    }
})
LectureRouter.post('/:id/discussion',async(req,res)=>{
  try{
    const user = await UserModel.findById(req.body.userID);
        if(!user){
            res.status(400).json({message:"User not found"})
        }else{
            const discussion = new DiscussionModel({
                lecture:req.params.id, content:req.body.content,creator:req.body.userID
            })
            const lecture = await LectureModel.findById(req.params.id);
            lecture.discussion.push(discussion._id)
            await lecture.save()
            await discussion.save()
            res.status(200).json({message:"Discussion Created",discussion})
        }
  }catch(err){
console.log(err.message);
res.status(500).json({messsage:err.message})
  }
})
LectureRouter.post('/assignments/:assignmentId/complete', async (req, res) => {
    const { assignmentId } = req.params;
    const { userID } = req.body;
  
    try {
      // Update assignment with completion details
      const assignment = await AssignmentModel.findByIdAndUpdate(
        assignmentId,
        {
          $push: { completedBy: userID }
          
        },
        { new: true }
      );
  
      return res.json(assignment);
    } catch (error) {
      console.error('Error completing assignment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to complete a lecture
  LectureRouter.post('/lectures/:lectureId/complete', async (req, res) => {
    const { lectureId } = req.params;
    const { userID } = req.body;
  
    try {
      // Update lecture with completion details
      const lecture = await LectureModel.findByIdAndUpdate(
        lectureId,
        {
          $push: { completedBy: userID }
          
        },
        { new: true }
      );
  
      return res.json(lecture);
    } catch (error) {
      console.error('Error completing lecture:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = LectureRouter