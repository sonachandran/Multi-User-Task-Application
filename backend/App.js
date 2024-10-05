const express=require("express")
const App=express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/MultiUser')
    
  .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error:', err));

const cors = require('cors');
App.use(express.json())
App.use(cors())

const User=require('./Model/User')
const Usertask=require('./Model/Addtask')
const bcrypt=require('bcrypt')
const saltrounds = 10;
const jwt=require('jsonwebtoken')

App.post('/adduser', async (req, res) => {
    // try {
    //   const { username, password, email, role } = req.body;//extract user data
  
    //   console.log('Received Data:', { username, password, email, role });
  
    //   const newUser = new User({ username, password, email, role });//A new instance of the User model is created with the provided data.
    //   const savedUser = await newUser.save();//The new user instance is saved to the MongoDB database.
    //   res.json(savedUser);
    // } catch (error) {
    //   console.error("Error in user registration:", error);
    //   res.status(500).json({ error: "Failed to register user" });
    // }



    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ emailexists:true, message: 'User already exists' });
        }


        let hashpassword = await bcrypt.hash(req.body.password, saltrounds)
        console.log(hashpassword);
        let newuserr = new User({ ...req.body, password: hashpassword })
        console.log(newuserr);
        let response = await newuserr.save()
        console.log(response);
        res.json(response)
    }

    catch (error) {
        console.log("error", error);
    }

  });



  
App.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });//it takes all the data from database
        console.log("logined user", user);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: user.id, username: user.username }, 'abc');
        console.log("token",token); //1
        
            res.json({user,token});
        

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }

});



const verifyToken = (req, res, next) => {   //3
    let token = req.headers['authorization'];
    console.log(token); //Typically, the header should follow the format Authorization: Bearer <token>. The split(' ') method separates the string into parts, where token[1] should be the actual token.
    token = token.split(' ')
    console.log(token[1]);

    if (!token[1]) {
        return res.status(403).json({ message: 'Token is not provided' });
    }

    jwt.verify(token[1], 'abc', (err, decoded) => {   //The jwt.verify method checks whether the provided token is valid by using the secret key ('abc' in this case). If the token is valid, it decodes the token and retrieves the user information (payload) that was originally encoded in the token.
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.decoded = decoded;
        console.log(req.decoded, 'asd');
        next();  //After next() is called, the code in the route handler for /find runs.
    });
};

App.get('/viewprofile/:id', async (req, res) => {
    const userid = req.params.id;
    
    try {
      const response = await User.findById(userid);
      
      if (!response) {
        return res.status(404).send({ message: 'User not found' });
      }
      
      console.log("User profile", response);
      res.status(200).send(response); // Send the user data as a response
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });


  App.post("/addtask", async (req, res) => {
    const {userId, title, description, duedate, status } = req.body;   //to know which user is add the task
    const newtask = new Usertask({ userId,title, description, duedate, status });
    try {
        const response = await newtask.save();
        console.log("User adding task", response);
        res.json(response);
    } catch (error) {
        console.error("Error saving task:", error);
        res.status(500).json({ error: "Error saving task" });
    }
});


App.get('/viewtask/:id', async (req, res) => {
    const userid = req.params.id;
    console.log("userid:", userid);

    try {
        const response = await Usertask.find({userId:userid});
        console.log("alltasks",response);
        
        if (response) {
            res.json(response);
        } else {
            console.log("No task found for this user");
            res.status(404).json({ error: "No task found" });
        }
    } catch (error) {
        console.error("Server error:", error); 
        res.status(500).json({ error: "Server error" });
    }
});

App.post('/tasks/:taskId/share', async (req, res) => {
    const { taskId } = req.params;
    const { email, userId } = req.body; // userId is the ID of the owner trying to share the task
    console.log("req",req.body);
    

    try {
        const userToShare = await User.findOne({ email });  // Find user by email
        if (!userToShare) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Find the task to be shared
        const task = await Usertask.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        // Ensure only the owner can share the task
        if (task.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Only the task owner can share it' });
        }

        // Add the shared user to the task if not already present
        if (!task.sharedWith.includes(userToShare._id)) {
            task.sharedWith.push(userToShare._id); // Add the user to sharedWith
            await task.save(); // Save the updated task to MongoDB
        }

        res.json({ message: 'Task shared successfully' });
    } catch (error) {
        console.error("Error sharing task:", error);
        res.status(500).json({ error: "Server error" });
    }
});



App.get('/tasks/shared/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const tasks = await Usertask.find({
            sharedWith: userId  // Only tasks shared with the user
        }).populate('sharedWith'); // Optionally populate sharedWith for user details

        res.json(tasks);
    } catch (error) {
        console.error("Error fetching shared tasks:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});






App.put('/updatetask/:id',async(req,res)=>{
    console.log("updated task",req.body);
    
    try {
        const userid=req.params.id;
        console.log("id",userid);
        
        const updatedtask = await Usertask.findByIdAndUpdate(userid, req.body, { new: true }); 
        console.log('updated task', updatedtask);
        if (!updatedtask) {
            return res.status(404).json({ message: 'profile not found' });
        }
        res.json(updatedtask);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Server error' });
    }

})

App.delete('/deletetask/:id', async (req, res) => {
    const id = req.params.id;
    const DeteteTask = await Usertask.findByIdAndDelete(id);
    console.log("deleted", DeteteTask);
    
    if (!DeteteTask) {
        return res.status(401).json({ error: 'error' });
    }
    return res.json(DeteteTask);
});


App.get('/tasks', async (req, res) => {
    try {
        const tasks = await Usertask.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Backend route for updating task status
App.put('/updatetaskstatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;  // Expecting status in the request body

        const updatedTask = await Usertask.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


App.get('/findtask',async(req,res)=>{
     const response=await Usertask.find()
     console.log("response",response);
     res.json(response)
     
})



App.listen(6500,()=>{
    console.log("port connected");
    
})