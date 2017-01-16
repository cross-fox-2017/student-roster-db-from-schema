"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose()

var file = 'student.db'
var db = new sqlite.Database(file)

//SQL Statement
let ADD_DATA = "INSERT INTO student (firstname,lastname,birthdate) VALUES ($firstname,$lastname,$birthdate)"
let UPDATE_DATA = "UPDATE student SET firstname=$firstname,lastname=$lastname,birthdate=$birthdate WHERE id = $id"
let DELETE_DATA ="DELETE FROM student WHERE id = $id"
let SHOW_DATA ="SELECT * FROM student"
let SEARCH_NAME = "SELECT * FROM student WHERE firstname=$name OR lastname=$name"

class Students{

  static addStudent(firstname,lastname,birthdate){
      db.serialize(function(){
        db.run(ADD_DATA,{
          $firstname: firstname,
          $lastname: lastname,
          $birthdate: birthdate
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log('ADD DATA');
          }
        })
      })
  }

  static updateStudent(firstname,lastname,birthdate,id){
      db.serialize(function(){
        db.run(UPDATE_DATA,{
          $id : id,
          $firstname: firstname,
          $lastname: lastname,
          $birthdate: birthdate
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log('DATA UPDATED');
          }
        })
      })
  }

  static deleteStudent(id){
    db.serialize(function(){
      db.run(DELETE_DATA,{
        $id : id,

      },function(err){
        if(err){
          console.log(err);
        } else{
          console.log('DATA DELETED');
        }
      })
    })
  }

  static showStudent(){
    db.serialize(function(){
      db.each(SHOW_DATA,function(err,row){
        if(err){
          console.log(err);
        } else{
          console.log(`id: ${row.id}\nfirstname : ${row.firstname}\nlastname : ${row.lastname}\nbirthdate : ${row.birthdate}\n`);
        }
      })
    })
  }

  static findByName(name){
    db.serialize(function(){
      db.each(SEARCH_NAME,{
        $name :name

      },function(err,row){
        if(err){
          console.log(err);
        } else{
          console.log(`id: ${row.id}\nfirstname : ${row.firstname}\nlastname : ${row.lastname}\nbirthdate : ${row.birthdate}\n`);
        }
      })
    })
  }

  static selectByAttr(attr){
  db.serialize(function(){
    db.each(`SELECT ${attr} FROM student`,function(err,row){
      if(err){
        console.log(err);
      } else{
        console.log(row);
      }
    })
  })
  }

  static getBirthdayByThisMonth(){
    db.serialize(function(){
      db.each(`SELECT * FROM student WHERE strftime('%m',birthdate)= strftime('%m','now') `,function(err,row){
        if(err){
          console.log(err);
        } else{
          console.log(row);
        }
      })
    })
  }

  static sortBirthday(){
    db.serialize(function(){
      db.each(`SELECT * FROM student ORDER BY strftime('%m , %d',birthdate) `,function(err,row){
        if(err){
          console.log(err);
        } else{
          console.log(row);
        }
      })
    })
  }

  static help(){
    console.log(`showStudent()\naddStudent(firstname, lastname, birthdate)\nupdateStudent(firstname, lastname, birthdate, id)\ndeleteStudent(id)\nfindByName(name)\nselectByAttr(fields) ex. [firstname, lastname, birthdate]\ngetBirthdayByThisMonth()\nsortBirthday()`)
  }

}

var rep = repl.start('> ').context

rep.addStudent = Students.addStudent
rep.updateStudent = Students.updateStudent
rep.deleteStudent = Students.deleteStudent
rep.showStudent = Students.showStudent
rep.findByName = Students.findByName
rep.selectByAttr = Students.selectByAttr
rep.getBirthdayByThisMonth =Students.getBirthdayByThisMonth
rep.sortBirthday = Students.sortBirthday
rep.help=Students.help
