const express = require('express');
const router =  express.Router()

const partyController = require('../controllers/party');


router.get('/', partyController.getParties);

router.post('/', partyController.postParties);

router.patch('/:partyId', partyController.updateParties)




module.exports = router