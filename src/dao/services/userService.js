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
    try {
      const result = await userMongoDao.getAll()
      const usersDTOs = []
      result.map((user)=>{
        const updatedUser = userDTO.get(user)
        usersDTOs.push(updatedUser)
      })
        return usersDTOs
      
    } catch (error) {
      logger.error("Error al obtener los usuarios")
    }
  }

  getById = async (id) => {
    try {
      const result = await userMongoDao.getById(id)
      return result
    } catch (error) {
      logger.error("Error al obtener el usuario:") 
    }
  }

  createUser = async (userData) => {
    try {
      const result = await userMongoDao.createUser(userData)
      return result
      
    } catch (error) {
      logger.error("Error al crear el usuario")
    }
  }

  updateUser = async (id, userData) => {
    try {
      const result = await userMongoDao.updateUser(id,userData)
      return result
      
    } catch (error) {
      logger.error("Error al actualizar el usuario")
    }
  }

  deleteUser = async (id) => {
    try {
      const result = await userMongoDao.deleteUser(id)
      return result
      
    } catch (error) {
      logger.error("Error al eliminar el usuario")
    }
  }
  deleteByEmail= async (email) =>{
    try {
      const userToDelete = await userModel.deleteOne({email: email})
      return userToDelete;
      
    } catch (error) {
      logger.error("Error al eliminar el usuario")
    }
  }

  // Buscar con carritos incluidos
  getAllUsersWithCart = async () => {
    try {
      const result = await userModel.find().populate("cart.product")
      return result;
      
    } catch (error) {
      logger.error("Error al obtener los usuarios")
    }
  }

  // Paginación
  getPaginatedUsers = async (page = 1, limit = 10) => {
    try {
      const options = {
          page: parseInt(page),
          limit: parseInt(limit),
      }
      const users = await userMongoDao.getPaginatedUsers({}, options);
      return users
    } catch (error) {
      logger.error("Error al obtener los usuarios")
    }
  }
  getUserByCart = async (cid) => {
    try {
      const user = await userModel.findOne({cart:cid})
      return user
    } catch (error) {
      logger.error("Error al obtener el usuario")
    }

  }
  getByEmail = async (email) =>{
    try {
      const user = await userModel.findOne({email: email})
      return user
      
    } catch (error) {
      logger.error("Error al obtener el usuario")
    }
  }
  updateToPremium = async (userId) => {
    try {
        const user = await userMongoDao.getById(userId);
        if (!user) {
            logger.error("No se encontró el usuario");
            return null
        }

        const requiredDocuments = ['Identificacion', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
        
        const documentsUploaded = user.documents.map(doc => {
            const lastDotIndex = doc.name.lastIndexOf('.')
            const nameWithoutExtension = doc.name.slice(0, lastDotIndex)
            return nameWithoutExtension
        });

        const hasAllDocuments = requiredDocuments.every(doc => documentsUploaded.includes(doc))
       
        if (hasAllDocuments) {
            user.role = 'premium'
        } else {
            user.role = 'user'
        }
        
        await user.save()
        console.log(user)
        return user;
    } catch (error) {
        logger.error(`${error} - No se pudo actualizar el usuario a premium`)
    }
  }

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