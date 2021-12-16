const express = require('express');
const router =  express.Router()
const { body } = require('express-validator')

const authController = require('../controllers/auth');

router.post('/signup', [
    body('fname').trim(),
    body('lname').trim(),
    body('email').trim().isEmail(),
    body('password').isStrongPassword()
], authController.signup);

router.post('/login', authController.login)

module.exports = router