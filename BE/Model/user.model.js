const {Schema,model} = require('mongoose');

const userSchema = new Schema(
    {
        username:String,
        email:String,
        password:String,
        avatar:String,
        role:{
            type:String,
            enum: ['Educator','Student'],
            default:"Student"
        },
        courses:{ type: [Schema.Types.ObjectId], ref: 'Course' },
        notifications:{ type: [Schema.Types.ObjectId], ref: 'Notification' }
    },{versionKey:false}
)

const UserModel = model('User',userSchema);
module.exports= UserModel;