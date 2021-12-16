const express = require('express');
const router =  express.Router()
const { body } =  require('express-validator')

const partyController = require('../controllers/party');


router.get('/', partyController.getParties);

router.post('/',
    body('partyName').trim().isLength({min: 5}),
    partyController.postParties);

router.patch('/:partyId', 
    body('partyName').trim().isLength({min: 5}), 
    partyController.updateParties)




module.exports = router