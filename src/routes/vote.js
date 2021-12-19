import express from 'express'
import isAuth from '../middleware/is_auth.js'
import isAdmin from '../middleware/is_admin.js';

import { getCandidatePosition } from '../controllers/vote.js'

const router = express.Router()

router.get('/position/:position', isAuth, getCandidatePosition)

export default router
