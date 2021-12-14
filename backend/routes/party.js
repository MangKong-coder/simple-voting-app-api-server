const express = require('express');
const router =  express.Router()

const partyController = require('../controllers/party');


router.get('/', partyController.getParties)

router.post('/', partyController.postParties)




module.exports = router