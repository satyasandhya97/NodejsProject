const User = require("../models/user")

const registerUser = async (req, res) => {
    try {
      const user = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
      }
      console.log(user)

      const existingUser  = await User.findOne({ email: user.email });

      if(existingUser){
        return res.status(409).json({
            message: "User already exists"
        });
      }

      await User.create(user)
      .then((user) => {
        res.status(201).json({
            message : "Registration Successfully",
            user,
        });
      })
      .catch((error) => {
        res.status(400).json({
            message : "Something went to wrong",
            error,
        })
      })
    } catch (error) {
        res.status(500).json({
          message: "Something went to wrong",
          error : error.message
        });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email , password } = req.body;

        const user = await User.findOne( { email });
         
        if(!user){
            return res.status(401).json({
                message : "User Not Found",
            });
        }

        if(user.password === password && user.email === email){
          return res.status(200).json({
            message : "Login Successful",
            user : {
                email : user.email,
            },
          });
        } else {
            return res.status(401).json({
                message : "Email or password incorrect",
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Something went to wrong",
            error : error.message,
        });
    }
};

const voiceChart = async (req, res) => {
  try {
    
    return res.status(200).json({
      message : "Login Successful",
    });
    
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
    registerUser,
    loginUser,
    voiceChart
}