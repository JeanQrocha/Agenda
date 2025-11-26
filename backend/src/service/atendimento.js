import Atendimento from "../model/atendimento.js";



class ServiceAtendimento {
    async FindAll() {
        return Atendimento.findAll()
    }

    async FindOne(id) {

        if (!id) {
            throw new Error('Favor informar um ID')
        }


        const atendimento = await Atendimento.findByPk(id)

        if (!atendimento) {
            throw new Error(`Atendimento ${id} não encontrado`)
        }
        return atendimento
    }

    async Create(dia, horario, valor, concluido) {

        if (!dia || !horario || !valor || concluido === undefined) {

            throw new Error('Favor preencher todos os campos')
        }

        await Atendimento.create({
            dia,
            horario,
            valor,
            concluido
        })
    }

    async Update(id, dia, horario, valor, concluido) {

        if (!id || !dia || !horario || !valor || concluido === undefined) {
            throw new Error('Favor informar um ID')

        }

        const atendimentoOld = await Atendimento.findByPk(id)

        if (!atendimentoOld) {
            throw new Error(`Usuario ${id} não encontrado`)
        }
        atendimentoOld.dia = dia || atendimentoOld.dia
        atendimentoOld.horario = horario || atendimentoOld.horario
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