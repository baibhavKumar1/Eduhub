const {Schema,model}= require('mongoose');
const courseSchema = new Schema(
    {
        title:String,
        duration:String,
        description:String,
        lectures:{ type: [Schema.Types.ObjectId], ref: 'Lecture' },
        users:{ type: [Schema.Types.ObjectId], ref: 'User' }
    },
    {versionKey:false}
)

const CourseModel = model('Course',courseSchema);

module.exports=CourseModel