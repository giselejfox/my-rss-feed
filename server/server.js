import express from 'express';

const app = express();

// Route to serve the RSS feed
app.get('/test', async (req, res) => {
    try {
      res.send("test");
    } catch (error) {
      res.status(500).send('Error');
    }
});

// Use Heroku-provided port or default to 3000
const port = process.env.PORT || 3000;
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});