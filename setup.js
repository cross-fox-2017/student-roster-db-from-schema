"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = "student.db"
let db = new sqlite3.Database(file);

class Setup {
  static createTable () {
    db.serialize(function() {
      let CREATE_TABLE = "CREATE TABLE student(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)"
      db.run(CREATE_TABLE, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Create table Success!")
        }
      })
    })
  }

  static seedData (firstname, lastname, birthdate) {
    let SEED_DATA = `INSERT INTO student(firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`
    db.serialize(function() {
      db.run(SEED_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Insert Data Success!")
        }
      })
    })
  }
}
let command = repl.start("> ")

command.context.createTable = Setup.createTable;
command.context.insertData = Setup.seedData;
