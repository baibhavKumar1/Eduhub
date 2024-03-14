const mongoose= require('mongoose');
const lectureSchema = mongoose.Schema(
    {
       title:String,
       creator:String,
       course:String,
       url:String,
       duration:String,
       createdAt:{
        type:Date,
        default:Date.now
       },
       assignment:[String],
       discussion:[String],
       completedBy:[String]
    }
)

const LectureModel = mongoose.model('lecture',lectureSchema);

module.exports= LectureModel