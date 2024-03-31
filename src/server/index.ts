<<<<<<< HEAD
// import express from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import util from 'util';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// dotenv.config();

// // Workspace directory
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const PORT = process.env.PORT || 3000;

// // Express app
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static files
// const src = path.join(__dirname, 'src')
// const styles = path.join(__dirname, 'styles');
// const dist = path.join(__dirname, 'dist');

// app.use(express.static(src));
// app.use(express.static(styles));
// app.use(express.static(dist));

// console.log(src);
// console.log(styles)
// console.log(dist)
// // View engine setup (EJS)
// app.set('view engine', 'ejs');

// // Index route
// app.get('/', async (req, res) => {
//    // Get the language cookie
//    const cookie = req.cookies;
//    const langCookie = cookie.lang || 'es';

//    // Read the language file
//    const data = await util.promisify(fs.readFile)(path.join(styles, 'language.json'), 'utf8');
//    const langObj = JSON.parse(data);

//    const isLoged = cookie.loggin || false;
//    console.log(isLoged)
//    // Send the language object to the view
//    res.render('index', { lang: langObj[langCookie], log: isLoged });
// });

// // Local server
// app.listen(PORT, () => {
//    console.log(`Server is running on port http://localhost:${PORT}`);
// });
=======
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
>>>>>>> 3acaa41fef8f521d244c2844e7c3b91bd8df8be1
