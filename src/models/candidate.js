import { Sequelize } from 'sequelize';

import sequelize from '../util/db.js';

import Party from './party.js';
import Position from './position.js';

const Candidate =  sequelize.define('candidate', {
    id: {
        type: Sequelize.INTEGER,
        alowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    positionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Position,
            key: 'id',
        }
    },
    partyId: {
        type: Sequelize.INTEGER,
        references: {
            model: Party,
            key: 'id',
        },
        allowNull: true
    }
    
})

export default Candidate