"use strict"

const repl   = require('repl');
const sqlite = require('sqlite3').verbose();

var file  = "student.db";
var db    = new sqlite.Database(file);

// write your code here
class Student {
  constructor(firstname, lastname, birthdate) {
    this.firstname  = firstname;
    this.lastname   = lastname;
    this.birthdate  = birthdate;
  }

//View all student
  static showStudent(){
    let viewStudent = "SELECT * FROM student";
    db.serialize(function(){
      db.each(viewStudent, function(err, row){
        console.log(`\nID : ${row.id}\nName : ${row.firstname} ${row.lastname}\nBirthdate : ${row.birthdate}`);
        if(err){console.log(err);
        }else{console.log("View student is sucsess!!")}
      });
    });
  }

//Insert new student
  static addStudent(firstname, lastname, birthdate){
    let insertStudent = `INSERT INTO student(firstname, lastname, birthdate)VALUES('${firstname}','${lastname}','${birthdate}');`;
    db.serialize(function(){
      db.run(insertStudent, function(err){
        if(err){console.log(err);
        }else{console.log("Insert student is sucsess!!")}
      });
    });
  }

//Update student value
  static updateStudent(firstname, lastname, birthdate, id){
    let updateStudent = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate='${birthdate}' WHERE id = ${id};`;
    db.serialize(function(){
      db.run(updateStudent, function(err){
        if(err){console.log(err);
        }else{console.log("Update student is sucsess!!")}
      });
    });
  }

//Delete student
  static deleteStudent(id){
    let deletedStudent = `DELETE FROM student WHERE id = '${id}';`;
    db.serialize(function(){
      db.run(deletedStudent, function(err){
        if(err){console.log(err);
        }else{console.log(`ID ${id} Deleted is sucsess!!`)}
      });
    });
  }

  static findByName(name){
    let findStudent = `SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}';`;
    db.serialize(function(){
      db.each(findStudent, function(err,row){
        if(err){console.log(err)
        }else{console.log(`\nID : ${row.id}\nName : ${row.firstname} ${row.lastname} \nBrithdate : ${row.birthdate}`)}
      });
    });
  }

  // ex. [firstname, lastname, birthdate]
  static selectByAttr(fields){
    let selectStudent = `SELECT '${fields}' FROM student`;
    db.serialize(function(){
      db.each(selectStudent, function(err, row){
        if(err){console.log(err)
        }else{console.log(row)}
      });
    });
  }

  //get Birthday By ThisMonth
  static getBirthdayByThisMonth(){
    let getBirthday = `SELECT * FROM student WHERE STRFTIME('%m', birthdate) = STRFTIME('%m','now');`;
    db.serialize(function(){
      db.each(getBirthday, function(err, row){
        if(err){console.log(err)
        }else{console.log(row)}
      });
    });
  }
// `SELECT * FROM student  order by birthdate
  static sortBirthday(){
    let sortBirthday = `SELECT * FROM student ORDER BY STRFTIME('%m', birthdate);`;
    db.serialize(function(){
      db.each(sortBirthday, function(err, row){
        if(err){console.log(err)
        }else{console.log(row)}
      });
    });
  }

//Menu Help
  static help(){
    console.log('SHOW ALL STUDENTS....................: showStudent()');
    console.log('FIND STUDENT BY NAME (FIRST OR LAST).: findByName()');
    console.log('ADD NEW STUDENT......................: addStudent(\'firstname\', \'lastname\', \'birthdate YYYY-MM-DD\')');
    console.log('REMOVE STUDENT.......................: deleteStudent(id)  ');
    console.log('UPDATE STUDENT\'s DETAIL..............: updateStudent(\'firstname\', \'lastname\', \'birthdate YYYY-MM-DD\', \'id\')  ');
    console.log('GET BIRTHDAY BY THIS MONTH...........: getBirthdayByThisMonth() ')
    console.log('SORT BIRTHDAY BY MONTH...............: sortBirthday()');
  }
}

let start = repl.start('> ');
start.context.showStudent   = Student.showStudent
start.context.addStudent    = Student.addStudent
start.context.deleteStudent = Student.deleteStudent
start.context.updateStudent = Student.updateStudent
start.context.findByName    = Student.findByName
start.context.selectByAttr  = Student.selectByAttr
start.context.sortBirthday  = Student.sortBirthday
start.context.help          = Student.help

start.context.getBirthdayByThisMonth   = Student.getBirthdayByThisMonth
start.sortBirthday                     = Student.sortBirthday
