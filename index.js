const express = require("express");
const Book = require("./book.js");
const credentials = require("./credentials");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportConfig = require("./passportConfiguration");
const db = require("./repository.js");

passportConfig();

const app = express();
const port = 3000;

app.use(express.json());
app.use(passport.initialize());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.any(
    "SELECT * FROM member WHERE username = ${extractedUsername} AND password = ${extractedPassword}",
    {
      extractedUsername: username,
      extractedPassword: password,
    }
  )
    .then(function (data) {
      token = jwt.sign(username, credentials.privateKey);
      res.send(token);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get(
  "/books",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

app.listen(port);
