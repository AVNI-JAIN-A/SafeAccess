import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const router = express.Router();

// Get all secondary users for the primary user
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('secondary_users');
  if (!user || !user.is_primary) return res.status(403).json({ error: 'Forbidden' });
  res.json(user.secondary_users);
});

// Add a secondary user
router.post('/', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
    account_number: Joi.string().required(),
    card_number: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const secondaryUser = new User({
      ...req.body,
      password: hashedPassword,
      is_primary: false
    });
    await secondaryUser.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { secondary_users: secondaryUser._id } });
    res.status(201).json({ message: 'Secondary user added' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update secondary user
router.put('/:id', auth, async (req, res) => {
  // Only allow update by primary user
  const user = await User.findById(req.user.id);
  if (!user || !user.is_primary) return res.status(403).json({ error: 'Forbidden' });
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete secondary user
router.delete('/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || !user.is_primary) return res.status(403).json({ error: 'Forbidden' });
  try {
    await User.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.id, { $pull: { secondary_users: req.params.id } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
