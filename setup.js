"use strict"

//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose()

let file = 'student.db'
let db = new sqlite.Database(file)

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";

let SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Mangku', 'Widodo', '1996-05-29'), ('Joko', 'Widodo', '1980-12-3');";

let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err);
      }else {
        console.log('CREATE TABLE');
      }
    })
  })
}

let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      if (err) {
        console.log(err);
      }else {
        console.log('SEED Data');
      }
    })
  })
}

repl.start('> ').context.createTable = createTable
repl.start('> ').context.seedData = seedData
