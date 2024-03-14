const mongoose= require('mongoose');
const courseSchema = mongoose.Schema(
    {
        title:String,
        duration:String,
        description:String,
        lectures:[String]
    }
)

const CourseModel = mongoose.model('Course',courseSchema);

module.exports=CourseModel