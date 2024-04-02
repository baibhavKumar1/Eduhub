const mongoose= require('mongoose');
const notificationSchema = mongoose.Schema(
    {
        message:[String],
        user:{ type: Schema.Types.ObjectId, ref: 'User' }
    },
    {versionKey:false},
    {timeStamp:true}
)
 
const NotificationModel = mongoose.model('Notification',notificationSchema);

module.exports= NotificationModel