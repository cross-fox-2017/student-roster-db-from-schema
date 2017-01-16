"use strict"

var sqlite3 = require('sqlite3').verbose();
var file = "student.db";
var db = new sqlite3.Database(file);
const repl = require ('repl');

// write your code here
class Student{

static addStudent(firstname, lastname, birthdate){
  let ADD_Student = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}','${lastname}','${birthdate}')`
  db.serialize(function(){
    db.run(ADD_Student, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('ADD STUDENT');
      }
    })
  })
}
static updateStudent(firtname, lastname, birthdate, id){
  let UPDATE_Student = `UPDATE student SET firstname ='${firtname}', lastname = '${lastname}', birthdate ='${birthdate}' WHERE id = ${id}`
  db.serialize(function(){
    db.run(UPDATE_Student, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('UPDATE STUDENT');
        }
      })
    })
  }
  static deleteStudent(id){
    let UPDATE_Student = `DELETE FROM student WHERE id = ${id}`
    db.serialize(function(){
      db.run(DELETE_Student, function(err){
        if(err){
          console.log(err);
        }else {
          console.log('DELETE STUDENT');
          }
        })
      })
    }
    static showStudent(id){
      let SHOW_Student = `SELECT * FROM student`
      db.serialize(function(){
        db.all(SHOW_Student, function(err, data){
          if(err){
            console.log(err);
          }else {
            console.log(data);
            }
          })
        })
      }
      static nameStudent(stringName){
        let NAME_Student = `SELECT * FROM student WHERE firstname LIKE '${stringName}' OR lastname LIKE '${stringName}'`
        db.serialize(function(){
          db.each(NAME_Student, function(err, data){
            if(err){
              console.log(err);
            }else {
              console.log(data);
              }
            })
          })
        }
        static atributeStudent(namaKolom, value){
          let ATRIBUTE_Student = `SELECT * FROM student WHERE ${namaKolom} = '${value}'`
          db.serialize(function(){
            db.each(ATRIBUTE_Student, function(err, data){
              if(err){
                console.log(err);
              }else {
                console.log(data);
                }
              })
            })
          }
          static birthStudent(month){
            let BIRTH_Student = `SELECT * FROM student WHERE strftime('%m', birthdate) = '${month}'`
            db.serialize(function(){
              db.each(BIRTH_Student, function(err, data){
                if(err){
                  console.log(err);
                }else {
                  console.log(data);
                  }
                })
              })
            }
            static sortStudent(){
              let SORT_Student = `SELECT * FROM student ORDER BY strftime('%m', birthdate)`
              db.serialize(function(){
                db.each(SORT_Student, function(err, data){
                  if(err){
                    console.log(err);
                  }else {
                    console.log(data);
                    }
                  })
                })
              }
            static help(){
              console.log('addStudent(firstname, lastname, birthdate)');
              console.log('updateStudent(firtname, lastname, birthdate, id))');
              console.log('deleteStudent(id)');
              console.log('showStudent(id)');
              console.log('nameStudent(stringName)');
              console.log('atributeStudent(namaKolom, value)');
              console.log('birthStudent(month)');
              console.log('sortStudent()');


            }
}
let start = repl.start('> ')
start.context.addStudent = Student.addStudent;
start.context.updateStudent = Student.updateStudent;
start.context.deleteStudent = Student.deleteStudent;
start.context.showStudent = Student.showStudent;
start.context.nameStudent = Student.nameStudent;
start.context.atributeStudent = Student.atributeStudent;
start.context.birthStudent = Student.birthStudent;
start.context.sortStudent = Student.sortStudent;
start.context.help = Student.help;


// let addData = new Student()
// addData.addStudent('wahyu','hidayat','1996-09-08');
