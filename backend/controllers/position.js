import Position from '../models/position.js';

import { validationResult } from 'express-validator';

const errorFunc = (err) => {
    if(!err.statusCode) {
        err.statusCode = 500;
    }
}

export const getPositions = async (req, res, next) => {
    try {
        const positions = await Position.findAll()
        if (!positions) {
            const error = new Error('No positions found');
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            positions: positions
        })

    } catch (err) {
        errorFunc(err)
        next(err)
    }
}

export const postPosition = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty) {
        const error = new Error('Validation failed, input is invalid')
        error.statusCode = 422;
        throw error
    }
    const position = new Position({
        position: req.body.position
    })
    const result = await position.save()
    res.status(200).json({
        message: "Position created successfully",
        position: result
    })
}

export const updatedPosition = async (req, res, next) => {
    const posId = req.params.positionId
    const errors = validationResult(req)
    if(!errors.isEmpty) {
        const error = new Error('Validation failed, input is invalid')
        error.statusCode = 422;
        throw error
    }
    try {
        const position = await Position.findByPk(posId);
        if (!position) {
            const error = new Error('Position not found')
            error.statusCode = 404;
            throw error
        }
        position.position = req.body.position
        const result = position.save()
        res.status(201).json({
            message: "Position updated successfully",
            position: result
        })
    } catch (err) {
        errorFunc(err)
        next(err)
    }
}