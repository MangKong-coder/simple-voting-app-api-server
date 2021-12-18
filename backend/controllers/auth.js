import bcrypt from 'bcryptjs'
import {v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User from '../models/user.js'

// signing up
export const signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, input is invalid')
        error.statusCode = 422;
        throw error
    }
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;
    try {
        const hashedPw = await bcrypt.hash(password, 12)
        const user = new User({
            id: uuidv4().toString(),
            email: email,
            password: hashedPw,
            fname: fname,
            lname: lname
        });
        const result = await user.save()
        res.status(201).json({
            message: 'User created!', 
            userId: result.id
        })

    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

// logging in
export const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({email: email})
        if(!user) {
            const error = new Error('User does not exist');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: user.email, 
                userId:user.id.toString(),
                admin: user.isAdmin
            }, 'somesupertopsecretsecret', { expiresIn: '1h' })
            res.status(200).json({
                token: token, 
                userId: user.id.toString()
            })

    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
