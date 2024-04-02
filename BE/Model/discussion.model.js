const {Schema,model} = require('mongoose')

const discussionSchema = new Schema(
    {
        lecture:{ type: Schema.Types.ObjectId, ref: 'Lecture' },
        creator:{ type: Schema.Types.ObjectId, ref: 'User' },
        content:String
    },
    {versionKey:false}
)

const DiscussionModel = model('Discussion',discussionSchema)

module.exports = DiscussionModel