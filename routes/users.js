const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Get all users
router.get("/", async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message}) //error occured on server
    }
});

//Goes to 'create user form' http://localhost:3000/users/new
router.get("/new", (req, res) => {
    res.render("users/new");
    
})

//Add new user
router.post("/", async (req,res) => {
    
    const user = new User({
        name: req.body.name,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser); //successfully created new user
    } catch (err) {
        res.status(400).json({message: err.message});//user input error, bad request
    }
});

//Get one user
router.get("/:id", getUser, (req, res) => {
    res.send(res.user.name);
});


//Update one user
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message:"Update failed"});//user input error, bad request
    }
}); 

//Delete one user
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({message: "Deleted user"});
    } catch (err) {
        res.status(500).json({message:err.message});//Internal server error
    }
});

//middleware, user defined here is used in specific delete, patch, get 
async function getUser(req, res, next) {
    let user;
    try {
        
        user = await User.findById(req.params.id);
        if(user == null) {
            return res.status(404).json({message : "Cannot find user"}); //not found
        }
    } catch (err) {
        return res.status(500).json({message: "Cannot find user"}) //error occured on server
    }

    res.user = user;
    next();
}


module.exports = router;




