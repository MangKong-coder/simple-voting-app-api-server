import Candidate from '../models/candidate.js'
import { validationResult } from 'express-validator';



const errorFunc = (err) => {
    if(!err.statusCode) {
        err.statusCode = 500;
    }
}

// fetching all candidates
export const getCandidates = async (req, res, next) => {
    try {
        const candidates =  await Candidate.findAll();
        res.status(200).json({
            message: "Candidates successfully returned",
            candidates: candidates
        })
    } catch (err) {
        errorFunc(err)
        next(err)
    }
}

// creating a candidate
export const postCandidate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered input is invalid.');
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name
    const positionId = req.body.positionId
    const party_id = req.body.party_id
    try {
        const candidate = new Candidate({
            name: name,
            positionId: positionId,
            party_id: party_id
        })

        const result = await candidate.save()
        res.status(201).json({
            message: "Candidate successfully created",
            candidate: result
        })
    } catch (err) {
        errorFunc(err)
        next(err)
    }
}

// fetching a specific candidate
export const getCandidate = async (req, res, next) => {
    const candidateId = req.params.candidateId;
    try {
        const candidate = await Candidate.findByPk(candidateId)
        if (!candidate) {
            const error = new Error('Candidate not found')
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            candidate: candidate
        })
    } catch (err) {
        errorFunc(err)
        next(err)
    }
}

// updating existing candidate
export const updateCandidate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered input is invalid.');
        error.statusCode = 422;
        throw error;
    }
    const candidateId = req.params.candidateId
    const name = req.body.name
    const position = req.body.position
    const party_id = req.body.party_id
    try {
        const candidate = await Candidate.findByPk(candidateId);
        if (!candidate) {
            const error = new Error ('Candidate not found');
            error.statusCode = 404;
            throw error
        }
        candidate.name = name;
        candidate.position = position;
        candidate.party_id = party_id;
        const result = await candidate.save()
        res.status(200).json({
            message: "Candidate successfully updated",
            candidate: result
        })
    } catch (err) {
        errorFunc(err)
        next(err)
    }
}

// delete a candidate
export const deleteCandidate = async (req, res, next) => {
    const candidateId = req.params.candidateId;
    try {
        const candidate = await Candidate.findByPk(candidateId);
        if (!candidate) {
            const error = new Error('Candidate cannot be found');
            error.statusCode = 404;
            throw error;
        }
        const result = await candidate.destroy()
        res.status(202).json({
            message: "Candidate deleted successfully"
        })
    } catch (err) {
        errorFunc(err);
        next(err)
    }
}