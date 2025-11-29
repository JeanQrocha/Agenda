import express from 'express'
import router from './router/clientes.js'
import atendimento from './router/atendimento.js'
import database from './config/database.js';
import cors from 'cors';

const app = express(); //criar a aplicação express

app.use(express.json()) //habilitar o express para receber json no body
app.use(cors({
  origin: ['http://localhost:5173', 'https://agenda-4-neni.onrender.com'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
})); //liberar acesso de outras origens

app.use('/api/v1', router , atendimento) //definir a rota base da api

const port = 5432 //definir a porta do servidor

database.db     
    .sync({ force: false }) //sincronizar o banco de dados
    .then((_) => { //iniciar o servidor
        app.listen(port, () => {
            console.info('Servidor rodando na porta ' + port) //mensagem de sucesso
        })
    })


