const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const User = require("./models/User")
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "ahhssj49hddaj78hh5v";

app.use(cors({credentials:true,origin:"http://localhost:3000"}));

app.use(express.json());

const databaseConnected = mongoose.connect("mongodb+srv://moseschisango2:Yw6dup44J1ialxsv@cluster0.fae4e20.mongodb.net/mernblog?retryWrites=true&w=majority");
if (databaseConnected){
    console.log('Connected');
}

app.post("/register", async (req,res) => {
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    }catch(e){
        res.status(400).json(e);
    }    
})

app.post("/login", async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username})
    const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk){
            //logged in
            jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
                if (err) throw err;
                res.cookie("token", token).json("ok");
            })
            //
        }else{
            res.status(400).json("wrong credentials");
        };
})

app.listen(4000);

//mongodb+srv://moseschisango2:ssPuIterESGQCeNn@cluster0.egc4uux.mongodb.net/digitic?retryWrites=true&w=majority