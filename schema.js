const mongoose=require ('mongoose')
const quizSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    password:{
        type:[String]
    }
})

const Login=mongoose.model('quiz',quizSchema) 
//exporting model
module.exports=Login