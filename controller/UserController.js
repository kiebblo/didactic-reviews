const User = require("../model/User");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");

exports.register = async (request, response) => {
    try {
        const user = await User.create(request.body);
        response.status(201).json(user);
    } catch(error) {
        response.status(500).json(error.message);
    }
};


exports.login = async (request, response) =>{
    try{
        let { email, password } = request.body;
        let user = await User.findOne().where("email").equals(email);
        if(!user) {

            return response.status(404).json("email does not exist");
        }
        const isMatch = bcrypt.compareSync(password, user.password)
        if(!isMatch) { 
            return response.status(404).json("password incorrect")
        }
        const token = jwt.sign({ id : user._id }, process.env.PRIVATE_KEY);
        response.json(token);
    } catch(error) {
        response.status(500).json(error.message);
    }
};

exports.deleteUser = async (request, response) => {
    try {
        const user = await User.findById(request.params.id);  
        if (user) {
            await user.remove();
            response.json(user);
            } else {
            response.status(404).json("This user does not exist!");
            }
    } catch (error) {
        response.status(500).json(error.message);
    }
};