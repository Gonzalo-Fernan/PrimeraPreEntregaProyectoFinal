import { createHash } from "../../utils.js";
import userModel from "../models/userModel.js";



export default class UserService {
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
    const users = await userModel.paginate({}, options);

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
}