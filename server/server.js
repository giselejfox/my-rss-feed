import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Route for your API or additional routes (e.g., /test)
app.get('/test', (req, res) => {
  res.send('Test route');
});

// Listen on the appropriate port (Heroku or default 3000)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});