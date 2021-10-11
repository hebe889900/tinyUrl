const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

app.use(express.urlencoded({extended : true}));
app.use(express.json())

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save(function(err){
      if (err) console.error(err);
    });
    return res.status(200).json(book);
  })
  .get((req, res) => {
    Book.find((err, books) =>{
      if(err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
app.use('/api', bookRouter);


app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});
app.listen(port, () => {
  console.log(`Running on port ${port}`);
})
