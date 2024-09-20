const bcrypt = require('bcrypt');
const express =require("express")
const app=express();


const {UserModel , TodoModel} = require("./db");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const JWT_SECRET="asssss";

const {z} = require("zod");

mongoose.connect("mongodb+srv://admin:MU9Nw4YfueewntQW@cluster0.00ffj.mongodb.net/todo-app-Nikhil");

app.use(express.json());


app.post("/signup",async function(req,res)
{

    //checking whether the password has 1 upper case char,1 lower case char, 1 spl character
    //defining schema
    const requireBody=z.object({
        email: z.string().min(3).max(100).email(),
        name:z.string().min(3).max(100),
        password:z.string().min(3).max(30).refine((value)=>{
            const hasUpperCase=/[A-Z]/.test(value);

            const hasLowerCase=/[a-z]/.test(value);

            const hasSpecialCharacter = /[!@#$%^&*(),.?:{}|<>]/.test(value);

            return hasUpperCase && hasLowerCase && hasSpecialCharacter;
        },{
            message:"password must contain at least one uppercase one lowercase letter with one special character"
        })
    })

    //safe parse doesnt throw an error
    // const parsedData = requireBody.parse(req.body);
    const parsedDatawithSuccess = requireBody.safeParse(req.body);

    if(!parsedDatawithSuccess.success)
    {
       res.json({
        message:"Incorrect Format",
        error: parsedDatawithSuccess.error
       }) 
       return
    }
    //input validation 
    const email= req.body.email;//string @,5
    const  password=req.body.password;
    const name=req.body.name;   



    //promisifing the fs function call
    const hashedPassword = await bcrypt.hash(password,5);

    console.log(hashedPassword);


    await UserModel.create({
        email:email,
        password:hashedPassword,
        name:name
    })
        

    res.json({
        message:"successfully signed in"
    })
    
})

app.post("/signin", async function(req, res) {
   
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
    });

    if(!response)
    {
        res.status(403).json({
            message:"User doesnt exist"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password,response.password);

    


    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

app.post("/todo",auth,async function(req,res)
{
   const userId=req.userId;
   const title=req.body.title;
   const done = req.body.done;

   await TodoModel.create({
    userId,
    title,
    done
   });

   res.json({
    message:"Todo created Successfully"
   })
})

app.post("/todos",auth,async function(req,res){

    const userId=req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    });
});

app.post("/todoList",auth,async function(req,res)
{
    const userId = req.userId;
    const title=req.body.title;
    const done=req.body.done;
    try{
    const todos =await TodoModel.updateMany(
        {userId},
        { $set:{title,done}}
    );

    res.json({
        message:"todos updated successfully",
        todos
    })
    }catch(e){
    res.status(403).json({
        message:"error in updating todo",
        error:error.message
    })
    }
})

function auth(req,res,next){
    const token = req.headers.token;
    
    try{
        const decodedData=jwt.verify(token,JWT_SECRET);
        req.userId=decodedData.id;
        next();
    }
    catch(e){
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
    
}
app.listen(2023);