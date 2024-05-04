const {Schema,model}= require('mongoose');
const notificationSchema =new Schema(
    {
        message:String,
        course:{ type: Schema.Types.ObjectId, ref: 'Course' },
        creator:{type: Schema.Types.ObjectId, ref: 'User'},
        createdAt:{type:Date,default:Date.now}
    },
    {versionKey:false}
)
 
const NotificationModel = model('Notification',notificationSchema);

module.exports= NotificationModel