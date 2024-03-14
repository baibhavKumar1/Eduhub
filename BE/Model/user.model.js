const mongoose =require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String,
        avatar:String,
        role:{
            type:String,
            enum:['Admin','Student']
        },
        courses:[String]
    },{versionKey:false}
)

const UserModel = mongoose.model('User',userSchema);
module.exports= UserModel;