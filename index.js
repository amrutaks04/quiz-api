
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





app.post('/add-ques', async function(request, response) {
    try {
      const newUser = await Login.create({
        username: request.body.username,
        password: request.body.password
      })
      response.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user: newUser
      })
    } catch (error) {
      console.error('Error creating user:', error)
      response.status(500).json({
        status: 'failure',
        message: 'Failed to create user',
        error: error.message
      })
    }
  })
  

  app.get('/get-ques', async function(request, response) {
    try {
      const users = await Login.find();
      response.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      response.status(500).json({
        status: 'failure',
        message: 'Failed to fetch users',
        error: error.message
      })
    }
  })
  


  app.post('/validate-user', async function(request,response){
     try {
        const{username,password}=request.body
        const user=await Login.findOne({username,password})
        if(user){
            response.status(200).json({
                "status":"success",
                "message":"Valid user"
            })
        }
        else{ 
            response.status(401).json({
                "status":"failure",
                "message":"Invalid user"
            })
        }   
      } catch (error) {
        console.error('Error fetching users:', error);
        response.status(500).json({
          status: 'failure',
          message: 'Failed to fetch users',
          error: error.message
        })
      }
    })
  module.exports = app; 


