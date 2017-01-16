"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const file = 'student.db';
const db = new sqlite.Database(file);

// write your code here

class Student{
  constructor(){
  }

  AddStudent(firstname, lastname, birthdate){
    let QUERY = "INSERT INTO student (firstname, lastname, birthdate) VALUES ($firstname,$lastname,$birthdate);";
    // //write your code here
    db.serialize(function() {
      db.run(QUERY,{
        $firstname: firstname,
        $lastname: lastname,
        $birthdate: birthdate
      },
      function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`TABLE SEEDED \nNAME : ${firstname}\nLAST NAME : ${lastname}\nBIRTH DATE : ${birthdate} `);
        }
      });
    });
  }

  DeleteStudent(id){
    let QUERY = "DELETE FROM student WHERE id = $id;";
    // //write your code here
    db.serialize(function() {
      db.run(QUERY,{
        $id: id
      },
      function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`TABLE DELETE \nID : ${id}`);
        }
      });
    });
  }

  UpdateStudent(id,firstname,lastname,birthdate){
    let QUERY = "UPDATE student SET firstname = $firstname , lastname = $lastname, birthdate = $birthdate WHERE id = $id;";
    // //write your code here
    db.serialize(function() {
      db.run(QUERY,{
        $firstname: firstname,
        $lastname: lastname,
        $birthdate: birthdate,
        $id: id
      },
      function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`TABLE STUDENT UPDATED \nNAME : ${firstname}\nLAST NAME : ${lastname}\nBIRTH DATE : ${birthdate} `);
        }
      });
    });
  }

  ShowStudent(){
    let QUERY = "SELECT * FROM student;";
    // //write your code here
    db.serialize(function() {
      db.all(QUERY,
        function(err,rows) {
          if(err) {
            console.log(err);
          } else {
            console.log(`TABLE STUDENT\n_________________\n`);
            console.log("ID|\t\tFirstName|\tLastName|\tBirthDate");
            for(let i = 0;i < rows.length;i++){
              console.log(rows[i].id+"\t\t"+rows[i].firstname+"\t\t"+rows[i].lastname+"\t\t"+rows[i].birthdate);
            }
          }
        });
      });
  }

  ShowSpecific(firstname, lastname){
    let QUERY = `SELECT id, firstname, lastname FROM student WHERE firstname LIKE '%${firstname}%' OR lastname LIKE '%${lastname}%';`;
    // //write your code here
    db.serialize(function() {
      db.all(QUERY, function(err,rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(`TABLE STUDENT\n_________________\n`);
          console.log("ID|\t\tFirstName|\tLastName");
          for(let i = 0;i < rows.length;i++){
            console.log(rows[i].id+"\t\t"+rows[i].firstname+"\t\t"+rows[i].lastname);
          }
        }
      });
    });
  }

  ShowAttribute(value){
    let QUERY = `SELECT ${value} FROM student;`;
    // //write your code here
    console.log(QUERY);
    db.serialize(function() {
      db.all(QUERY, function(err,rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(`TABLE STUDENT\n_________________\n`);
          console.log(value.toUpperCase()+"\n");
          for(let i = 0;i < rows.length;i++){

            console.log((i+1)+".  "+JSON.stringify(rows[i])+"\n");
          }

        }
      });
    });
  }

  SearchByMonth(){
    let QUERY = "SELECT id, firstname,lastname, birthdate FROM student WHERE strftime('%m', birthdate) = strftime('%m','now');";
    // //write your code here
    db.serialize(function() {
      db.all(QUERY,function(err,rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(`TABLE STUDENT\n_________________\n`);
          console.log("ID|\t\tFirstName|\tLastName|\tBirthDate");
          for(let i = 0;i < rows.length;i++){
            console.log(rows[i].id+"\t\t"+rows[i].firstname+"\t\t"+rows[i].lastname+"\t\t"+rows[i].birthdate);
          }
        }
      });
    });
  }

  SearchByDate(){
    let QUERY = "SELECT id, firstname, lastname ,strftime('%d-%m', birthdate) AS bd FROM student ORDER BY strftime('%m', birthdate) ASC, strftime('%d', birthdate) ASC;";
    // //write your code her
    db.serialize(function() {
      db.all(QUERY,function(err,rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(`TABLE STUDENT\n_________________\n`);
          console.log("ID|\t\tFirstName|\tLastName|\tBirthDate");
          for(let i = 0;i < rows.length;i++){
            console.log(rows[i].id+"\t\t"+rows[i].firstname+"\t\t"+rows[i].lastname+"\t\t"+rows[i].bd);
          }
        }
      });
    });
  }

  Help(){
      console.log("- Help -\n");
      console.log("1. AddStudent(id,firstname,lastname,birthdate)\n2. UpdateStudent(id,firstname,lastname,birthdate)\n3. DeleteStudent(id)\n4. ShowStudent()\n5. ShowSpesific(firstname,lastname)\n6. SearchByMonth()\n7. SearchByDate()\n");
  }
}

let data = new Student()
let relp = repl.start("> ")
relp.context.AddStudent = data.AddStudent
relp.context.UpdateStudent = data.UpdateStudent
relp.context.DeleteStudent = data.DeleteStudent
relp.context.ShowStudent = data.ShowStudent
relp.context.ShowSpecific = data.ShowSpecific
relp.context.ShowAttribute = data.ShowAttribute
relp.context.SearchByMonth = data.SearchByMonth
relp.context.SearchByDate = data.SearchByDate
relp.context.Help = data.Help
