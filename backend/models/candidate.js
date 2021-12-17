const { Sequelize } = require('sequelize')
 
const Party = require('./party')
const sequelize = require('../util/db');
const Position = require('./position');

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
    party_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Party,
            key: 'id',
        }
    }
    
})

module.exports = Candidate;