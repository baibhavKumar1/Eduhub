const {Schema,model} = require('mongoose')

const assignmentSchema = new Schema(
    {
        lecture:{ type: Schema.Types.ObjectId, ref: 'Lecture' },
        creator:{ type: Schema.Types.ObjectId, ref: 'User' },
        content:String,
        deadline:{type:Date,default:Date.now},
        createdAt:{type:Date,default:Date.now},
        completedBy:{ type: [Schema.Types.ObjectId], ref: 'User' }
    },
    {versionKey:false}
)

const AssignmentModel = model('Assignment',assignmentSchema)

module.exports = AssignmentModel