"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose()

var file = 'student.db'
var db = new sqlite.Database(file)

//SQL Statement
var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT,birthdate DATE)"
var SEED_DATA = "INSERT INTO student (firstname,lastname,birthdate) VALUES ('timo','codex','1993-06-28');"

//CREATE_TABLE
let createTable = () =>{
  db.serialize(function(){
    db.run(CREATE_TABLE,function(err){
      if(err){
        console.log(err);
      } else{
        console.log('CREATE TABLE');
      }
    })
  })
}

let seedData = () =>{
  db.serialize(function(){
    db.run(SEED_DATA,function(err){
      if(err){
        console.log(err);
      } else{
        console.log('SEED DATA');
      }
    })
  })
}

var rep = repl.start('> ').context

rep.createTable = createTable
rep.seedData = seedData
