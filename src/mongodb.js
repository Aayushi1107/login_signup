const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/vsadatabase")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LoginInSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
},
    password: {
        type: String,
        required: true,
        unique: true
}
})

const collection=new mongoose.model("Collection1",LoginInSchema)

module.exports=collection