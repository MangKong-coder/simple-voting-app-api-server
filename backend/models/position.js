const { Sequelize } = require('sequelize')
 
const sequelize = require('../util/db')

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

module.exports = Position;