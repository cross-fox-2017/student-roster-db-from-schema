"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = "student.db"
let db = new sqlite3.Database(file);

class Student {

  static updateData (firstname, lastname, birthdate, id) {
    let UPDATE_DATA = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = ${id}`
    db.serialize(function() {
      db.run(UPDATE_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Update Data Success!")
        }
      })
    })
  }

  static deleteData (id) {
    let DELETE_DATA = `DELETE FROM student WHERE id = ${id}`
    db.serialize(function() {
      db.run(DELETE_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Delete ID = ${id}, Success!`)
        }
      })
    })
  }

  static readAllData () {
    let SELECT_ALL = `SELECT * FROM student`
    console.log(SELECT_ALL);
    db.serialize(function() {
      db.each(SELECT_ALL, function(err,row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row);
        }
      })
    })
  }

  static readData1 (firstname, lastname) {
    let SELECT_NAME = `SELECT * FROM student WHERE firstname = '${firstname}' AND lastname = '${lastname}'`
    db.serialize(function() {
      db.each(SELECT_NAME, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row);
        }
      })
    })
  }

  static selectByAttr (name) {
    let SELECT_ATTR = `SELECT ${name} FROM student`
    db.serialize(function() {
      db.each(SELECT_ATTR, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }

  static getBirthdayByThisMonth() {
    let date = new Date();
    let now = date.getMonth();
    now++
    let SELECT_BIRTHDAY = `SELECT * FROM student WHERE strftime('%m', birthdate) = '0${now}'`
    db.serialize(function() {
      db.each(SELECT_BIRTHDAY, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }

  static sortBirthday() {
    let SORT_BIRTHDAY = `SELECT * FROM student ORDER BY birthdate DESC`
    db.serialize(function() {
      db.each(SORT_BIRTHDAY, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }

  static help() {
    let help = "1. createTable()\n2. insertData(firstname, lastname, birthdate)\n3. updateData(firstname, lastname, birthdate, id)\n4. deleteData(id)\n5. readAllData()\n6. readData1(firstname, lastname)\n7. selectByAttr(attr)\n8. getBirthdayByThisMonth()\n9. sortBirthday()\n10. help()"
    return console.log(help)
  }
}

let command = repl.start("> ")

command.context.createTable = Student.createTable;
command.context.insertData = Student.seedData;
command.context.updateData = Student.updateData;
command.context.deleteData = Student.deleteData;
command.context.readAllData = Student.readAllData;
command.context.readData1 = Student.readData1;
command.context.readAttr = Student.selectByAttr;
command.context.getBirthdayByThisMonth = Student.getBirthdayByThisMonth;
command.context.sortBirthday = Student.sortBirthday;
command.context.help = Student.help;
