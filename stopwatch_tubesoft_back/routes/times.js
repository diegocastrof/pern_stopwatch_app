import { Router } from 'express';
import timesController from '../controllers/times';
const router = new Router();

const {
	getAllTimes,
	getById,
	createTime,
	updateTime,
	deleteTime,
} = timesController;

router.get('/', getAllTimes);
router.get('/:id', getById);
router.post('/', createTime);
router.delete('/:id', deleteTime);
router.patch('/:id', updateTime);

export default router;
