/* global moment firebase */

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// config file in firebase_apikey

firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();

// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking
var connectionsRef = database.ref();

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

name = "Abraham Lincoln",
    role = "CEO",
    startDate = "01/21/2005",
    monthlyRate = 420

name = "George Washington",
    role = "CEO",
    startDate = "01/21/2000",
    monthlyRate = 400

name = "John F Kennedy",
    role = "CEO",
    startDate = "01/21/1963",
    monthlyRate = 450

database.ref().on("child_added", function (snapshot) {
    var newRow = $("<tr>").append();
    $("<td>").text(name);
    $("<td>").text(role);
    $("<td>").text(startDate);
    $("<td>").text(monthlyRate);
    $("employee-table").append(newRow);
});

$("#submitBtn").on("click", function () {

    name = $("#name-input").val();
    role = $("#role-input").val();
    console.log("name: " + name);
    console.log("role: " + role);
    startDate = $("#date-input").val();
    monthlyRate = $("#rate-input").val();

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
    });
    debugger;
});
