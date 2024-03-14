const express=require('express');
const cors = require('cors');
const { connection } = require('./db');
const UserRouter = require('./Route/user.route');
const LectureRouter = require('./Route/lecture.route');
const AdminRouter = require('./Route/admin.route');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/user',UserRouter)
app.use('/lecture',LectureRouter)
app.use('/admin',AdminRouter)
app.get('/',(req,res)=>{
    res.status(200).send('on')
})

app.listen(3000,async()=>{
 try{
    await connection;
    console.log('connected');
 }catch(error){
    console.log(error);
 }
 console.log('running');
})