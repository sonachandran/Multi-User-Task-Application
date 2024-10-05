// const mongoose=require('mongoose')
// const user=require('./User')
// const Taskscheme=new mongoose.Schema({
//     userId:{
//         type:mongoose.Types.ObjectId,
//         ref:user
//     } ,
//    title:{
//         type:String,
//         required:true

//     },
//     description:{
//         type:String,
//         required:true
//     },
//     duedate:{
//         required:true,
//         type:String,
//     },
//     status:{
//         type:String,
//         required:true

//     }
// })

// let usertask=mongoose.model('Usertask',Taskscheme)
// module.exports=usertask


const mongoose = require('mongoose');
const user=require('./User')

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duedate: { type: String, required: true },
    status: { type: String, required: true },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: user }] // Field for shared users
}, { timestamps: true });

const Usertask = mongoose.model('Usertask', taskSchema);
module.exports = Usertask;
