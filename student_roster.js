"use strict"

const sqlite3 = require("sqlite3").verbose();
const file = "student.db";
const db = new sqlite3.Database(file);
const repl = require('repl')

// write your code here
class Student {

  static addData (firstname, lastname, birthdate) {
    let ADD_DATA = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;
    db.serialize(function() {
      db.run(ADD_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('ADD DATA');
        }
      })
    })
  }

  static editData (id, firstname, lastname, birthdate) {
    let EDIT_DATA = `UPDATE student SET firstname='${firstname}', lastname='${lastname}', birthdate='${birthdate}' WHERE id='${id}'`;
    db.serialize(function() {
      db.run(EDIT_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('EDIT DATA');
        }
      })
    })
  }

  static deleteData (id) {
    let DELETE_DATA = `DELETE FROM student WHERE id='${id}'`;
    db.serialize(function() {
      db.run(DELETE_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('DELETE DATA');
        }
      })
    })
  }

  static showData () {
    let SHOW_DATA = `SELECT * FROM student`;
    db.serialize(function() {
      db.each(SHOW_DATA, function(err,row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static showName (val) {
    let SHOW_NAME = `SELECT * FROM student WHERE firstname LIKE '%${val}%' OR lastname LIKE '%${val}%'`; // apakah ini yg diminta
    db.serialize(function() {
      db.each(SHOW_NAME, function(err,row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static search (columnName, val) {
    let SEARCH = `SELECT * FROM student WHERE ${columnName}='${val}'`;
    db.serialize(function() {
      db.each(SEARCH, function(err,row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static searchMonth (month) {
    let SEARCH_MONTH = `SELECT * FROM student WHERE strftime('%m', birthdate) ='${month}'`;
    db.serialize(function() {
      db.each(SEARCH_MONTH, function(err,row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static sortMonth () {
    let SORT_MONTH = `SELECT * FROM student ORDER BY CAST(strftime('%m', birthdate) AS INTEGER)`;
    db.serialize(function() {
      db.each(SORT_MONTH, function(err,row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static help () {
    console.log('addData(firstname, lastname, birthdate)')
    console.log('editData(firstname, lastname, birthdate)')
    console.log('deleteData(id)')
    console.log('showData()')
    console.log('showName(val)')
    console.log('search(columnName, val)')
    console.log('searchMonth(month)')
    console.log('sortMonth()')
  }

}


const start = repl.start('> ')
start.context.addData = Student.addData
start.context.editData = Student.editData
start.context.deleteData = Student.deleteData
start.context.showData = Student.showData
start.context.showName = Student.showName
start.context.search = Student.search
start.context.searchMonth = Student.searchMonth
start.context.sortMonth = Student.sortMonth
start.context.help = Student.help
