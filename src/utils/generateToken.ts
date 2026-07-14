import jwt, {SignOptions} from "jsonwebtoken";


export const generateToken = (userId:string)=>{

    const secret = process.env.JWT_SECRET as string;

    const options: SignOptions = {
        expiresIn: "7d"
    };


    return jwt.sign(
        {
            id:userId
        },
        secret,
        options
    );

};