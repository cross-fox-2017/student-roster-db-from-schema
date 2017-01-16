"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'student.db';
var db = new sqlite3.Database(file)
