const mongoose=require('mongoose')

const userscheme=new mongoose.Schema({
   
     
    
   fullname:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String,
    },
    role:{
        type:String,
        required:true
    }
})

let user=mongoose.model('User',userscheme)
module.exports=user