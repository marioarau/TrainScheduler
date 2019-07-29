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

var nextTrain = {
    time: "",
    minToNextTrain: 0
};

var now = moment(new Date()); //todays date
var start = moment("2019-07-28 06:00:00"); // another date
var duration = moment.duration(now.diff(start));
var hours = duration.asHours();
var days = duration.asDays();
console.log("Hours: " + hours);
console.log("days: " + days);



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
firstTrain = "07:00"; // 9am 11am 1pm 3pm 5pm 7pm 9pm
freq = 120;

calcTrainTimes(firstTrain, freq);


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

function calcTrainTimes(firstTrain, Freq) {

    hhmm = firstTrain.split(":");
    var hours = hhmm[0];
    var minutes = hhmm[1];
    var time = moment(hours + ':' + minutes, 'HH:mm');

    var start_time = moment(time); // timestamp of first Train leaving time.

    var current_time = new moment().format("HH:mm");
    //console.log("current_time: " + current_time);
    var cur_time = new moment();
    //console.log("start_time: " + start_time);
    //console.log("cur_time: " + cur_time);

    // Calculate when the next train will come in
    var x = moment.duration(cur_time.diff(start_time)).asMinutes(); 
    x = parseInt((x + 120) / 120);
    x *= freq; // next train comes at these minutes after the first train
    time.add(x, 'm');
    var next_train_time = start_time.add(x, 'm');

    console.log("cur_time: " + cur_time);
    nextTrain.time = start_time.format("HH:mm");
    console.log("nextTrain: " + JSON.stringify(nextTrain));
    console.log("minutes x: " + x)
    console.log("hours x: " + x / 60)
    xtime = moment(x, "hh:mm");
    console.log("xtime: " + xtime);
    nextTrain.minToNextTrain = moment.duration(next_train_time.diff(cur_time)).asMinutes(); 
    nextTrain.minToNextTrain = parseInt(nextTrain.minToNextTrain);
    console.log("minToNextTrain: " + nextTrain.minToNextTrain);

}

database.ref().on("child_added", function (snapshot) {

    calcTrainTimes(snapshot.val().first_train, snapshot.val().frequency);

    var newRow = "<tr>";
    newRow += "<td>" + snapshot.val().train_name + "</td><td>" + snapshot.val().destination + "</td>";
    newRow += "<td> &nbsp; &nbsp; &nbsp; &nbsp; " + snapshot.val().frequency + "</td><td> &nbsp; &nbsp; &nbsp; &nbsp; " + nextTrain.time + "</td>";
    newRow += "<td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "+nextTrain.minToNextTrain+"</td>";
    newRow += "</tr>";
    console.log(newRow);
    $("table tbody").append(newRow);
});

$("#add-train").on("click", function () {

    trainName = $("#train-name-input").val().trim();
    dest = $("#dest-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    freq = $("#freq-input").val().trim();
    console.log("trainName: " + trainName)

    // Code for the push
    database.ref().push({
        train_name: trainName,
        destination: dest,
        first_train: firstTrain,
        frequency: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});


