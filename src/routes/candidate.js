import express from 'express';
import { body } from 'express-validator'
import isAuth from '../middleware/is_auth.js'
import isAdmin from '../middleware/is_admin.js';

import { getCandidates, getCandidate, postCandidate, updateCandidate, deleteCandidate } from '../controllers/candidate.js'

const router = express.Router()


router.get('/', isAuth, getCandidates);

router.get('/:candidateId', isAuth, getCandidate);  


router.post('/', isAuth, isAdmin, [
    body('name').trim().isLength({min: 5}),
    body('positionId').isInt(),
    body('partyId').isInt()

], postCandidate);

router.patch('/:candidateId', isAuth,  [
    body('name').trim().isLength({min: 5}),
    body('positionId').isInt(),
    body('partyId').isInt()
], updateCandidate);


router.delete('/:candidateId', isAuth, isAdmin, deleteCandidate)


export default router