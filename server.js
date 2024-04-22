const express = require("express");
const app = express();
const port = process.env.port | 3000;

app.set("view engine", "ejs");
app.use(express.static("content"));
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



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

connection.query("SELECT id FROM Course", function(error, results) {
    if (error) {
        throw error;
    }
    //creates base template if empty
    if (!results[0]) {
        create();
    }
})

function create() {
    connection.query("INSERT Course VALUES (1,'DT057G','Webbutveckling I','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/','A')",function(error){if (error) {throw error;}})
    connection.query("INSERT Course VALUES (2,'DT084G','Introduktion till programmering i JavaScript','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/','A')",function(error){if (error) {throw error;}})
    connection.query("INSERT Course VALUES (3,'DT200G','Grafisk teknik för webb','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/','A')",function(error){if (error) {throw error;}})
    connection.query("INSERT Course VALUES (4,'DT068G','Webbanvändbarhet','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/','B')",function(error){if (error) {throw error;}})
    connection.query("INSERT Course VALUES (5,'DT003G','Databaser','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/','A')",function(error){if (error) {throw error;}})   
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

async function newEntry(values){
    let val = values.progression;
    let pattern = /[a-c]/;
    val = val.toLowerCase();

    //progression check
    //checks lenght of string
    if (val.length > 1) {
        return ("för lång progression, en symbol tack");
    }
    
    //checks content of string
    if (!pattern.test(val)) {
        console.log(val);
        console.log(pattern.test(val));
        return ("invalid progression (a, b, c är correkta)");
    }
    values.progression = values.progression.toUpperCase();

    let cont = await ask("SELECT id FROM Course");

    //id check
    for (let index = 0; index < cont.length; index++) {
        if (cont[index].id == values.id) {
            return ("invalidt Id, måste vara ett unikt id som inte används")
        }
    }

    //name check
    if (values.newName == "") {
        return ("det måste finnas ett namn")
    }

    if (values.sylla == "") {
        return ("det måste finnas en syllabus")
    }

    if (values.code == "") {
        return ("det måste finnas en kurskod")
    }


    connection.query("INSERT Course VALUES ('" + values.id + "','"+ values.code +"','"+ values.newName +"','"+ values.sylla + "','"+ values.progression +"')",function(error){if (error) {throw error;}})   
    return;
}

app.post("/add",  async function name(req, res) {
    let val = await newEntry(req.body);
    if (val != undefined) {
        console.log(val);
        return res.json({error: val});
    }
    res.redirect("/add.ejs");
})

async function removeEntry(values){
    if (!values.code) {
        return 0;
    }
    connection.query("DELETE FROM Course WHERE id=" + values.code, function(error){if (error) {throw error;}})   
    return 0;
}

//route get
app.get("/", async function name(req, res) {
    res.render("index", {
        content: await ask("SELECT * FROM Course")
    });
})

app.post("/remove",  async function name(req, res) {
    await removeEntry(req.body);
    res.redirect("/");
})

app.get("/add.ejs", async function name(req, res) {
    let cont = await ask("SELECT id FROM Course");
    let numArr = [];

    for (let index = 0; index < cont.length; index++) {
        numArr.push(cont[index].id);
    }

    res.render("add", {
        content: await ask("SELECT * FROM Course"),
        idnum: numArr,
        alert: null
    });
})

app.get("/about.ejs", async function name(req, res) {
    res.render("about", {
    });
})


function idCheck(obj) {
    var values = "<%= idnum %>";
    for (let index = 0; index < values.length; index++) {
        if (values[index] == obj.value) {
            window.alert("måste vara ett nytt unikt id")
            obj.value = "";
            return false;
        }
    }
    return true;
}
