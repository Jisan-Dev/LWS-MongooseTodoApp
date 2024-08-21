const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3000 || process.env.PORT;
const todoHandler = require('./routeHandler/todoHandler');

// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// application routes
app.use('/todo', todoHandler);

app.get('/', (req, res) => {
  res.send('Welcome to Todo API');
});

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
