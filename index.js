const express = require('express') 
const pgp = require('pg-promise')();
const {Book} =  require("./book.js")


const app = express()
const port = 3000

const db = pgp('bookish/password');
app.get('/books', (req,res) => {
  res.send()
  })


app.listen(port)