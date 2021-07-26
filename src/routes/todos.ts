import { Router } from 'express';
import { createTodo, getTodo } from '../controllers/todos';

const router = Router();

router.get('/', getTodo);
router.post('/', createTodo);
router.patch('/:id');
router.delete('/:id');

export default router;
