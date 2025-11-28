import { Sequelize } from 'sequelize'

class database {
    constructor() {
        this.init()
    }


    init() {
        this.db = new Sequelize({
            database: "agenda_8ftd",
            host: 'dpg-d4l286be5dus73fhifkg-a',
            username: 'agenda_8ftd_user',
            password: 'YdYjoYPR4aFCfdz4YR10qYCTGlbXR2ci',
            dialect: 'postgres'
        })
    }
}

export default new database()