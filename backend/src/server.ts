import app from './app';
import fs from 'fs';
import http from 'http';
import https from 'https';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'production') {
  const key = fs.readFileSync('./client-key.pem', 'utf8');
  const cert = fs.readFileSync('./client-cert.pem', 'utf8');
  const credentials = { key, cert };

  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`Server is running in production mode with HTTPS on port ${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`Server is running in development mode with HTTP on port ${PORT}`);
  });
}
