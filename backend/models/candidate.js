const { Sequelize } = require('sequelize')
 
const Party = require('./party')
const sequelize = require('../util/db')

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
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    party_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Party,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
    
})

module.exports = Candidate;