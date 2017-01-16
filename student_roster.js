"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db'
var db = new sqlite.Database(file)

// write your code here
class Student {
  constructor() {

  }
  static help(){
    console.log('SHOW ALL STUDENTS ___________________: show()');
    console.log('FIND STUDENT BY NAME (FIRST OR LAST)_: find()');
    console.log('ADD NEW STUDENT______________________: add(\'firstname\', \'lastname\', \'birthdate YYYY-MM-DD\')');
    console.log('REMOVE STUDENT_______________________: remove(id)  ');
    console.log('UPDATE STUDENT\'s DETAIL______________: update(\'firstname\', \'lastname\', \'birthdate YYYY-MM-DD\', \'id\')  ');
    console.log('GET BIRTHDAY BY THIS MONTH___________: this_month() ')
    console.log('SORT BIRTHDAY BY MONTH_______________: sort_birthday()');
  }

  static createTable() {
    let create_table = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate TEXT);";
    db.serialize(function() {
      db.run(create_table, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('CREATE TABLE');
        }
      })
    })
  }

  static addStudent(firstname, lastname, birthdate) {
    let add = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}','${lastname}','${birthdate}');`;
    db.serialize(function() {
      db.run(add, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('ADDED');
        }
      })
    })
  }

  static showStudent(){
    let show = `SELECT * FROM student`
    db.serialize(function() {
      db.each(show, function (err,row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(`ID :${row.id} \nFIRST NAME : ${row.firstname} \nLAST NAME : ${row.lastname} \nBIRTHDAY DATE : ${row.birthdate}\n\n`);
        }
      })
    })
  }

  static updateStudent(firstname, lastname, birthdate, id){
    let update = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = '${id}';`
    db.serialize(function() {
      db.run(update, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Data has been updated');
        }
      })
    })
  }

  static deleteStudent(id){
    let remove = `DELETE FROM student WHERE id = '${id}';`;
    db.serialize(function() {
      db.run(remove, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(`Student with id : ${id} has been deleted`);
        }
      })
    })
  }

  static findByName(name){
    let find = `SELECT * FROM student WHERE firstname LIKE '${name}' OR lastname LIKE '${name}';`;
    db.serialize(function() {
      db.each(find, function (err,row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(`ID :${row.id} \nFIRST NAME : ${row.firstname} \nLAST NAME : ${row.lastname} \nBIRTHDAY DATE : ${row.birthdate}\n\n`);
        }
      })
    })
  }

  static selectByAttr(fields, values){
    let selectAttr = `SELECT * FROM student WHERE ${fields} LIKE '${values}';`
    db.serialize(function() {
      db.each(selectAttr, function (err,row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(`ID :${row.id} \nFIRST NAME : ${row.firstname} \nLAST NAME : ${row.lastname} \nBIRTHDAY DATE : ${row.birthdate}\n\n`);
        }
      })
    })
  }

  static getBirthdayByThisMonth(){
  let birthdayThisMonth = `SELECT * FROM student WHERE STRFTIME('%m', birthdate) = STRFTIME('%m', 'now');`
  db.serialize(function() {
    db.each(birthdayThisMonth, function (err,row) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`ID :${row.id} \nFIRST NAME : ${row.firstname} \nLAST NAME : ${row.lastname} \nBIRTHDAY DATE : ${row.birthdate}\n\n`);
      }
    })
  })
}

static sortBirthday(){
  let sortBirthday = `SELECT * FROM student ORDER BY STRFTIME('%m', birthdate);`
  db.serialize(function() {
    db.each(sortBirthday, function (err,row) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(`ID :${row.id} \nFIRST NAME : ${row.firstname} \nLAST NAME : ${row.lastname} \nBIRTHDAY DATE : ${row.birthdate}\n\n`);
      }
    })
  })
}

}

var start = repl.start('> ')
start.context.create = Student.createTable
start.context.add = Student.addStudent
start.context.show = Student.showStudent
start.context.remove = Student.deleteStudent
start.context.find = Student.findByName
start.context.update = Student.updateStudent
start.context.help = Student.help
start.context.select_attr = Student.selectByAttr
start.context.this_month = Student.getBirthdayByThisMonth
start.context.sort_birthday = Student.sortBirthday
