import { Router } from 'express'
import { getProfile, updateProfile, changePassword } from '../../controllers/User/profile.controller.js'
import { verifyToken, isUser } from '../../middlewares/authJwt.js'
const router = Router()

router.get('/', [verifyToken], getProfile)
router.put('/', [verifyToken], updateProfile)
router.put('/change-password', [verifyToken], changePassword)

export default router

