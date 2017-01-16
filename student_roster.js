"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student2.db';
var db = new sqlite.Database(file);

var CREATE_TABLE = `CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)`;

// Create table
db.serialize(function() {
   db.run(CREATE_TABLE, function(err) {
   });
});

console.log("Ketik help() untuk menampilkan perintah");
class Student {
  constructor() {

  }

  addStudent(firstname, lastname, birthdate) {
    var INSERT_STUDENT = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`;
    db.serialize(function() {
      // Create TABLE
      db.run(INSERT_STUDENT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Murid berhasil ditambahkan');
        }
      });
    });
  }

  updateStudent(firstname, lastname, birthdate, id) {
    var UPDATE_STUDENT = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = '${id}' `;
    db.serialize(function() {
      // Create TABLE
      db.run(UPDATE_STUDENT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data murid berhasil dirubah');
        }
      });
    });
  }

  deleteStudent(id) {
    var DELETE_STUDENT = `DELETE FROM student WHERE id = '${id}'`;
    db.serialize(function() {
      // Create TABLE
      db.run(DELETE_STUDENT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data murid sudah dihapus');
        }
      });
    });
  }

  findByName(name) {
    var FIND_STUDENT = `SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}' `;
    db.serialize(function() {
      // Create TABLE
      db.each(FIND_STUDENT, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  selectByAttr(fields) { // ex. firstname, lastname, birthdate
    var SELECTATTR = `SELECT ${fields} from student`;
    db.serialize(function() {
      // Create TABLE
      db.each(SELECTATTR, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  getBirthdayByThisMonth() {
    var date = new Date();
    var month = date.getMonth() + 1;
    // dirubah menjadi string dulu, agari bisa digunakan dalam query
    var baru = String(month);
    if (month.toString().length == 1) {
      baru = "0" + String(month);
    }

    var SELECTBIRTHDAY = `SELECT * FROM student WHERE strftime('%m',"birthdate") = '${baru}' `;
    db.serialize(function() {
      // Create TABLE
      db.each(SELECTBIRTHDAY, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  sortBirthday() {
    var SORT = `SELECT * FROM student ORDER BY strftime('%m, %d', birthdate)`;
    db.serialize(function() {
      // Create TABLE
      db.each(SORT, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  tolong() {
    console.log(`
    DAFTAR PERINTAH:
    -----------------------------------------------------------------
    // showStudent()
    // addStudent(firstname, lastname, birthdate)
    // updateStudent(firstname, lastname, birthdate, id)
    // deleteStudent(id)
    // findByName(name)
    // selectByAttr(fields) ex. (firstname, lastname, birthdate)
    // getBirthdayByThisMonth()
    // sortBirthday()`);
  }
}



var murid = new Student;

var replStr = repl.start('> ')
replStr.context.addStudent = murid.addStudent;
replStr.context.updateStudent = murid.updateStudent;
replStr.context.deleteStudent = murid.deleteStudent;
replStr.context.findByName = murid.findByName;
replStr.context.selectByAttr = murid.selectByAttr;
replStr.context.getBirthdayByThisMonth = murid.getBirthdayByThisMonth;
replStr.context.sortBirthday = murid.sortBirthday;
replStr.context.help = murid.tolong;
