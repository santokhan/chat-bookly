import app from './app.js';
import dbConnection from './config/db';
import { PORT } from './config/env';

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
