import express from 'express';
import { auth } from '../middleware/auth.js';
import Template from '../models/Template.js';
import { ValidationError } from '../utils/errors.js';

const router = express.Router();

// Get all templates of a specific type
router.get('/:type', auth, async (req, res, next) => {
  try {
    const templates = await Template.findAll({
      where: { type: req.params.type },
      include: ['createdBy'],
      order: [['updatedAt', 'DESC']]
    });
    res.json(templates);
  } catch (error) {
    next(error);
  }
});

// Create a new template
router.post('/:type', auth, async (req, res, next) => {
  try {
    const template = await Template.create({
      type: req.params.type,
      data: req.body,
      createdById: req.user.id
    });
    res.status(201).json(template);
  } catch (error) {
    next(error);
  }
});

// Update a template
router.put('/:type/:id', auth, async (req, res, next) => {
  try {
    const template = await Template.findOne({
      where: { 
        id: req.params.id,
        type: req.params.type
      }
    });

    if (!template) {
      throw new ValidationError('Template not found');
    }

    await template.update({
      data: req.body,
      updatedAt: new Date()
    });

    res.json(template);
  } catch (error) {
    next(error);
  }
});

// Delete a template
router.delete('/:type/:id', auth, async (req, res, next) => {
  try {
    const template = await Template.findOne({
      where: { 
        id: req.params.id,
        type: req.params.type
      }
    });

    if (!template) {
      throw new ValidationError('Template not found');
    }

    await template.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;