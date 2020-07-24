const credentials = require("./credentials");
const pgp = require("pg-promise")();


const cn = {
  host: "localhost",
  port: 5432,
  database: "bookish",
  user: credentials.user,
  password: credentials.password,
  max: 30,
};
const db = pgp(cn);

module.exports = db;
