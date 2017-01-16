"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db'
var db = new sqlite.Database(file)



// write your code here

class Student{
  constructor(){

  }

  helpMenu(){
    console.log(`create_table()  ----> membuat tabel`)
    console.log(`add_data('Nama_Depan', 'Nama_Belakang', 'Tanggal_Lahir(YYYY-MM-DD)')  ----> Menambahkan data pada tabel yang sudah ada`)
    console.log(`show_data() ----> Menampilkan data`)
    console.log(`delete_data(id) ----> Menghapus data berdasarkan urutan data yang diinput`)
    console.log(`find_data_name('nama_yang_dicari') ----> Menampilkan data berdasarkan nama`)
    console.log(`find_data('kata_kunci') ----> Menampilkan data berdasarkan kata_kunci`)
    console.log(`birthday_this_month() ----> Menampilkan nama-nama yang berulang tahun bulan ini`)
    console.log(`sort_by_birthday() ----> Menampilkan data secara berurutan berdasarkan bulan kelahiran`)
    console.log(`help() ----> Menu help`)
  }

  createTable(){

    var createTableData = 'CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)';

    db.serialize(function() {
      // Create Table
      db.run(createTableData, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Table created');
        }
      })
    })
    return true
  }

  showStudent(){

    var showData = `SELECT * FROM student;`;

    db.serialize(function() {
      db.each(showData, function (err,row) {
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.birthdate}`)
        if (err) {
          console.log(err);
        }
      })
    })
    return true
  }

  addStudentDetails(firstname, lastname, birthdate){

    var addData = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`;

    db.serialize(function() {
      db.run(addData, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Data added');
        }
      })
    })
    return true
  }

  deleteStudent(id){

    var deleteData = `DELETE FROM student WHERE id = '${id}';`;

    db.serialize(function() {
      db.run(deleteData, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Data has been erased');
        }
      })
    })
    return true
  }

  findByName(stringName){

    var findData = `SELECT * FROM student WHERE firstname LIKE '${stringName}' OR lastname LIKE '${stringName}';`;

    db.serialize(function() {
      db.each(findData, function (err,row) {
        if (err) {
          console.log(err);
        }else{
          console.log(`Data ditemukan : \n${row.id} - ${row.firstname} ${row.lastname} - ${row.birthdate}`)
        }
      })
    })
    return true
  }

  selectByAttr(fields){ // ex. [firstname,lastname,birtdate]

    var findData = `SELECT * FROM student WHERE firstname LIKE '${fields}' OR lastname LIKE '${fields}' OR birthdate LIKE '${fields}';`

    db.serialize(function() {
      db.each(findData, function (err,row) {
        if (err) {
          console.log(err);
        }else{
          console.log(`Data ditemukan : \n${row.id} - ${row.firstname} ${row.lastname} - ${row.birthdate}`)
        }
      })
    })
    return true
  }

  getBirthdayByThisMonth(){

    var getBirthdate = `SELECT * FROM student WHERE STRFTIME('%m', birthdate) = STRFTIME('%m', 'now');`;
    console.log(`Nama-nama yang berulang tahun di bulan ini :`)
    db.serialize(function() {
      db.each(getBirthdate, function (err,row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(`${row.firstname} ${row.lastname}`);
        }
      })
    })
    return true
  }

  sortBirthday(){

    var sortBirthdate = `SELECT * FROM student ORDER BY STRFTIME('%m', birthdate);`;
    //console.log(`Nama-nama yang berulang tahun di bulan ini :`)
    db.serialize(function() {
      db.each(sortBirthdate, function (err,row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      })
    })
    return true
  }
}

var studentData = new Student()
var start = repl.start('> ')



start.context.create_table = studentData.createTable
start.context.add_data = studentData.addStudentDetails
start.context.show_data = studentData.showStudent
start.context.delete_data = studentData.deleteStudent
start.context.find_data_name = studentData.findByName
start.context.find_data = studentData.selectByAttr
start.context.birthday_this_month = studentData.getBirthdayByThisMonth
start.context.sort_by_birthday = studentData.sortBirthday
start.context.help = studentData.helpMenu
//start.context.seedData = seedData
