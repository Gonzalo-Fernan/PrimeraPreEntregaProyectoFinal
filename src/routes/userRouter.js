import { Router } from "express"
import UserController from "../dao/controllers/user.controller.js"
import upload from "../config/multer.config.js"
import userController from "../dao/controllers/user.controller.js"

const userRouter = Router()

userRouter.get("/:uid", UserController.getById)
userRouter.post('/premium/:uid', UserController.updateToPremium)

userRouter.post('/:uid/documents', upload.array("documents"), UserController.uploadDocuments)


export default userRouter