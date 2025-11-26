import database from '../config/database.js';



class Atendimento {
    constructor() {
        this.model = database.db.define('Atendimentos', {  
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            dia: {
                type: database.db.Sequelize.STRING
            },  
            horario: {
                type: database.db.Sequelize.STRING
                
            },
            valor: {
                type: database.db.Sequelize.FLOAT
            },  
            concluido: {    
                type: database.db.Sequelize.BOOLEAN
            }
        })
    }
}

export default new Atendimento().model