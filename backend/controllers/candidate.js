const Candidate = require('../models/candidate')
const { validationResult } = require('express-validator');

const validationCheck = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered input is invalid.');
        error.statusCode = 422;
        throw error;
    }
}

const errorFunc = (err) => {
    if(!err.statusCode) {
        err.statusCode = 500;
    }
}

exports.getCandidates = async (req, res, next) => {
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

exports.postCandidate = async (req, res, next) => {
    validationCheck(req)
    const name = req.body.name
    const position = req.body.position
    const party_id = req.body.party_id
    try {
        const candidate = new Candidate({
            name: name,
            position: position,
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

exports.getCandidate = async (req, res, next) => {
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

exports.updateCandidate = async (req, res, next) => {
    validationCheck(req)
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