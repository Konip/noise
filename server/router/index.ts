import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.post('/delete', userController.delete);
router.post('/change', authMiddleware, userController.changeData);
router.post('/password', authMiddleware, userController.changePassword);
router.post('/reset',authMiddleware, userController.resetPassword);
router.post('/set',authMiddleware, userController.savePlaylist);
router.post('/get',authMiddleware, userController.getPlaylist);
router.post('/rename',authMiddleware, userController.changeNamePlaylist);
router.post('/delPlaylist',authMiddleware, userController.deletePlaylist);

export default router
