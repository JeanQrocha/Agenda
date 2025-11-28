import { Sequelize } from 'sequelize';

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.db = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            logging: false
        });
    }
}

export default new Database();