import { Sequelize } from 'sequelize';

import sequelize from '../util/db.js';

const Position =  sequelize.define('position', {
    id: {
        type: Sequelize.INTEGER,
        alowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    
})

export default Position
