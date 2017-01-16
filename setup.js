"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

//SQL statement

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";

var SEED_TABLE = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');";

//CREATE_TABLE
 
let createTable = () => {
  //Run SQL one at a time
  db.serialize(function(){
    db.run(CREATE_TABLE, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    });
  });
}

//SEED_DATA
let seedData = () => {
//write your code here
db.serialize(function() {
  db.run(SEED_DATA, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('SEED TABLE');
    }
  });
});

}

let relp = repl.start("> ")
relp.context.createTable = createTable
relp.context.seedData = seedData
