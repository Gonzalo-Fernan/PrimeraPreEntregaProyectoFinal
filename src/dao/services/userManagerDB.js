import { createHash } from "../../utils.js";
import userModel from "../../models/user.model.js";



export default class UserManagerDB {
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
    try {

      userData.password = createHash(userData.password);
      const result = await userModel.create(userData);
      return result

    } catch (error) {

      console.log(error, "No se pudo crear el usuario correctamente")
      
    }


  };

  updateUser = async (id, userData) => {
    // Hashear la contraseña antes de actualizar el usuario
    try {
      if (userData.password) {
        userData.password = createHash(userData.password);
      }
      const result = await userModel.updateOne({ _id: id }, { $set: userData });
      return result;

    } catch (error) {
      console.log(error , "No se pudo actualizaer el usuario seleccionado");
    }
    
  };

  deleteUser = async (id) => {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  };

  // Buscar con carritos incluidos
  getAllUsersWithCart = async () => {
    //logica a implementar
    try {
      const result = await userModel.find().populate("cart.product")
      return result;
    } catch (error) {

      console.log(error, "error al obtener los usuarios");
      
    }
  };

  // Paginación
  getPaginatedUsers = async (page = 1, limit = 10) => {
   //logica a implementar
    try {
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
      };
      const users = await userModel.paginate({}, options);

      return users;
    } catch (error) {
      console.log(error, "Error al realizar la paginación ");
    }
  };
}