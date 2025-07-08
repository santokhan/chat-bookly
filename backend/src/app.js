import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import adminRoutes from './modules/admin/admin.routes';
import staffRoutes from './modules/staff/staff.routes';
import businessRoutes from './modules/business/business.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Routes
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/businesses', businessRoutes);

export default app;
