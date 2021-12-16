const express = require('express');
const router =  express.Router()
const { body } = require('express-validator')


const candidateController = require('../controllers/candidate');

router.get('/', candidateController.getCandidates);

router.post('/', [
    body('name').trim().isLength({min: 5}),
    body('position').trim().isLength({min:3}),
    body('party_id').isInt()

], candidateController.postCandidate);

router.patch('/:candidateId', [
    body('name').trim().isLength({min: 5}),
    body('position').trim().isLength({min:3}),
    body('party_id').isInt()
], candidateController.updateCandidate);

router.get('/:candidateId',  candidateController.getCandidate);  

module.exports = router