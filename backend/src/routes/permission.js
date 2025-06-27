import express from 'express';
import Permission from '../models/Permission.js';
import auth from '../middleware/auth.js';
import Joi from 'joi';

const router = express.Router();

// Get pending permission requests
router.get('/pending', auth, async (req, res) => {
  const pending = await Permission.find({ status: 'pending' });
  res.json(pending);
});

// Approve permission request
router.post('/:id/approve', auth, async (req, res) => {
  const permission = await Permission.findById(req.params.id);
  if (!permission) return res.status(404).json({ error: 'Not found' });
  permission.status = 'approved';
  await permission.save();
  res.json({ message: 'Permission approved' });
});

// Deny permission request
router.post('/:id/deny', auth, async (req, res) => {
  const permission = await Permission.findById(req.params.id);
  if (!permission) return res.status(404).json({ error: 'Not found' });
  permission.status = 'denied';
  await permission.save();
  res.json({ message: 'Permission denied' });
});

export default router;
