import Cliente from '../model/clientes.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import Atendimento from '../model/atendimento.js'

const JWT_SECRET = "S3gr3do"
const SALT = 10 // 12

class ServiceCliente {
    async FindAll() {
        return Cliente.findAll({
            include: [{
                model: Atendimento,
                attributes: ['dia', 'hora', 'valor', 'concluido']
            }]

        })
    }

    async FindOne(id) {

        if (!id) {
            throw new Error('Favor informar um ID')

        }

        const cliente = await Cliente.findByPk(id, {
            include: [{
                model: Atendimento,
                attributes: ['dia', 'hora', 'valor', 'concluido']
            }]
        })

        if (!cliente) {
            throw new Error(`Usuario ${id} não encontrado`)
        }

        return cliente
    }

    async Create(nome, email, senha,) {
        //verificar se o nome é valido
        if (!nome || !email || !senha) {
            throw new Error('Favor preencher todos os campos')
        }

        const senhaCriptografada = await bcrypt.hash(String(senha), SALT)

        await Cliente.create({
            nome,
            email,
            senha: senhaCriptografada
        })
    }
    async Update(id, nome, email, senha) {
        //verificar se o indexe o nome sao validos e se for um numero. verificar se ele for menor q o .lenth
        if (!id || !nome || !email || !senha) {
            throw new Error('Favor informar um ID')

        }

        const clienteOld = await Cliente.findByPk(id)

        if (!clienteOld) {
            throw new Error(`Usuario ${id} não encontrado`)
        }

        clienteOld.nome = nome || clienteOld.nome
        clienteOld.email = email || clienteOld.email
        clienteOld.senha = senha
            ? await bcrypt.hash(String(senha), SALT)
            : clienteOld.senha

        return clienteOld.save()
    }

    async Delete(id) {
        //verificar se o index e o nome sao validos e se for um numero. verificar se ele for menor q o .lenth
        if (!id) {
            throw new Error('Favor informar um ID')

        }

        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            throw new Error(`Usuario ${id} não encontrado`)
        }

        return cliente.destroy()
    }

    async Login(email, senha) {
        if (!email || !senha) {
            throw new Error("Email ou senha inválidos");
        }
        const cliente = await Cliente.findOne({ where: { email } })

        // const IsValidPassword = await bcrypt.compare(String(senha), cliente.senha)
        if (
            !cliente
            || !(await bcrypt.compare(String(senha), cliente.senha)) //IsValidPassword
        ) {
            throw new Error("Email ou senha inválidos");
        }

        return jwt.sign(
            { id: cliente.id, nome: cliente.nome, permissao: cliente.permissao },
            JWT_SECRET,
            { expiresIn: 60 * 60 })

    }


}

export default new ServiceCliente()