const mysql = require('mysql');
const initial = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

initial.connect();

initial.query("CREATE DATABASE IF NOT EXISTS Labb1Backend",function(error){if (error) {throw error;}})

initial.end()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "Labb1Backend"
});

connection.connect();

//connection.query("DROP TABLE IF EXISTS Course", function(error){if (error) {throw error;}})
connection.query("CREATE TABLE IF NOT EXISTS Course (id Int NOT NULL PRIMARY KEY, coursecode varchar(8), coursename varchar(60), syllabus varchar(80), progression varchar(1))", function(error){if (error) {throw error;}})

connection.query("SELECT id FROM Course WHERE id = 1", function(error, results) {
    if (error) {
        throw error;
    }
    //creates base template if empty
    if (!results[0]) {
        create();
    }
    debug();
})

function create() {
    connection.query("INSERT Course VALUES (1,'DT057G','Webbutveckling I','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/','A')",function(error){if (error) {throw error;}})
    connection.query("INSERT Course VALUES (2,'DT084G','Introduktion till programmering i JavaScript','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/','A')",function(error){if (error) {throw error;}})
    connection.query("INSERT Course VALUES (3,'DT200G','Grafisk teknik för webb','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/','A')",function(error){if (error) {throw error;}})
    connection.query("INSERT Course VALUES (4,'DT068G','Webbanvändbarhet','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/','B')",function(error){if (error) {throw error;}})
    connection.query("INSERT Course VALUES (5,'DT003G','Databaser','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/','A')",function(error){if (error) {throw error;}})   
    console.log("ran")
}

module.exports = function ask(question){
    connection.query(question, function (error, result) {  
        if (error) {
            throw error;
        }
        return result;
    })
}

function debug() {
    connection.query("SELECT id FROM course AS test", function(error, results) {
        if (error) {
            throw error;
        }
        console.log(results);
    });
}

