const mongoose= require('mongoose');
const adminSchema = mongoose.Schema(
    {
        name:String,
        courses:[String],
        lectures:[String]
    }
)
 
const AdminModel = mongoose.model('Admin',adminSchema);

module.exports= AdminModel