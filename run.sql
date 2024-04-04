DROP DATABASE Labb1Backend;
CREATE DATABASE Labb1Backend;
USE Labb1Backend;
/* Inget er diagram då databasen består av en enda tabell, lagomt onödigt i detta fall. kompakt och bra*/
CREATE TABLE Course (
    id Int NOT NULL PRIMARY KEY,
    coursecode varchar(8),
    coursename varchar(60),
    syllabus varchar(80),
    progression varchar(1)
);

/* jag svär till gud att alla språk borde standardisera användingen av () [] {}, antingen så missar jag något eller inte men fett irriterande med () istället för {} inom sql >:( */

INSERT INTO Course VALUES (1,"DT057G","Webbutveckling I","https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/","A");
INSERT INTO Course VALUES (2,"DT084G","Introduktion till programmering i JavaScript","https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/","A");
INSERT INTO Course VALUES (3,"DT200G","Grafisk teknik för webb","https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/","A");
INSERT INTO Course VALUES (4,"DT068G","Webbanvändbarhet","https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/","B");
INSERT INTO Course VALUES (5,"DT003G","Databaser","https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/","A");