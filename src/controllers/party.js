import Party from '../models/party.js'
import { validationResult } from 'express-validator'

const errorFunc = (err) => {
    if(!err.statusCode) {
        err.statusCode = 500;
    }
}

// fetching parties
export const getParties = async (req, res, next) => {
    try {
        const parties = await Party.findAll()
        res.status(200).json({
            message: "Parties returned successfully",
            parties: parties
        })
    } catch (err) {
        errorFunc(err);
        next(err);
    }
}

// creating a party
export const postParty = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered input is invalid.');
        error.statusCode = 422;
        throw error;
    }
    const partyName = req.body.partyName
    try {
        const party = new Party({
            partyName: partyName
        })
        const result = await party.save()
        res.status(201).json({
            message: "Party created successfully",
            party: result
        })
    } catch (err) {
        errorFunc(err);
        next(err);
    }
}

// updating a party using party ID
export const updateParty = async (req, res, next) => {
    const partyId = req.params.partyId
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered input is invalid.');
        error.statusCode = 422;
        throw error;
    }
    try {
        const partyName = req.body.partyName;
        const party = await Party.findByPk(partyId);
        if (!party) {
            const error = new Error('Party does not exist');
            error.statusCode = 404;
            throw error
        }
        party.partyName = partyName
        const result = await party.save()
        res.status(201).json({
            mesage: 'Party name successfully updated',
            partyName: result
        })
    } catch (err) {
        errorFunc(err);
        next(err);
    }
}

// delete a party
export const deleteParty = async (req, res, next) => {
    const partyId = req.params.partyId;
    try {
        const party = await Party.findByPk(partyId);
        if (!party) {
            const error = new Error('Party can not be found');
            error.statusCode = 404;
            throw error
        }
        const result = await party.destroy()
        res.status(200).json({
            message: "Party has been deleted"
        })
    } catch (err) {
        errorFunc(err);
        next(err)
    }
}