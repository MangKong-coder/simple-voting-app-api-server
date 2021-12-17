const express = require('express');
const router =  express.Router()
const { body } = require('express-validator')
const isAuth = require('../middleware/is_auth')
const isAdmin = require('../middleware/is_admin')


const candidateController = require('../controllers/candidate');

router.get('/', isAuth, candidateController.getCandidates);

router.post('/', isAuth, isAdmin, [
    body('name').trim().isLength({min: 5}),
    body('position').trim().isLength({min:3}),
    body('party_id').isInt()

], candidateController.postCandidate);

router.patch('/:candidateId', isAuth,  [
    body('name').trim().isLength({min: 5}),
    body('position').trim().isLength({min:3}),
    body('party_id').isInt()
], candidateController.updateCandidate);

router.get('/:candidateId', isAuth, isAdmin, candidateController.getCandidate);  

module.exports = router