const express = require('express');
const { connectDB } = require('./mongo/connection');
const cors = require('cors');
const app = express();
const questionsRouter = require('./routers/questions');
const tagsRouter = require('./routers/tags');

app.use(cors());
app.use(express.json());

app.use('/', questionsRouter);
app.use('/tags', tagsRouter); // añadido por mi, preguntar si esta bien

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log('Server is up and running ⚡');
});

module.exports = { app, server };
