const {Schema,model} = require('mongoose')

const insightSchema = new Schema(
    {
        registrations:{
            userID:[Number],
            time:Date
        },
    },
    {versionKey:false}
)

const InsightModel = model('Insight',insightSchema)

module.exports = InsightModel