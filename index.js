const express = require("express");
const pgp = require("pg-promise")();
const Book = require("./book.js");
const credentials = require("./credentials");
const jwt = require("jsonwebtoken");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const cn = {
  host: "localhost",
  port: 5432,
  database: "bookish",
  user: credentials.user,
  password: credentials.password,
  max: 30,
};

app.use(express.json());

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
      res.send(data);
      var login = data;

      const listOfMembers = login.map((member) => {
        return { username: member.username, password: member.password };
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

const createToken = () => {
  return (token = jwt.sign(response.body, credentials.privateKey));
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, credentials.privateKey);
  } catch (e) {
    console.log("e:", e);
    return null;
  }
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
