const express = require('express');
const router =  express.Router()


const candidateController = require('../controllers/candidate');

router.get('/', candidateController.getCandidates);

router.post('/', candidateController.postCandidate);

router.patch('/:candidateId', candidateController.updateCandidate);

router.get('/:candidateId', candidateController.getCandidate);  

module.exports = router