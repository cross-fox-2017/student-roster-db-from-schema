"use strict"

const repl       = require('repl');
const sqlite     = require('sqlite3').verbose();
let file         = 'student.db';
let db           = new sqlite.Database(file);

// write your code here
class Student{

  // SHOW Data Student
  showStudent(){
    let showDataStudent = `SELECT * FROM student;`;
      db.serialize(function() {
        db.all(showDataStudent,
        function(err, row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  // ADD Data student
  addStudent(firstname, lastname, birthdate){
    let addDataStudent = `INSERT INTO student (firstname, lastname, birthdate) VALUES ($firstname,$lastname,$birthdate);`;
      db.serialize(function() {
        db.run(addDataStudent, {
          $firstname : firstname,
          $lastname  : lastname,
          $birthdate : birthdate
        },
        function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('addDataStudent');
        }
      });
    });
  }

  // UPDATE Data student
  updateStudent(firstname, lastname, birthdate, id){
    let updateDataStudent = `UPDATE student SET firstname=$firstname, lastname=$lastname, birthdate=$birthdate WHERE $id=id;`;
      db.serialize(function() {
        db.each(updateDataStudent, {
          $firstname : firstname,
          $lastname  : lastname,
          $birthdate : birthdate,
          $id        : id
        },
        function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('updateDataStudent');
        }
      });
    });
  }

  // DELETE Data Student
  deleteStudent(id){
    let deleteDataStudent = `DELETE FROM student WHERE id=$id;`;
      db.serialize(function() {
        db.each(deleteDataStudent, {
          $id : id
        },
        function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('deleteDataStudent');
        }
      });
    });
  }

   // FIND Data Student
  findByName(firstname, lastname){
    let findDataStudent = `SELECT * FROM student WHERE firstname LIKE $firstname AND lastname LIKE $lastname;`;
      db.serialize(function() {
        db.each(findDataStudent, {
          $firstname : firstname,
          $lastname : lastname,
        },
      function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('findDataStudent');
        }
      });
    });
  }

  // SELECT ATTRIBUT Data Student
  selectByAttr(fields){
    let selectAttrStudent = `SELECT ${fields} FROM student;`;
      db.serialize(function() {
        db.each(selectAttrStudent,
          function(err, row) {
          if(err) {
            console.log(err);
          } else {
            console.log(row);
        }
      });
    });
  }

  // GET BIRTHDAY MONTH Student
  getBirthdayByThisMonth(month){
    let getBirthMonthStudent = `SELECT * FROM student WHERE strftime('%m', birthdate) = strftime('%m', 'now');`;
      db.serialize(function() {
        db.each(getBirthMonthStudent,
          function(err, row) {
          if(err) {
            console.log(err);
          } else {
            console.log(row);
        }
      });
    });
  }

  // SORT BIRTHDAY Student
  sortBirthday(){
    let getBirthMonthStudent = `SELECT * FROM student ORDER BY birthdate ASC;`;
      db.serialize(function() {
        db.each(getBirthMonthStudent,
          function(err, row) {
          if(err) {
            console.log(err);
          } else {
            console.log(row);
        }
      });
    });
  }
}

let command = repl.start("> ")
let result  = new Student();

command.context.showStudent            = result.showStudent;
command.context.addStudent             = result.addStudent;
command.context.updateStudent          = result.updateStudent;
command.context.deleteStudent          = result.deleteStudent;
command.context.findByName             = result.findByName;
command.context.selectByAttr           = result.selectByAttr;
command.context.getBirthdayByThisMonth = result.getBirthdayByThisMonth;
command.context.sortBirthday           = result.sortBirthday;
