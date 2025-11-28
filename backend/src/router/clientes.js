import express from "express"
import ControllerCliente from "../controller/clientes.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.post("/Login", ControllerCliente.Login)

//  api/v1


router.get("/cliente/context",ControllerCliente.FindOne) 
router.post("/cliente/", ControllerCliente.Create) 
router.put("/cliente/",ControllerCliente.Update) 
router.delete("/cliente/",ControllerCliente.Delete) 

router.get("/clientes", authMiddleware(), ControllerCliente.FindAll) //pegar todos
router.get("/cliente/:id", authMiddleware(), ControllerCliente.FindOne) //pegar um
router.post("/cliente/admin", authMiddleware(), ControllerCliente.Create) //cadastrar um
router.put("/cliente/:id", authMiddleware(),  ControllerCliente.Update) //alterar um
router.delete("/cliente/:id", authMiddleware(), ControllerCliente.Delete) // deletar um

export default router