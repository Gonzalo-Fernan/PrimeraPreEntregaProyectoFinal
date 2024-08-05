import { createHash } from "../../utils.js";
import userModel from "../../dao/models/userModel.js"
import logger from "../../../logger.js";




class UserMongoDao {
  constructor() {
    console.log("Constructor UserManager");
  }

  getAll = async () => {
    const result = await userModel.find();
    return result;
  };

  getById = async (id) => {
    const result = await userModel.findById(id);
    return result;
  };

  createUser = async (userData) => {
      userData.password = createHash(userData.password);
      const result = await userModel.create(userData);
      return result
  }

  updateUser = async (id, userData) => {
    // Hashear la contraseña antes de actualizar el usuario
      if (userData.password) {
        userData.password = createHash(userData.password);
      }
      const result = await userModel.updateOne({ _id: id }, { $set: userData });
      return result;
  }

  deleteUser = async (id) => {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  };

  // Buscar con carritos incluidos
  getAllUsersWithCart = async () => {
    try {
      const result = await userModel.find().populate("cart.product")
      return result;
    } catch (error) {

      console.log(error, "error al obtener los usuarios");
      
    }
  };

  // Paginación
  getPaginatedUsers = async (options) => {
    try {
      const users = await userModel.paginate({}, options);

      return users;
    } catch (error) {
      logger.error(error, "Error al realizar la paginación");
    }
  };
  getUserByCart = async (cid) => {
    try {
      const user = await userModel.findOne({cart:cid})

      return user

    } catch (error) {
      console.log(error, "Error al buscar el usuario");
    }
  };
}

export default new UserMongoDao()