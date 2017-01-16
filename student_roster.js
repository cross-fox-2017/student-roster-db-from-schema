"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'student2.db';
var db = new sqlite.Database(file);

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, gender TEXT,birthdate DATE)";
db.serialize(function() {
  db.run(CREATE_TABLE, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('TABLE CREATED');
    }
  });
});


class Student {
  constructor() {

  }

  showStudent() {
    var SHOW_STUDENT = `SELECT * FROM student;`
    db.serialize(function() {
      db.each(SHOW_STUDENT, function(err,row) {
        if (err) {
          console.log(err);
        } else {
          console.log(`id: ${row.id} \n firstname: ${row.firstname} \n lastname: ${row.lastname} \n birthdate: ${row.birthdate} \n gender: ${row.gender}`);
        }
      });
    });
  }

  addStudent(firstname, lastname, birthdate) {
    let ADD = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`

    db.serialize(function() {
      db.run(ADD, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('student added');
        }
      });
    });
  }


  updateStudent(firstname, lastname, birthdate, id) {
    var UPDATE_STUDENT = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = '${id}'`
    db.serialize(function() {
      db.run(UPDATE_STUDENT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Student Data Updated');
        }
      });
    });
  }

  deleteStudent(id){
    var DELETE_STUDENT = `DELETE FROM student WHERE id = '${id}'`
    db.serialize(function() {
      db.run(DELETE_STUDENT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Student Data deleted');
        }
      });
    });
  }

  findByName(name) {
    var FIND_BY_NAME = `SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}'`
    db.serialize(function() {
      db.each(FIND_BY_NAME, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  selectByAttr(fields){
    var SELECT_ATTR = `SELECT ${fields} from student`
    db.serialize(function() {
      db.each(SELECT_ATTR, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  getBirthdayByThisMonth(){
    var date = new Date()
    var month = date.getMonth() + 1;
    var strMonth = String(month)
    if (month.toString().length == 1) {
      strMonth = '0' + String(month)
    }
    var GET_BIRTHDAY_MONTH = `SELECT * FROM student WHERE strftime('%m',"birthdate") = '${strMonth}'`
    db.serialize(function() {
      db.each(GET_BIRTHDAY_MONTH, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  sortBirthday(){
    var SORT = `SELECT * FROM student ORDER BY strftime('%m, %d', birthdate)`
    db.serialize(function() {
      db.each(SORT, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  help() {
    console.log(`
    help:
    -----------------------------------------------------------------
    showStudent()
    addStudent(firstname, lastname, birthdate)
    updateStudent(firstname, lastname, birthdate, id)
    deleteStudent(id)
    findByName(name)
    selectByAttr(fields) ex. (firstname, lastname, birthdate)
    getBirthdayByThisMonth()
    sortBirthday()`);
  }

}


var murid = new Student();

var replStr = repl.start('> ')
replStr.context.addStudent = murid.addStudent;
replStr.context.showStudent = murid.showStudent;
replStr.context.updateStudent = murid.updateStudent;
replStr.context.findByName = murid.findByName;
replStr.context.selectByAttr = murid.selectByAttr;
replStr.context.getBirthdayByThisMonth = murid.getBirthdayByThisMonth;
replStr.context.sortBirthday = murid.sortBirthday;
replStr.context.help = murid.help;
