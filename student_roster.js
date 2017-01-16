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
    var READ_STUDENT = "SELECT * FROM student"
    db.serialize(function() {
      db.all(READ_STUDENT,function(err,rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
  static findStudent(name) {
    var FIND_STUDENT = "SELECT * FROM student WHERE firstname LIKE $name OR lastname LIKE $name;"
    db.serialize(function() {
      db.each(FIND_STUDENT,{
        $name: name
      }, function(err, rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
  static searchAttribute(attribute){
    var SEARCH_STUDENT = `SELECT ${attribute} FROM student`
    db.serialize(function(){
      db.each(SEARCH_STUDENT, function(err, rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
  static thisMonthBirthday(){
    var TODAY_BIRTHDAY = "SELECT * FROM student WHERE strftime('%m', birthdate) = strftime('%m', 'now')"
    db.serialize(function(){
      db.each(TODAY_BIRTHDAY, function(err, rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
  static sortByBirthday(){
    var SORT_BIRTHDAY = "SELECT * FROM student ORDER BY strftime('%m, %d', birthdate);";
    db.serialize(function(){
      db.each(SORT_BIRTHDAY, function(err, rows){
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
  static help(){
    console.log('addStudent (firstname, lastname, birthdate)');
    console.log('updateStudent(id, firstname, lastname, birthdate)');
    console.log('deleteStudent (id)');
    console.log('readStudent()');
    console.log('findStudent(name)');
    console.log('searchAttribute(attribute)');
    console.log('thisMonthBirthday()');
    console.log('sortByBirthday()');
    console.log('help()');
  }
}
var repled = repl.start('> ').context
repled.addStudent = Student.addStudent
repled.updateStudent = Student.updateStudent
repled.deleteStudent = Student.deleteStudent
repled.readStudent = Student.readStudent
repled.findStudent = Student.findStudent
repled.searchAttribute = Student.searchAttribute
repled.thisMonthBirthday = Student.thisMonthBirthday
repled.sortByBirthday = Student.sortByBirthday
repled.help = Student.help
