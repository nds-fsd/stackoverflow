const express = require('express');
const { connectDB } = require('./mongo/connection');
const cors = require('cors');
const app = express();
const questionsRouter = require('./routers/questions');
const authRouter = require('./routers/authenticator');
const tagsRouter = require('./routers/tags');
const usersRouter = require('./routers/users');
const commentsRouter = require('./routers/comments');
const likesRouter = require('./routers/like');

require('./mongo/data/schemas/user');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/', questionsRouter);
app.use('/', tagsRouter);
app.use('/auth', authRouter);
app.use('/', usersRouter);
app.use('/', commentsRouter);
app.use('/', likesRouter);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is up and running on port ${port} ⚡`);
});

module.exports = { app, server };
