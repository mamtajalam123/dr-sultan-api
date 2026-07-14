import {Request, Response} from "express";
import bcrypt from "bcrypt";
import db from "../config/db";
import {generateToken} from "../utils/generateToken";


export const login = async(
req:Request,
res:Response
)=>{


try{


const {
    email,
    password
}=req.body;



// Find user from mysql

const [rows]:any = await db.query(
    "SELECT * FROM admins WHERE email=?",
    [email]
);


console.log(rows);
if(rows.length === 0){

return res.status(401).json({
    success:false,
    message:"Invalid email or password"
});

}



const user = rows[0];



// Compare password

const isMatch = await bcrypt.compare(
    password,
    user.password
);



if(!isMatch){

return res.status(401).json({
    success:false,
    message:"Invalid email or password"
});

}



// Generate JWT

const token = generateToken(
    user.id.toString()
);



return res.status(200).json({

success:true,

message:"Login successful",

token,

user:{
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
}

});


}
catch(error){

console.log(error);

return res.status(500).json({
    success:false,
    message:"Server error"
});

}


};