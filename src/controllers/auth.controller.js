import User from "../modules/user.module.js"
import { ErrorHandle } from "../utils/ErrorHandle.js";
import bcryptjs from "bcryptjs";
import { ResponseHandle } from "../utils/ResponseHandle.js";


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

