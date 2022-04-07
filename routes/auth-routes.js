import express from'express'
const router = express.Router();
import { register, login, updateUser } from "../controllers/authController.js";
import auth from '../middleware/auth.js';
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(auth, updateUser)


export default router