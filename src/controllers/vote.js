import Candidate from '../models/candidate.js'
import Position from '../models/position.js'
import Vote from '../models/vote.js'
import { v4 as uuidv4 } from 'uuid'

const errorFunc = (err) => {
    if(!err.statusCode) {
        err.statusCode = 500;
    }
}

// fetch candidate running for a specific position
export const getCandidatePosition = async (req, res, next) => {
    const positionName = req.params.position
    try {
        const position = await Position.findOne({ 
            where: {
                position: positionName
            }
        })
        if (!position) {
            res.status(404).json({
                message: "This position doesn't exist"
            })
        }
        const positionId = position.id

        const candidate = await Candidate.findAll({where: {positionId: positionId}})
        res.status(200).json({
            message: `These are the candidates running for ${positionName}`,
            candidate: candidate
        })
    } catch (err) {
        errorFunc(err),
        next(err)
    }
}

// create vote
export const postVote = async (req, res, next) => {
    const positionTitle = req.params.position
    const candidateId = req.body.candidateId
    try {
        const position = await Position.findOne({where: {position: positionTitle}})
        if (!position) {
            res.status(404).json({
                message: "Position cannot be found"
            })
        }
        const positionId = position.id

        const vote = new Vote({
            id: uuidv4(),
            userId: req.userId,
            positionId: positionId,
            candidateId: candidateId
        })
        
        const result = await vote.save()

        res.status(201).json({
            message: `User has voted for ${positionTitle}`,
            result: result
        })

    } catch (err) {
        errorFunc(err);
        next(err)
    }
    
}

