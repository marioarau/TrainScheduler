// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// config file in firebase_apikey
/*
  var config = {
    apiKey: "AIzaSyDjA2Lp4Qga0i6vs4xUH4-1tCm-nwOYgIk",
    authDomain: "fullstackclass-15e91.firebaseapp.com",
    databaseURL: "https://fullstackclass-15e91.firebaseio.com",
    projectId: "fullstackclass-15e91",
    storageBucket: "",
    messagingSenderId: "568587410686",
    appId: "1:568587410686:web:45efbee524ff27d6"
  };
*/

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

trainName = "Pacific Surfliner";
dest = "San Luis Obispo";
firstTrain = "07:00";
freq = 120;

trainName = "Pacific Surfliner";
dest = "San Diego";
firstTrain = "06:00";
freq = 120;

trainName = "Pacific Surfliner";
dest = "San Luis Obispo";
firstTrain = "07:00";
freq = 120;

var add_a_train = false;

if (add_a_train == true) {
    database.ref().push({
        train_name: trainName,
        destination: dest,
        first_train: firstTrain,
        frequency: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
}


database.ref().on("child_added", function (snapshot) {
    var newRow = "<tr>";
    newRow += "<td>"+snapshot.val().train_name+"</td><td>"+snapshot.val().destination+"</td>";
    newRow += "<td>"+snapshot.val().first_train+"</td><td>"+snapshot.val().frequency+"</td>";
    newRow += "<td>empty</td>";
    newRow += "</tr>";
    console.log(newRow);
    $("table tbody").append(newRow);
});

$("#add-train").on("click", function () {

    trainName = $("#train-name-input").val().trim();
    dest = $("#dest-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    freq = $("#freq-input").val().trim();
    console.log("trainName: "+trainName)

    // Code for the push
    database.ref().push({
        train_name: trainName,
        destination: dest,
        first_train: firstTrain,
        frequency: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});



