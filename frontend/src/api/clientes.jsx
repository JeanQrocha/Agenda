import api from "./api"

export const getUsers = async () => { 
    const response = await api.get('/api/v1/clientes') 

    if(response.status !== 200){
        throw new Error('Erro ao buscar usuários')
    }

    return response.data.users 
} 


export const createUser = async (cliente) => {    
    const response =  await api.post('/api/v1/cliente', cliente) 

    if(response.status !== 200){
        throw new Error('Erro ao criar usuário')
    }
    return response 
}
export const updateUser = async (id, cliente) => { 
    const response = await api.put(`/api/v1/cliente/${id}`, cliente)     
    if(response.status !== 204){
        throw new Error('Erro ao deletar usuário')
    }                       
    return response 
}

export const deleteUser = async (id) => { 
    const response = await api.delete(`/api/v1/cliente/${id}`) 
    if(response.status !== 204){
        throw new Error('Erro ao deletar usuário')
    }                       
    return response 
}

export const LoginUser = async (email, senha) => { 
    const response = await api.post(`/api/v1/login`, {email, senha}) 
    if(response.status !== 200){
        throw new Error('Email ou Senha invalidos')
    }
    return response
}  