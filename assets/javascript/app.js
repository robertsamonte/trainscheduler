var dataRef = new Firebase("https://am-traintimes.firebaseio.com/");

// Capture Button Click
$("#addTrain").on("click", function() {

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();
 
    dataRef.push({

      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,  

    })
    

  $(".form-control").val("");
  // Don't refresh the page!
  return false;

  
});
  

dataRef.on("child_added", function(childSnapshot){

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;


  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency); 
  
  

  $("#trainName").html(childSnapshot.val().trainName);
  $("#destination").html(childSnapshot.val().destination);
  $("#firstTrain").html(childSnapshot.val().firstTrain);
  $("#frequency").html(childSnapshot.val().frequency);

  var firstTimeConverted = moment(firstTrain,"hh:mm").subtract(1,"years");
       console.log(firstTimeConverted);
     //current time
    var currentTime = moment();
       console.log("CURRENT TIME: " + moment(currentTime).format ("hh:mm"));
     //differnce between times
    var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
       console.log("DIFFERENCE IN TIME: " + diffTime);   
     //time apart(remainder)
    var tRemainder = diffTime % frequency ;
       console.log(tRemainder);
     //minutes until train
    var minutesAway = frequency - tRemainder;
       console.log("MINUTES TILL TRAIN : " + minutesAway) ;
       
     //next train
    var next = moment().add(minutesAway, "minutes");
       console.log("ARRIVAL TIME: " + moment(next).format("HH:mm"));       
        
    var nextArrival = moment(next).format("HH:mm"); 


  //append values to table - clear it once for my sanity
  $("#trainSchedEntry tbody tr").remove();

  $("#trainSchedEntry > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

// Create Error Handling
}, function(errorObject){

  console.log("Errors handled: " + errorObject.code)
}) 
