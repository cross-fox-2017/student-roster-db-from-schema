"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file   = 'student.db';
var db     = new sqlite.Database(file);


class Students {

  addStudents(firstname,lastname,birthdate){

  let ADD_TABLE = "INSERT INTO student (firstname, lastname, birthdate) VALUES ($firstname,$lastname,$birthdate);";
    db.serialize(function() {
      db.run(ADD_TABLE,{
        $firstname: firstname,
        $lastname: lastname,
        $birthdate: birthdate
      }, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('ADD_TABLE');
        }
      });
    });
  }

  updateStudents(firstname,lastname,birthdate, id){
    let UPDATE_TABLE = "UPDATE student SET firstname=$firstname, lastname=$lastname, birthdate=$birthdate WHERE id=$id;";
      db.serialize(function() {
        db.run(UPDATE_TABLE,{
          $firstname: firstname,
          $lastname: lastname,
          $birthdate: birthdate,
          $id: id
        }, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log('UPDATE_TABLE');
          }
        });
      });

  }

  deleteStudents(id){
    let DELETE_TABLE = "DELETE FROM student WHERE id=$id;";
      db.serialize(function() {
        db.run(DELETE_TABLE,{
          $id: id
        }, function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log('DELETE_TABLE');
          }
        });
      });

  }

  showStudents(){
    let SHOW_TABLE = "SELECT * FROM student;";
      db.serialize(function() {
        console.log('ALL STUDENTS\n______________________');
        console.log(`ID        Firstname     Lastname        Birthday`);
        db.each(SHOW_TABLE, function(err,row) {
          if(err) {
            console.log(err);
          } else {
            console.log(`${row.id}        ${row.firstname}       ${row.lastname}       ${row.birthdate}`);
          }
        });
      });

  }

  findByName(firstname,lastname){
    let FIND_TABLE = "SELECT * FROM student WHERE firstname LIKE $firstname AND lastname LIKE $lastname;";
      db.serialize(function() {
        db.each(FIND_TABLE,{
          $firstname: firstname,
          $lastname: lastname
        }, function(err,row) {
          if(err) {
            console.log(err);
          } else {
            console.log(`${row.id}|${row.firstname}|${row.lastname}|${row.birthdate}`);
          }
        });
      });

  }

  selectByAttr(fields){
    let SELECT_TABLE = `SELECT ${fields} FROM student`;
      db.serialize(function() {
        db.each(SELECT_TABLE, function(err,row) {
          if(err) {
            console.log(err);
          } else {
            console.log(row);
          }
        });
      });


  }

  getBirthdayByThisMonth(){
    let MONTH_TABLE = "SELECT * FROM student WHERE strftime('%m', birthdate) = strftime('%m', 'now')";
      db.serialize(function() {
        db.all(MONTH_TABLE, function(err,row) {
          if(err) {
            console.log(err);
          } else {
            console.log(row);
          }
        });
      });


  }

  sortBirthday(){
    let SORT_TABLE = "SELECT * FROM student ORDER BY birthdate ASC;";
      db.serialize(function() {
        db.all(SORT_TABLE, function(err,row) {
          if(err) {
            console.log(err);
          } else {
            console.log(row);
          }
        });
      });
  }

  help(){
    console.log("> addStudents(firstname,lastname,birthdate)");
    console.log("> showStudents()");
    console.log("> updateStudents(firstname,lastname,birthdate,id)");
    console.log("> deleteStudents(id)");
    console.log("> findByName(firstname,lastname)");
    console.log("> selectByAttr(attribute)");
    console.log("> getBirthdayByThisMonth()");
    console.log("> sortBirthday");
  }

}


let command = repl.start("> ");

var student = new Students();

command.context.addStudents = student.addStudents;
command.context.showStudents = student.showStudents;
command.context.updateStudents = student.updateStudents;
command.context.deleteStudents = student.deleteStudents;
command.context.findByName = student.findByName;
command.context.selectByAttr = student.selectByAttr;
command.context.getBirthdayByThisMonth = student.getBirthdayByThisMonth;
command.context.sortBirthday = student.sortBirthday;
command.context.help = student.help;
