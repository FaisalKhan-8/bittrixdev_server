import User from "../modules/user.module.js"
import { ErrorHandle } from "../utils/ErrorHandle.js";
import bcryptjs from "bcryptjs";
import { ResponseHandle } from "../utils/ResponseHandle.js";
import  jwt  from "jsonwebtoken";


// Sign Up Handler Here...

export const signUpHandler = async (req, res, next) => {
    try {
        const {username, email, password} = new User(req.body);
        if( !username ||
            !email ||
            !password ||
            username === '' ||
            email === '' ||
            password === '' ){
            next(ErrorHandle(400, "All fields are required"))
        }

        // Hashing the password here...
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User(
            {username, email, password: hashedPassword}
        )

        try {
             await newUser.save();
             res.status(201).json(new ResponseHandle(201, newUser, "user created successfully"));
            
        } catch (error) {
            next(error);
            
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// Login handler...

export const signInHandler = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email ||!password || email === "" || password === ""){
        next(ErrorHandle(400, "All fields are required"))
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            next(ErrorHandle(404, "User not found"))
        }

        const ValidPassword = bcryptjs.compareSync(password, user.password);
        if(!ValidPassword){
            next(ErrorHandle(401, "Invalid credentials"))
        }

        // Generate JWT token here...
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin },process.env.JWT_SECRET);
        
        // sending the rest of the user but not the password...
        const { password: pass, ...rest } = user._doc;
  
        res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }

}

