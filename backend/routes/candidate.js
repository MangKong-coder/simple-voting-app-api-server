const express = require('express');
const router =  express.Router()


const candidateController = require('../controllers/candidate');

router.get('/', candidateController.getCandidates)

router.post('/', candidateController.postCandidate)

module.exports = router