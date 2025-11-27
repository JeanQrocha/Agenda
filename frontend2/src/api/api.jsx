import axios from "axios";

const api = axios.create({ //cria uma instância do axios
    baseURL: "http://localhost:3000", //define a URL base da API
})

api.interceptors.request.use( //adiciona um interceptor para requisições
    (config) => { //função que será executada antes da requisição ser enviada
        const token = localStorage.getItem("token"); //pega o token do localstorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; //adiciona o token no cabeçalho da requisição
        }
        return config; //retorna a configuração da requisição
     },
    (e) => { 
        return Promise.reject(e); //em caso de erro, rejeita a promessa com o erro
    }
)

export default api;