"use strict"

//Create Tabel, SeedData
const repl = require('repl')
const sqlite = require('sqlite3').verbose();
var file = 'student.db';
var db = new sqlite.Database(file)

class Student {
    createTable() {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)", function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Create Table Success");
                }
            })
        })
      return true;
    }
    addStudent(fname,lname,bdate) {
      db.serialize(function() {
        let query = `INSERT INTO student(firstname, lastname, birthdate) VALUES ('${fname}','${lname}','${bdate}')`;
          db.run(query, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("INSERT_DATA SUCCESS");
              }
          })
      })
      return true;
    }
    updateStudent(fname,lname,bdate,id) {
      db.serialize(function() {
          db.run(`UPDATE student set firstname='${fname}',lastname='${lname}',birthdate='${bdate}' where id='${id}'`, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("UPDATE_DATA SUCCESS");
              }
          })
      })
      return true;
    }
    deleteStudent(id) {
      db.serialize(function() {
          db.run(`DELETE from student where id='${id}'`, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("DELETE_DATA SUCCESS");
              }
          })
      })
    return true;
    }
    showStudent() {
      db.serialize(function() {
          db.each("SELECT * FROM student", function(err,data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(`ID: ${data.id}\nFirstName :${data.firstname}\nLastName: ${data.lastname}\nBirthDate: ${data.birthdate}`);
              }
          })
      })
    return true;
    }
    findByName(name) {
      db.serialize(function() {
          // db.each(`SELECT * FROM student where firstname LIKE '%${name}%' OR lastname LIKE '%${name}%'`, function(err, data) {
              db.all(`SELECT * FROM student where firstname LIKE '%${name}%' OR lastname LIKE '%${name}%'`, function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  // console.log(`ID: ${data.id}\nFirstName :${data.firstname}\nLastName: ${data.lastname}\nBirthDate: ${data.birthdate}`);
                  console.log(data);
              }
          })
      })
    return true;
    }
    selectByAttr(fields) {
      db.serialize(function() {
          db.each(`SELECT * FROM student where firstname="${fields}" OR lastname="${fields}" OR birthdate="${fields}" OR id="${fields}"`, function(err,data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(`ID: ${data.id}\nFirstName :${data.firstname}\nLastName: ${data.lastname}\nBirthDate: ${data.birthdate}`);
              }
          })
      })
    return true;
    }
    getBirthdayByThisMonth() {
      db.serialize(function() {
          db.each(`SELECT * FROM student where strftime("%m",birthdate) =  strftime("%m","NOW")`, function(err,data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(`ID: ${data.id}\nFirstName :${data.firstname}\nLastName: ${data.lastname}\nBirthDate: ${data.birthdate}`);
              }
          })
      })
    return true;
    }
    sortBirthday() {
      db.serialize(function() {
          db.each(`SELECT * FROM student ORDER BY strftime("%m,%d",birthdate)`, function(err,data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(`ID: ${data.id}\nFirstName :${data.firstname}\nLastName: ${data.lastname}\nBirthDate: ${data.birthdate}`);
              }
          })
      })
    return true;
    }
    help() {
      console.log(`addStudent("sd","sd","1990-01-11")\nupdateStudent("dila", "dilo","1999-09-09","8")\ndeleteStudent("13")\nshowStudent()\nfindByName("di")\nselectByAttr("Diaka")\ngetBirthdayByThisMonth()\nsortBirthday()\nshowStudent()`)
      return true;
    }

}

var newStudent = new Student()
var start = repl.start('> ')
start.context.addStudent = newStudent.addStudent //addStudent pertama boleh dirubah2, tapi addStudent ke 2 harus sama dengan method
start.context.updateStudent = newStudent.updateStudent
start.context.deleteStudent = newStudent.deleteStudent
start.context.showStudent = newStudent.showStudent
start.context.findByName = newStudent.findByName
start.context.selectByAttr = newStudent.selectByAttr
start.context.getBirthdayByThisMonth = newStudent.getBirthdayByThisMonth
start.context.sortBirthday = newStudent.sortBirthday
start.context.help = newStudent.help


// newStudent.addStudent("sd","sd","1990-01-11")
// newStudent.updateStudent("dila", "dilo",1999-09-09,8)
// newStudent.deleteStudent(13)
// newStudent.showStudent()
// newStudent.findByName("di")
// newStudent.selectByAttr("Diaka")
// newStudent.getBirthdayByThisMonth()
// newStudent.sortBirthday()
// newStudent.help()
