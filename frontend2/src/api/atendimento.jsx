import api from "./api"

export const getAtendimentos = async () => { 
    const response = await api.get('/api/v1/atendimentos') 

    if(response.status !== 200){
        throw new Error('Erro ao buscar usuários')
    }

    return response.data.atendimentos 
} 


export const createAtendimento = async (atd) => {    
    const response =  await api.post('/api/v1/atendimento', atd) 

    if(response.status !== 201){
        throw new Error('Erro ao criar usuário')
    }
    return response 
}
export const updateAtendimento = async (id, atd) => { 
    const response = await api.put(`/api/v1/atendimento/${id}`, atd)     
    if(response.status !== 204){
        throw new Error('Erro ao deletar usuário')
    }                       
    return response 
}

export const deleteAtendimento = async (id) => { 
    const response = await api.delete(`/api/v1/atendimento/${id}`) 
    if(response.status !== 204){
        throw new Error('Erro ao deletar usuário')
    }                       
    return response 
}