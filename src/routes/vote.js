import express from 'express'
import isAuth from '../middleware/is_auth.js'
import isAdmin from '../middleware/is_admin.js';

import { getCandidatePosition, postVote } from '../controllers/vote.js'

const router = express.Router()

router.get('/position/:position', isAuth, getCandidatePosition);

router.post('/position/:position', isAuth, postVote)

export default router
