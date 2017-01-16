"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

class Student{
  static addStudent (firstname, lastname, birthdate) {
    var ADD_STUDENT = "INSERT INTO student (firstname, lastname, birthdate) VALUES ($firstname, $lastname, $birthdate);";
    db.serialize(function() {
      db.run(ADD_STUDENT, {
        $firstname: firstname,
        $lastname: lastname,
        $birthdate: birthdate
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Student Added');
        }
      })
    })
  }

  static updateStudent(id, firstname, lastname, birthdate) {
    var UPDATE_STUDENT = "UPDATE student SET firstname = $firstname, lastname = $lastname, birthdate = $birthdate WHERE id = $id;";
    db.serialize(function() {
      db.run(UPDATE_STUDENT,{
        $firstname: firstname,
        $lastname: lastname,
        $id: id,
        $birthdate: birthdate
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`Student id ${id} Updated`);
        }
      })
    })
  }
  static deleteStudent (id) {
    var DELETE_STUDENT = "DELETE FROM student WHERE id = $id;"
    db.serialize(function() {
      db.run(DELETE_STUDENT,{
        $id: id
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`Student id ${id} Deleted`);
        }
      })
    })
  }
  static readStudent() {
    var READ_STUDENT = 
    db.serialize(function() {
      db.run(CREATE_TABLE, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Create Table');
        }
      })
    })
  }
  static findStudent(param) {
    db.serialize(function() {
      db.run(CREATE_TABLE, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Create Table');
        }
      })
    })
  }
}
Student.deleteStudent(3)
