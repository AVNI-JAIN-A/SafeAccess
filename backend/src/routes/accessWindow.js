import express from 'express';
import AccessWindow from '../models/AccessWindow.js';
import auth from '../middleware/auth.js';
import Joi from 'joi';

const router = express.Router();

// Set access window
router.post('/', auth, async (req, res) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    card_id: Joi.string().required(),
    start_time: Joi.string().required(),
    end_time: Joi.string().required(),
    date: Joi.date().required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const accessWindow = new AccessWindow(req.body);
    await accessWindow.save();
    res.status(201).json({ message: 'Access window set' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Check if scan is within allowed time
router.post('/check', auth, async (req, res) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    card_id: Joi.string().required(),
    timestamp: Joi.date().required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { user_id, card_id, timestamp } = req.body;
  const accessWindow = await AccessWindow.findOne({
    user: user_id,
    card: card_id,
    date: { $eq: new Date(timestamp).setHours(0,0,0,0) }
  });
  if (!accessWindow) return res.json({ allowed: false });

  const scanTime = new Date(timestamp).toTimeString().slice(0,5);
  if (scanTime >= accessWindow.start_time && scanTime <= accessWindow.end_time) {
    res.json({ allowed: true });
  } else {
    res.json({ allowed: false });
  }
});

export default router;
