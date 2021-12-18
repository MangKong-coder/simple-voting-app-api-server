import { Sequelize } from 'sequelize';

import sequelize from '../util/db.js';

export const Party = sequelize.define('party', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    partyName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Party