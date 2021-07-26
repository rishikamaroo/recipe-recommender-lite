import { Router } from 'express';
import { createTodo, getTodo, patchTodo, deleteTodo } from '../controllers/todos';

const router = Router();

router.get('/', getTodo);
router.post('/', createTodo);
router.patch('/:id', patchTodo);
router.delete('/:id', deleteTodo);

export default router;
