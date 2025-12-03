import express from 'express'
import ControllerAtendimento from '../controller/atendimento.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get('/atendimentos',authMiddleware(), ControllerAtendimento.FindAll)
router.get('/atendimento/:id', authMiddleware(), ControllerAtendimento.FindOne)
router.post('/atendimento', authMiddleware(), ControllerAtendimento.Create) 
router.put('/atendimento/:id',authMiddleware(), ControllerAtendimento.Update) 
router.delete('/atendimento/:id',authMiddleware(), ControllerAtendimento.Delete)


export default router