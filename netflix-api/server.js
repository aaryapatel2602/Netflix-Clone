const express=require("express")
const mongoose=require("mongoose")
const userRoutes=require("./routes/UserRoute")
const cors = require("cors");

const app=express()


app.use(cors());
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/netflix",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connected")
}).catch((err) => {
    console.log(err.message);
});

app.use("/api/user",userRoutes)

app.listen(5000,console.log("server started"))