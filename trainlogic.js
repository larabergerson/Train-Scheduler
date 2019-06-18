// Steps:

// 1. Launch Firebase
// 2. Add button for new train -> update the html + database
// 3. Create a way to retrieve trains from database.
// 4. Calculate the next train with frequency

// 1. Launch Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDeSlWZXb5owpl8DfchW4fn6VlzOI15CEI",
  authDomain: "train-scheduler-hw-6326f.firebaseapp.com",
  databaseURL: "https://train-scheduler-hw-6326f.firebaseio.com",
  projectId: "train-scheduler-hw-6326f",
  storageBucket: "train-scheduler-hw-6326f.appspot.com",
  messagingSenderId: "1038787017041",
  appId: "1:1038787017041:web:542f6b8aa268aa1f"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding train
$("#train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destinationPlace = $("#destination-input")
    .val()
    .trim();
  var startTime = moment(
    $("#start-input")
      .val()
      .trim(),
    "HHmm"
  ).format("X");
  var frequencySet = $("#frequency-input")
    .val()
    .trim();

  // Creates local "temporary" object for holding train data
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
  console.log(newTrain.destination);
  console.log(newTrain.startTime);
  console.log(newTrain.frequency);

  alert("New Train Added!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destinationPlace = childSnapshot.val().destination;
  var startTime = childSnapshot.val().start;
  var frequencySet = childSnapshot.val().frequency;

  // Check console log - train Info
  console.log(trainName);
  console.log(destinationPlace);
  console.log(startTime);
  console.log(frequencySet);

  // Prettify start
  var startTimePretty = moment.unix(startTime).format("HH:mm");
  console.log(startTimePretty);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destinationPlace),
    $("<td>").text(startTime),
    $("<td>").text(frequencySet),
    $("<td>").text(minsAway)
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});

// Change year so first train comes before now - Help from sung for below code:
var firstTrain = moment(childSnapshot.val().firstTrain, "hhmm").subtract(
  1,
  "minutes"
);
console.log(firstTrain);

// Difference time between the current and firstTrain
var diffTime = moment().diff(moment(firstTrain), "minutes");
var remainder = diffTime % frequency;
console.log(diffTime);
console.log(remainder);

// Minutes until next train
var minsAway = frequency - remainder;
console.log(minsAway);

// Add minsAway to get the next train time
var nextTrain = moment().add(minsAway, "minutes");
nextTrain = moment(nextTrain).format("hh:mm");
console.log(nextTrain);

//current time in military time format//
var currentTime = moment().format("HHmm");
console.log(currentTime);
