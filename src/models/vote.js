import { Sequelize } from 'sequelize'

import sequelize from '../util/db.js'
import User from './user.js'
import Position from './position.js'
import Candidate from './candidate.js'


const Vote = sequelize.define('vote', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false
    },
    positionId: {
        type: Sequelize.INTEGER,
        references: {
            model: Position,
            key: "id"
        },
        allowNull: false
    },
    candidateId: {
        type: Sequelize.INTEGER,
        references: {
            model: Candidate,
            key: "id"
        }
    }

})

export default Vote