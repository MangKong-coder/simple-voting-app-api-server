import express from 'express';
import { body } from 'express-validator'
import isAuth from '../middleware/is_auth.js'
import isAdmin from '../middleware/is_admin.js';

import { getParties, postParty, updateParty, deleteParty } from '../controllers/party.js'

const router = express.Router()


router.get('/', getParties);

router.post('/', isAuth, isAdmin,
    body('partyName').trim().isLength({min: 5}),
    postParty);

router.patch('/:partyId', isAuth, isAdmin,
    body('partyName').trim().isLength({min: 5}), 
    updateParty)

router.delete('/:partyId', isAuth, isAdmin, deleteParty)


export default router