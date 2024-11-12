import express from 'express';
import { auth } from '../middleware/auth.js';
import Template from '../models/Template.js';

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const templates = await Template.findAll({
      include: ['createdBy']
    });
    res.json(templates);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const template = await Template.create({
      ...req.body,
      createdById: req.user.id
    });
    res.status(201).json(template);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    await template.update(req.body);
    res.json(template);
  } catch (error) {
    next(error);
  }
});

export default router;