import express from 'express';
import { body } from 'express-validator'

import { signup, login } from '../controllers/auth.js'

const router = express.Router()


router.post('/signup', [
    body('fname').trim(),
    body('lname').trim(),
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min:5 })
], signup);

router.post('/login', login)

export default router