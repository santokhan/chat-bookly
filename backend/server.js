import app from './app.js';
import { PORT } from './src/config/env.js';
import dbConnection from './src/config/db.js';

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
