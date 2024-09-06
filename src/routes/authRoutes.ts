import express from 'express';
import { signup , login , getAllUsers, deleteUser, updateUser } from '../controller/userController';
import { authenticateJWT, verifyId } from '../middleware/authMiddlewire';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', authenticateJWT , getAllUsers);
router.delete('/users/:id', authenticateJWT , verifyId , deleteUser);
router.patch('/users/:id' , authenticateJWT , verifyId , updateUser);

export default router;
