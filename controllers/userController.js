const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");



// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    
    const {username, email, password} = req.body;

    // Validate body parameters 
    if(!(username && email && password))
    {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if the user already exists
    const userExists = await User.findOne({email});

    if(userExists)
    {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the User
    const newUser = await User.create({
        username,
        email,
        profileImage : "None",
        password : hashedPassword
    })

    if(newUser)
    {
        res.status(201).json({
            _id : newUser._id,
            username : newUser.username,
            email : newUser.email,
            token : generateToken(newUser._id),
            profileImage : newUser.profileImage
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    
    const {email, password} = req.body;

    // get user
    const user = await User.findOne({email});

    if(!user)
    {
        res.status(400);
        throw new Error("User does not exist");
    }

    // Password Check
    const passwordCheck = await bcrypt.compare(password, user.password);

    if(user && passwordCheck)
    {
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            profileImage : user?.profileImage || 'None',
            token : generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid Credentials");
    }
})


// @desc    Get user data
// @route   GET /api/users/current
// @access  Private
const getCurrUser = asyncHandler(async (req, res) => {

    const {_id, name, email} = await User.findById(req.user.id);
    res.status(200).json({
        id : _id,
        name,
        email
    })
})


// generateToken : Generates a JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getCurrUser
}