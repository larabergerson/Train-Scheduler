// Steps to complete:

// 1. Launch Firebase
// 2. Add button for new train -> update the html + database
// 3. Create a way to retrieve trains from database.
// 4. Calculate the next train with frequency
//    Then use moment.js formatting to set difference in months.

// 1. Launch Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDeSlWZXb5owpl8DfchW4fn6VlzOI15CEI",
  authDomain: "train-scheduler-hw-6326f.firebaseapp.com",
  databaseURL: "https://train-scheduler-hw-6326f.firebaseio.com",
  projectId: "train-scheduler-hw-6326f",
  storageBucket: "train-scheduler-hw-6326f.appspot.com",
  messagingSenderId: "1038787017041",
  appId: "1:1038787017041:web:6389b369b8b212ed"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destinationPlace = $("#destionation-input")
    .val()
    .trim();
  var startTime = moment(
    $("#start-input")
      .val()
      .trim(),
    "MM/DD/YYYY"
  ).format("X");
  var frequencySet = $("#frequency-input")
    .val()
    .trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destinationPlace,
    start: startTime,
    frequency: frequencySet
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destionation);
  console.log(newTrain.startTime);
  console.log(newTrain.frequency);

  alert("New Train Added!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequencyinput").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destinationPlace = childSnapshot.val().destionation;
  var startTime = childSnapshot.val().startTime;
  var frequencySet = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destinationPlace);
  console.log(startTime);
  console.log(frequencySet);

  // Prettify the employee start
  var trainStartPretty = moment.unix(startTime).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var empMonths = moment().diff(moment(empStart, "X"), "months");
  // console.log(empMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destinationPlace),
    $("<td>").text(startTime),
    $("<td>").text(frequencySet)
    // $("<td>").text(empRate),
    // $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});
