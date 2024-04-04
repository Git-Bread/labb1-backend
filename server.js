const express = require("express");
const app = express();
const port = process.env.port | 3000;

app.set("view engine", "ejs");
app.use(express.static("content"));

app.listen(port, () => {console.log("running")});


//sql
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

function ask(question){
    return new Promise((resolve, reject) => {
        try {
            connection.query(question, function (error, result) {  
                if (error) {
                    return reject(error);
                }
                return resolve(result);
                })   
        } catch (e) {
            reject(e)
        }
    })
}

function debug() {
    connection.query("SELECT COUNT(id) FROM course", function(error, results) {
        if (error) {
            throw error;
        }
        console.log(results);
    });
}



//route
app.get("/", async function name(req, res) {
    res.render("index", {
        content: await ask("SELECT * FROM Course")
    });
})

app.get("/add.ejs", async function name(req, res) {
    res.render("add", {
        content: await ask("SELECT * FROM Course")
    });
})

app.get("/about.ejs", async function name(req, res) {
    res.render("about", {
        content: await ask("SELECT * FROM Course")
    });
})