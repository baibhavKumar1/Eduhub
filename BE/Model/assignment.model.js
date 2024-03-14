const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema(
    {
        lecture:String,
        creator:String,
        content:String,
        deadline:Date,
        completedBy:[String]
    }
)

const AssignmentModel = mongoose.model('Assignment',assignmentSchema)

module.exports = AssignmentModel