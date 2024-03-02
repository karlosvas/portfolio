import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// Import dotenv
dotenv.config();

// Workspace directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// Express app
const app = express();

// Static files
app.use(express.static(path.join(__dirname, '..', '..', 'src')));
app.use(express.static(path.join(__dirname, '..', '..', 'styles')));
app.use(express.static(path.join(__dirname, '..')));

// Index route
app.get('/', (_req, res) => {
   res.sendFile(path.join(__dirname, "..", '..', 'views', 'index.html'));
});

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});