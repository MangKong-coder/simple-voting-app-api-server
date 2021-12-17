const express = require('express');
const router =  express.Router()
const { body } =  require('express-validator')
const isAuth = require('../middleware/is_auth');
const isAdmin = require('../middleware/is_admin')

const partyController = require('../controllers/party');


router.get('/', partyController.getParties);

router.post('/', isAuth, isAdmin,
    body('partyName').trim().isLength({min: 5}),
    partyController.postParties);

router.patch('/:partyId', isAuth, isAdmin,
    body('partyName').trim().isLength({min: 5}), 
    partyController.updateParties)




module.exports = router