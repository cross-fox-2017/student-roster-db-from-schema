"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

// write your code here
  class Student {
    constructor(firstname, lastname, birthdate){
      this.firstname = firstname;
      this.lastname = lastname;
      this.birthdate = birthdate;
    }

    static show(){
      let studentquery = "SELECT * FROM student";
      db.serialize(function(){
        db.each(studentquery, function(err, row){
          console.log(`\nID : ${row.id}, Name : ${row.firstname}, Lastname : ${row.lastname}, Birthdate : ${row.birthdate}`);
          if(err){
            console.log(err);
          }else{
            console.log("Sucsess!!")
          }
        });
      });
    }

    static add(firstname, lastname, birthdate){
       let addquery = `INSERT INTO student(firstname, lastname, birthdate)VALUES('${firstname}','${lastname}','${birthdate}');`;
       db.serialize(function(){
         db.run(addquery, function(err){
           if(err){console.log(err);
           }else{
             console.log("Sucsess!!")
           }
         });
       });
     }

     static updateStudent(firstname, lastname, birthdate, id){
        let updatequery = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate='${birthdate}' WHERE id = ${id};`;
        db.serialize(function(){
          db.run(updatequery, function(err){
            if(err){console.log(err);
            }else{
              console.log("Sucsess!!")
            }
          });
        });
      }

      static deleteStudent(id){
         let deletequery = `DELETE FROM student WHERE id = '${id}';`;
         db.serialize(function(){
           db.run(deletequery, function(err){
             if(err){console.log(err);
             }else{
               console.log("Sucsess!!")
             }
           });
         });
       }

       static findByName(name){
         let findquery = `SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}';`;
          db.serialize(function(){
            db.each(findquery, function(err,row){
              if(err){console.log(err);
              }else{
                console.log(`ID : ${row.id}, Name : ${row.firstname}, Lastname : ${row.lastname}, Birthdate : ${row.birthdate}`)
              }
            });
          });
        }

        static findByAttr(fields){
          let attrquery = `SELECT '${fields}' FROM student`;
           db.serialize(function(){
             db.each(attrquery, function(err,row){
               if(err){console.log(err);
               }else{
                 console.log(row);
               }
             });
           });
         }

          static birthday(){
            let birthdayquery = `SELECT * FROM student WHERE STRFTIME('%m', birthdate) = STRFTIME('%m','now');`;
              db.serialize(function(){
                db.each(birthdayquery, function(err, row){
                  if(err){console.log(err)
                }
            else{console.log(row)}
            });
          });
        }

          static sortBirthday(){
            let sortquery = `SELECT * FROM student ORDER BY STRFTIME('%m', birthdate);`;
            db.serialize(function(){
              db.each(sortquery, function(err, row){
                if(err){console.log(err)
                }else{console.log(row)}
              });
            });
          }

          static help(){
            console.log('SHOW ALL STUDENTS....................: show()');
            console.log('FIND STUDENT BY NAME (FIRST OR LAST).: add()');
            console.log('ADD NEW STUDENT......................: updateStudent(\'firstname\', \'lastname\', \'birthdate YYYY-MM-DD\')');
            console.log('REMOVE STUDENT.......................: deleteStudent(id)  ');
            console.log('UPDATE STUDENT\'s DETAIL..............: findByName(\'firstname\', \'lastname\', \'birthdate YYYY-MM-DD\', \'id\')  ');
            console.log('GET BIRTHDAY BY THIS MONTH...........: findByAttr() ')
            console.log('SORT BIRTHDAY BY MONTH...............: birthday()');
            console.log('SORT BIRTHDAY BY MONTH...............: sortBirthday()');
          }



}

let start = repl.start('> ');
start.context.show = Student.show
start.context.add = Student.add
start.context.updateStudent = Student.updateStudent
start.context.deleteStudent = Student.deleteStudent
start.context.findByName = Student.findByName
start.context.findByAttr = Student.findByAttr
start.context.birthday = Student.birthday
start.context.sortBirthday = Student.sortBirthday
start.context.help = Student.help
