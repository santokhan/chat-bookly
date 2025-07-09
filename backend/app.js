import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './src/modules/user/user.routes.js';
import businessRoutes from './src/modules/business/business.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/business', businessRoutes);

export default app;
