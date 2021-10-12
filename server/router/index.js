const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

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
router.post('/reset', userController.resetPassword);
router.post('/set', userController.savePlaylist);
router.post('/get', userController.getPlaylist);
router.post('/name', userController.changeNamePlaylist);

module.exports = router
