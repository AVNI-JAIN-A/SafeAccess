import express from 'express';
import Card from '../models/Card.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import Joi from 'joi';

const router = express.Router();

// Add fingerprint to card
router.post('/:cardId/fingerprint', auth, async (req, res) => {
  const schema = Joi.object({
    fingerprint_hash: Joi.string().required(),
    user_id: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const card = await Card.findById(req.params.cardId);
  if (!card) return res.status(404).json({ error: 'Card not found' });

  card.fingerprints.push({ hash: req.body.fingerprint_hash, user: req.body.user_id });
  await card.save();
  res.json({ message: 'Fingerprint added' });
});

// Simulate fingerprint match
router.post('/match', auth, async (req, res) => {
  const schema = Joi.object({
    card_id: Joi.string().required(),
    fingerprint_hash: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const card = await Card.findById(req.body.card_id).populate('fingerprints.user');
  if (!card) return res.status(404).json({ error: 'Card not found' });

  const match = card.fingerprints.find(f => f.hash === req.body.fingerprint_hash);
  if (match) {
    res.json({ match: true, user_id: match.user._id });
  } else {
    // TODO: Create Permission Request entry and notify owner
    res.json({ match: false });
  }
});

export default router;
