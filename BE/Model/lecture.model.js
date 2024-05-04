const {Schema,model}= require('mongoose');
const lectureSchema = new Schema(
    {
       title:String,
       creator:{ type: Schema.Types.ObjectId, ref: 'User' },
       course:{ type: Schema.Types.ObjectId, ref: 'Course' },
       url:String,
       duration:String,
       createdAt:{type:Date,default:Date.now},
       assignment:{ type: [Schema.Types.ObjectId], ref: 'Assignment' },
       discussion:{ type: [Schema.Types.ObjectId], ref: 'Discussion' },
       completedBy:{ type: [Schema.Types.ObjectId], ref: 'User' },
    },
    {versionKey:false}
)

const LectureModel = model('Lecture',lectureSchema);

module.exports= LectureModel