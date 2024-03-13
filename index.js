
const mongoose = require('mongoose')
const express = require('express')
const Login =require('./schema.js')
const bodyParser = require('body-parser')
const cors=require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

async function connectToDb() {
  try{
   await mongoose.connect('mongodb+srv://amruta:vieFC9VXxVSgoPzM@cluster0.rgbuaxs.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log('DB Connection established')
    const port=process.env.PORT || 8002 // in cloud service take any port no which is avaliable(process.env.PORT) , in local machine it will take 8002 as port number
    app.listen(port,function(){
        console.log(`Listening on port ${port}` )
    })
  }catch(error){
    console.log(error)
    console.log("Couldn't establish connection")
  }
}

connectToDb()


app.post('/add-ques',async function(request,response){

try {
  await Login.create({
      "userName": request.body.userName,
      "password":request.body.password
  })
  response.status(201).json({
      "status" : "success",
      "message" : "entry created"
  })
} catch(error) {
  response.status(401).json({
      "status" : "failure",
      "message" : "entry not created",
      "error" : error
  })
}
})

app.get('/get-ques',async function(request,response){
try{
  const login=await Login.find()
  response.status(200).json(login)
}catch(error){
  response.status(500).json({
    "status" : "failure",
    "message" : "entry not created",
    "error" : error
})
}
})




