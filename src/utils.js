import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const __filename = fileURLToPath(import.meta.url);
const __direname = dirname(dirname(__filename));

export const createHash=(password)=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
};

//generar Token jwt
export const generateToken=(email)=>{
  return jwt.sign({email},JWT_SECRET,{ expiresIn:"1h" })
}


export default __direname;