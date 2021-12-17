const express = require('express');
const router =  express.Router()
const { body } =  require('express-validator')
const isAuth = require('../middleware/is_auth');
const isAdmin = require('../middleware/is_admin')

const positionController = require('../controllers/position');


router.get('/', positionController.getPositions);

router.post('/', isAuth, isAdmin,
    body('position').trim().isLength({min: 3}),
 positionController.postPosition);

router.patch('/:positionId', isAuth, isAdmin,
    body('partyName').trim().isLength({min: 3}), 
 positionController.updatedPosition)


module.exports = router