import express from 'express';
import Template from '../models/Template.js';
import { ValidationError } from '../utils/errors.js';

const router = express.Router();

// Get all templates of a specific type
router.get('/:type', async (req, res, next) => {
  try {
    console.log(`Fetching templates for type: ${req.params.type}`);
    const templates = await Template.findAll({
      where: { type: req.params.type },
      order: [['updatedAt', 'DESC']]
    });
    console.log(`Found ${templates.length} templates`);
    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    next(error);
  }
});

// Create a new template
router.post('/:type', async (req, res, next) => {
  try {
    console.log(`Creating new template of type: ${req.params.type}`, req.body);
    const template = await Template.create({
      type: req.params.type,
      data: req.body,
      status: 'active'
    });
    console.log('Template created successfully:', template.id);
    res.status(201).json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    next(error);
  }
});

// Update a template
router.put('/:type/:id', async (req, res, next) => {
  try {
    console.log(`Updating template ${req.params.id} of type: ${req.params.type}`, req.body);
    const template = await Template.findOne({
      where: { 
        id: req.params.id,
        type: req.params.type
      }
    });

    if (!template) {
      console.log('Template not found');
      throw new ValidationError('Template not found');
    }

    await template.update({
      data: req.body,
      updatedAt: new Date()
    });
    console.log('Template updated successfully');
    res.json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    next(error);
  }
});

// Delete a template
router.delete('/:type/:id', async (req, res, next) => {
  try {
    console.log(`Deleting template ${req.params.id} of type: ${req.params.type}`);
    const template = await Template.findOne({
      where: { 
        id: req.params.id,
        type: req.params.type
      }
    });

    if (!template) {
      console.log('Template not found');
      throw new ValidationError('Template not found');
    }

    await template.destroy();
    console.log('Template deleted successfully');
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting template:', error);
    next(error);
  }
});

export default router;