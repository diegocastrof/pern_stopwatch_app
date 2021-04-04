import { Router } from 'express';
import times from './times';

const router = new Router();

router.use('/api/times', times);

export default router;
