"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

//write your code here
var file = 'student.db';
var db = new sqlite.Database(file);

//SQL STATEMENT
  var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
  var SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi','Henjaya','1986-11-20'),('Riza','Fahmi','1983-12-31');";

  //CREATE TABLE
  let createTable = () => {
    //RUN SQL one at a time
    db.serialize(function(){
      //CREATE TABLE
      db.run(CREATE_TABLE, function(err){
      if(err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    });
  });
  }

  let seedData = () =>{
    //RUN SQL one at a time
    db.serialize(function(){
      //CREATE TABLE
      db.run(SEED_DATA, function(err){
      if(err) {
        console.log(err);
      } else {
        console.log('SEED DATA');
      }
    });
  });
  }

  let start = repl.start('> ');
  start.context.createTable = createTable
  start.context.seedData = seedData
