import Atendimento from "../model/atendimento.js";
import Cliente from "../model/clientes.js";



class ServiceAtendimento {
    async FindAll(clienteId) {
        return Atendimento.findAll({
            clienteId,
            include: [{
                model: Cliente,
                attributes: ['id', 'nome', 'email']
            }]
        })
    }

    async FindOne(id, clienteId) {

        if (!id || !clienteId) {
            throw new Error('Favor informar um ID')
        }


        const atendimento = await Atendimento.findByPk(id, clienteId, {
            include: [{
                model: Cliente,
                attributes: ['id', 'nome', 'email']
            }]
        })


        if (!atendimento) {
            throw new Error(`Atendimento ${id} ou ${clienteId} não encontrado`)
        }
        return atendimento
    }

    async Create(dia, hora, valor, concluido, clienteId) {

        if (!dia || !hora || !valor || concluido === undefined) {

            throw new Error('Favor preencher todos os campos')
        }
        if (!clienteId) {
            throw new Error("ID do cliente não informado");
        }


        await Atendimento.create({
            dia,
            hora,
            valor,
            concluido,
            clienteId
        })
    }

    async Update(id, dia, hora, valor, concluido) {

        if (!id || !dia || !hora || !valor || concluido === undefined) {
            throw new Error('Favor informar um ID')

        }

        const atendimentoOld = await Atendimento.findByPk(id)

        if (!atendimentoOld) {
            throw new Error(`Usuario ${id} não encontrado`)
        }
        atendimentoOld.dia = dia || atendimentoOld.dia
        atendimentoOld.hora = hora || atendimentoOld.hora
        atendimentoOld.valor = valor || atendimentoOld.valor
        atendimentoOld.concluido = concluido || atendimentoOld.concluido


        return atendimentoOld.save()
    }

    async Delete(id) {
        if (!id) {
            throw new Error('Favor informar um ID')
        }

        const atendimentoOld = await Atendimento.findByPk(id)

        if (!atendimentoOld) {
            throw new Error(`Atendimento ${id} não encontrado`)
        }
        return atendimentoOld.destroy()
    }


}

export default new ServiceAtendimento()