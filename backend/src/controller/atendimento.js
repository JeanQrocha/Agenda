import ServiceAtendimento from '../service/atendimento.js'



class ControllerAtendimento {
    async FindAll(req, res) {
        try {
            const atendimentos = await ServiceAtendimento.FindAll()


            res.send({ atendimentos })

        } catch (error) {

            res.status(500).send({ error: error.message })
        }
    }

    async FindOne(req, res) {
        try {
            const id = req.params.id
            const clienteId = req.user.id

            const atendimento = await ServiceAtendimento.FindOne(id , clienteId)

            res.send({ atendimento })
        } catch (error) {

            res.status(500).send({ error: error.message })
        }
    }
    async Create(req, res) {
        try {

            const clienteId = req.user.id

            const { dia, hora, valor, concluido } = req.body

           const criado =  await ServiceAtendimento.Create(dia, hora, valor, concluido, clienteId)

            res.status(201).send({criado})
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async Update(req, res) {
        try {
            const id = req.params.id
            const clienteId = req.user.id
            const { dia, hora, valor, concluido } = req.body

           const editado =  await ServiceAtendimento.Update(id, dia, hora, valor, concluido, clienteId)

            res.status(200).send({editado})
        } catch (error) {

            res.status(500).send({ error: error.message })
        }
    }
    async Delete(req, res) {
        try {
            const id = req.params.id
            const clienteId = req.user.id
            await ServiceAtendimento.Delete(id, clienteId)

            res.status(204).send()
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    
}
export default new ControllerAtendimento()