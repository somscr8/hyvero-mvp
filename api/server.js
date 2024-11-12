import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import templateRoutes from './routes/templates.js';
import reportRoutes from './routes/reports.js';
import fileRoutes from './routes/files.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/files', fileRoutes);

// Error handling
app.use(errorHandler);

// Database connection and sync
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });