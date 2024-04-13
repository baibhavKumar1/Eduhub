const mongoose= require('mongoose');
const notificationSchema = mongoose.Schema(
    {
        message:[String],
        course:{ type: Schema.Types.ObjectId, ref: 'Course' },
        creator:{type: Schema.Types.ObjectId, ref: 'User'},
        createdAt:{type:Date,default:Date.now}
    },
    {versionKey:false}
)
 
const NotificationModel = mongoose.model('Notification',notificationSchema);

module.exports= NotificationModel