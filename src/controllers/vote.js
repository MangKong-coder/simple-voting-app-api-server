import Candidate from '../models/candidate.js'
import Position from '../models/position.js'

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