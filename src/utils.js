import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { fakerES as faker } from "@faker-js/faker";
import { config } from "dotenv";


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
export const validateToken = (token) =>{
  try {
    const decoded = jwt.verify(token, config.jwt.SECRET)
    return decoded
  } catch (error) {
    return null 
  }
}

export const randomCode = (longitud) =>{

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let codigoAleatorio = ''

    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
        codigoAleatorio += caracteres[indiceAleatorio]
    }

    return codigoAleatorio

}

export const generateMockProducts = () => {
  const products = [];
  for (let i = 0; i < 100; i++) {
      products.push({
          _id: faker.database.mongodbObjectId,
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          stock: faker.number.int(),
          category: faker.commerce.department(),
          thumbnail: faker.image.urlLoremFlickr({width: 240}),
          code: faker.string.numeric(),
          status: faker.datatype.boolean() 
      });
  }
  return products;
};



export default __direname;