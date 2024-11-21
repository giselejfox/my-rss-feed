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
  
app.listen(3000, () => {
    console.log(`Server is running at http://localhost:${3000}`);
});