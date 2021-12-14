const { Sequelize } = require('sequelize')

const sequelize = require('../util/db')

const Party = sequelize.define('party', {
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

module.exports = Party;