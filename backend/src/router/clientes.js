import express from "express"
import ControllerCliente from "../controller/clientes.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.post("/Login", ControllerCliente.Login)

//  api/v1


router.get("/user/context",ControllerCliente.FindOne) 
router.post("/user/", ControllerCliente.Create) 
router.put("/user/",ControllerCliente.Update) 
router.delete("/user/",ControllerCliente.Delete) 

router.get("/users", authMiddleware(), ControllerCliente.FindAll) //pegar todos
router.get("/user/:id", authMiddleware(), ControllerCliente.FindOne) //pegar um
router.post("/user/admin", authMiddleware(), ControllerCliente.Create) //cadastrar um
router.put("/user/:id", authMiddleware(),  ControllerCliente.Update) //alterar um
router.delete("/user/:id", authMiddleware(), ControllerCliente.Delete) // deletar um

export default router