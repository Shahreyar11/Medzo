import { Router } from 'express';
import { handleClinicRegsiter, handleClinicLogin } from '../controllers/clinic.controller'; // Adjust path if needed

const router = Router();

// POST /api/clinic/register
router.post('/register', handleClinicRegsiter);

// POST /api/clinic/login
router.post('/login', handleClinicLogin);

export default router;