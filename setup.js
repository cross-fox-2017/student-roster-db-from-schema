"use strict"

//Create Tabel, SeedData
const repl = require('repl')
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file)

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)"
var SEED_DATA = "INSERT INTO student(firstname, lastname, birthdate) VALUES ('Rubi','Henjaya','1986-11-20'), ('Riza','Fahmi','1983-12-3')"

let createTable = () =>{
  db.serialize(function(){
    db.run(CREATE_TABLE, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Create Table Success");
      }
    })
  })
}

let seedData = () =>{
  db.serialize(function(){
    db.run(SEED_DATA, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("SEED DATA");
      }
    })
  })
}

var start = repl.start('> ')
start.context.createTable = createTable;
start.context.seedData = seedData;
