import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import cardRoutes from './routes/card.js';
import accessWindowRoutes from './routes/accessWindow.js';
import permissionRoutes from './routes/permission.js';
import logRoutes from './routes/log.js';
import setupSwagger from './swagger.js';

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/access-windows', accessWindowRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/logs', logRoutes);

// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts, please try again later.'
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/safe-access', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

// Setup Swagger
setupSwagger(app);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Safe Access Backend API');
});

// TODO: Import and use route modules here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
