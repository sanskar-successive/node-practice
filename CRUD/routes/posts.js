import express from 'express'
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controller/postsController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts)
router.get('/:postId', getPostById)

router.post('/', requireAuth,  createPost);

router.put('/:postId',requireAuth, updatePost);

router.delete('/:postId', requireAuth, deletePost);

export default router;

