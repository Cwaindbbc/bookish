const express = require("express");
const pgp = require("pg-promise")();
const Book = require("./book.js");
const credentials = require("./credentials");

const app = express();
const port = 3000;

const cn = {
  host: "localhost",
  port: 5432,
  database: "bookish",
  user: credentials.username,
  password: credentials.password,
  max: 30,
};

const db = pgp(cn);

app.get("/books", (req, res) => {
  db.any("SELECT * FROM book")
    .then(function (data) {
      console.log(data);

      const listOfBooks = data.map((book) => {
        return new Book(
          book.book_id,
          book.title,
          book.author,
          book.isbn,
          book.copies_owned,
          book.barcode,
          book.due_date,
          book.borrower_id
        );
      });

      res.send(listOfBooks);
      console.log(listOfBooks);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port);
