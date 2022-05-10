const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}

}, {timestamps:true});

userSchema.pre("save",function() { 

    try{
        if(this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10); 
        }
    } catch (error) {
    console.log(error);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;