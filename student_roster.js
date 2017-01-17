"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = "student.db";
let db = new sqlite3.Database(file);

// write your code here
class Student {
  static addStudent (first, last, birth) {
    let add = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${first}', '${last}', '${birth}');`;
    db.serialize(function () {
      db.run(add, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(add);
        }
      });
    });
  }

  static updateStudent (id, attribute, value) {
    let update = `UPDATE student SET ${attribute} = '${value}' WHERE student.id = ${id};`;
    db.serialize(function () {
      db.run(update, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(update);
        }
      });
    });
  }

  static deleteStudent (id) {
    let deleteData = `DELETE FROM student WHERE student.id = ${id};`;
    db.serialize(function () {
      db.run(deleteData, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(deleteData);
        }
      });
    });
  }

  static showStudent () {
    let show = `SELECT * FROM student`;
    db.serialize(function () {
      db.each(show, function (err, row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });
    });
  }

  static findName (name) {
    let show = `SELECT * FROM student WHERE firstname LIKE '%${name}%' OR lastname LIKE '%${name}%'`;
    db.serialize(function () {
      db.each(show, function (err, row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });
    });
  }

  static findAttribute (attribute) {
    // Cara lain:
    // let show = 'SELECT ';
    // for (let i = 0; i < variable.length; i++) {
    //   show += `${variable[i]}`;
    //   if (i != variable.length-1) {
    //     show += ',';
    //   }
    // }
    // show += ' FROM student'
    let show = `SELECT ${attribute} FROM student`;
    db.serialize(function () {
      db.each(show, function (err, row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });
    });
  }

  static findBirthdayByThisMonth () {
    // Cara lain:
    // new date = new Date()
    // new month = date.getMonth();
    // month++ (karena dapetnya berupa index)
    let show = `SELECT * FROM student WHERE strftime('%m', birthdate) = strftime('%m', 'now')`;
    db.serialize(function () {
      db.each(show, function (err, row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });
    });
  }

  static sortBirthday () {
    let show = `SELECT * FROM student ORDER BY birthdate desc`;
    db.serialize(function () {
      db.each(show, function (err, row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });
    });
  }

  static help () {
    let show = `showStudent ()\naddStudent (firstname, lastname, birthdate)\nupdateStudent (id, attribute, value)\ndeleteStudent (id)\nfindName (name)\nfindAttribute (attribute)\nfindBirthdayByThisMonth ()\nsortBirthday ()\nhelp ()`;
    console.log(show);
  }
}

let replCommand = repl.start("> ");
replCommand.context.addStudent = Student.addStudent;
replCommand.context.updateStudent = Student.updateStudent;
replCommand.context.deleteStudent = Student.deleteStudent;
replCommand.context.showStudent = Student.showStudent;
replCommand.context.findName = Student.findName;
replCommand.context.findAttribute = Student.findAttribute;
replCommand.context.findBirthdayByThisMonth = Student.findBirthdayByThisMonth;
replCommand.context.sortBirthday = Student.sortBirthday;
replCommand.context.help = Student.help;
