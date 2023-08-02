import express from 'express';
import { account } from '../controllers/users';
const router = express.Router();

router.get('/acc', account.getAllUser);

router.get('/acc/:id', account.getoneUser);

router.patch('/acc/:id', account.updateUser);

router.delete('/acc/:id', account.removeAccount);
export default router;
