
import express from 'express'
import registerStudent from '../controllers/registerController.js'

const router = express.Router();

// @description : create new student 
// @method: POST
router.post('/',registerStudent)

export default router;