import logger from "../../../logger.js";
import userMongoDao from "../../DAOs/Mongo/user.mongo.dao.js";
import { createHash } from "../../utils.js";
import UserDTO from "../DTOs/user.dto.js";
import userModel from "../models/userModel.js";


const userDTO = new UserDTO()

export default class UserService {
  constructor() {
    console.log("Constructor UserManager");
  }

  getAll = async () => {
    const result = await userModel.find();
    const usersDTOs = []
    result.map((user)=>{
      const updatedUser = userDTO.get(user)
      usersDTOs.push(updatedUser)
    })
      return usersDTOs
  };

  getById = async (id) => {
    const result = await userModel.findById(id);
    return result;
  };

  createUser = async (userData) => {
      userData.password = createHash(userData.password);
      const result = await userModel.create(userData);
      return result
  };

  updateUser = async (id, userData) => {
    // Hashear la contraseña antes de actualizar el usuario
      if (userData.password) {
        userData.password = createHash(userData.password);
      }
      const result = await userModel.updateOne({ _id: id }, { $set: userData });
      return result
  }

  deleteUser = async (id) => {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  };
  deleteByEmail= async (email) =>{
    const userToDelete = await userModel.deleteOne({email: email})
    return userToDelete;
  }

  // Buscar con carritos incluidos
  getAllUsersWithCart = async () => {
      const result = await userModel.find().populate("cart.product")
      return result;
  };

  // Paginación
  getPaginatedUsers = async (page = 1, limit = 10) => {
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    }
    const users = await userMongoDao.getPaginatedUsers({}, options);

    return users
  };
  getUserByCart = async (cid) => {
    const user = await userModel.findOne({cart:cid})

    return user
  };
  getByEmail = async (email) =>{
    const user = await userModel.findOne({email: email})
    return user
  }
  updateToPremium = async (userId) => {
    try {
        const user = await userMongoDao.getById(userId);
        if (!user) {
            logger.error("No se encontró el usuario");
            return null; // o lanzar un error, según tu manejo de errores
        }

        const requiredDocuments = ['Identificacion', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
        
        const documentsUploaded = user.documents.map(doc => {
            const lastDotIndex = doc.name.lastIndexOf('.')
            const nameWithoutExtension = doc.name.slice(0, lastDotIndex)
            return nameWithoutExtension
        });

        const hasAllDocuments = requiredDocuments.every(doc => documentsUploaded.includes(doc));
       
        if (hasAllDocuments) {
            user.role = 'premium';
        } else {
            user.role = 'user';
        }
        
        await user.save();
        console.log(user);
        return user;
    } catch (error) {
        logger.error(`${error} - No se pudo actualizar el usuario a premium`);
        throw error;
    }
};

  uploadDocuments = async (userId, files)=>{
    try {
      const user = await userMongoDao.getById(userId)
      if (!user) {
          logger.error("No se encontro el usuario")
      }
      const filesNames = files.map((file)=>{
        const fileFormat = {
          name: file.filename,
          reference: file.path
        }
        user.documents.push(fileFormat)

      })
      console.log(user.documents);
      console.log(user);

      await user.save() 
      return user
  } catch (error) {
      logger.error(error + "No se pudieron subir los documentos")
      
  }
  }
  
}