import database from '../config/database.js';
import Cliente from './clientes.js';



class Atendimento {
    constructor() {
        this.model = database.db.define('Atendimentos', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            dia: {
                type: database.db.Sequelize.STRING
            },
            hora: {
                type: database.db.Sequelize.STRING

            },
            valor: {
                type: database.db.Sequelize.FLOAT
            },
            concluido: {
                type: database.db.Sequelize.BOOLEAN
            },

            clienteId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: Cliente,
                    key: "id",
                },
            }
        })

        this.model.belongsTo(Cliente, { foreignKey: 'clienteId' })
        Cliente.hasMany(this.model, { foreignKey: 'clienteId' })


    }
}

export default new Atendimento().model