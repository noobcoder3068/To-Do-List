import express from 'express';
import axios from 'axios';
import cors from 'cors';
import Data from './quote.js';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/singleQuote', async (req, res) => {
  try {
    const quotes = Data;
    const quote =quotes[Math.floor(Math.random() * quotes.length)];
    console.log(quote);
    res.json(quote);
  } catch (err) {
    console.log("Error in fetching quote from data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
