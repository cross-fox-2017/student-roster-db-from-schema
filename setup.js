"use strict"

//write your code here
const repl    = require("repl");
const sqlite  = require("sqlite3").verbose();

var file  = "student.db";
var db    = new sqlite.Database(file);

//SQL Statement
var CREATE_TABLE  = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT NOT NULL,lastname TEXT,birthdate DATE)";
var SEED_DATA     = "INSERT INTO student(firstname, lastname, birthdate) VALUES('Eri','Irawan','1991-02-01'),('Kevin','MithNick','1981-02-01');";

//CREATE TABLE
let createTable = ()=>{
  //RUN SQL ONE AT A TIME
  db.serialize(function(){
    //Create Table
    db.run(CREATE_TABLE, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('CREATE TABLE');
      }
    });
  });
}

//SEED DATA
let seedData  = ()=>{
  db.serialize(function(){
    db.run(SEED_DATA, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('SEED DATA');
      }
    });
  });
}

//REPL START
let start = repl.start('> ');
start.context.createTable  = createTable
start.context.seedData     = seedData
