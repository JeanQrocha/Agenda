import express from 'express'
import router from './router/clientes.js'
import database from './config/database.js';
import cors from 'cors';

const app = express(); //criar a aplicação express

app.use(express.json()) //habilitar o express para receber json no body
app.use(cors()); //liberar acesso de outras origens

app.use('/api/v1', router) //definir a rota base da api

const port = 3000 //definir a porta do servidor

database.db     
    .sync({ force: false }) //sincronizar o banco de dados
    .then((_) => { //iniciar o servidor
        app.listen(port, () => {
            console.info('Servidor rodando na porta ' + port) //mensagem de sucesso
        })
    })


