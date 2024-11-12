import express from 'express';
import { auth } from '../middleware/auth.js';
import Report from '../models/Report.js';

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const reports = await Report.findAll({
      include: ['Template', 'createdBy']
    });
    res.json(reports);
  } catch (error) {
    next(error);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const report = await Report.create({
      ...req.body,
      createdById: req.user.id
    });
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    await report.update(req.body);
    res.json(report);
  } catch (error) {
    next(error);
  }
});

export default router;