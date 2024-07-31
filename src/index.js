const express=require("express")
const app=express()
const path=require("path")
//const hbs=require("hbs")
const collection=require("./mongodb")
const port = process.env.PORT || 7000
app.use(express.json())
app.use(express.urlencoded({ extended: false}));

const templatePath=path.join(__dirname,'../templates')
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);


app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.static(publicPath))

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{

    const data={
        name:req.body.name,
        email:req.body.email,
        password: req.body.password

    }

    await collection.insertMany([data])
    res.render("home")
})



app.post("/login",async (req,res)=>{

     try{
        const check=await collection.findOne({email:req.body.email})

        if(check.password===req.body.password){
            res.render("home")
        }

        else{
            res.send("wrong password")
        }
     }

     catch{
        res.send("wrong details")
     }


    res.render("home")
})

app.listen(7000,()=>{
    console.log("port connected");
})