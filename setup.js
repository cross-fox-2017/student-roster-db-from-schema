"use strict"

//write your code here
const repl = require("repl")
const sqlite3 = require("sqlite3").verbose()
let file = "student.db"
let db = new sqlite3.Database(file)

// SQL_STATEMENT
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
let SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";

// CREATE_TABLE
let createTable = () => {
  db.serialize(function () {
    db.run(CREATE_TABLE, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        return "Create Table";
      }
    });
  });
}

// INSERT_INTO
let seedData = () => {
  db.serialize(function () {
    db.run(SEED_DATA, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        return "Insert Value";
      }
    });
  });
}

let replCommand = repl.start("> ");

replCommand.context.createTable = createTable;
replCommand.context.insertValue = seedData;
