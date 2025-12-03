import ServiceCliente from "../service/clientes.js"




class ControllerCliente {
    async FindAll(_, res) { //se nao for usar o parametro colocar um '_'
        try {
            const users = await ServiceCliente.FindAll()
            res.send({ users })

        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async FindOne(req, res) {
        try {

            const id = req.params.id || req.headers?.user?.id

            const user = await ServiceCliente.FindOne(id)

            res.send({ user })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async Create(req, res) {
        try {
            const loggedUser = req.headers?.user
            let permissao = 1
            if (loggedUser) {
                permissao = req.body.permissao
            }
            const { nome, email, senha, ativo } = req.body

            const create = await ServiceCliente.Create(nome, email, senha, ativo)

            res.status(200).send({ create })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    Update(req, res) {
        try {
            const id = req.params.id || req.headers?.user?.id
            const { nome, email, senha, ativo } = req.body

            const update = ServiceCliente.Update(id, nome, email, senha, ativo)

            res.status(200).send({ update })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async Delete(req, res) {
        try {
            const id = req.params.id || req.headers?.user?.id

            await ServiceCliente.Delete(id)

            res.status(204).send({ message: "Usuário deletado com sucesso" })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async Login(req, res) {
        try {
            const { email, senha } = req.body

            const token = await ServiceCliente.Login(email, senha)

            res.status(200).send({ token })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }


    }
}

export default new ControllerCliente()