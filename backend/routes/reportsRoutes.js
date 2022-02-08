import express from 'express';
import getStudents from '../controllers/reportsController.js'
import { updateAll } from '../controllers/reportsController.js';
const router = express.Router();

router.get('/',getStudents)
router.put('/',updateAll)

export default router;