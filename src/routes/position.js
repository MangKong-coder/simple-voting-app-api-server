import express from 'express';
import { body } from 'express-validator'
import isAuth from '../middleware/is_auth.js'
import isAdmin from '../middleware/is_admin.js';

import { getPositions, postPosition, updatedPosition, deletePosition } from '../controllers/position.js'

const router = express.Router()

router.get('/', getPositions);

router.post('/', isAuth, isAdmin,
    body('position').trim().isLength({min: 3}),
 postPosition);

router.patch('/:positionId', isAuth, isAdmin,
    body('partyName').trim().isLength({min: 3}), 
 updatedPosition)

 router.delete('/:positionId', isAuth, isAdmin, deletePosition)


export default router