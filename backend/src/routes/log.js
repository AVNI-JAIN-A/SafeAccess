import express from 'express';
import Log from '../models/Log.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Log access attempt
router.post('/', auth, async (req, res) => {
  const { user_id, card_id, status, location } = req.body;
  try {
    const log = new Log({ user: user_id, card: card_id, status, location });
    await log.save();
    res.status(201).json({ message: 'Log created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch logs by user, date, or card
router.get('/', auth, async (req, res) => {
  const { user_id, card_id, date } = req.query;
  let filter = {};
  if (user_id) filter.user = user_id;
  if (card_id) filter.card = card_id;
  if (date) {
    const d = new Date(date);
    filter.timestamp = { $gte: d.setHours(0,0,0,0), $lte: d.setHours(23,59,59,999) };
  }
  const logs = await Log.find(filter);
  res.json(logs);
});

export default router;
