const express = require('express');
const { connectDB } = require('./mongo/connection');
const cors = require('cors');
const app = express();
const questionsRouter = require('./routers/questions');

app.use(cors());
app.use(express.json());

app.use('/', questionsRouter);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log('Server is up and running ⚡');
});

module.exports = { app, server };
