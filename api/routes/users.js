import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', auth, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'status', 'createdAt']
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, isAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;