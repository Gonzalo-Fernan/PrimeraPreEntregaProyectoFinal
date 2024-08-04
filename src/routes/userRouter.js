import { Router } from "express"
import UserController from "../dao/controllers/user.controller.js"
import upload from "../config/multer.config.js"
import { authAdmin } from "../middlewares/auth.js"
import UserService from "../dao/services/userService.js"


const userRouter = Router()
const userService = new UserService()

userRouter.get("/", authAdmin , UserController.getAll)
userRouter.get("/:uid", UserController.getById)
userRouter.post("/premium/:uid", UserController.updateToPremium)
userRouter.post("/changeRole/:uemail", UserController.changeRole)
userRouter.post("/:uid/documents", upload.array("documents"), UserController.uploadDocuments)
userRouter.delete("/delete/:uemail", UserController.delete)
userRouter.delete("/delete", UserController.deleteUserWithNoConnection)


export default userRouter


