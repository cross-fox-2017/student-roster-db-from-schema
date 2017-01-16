"use strict"

const repl = require('repl'); // optional
const sqlite = require('sqlite3').verbose();

// write your code here
var file = "student.db";
var db = new sqlite.Database(file);

class Student{
  constructor(param){
  this.firstname = param['firstname']
  this.lastname = param['lastname']
  this.gender = param['gender']
  this.birthday = param['birthday']
  this.email = param['email']
  this.phone = param['phone']
  }

  addData(){
    db.run(`INSERT INTO student (firstname, lastname, gender, birthday, email, phone)VALUES('${this.firstname}','${this.lastname}','${this.gender}','${this.birthday}','${this.email}','${this.phone}');`, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Insert Success");
      }
    })
  }

  static deleteData(id){
    db.run(`DELETE FROM student WHERE id=${id}`, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("delete Success");
      }
    })
  }

  static tampilData(){
    db.each(`SELECT * FROM student`, (err, row)=>{
      if(err){
        console.log(err);
      }else{

        console.log(`${row.id}||${row.firstname}||${row.lastname}||${row.gender}||${row.birthday}||${row.email}||${row.phone}`);
      }
    })
  }

  static tampilDataByName(name){
    db.each(`SELECT * FROM student WHERE firstname='${name}'`, (err, row)=>{
      if(err){
        console.log(err);
      }else{
        console.log(`${row.id}||${row.firstname}||${row.lastname}||${row.gender}||${row.birthday}||${row.email}||${row.phone}`);
      }
    })
  }

  static tampilDataBy(atribut,property){
    db.each(`SELECT * FROM student WHERE ${atribut}='${property}'`, (err, row)=>{
      if(err){
        console.log(err);
      }else{

        console.log(`${row.id}||${row.firstname}||${row.lastname}||${row.gender}||${row.birthday}||${row.email}||${row.phone}`);
      }
    })
  }

  static tampilDataByMonth(month){
    db.each(`SELECT * FROM student WHERE birthday LIKE '%${month}%'`, (err, row)=>{
      if(err){
        console.log(err);
      }else{
        console.log(`${row.id}||${row.firstname}||${row.lastname}||${row.gender}||${row.birthday}||${row.email}||${row.phone}`);
      }
    })
  }

  static tampilDataByDay(){
    db.each(`SELECT firstname, strftime('%Y-%m-%d',birthday) as sbirthday FROM student ORDER BY sbirthday`, (err, row)=>{
      if(err){
        console.log(err);
      }else{
          console.log(row.firstname+" "+row.sbirthday);
        // console.log(`${row.id}||${row.firstname}||${row.lastname}||${row.gender}||${row.birthday}||${row.email}||${row.phone}`);
      }
    })
  }
}

// var tambah =[{
//   firstname:"chelsea1",
//   lastname:"islan",
//   gender:"laki",
//   birthday:"1990-10-02",
//   email:"chelsea@gmail.com",
//   phone:"08080808"
// },
// {
//   firstname:"chelsea2",
//   lastname:"islan",
//   gender:"laki",
//   birthday:"1990-8-02",
//   email:"chelsea@gmail.com",
//   phone:"08080808"
// },
// {
//   firstname:"chelsea3",
//   lastname:"islan",
//   gender:"laki",
//   birthday:"1990-5-02",
//   email:"chelsea@gmail.com",
//   phone:"08080808"
// },
// {
//   firstname:"chelsea4",
//   lastname:"islan",
//   gender:"laki",
//   birthday:"1990-10-02",
//   email:"chelsea@gmail.com",
//   phone:"08080808"
// },
// {
//   firstname:"mangku",
//   lastname:"islan",
//   gender:"perempuan",
//   birthday:"1990-10-02",
//   email:"mangku@gmail.com",
//   phone:"05050505"
// }]
//
// var date = new Date();
// var month = date.getMonth()+1;


// var siswa = new Student(tambah[4])
//siswa.tampilData();
//siswa.tampilDataByName("chelsea")
// siswa.addData();
//siswa.deleteData(5);
//siswa.tampilDataBy("phone","05050505")
//siswa.tampilDataByMonth(month)
// siswa.tampilDataByDay()

var replServer = repl.start({prompt: '> '});

replServer.defineCommand('add', {
  help: 'type .add <firstname lastname gender birthday email phone>',
  action: function(data) {
    data = data.split(" ")
    // console.log(data);
    let param = {
      firstname: data[0],
      lastname: data[1],
      gender: data[2],
      birthday: data[3],
      email: data[4],
      phone: data[5]
    }
    let dataBaru = new Student(param)
    dataBaru.addData()
  }
});

replServer.defineCommand('showall', {
  help: 'type .showall',
  action: function(data) {
    Student.tampilData()
  }
});

replServer.defineCommand('delete', {
  help: 'type .delete <student_id>',
  action: function(id){
    Student.deleteData(id)
  }
})

replServer.defineCommand('showbyname', {
  help: 'type .showbyname <student_firstName>',
  action: function(firstname){
    Student.tampilDataByName(firstname)
  }
})

replServer.defineCommand('showby', {
  help: 'type .showby <student_attributes(firstname | lastname | gender | birthday | email | phone) student_where_clause>',
  action: function(data){
    data = data.split(" ")
    Student.tampilDataBy(data[0], data[1])
  }
})

replServer.defineCommand('showbymonth', {
  help: 'type .showbymonth <month_number>',
  action: function(month){
    Student.tampilDataByMonth(month)
  }
})

replServer.defineCommand('showorderbybday', {
  help: 'type .showorderbybday',
  action: function(){
    Student.tampilDataByDay()
  }
})
