import express from 'express'
import { requireAuth } from '../middleware/authMiddleware.js';
import { login, register } from '../controller/authController.js';

const router = express.Router();


router.post('/register', register)
router.post('/login', login);

router.get('/protected', requireAuth, (req,res)=>{
    res.json({message : "This is protected route"})
})


export default router;