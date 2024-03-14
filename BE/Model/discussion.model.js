const mongoose = require('mongoose')

const discussionSchema = mongoose.Schema(
    {
        lecture:String,
        creator:String,
        content:String
    }
)

const DiscussionModel = mongoose.model('discussion',discussionSchema)

module.exports = DiscussionModel