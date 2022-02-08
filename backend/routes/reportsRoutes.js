import express from 'express';
import getStudents from '../controllers/reportsController.js'

const router = express.Router();

router.get('/',getStudents)

export default router;