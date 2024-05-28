const express = require('express');
const { connectDB } = require('./mongo/connection');
const cors = require('cors');
const app = express();
const questionsRouter = require('./routers/questions');
const tagsRouter = require('./routers/tags');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/', questionsRouter);
app.use('/', tagsRouter);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is up and running on port ${port} ⚡`);
});

module.exports = { app, server };
