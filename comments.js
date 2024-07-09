// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true, useUnifiedTopology: true });
const Comment = require('./models/comment');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  Comment.find().then((comments) => {
    res.json(comments);
  });
});

app.post('/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.save().then(() => {
    res.json(comment);
  });
});

app.listen(3000, () => {
  console.log('Server started');
});