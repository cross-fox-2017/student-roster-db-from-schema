"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = 'student.db'
let db = new sqlite.Database(file)

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
let ADD_DATA = "INSERT INTO student(firstname, lastname, birthdate) VALUES ($firstname, $lastname, $birthdate)";
let UPDATE_DATA = "UPDATE student SET firstname = $firstname, lastname = $lastname, birthdate = $birthdate WHERE id = $id";
let DELETE_DATA = "DELETE FROM student WHERE id = $id";
let SHOW_DATA = "SELECT * FROM student ";
let STUDENT_NAME = "SELECT * FROM student WHERE firstname = $name OR lastname = $name";
// write your code here
class Student {

  // static createTable(){
  // let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
  //   db.serialize = () => {
  //     db.run(CREATE_TABLE, function(err) {
  //       if (err) {
  //         console.log(err);
  //       }else {
  //         console.log('CREATE TABLE');
  //       }
  //     })
  //   }
  // }
  // static seedData(){
  //   let SEED_DATA = "INSERT INTO student(firstname, lastname, birthdate) VALUES ('mangku', 'widodo', '1996-05-29'),  ('Joko', 'Widodo', '1980-12-3');";
  //   db.serialize = () => {
  //     db.run(SEED_DATA, function (err) {
  //       if (err) {
  //         console.log(err);
  //       }else {
  //         console.log('SEED DATA');
  //       }
  //     })
  //   }
  // }
  static addData(firstname, lastname, birthdate){
    db.serialize(function() {
      db.run(ADD_DATA,{
        $firstname: firstname,
        $lastname: lastname,
        $birthdate: birthdate
      },function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('data added');
        }
      })
    })
  }
  static updateData(id, firstname, lastname, birthdate){
    db.serialize(function() {
      db.run(UPDATE_DATA, {
        $id: id,
        $firstname: firstname,
        $lastname: lastname,
        $birthdate: birthdate
      },function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('data updated');
        }
      })
    })
  }
  static deleteData(id){
    db.serialize(function() {
      db.run(DELETE_DATA,{
        $id: id
      },function (err) {
        if (err) {
          console.log(err);
        }else {
          console.log(`${id} has been deleted`);
        }
      })
    })
  }
  static showData(){
    db.serialize(function() {
      // db.run(SHOW_DATA,{
      //   $id: id,
      //   $firstname: firstname,
      //   $lastname: lastname,
      //   $birthdate: birthdate
      // },function (err) {
      //   if (err) {
      //     console.log(err);
      //   }else {
      //     console.log(`${id} ${firstname} ${lastname} ${birthdate}`);
      //   }
      // })
      db.each(SHOW_DATA, function(err, row) {
        if (err) {
          console.log(err);
        }else {
          console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.birthdate}`);
        }
      })
    })
  }
  static studentName(name){
    db.serialize(function () {
      db.each(STUDENT_NAME,{
        $name: name
      }, function(err, row) {
        if (err) {
          console.log(err);
        }else {
          console.log(`${row.id} ${row.firstname} ${row.lastname}`);
        }
      })
    })
  }
  static studentAttribut(attr){
    db.serialize(function () {
      db.each(`SELECT ${attr} FROM student `, function (err, row) {
        if (err) {
          console.log(err);
        }else {
          console.log(row);
        }
      })
    })
  }
}

var start = repl.start('> ').context

start.addData = Student.addData
start.updateData = Student.updateData
start.deleteData = Student.deleteData
start.showData = Student.showData
start.studentName = Student.studentName
start.studentAttribut = Student.studentAttribut
