//  (document).getElementById("currentDay").textContent = Date.now();
//Give the date the user opens the planner
$("#currentDay").text(moment());

//for color code change depending on time status
function parseHour(str) {
  let timePeriod = str.substring(str.length - 2, str.length); //to know if its AM or PM
  let timeValue = parseInt(str.substring(0, str.length - 2)); //to get the integer before AM or PM
  // console.log('timeperiod = ' , timePeriod)
  // console.log("timevalue = " + timeValue)
  if (
    (timePeriod === "PM" && timeValue != 12) ||
    (timeValue === 12 && timePeriod === "AM")
  ) {
    timeValue = timeValue + 12; //convert to 24 hour clock
  }

  return timeValue === 24 ? 0 : timeValue; //ternary operator is used because moment counts hours from 0 to 23 so when it's 24 I'm displaying 0
}

//to save in local storage
function saveEvent(time, event) {
  localStorage.setItem(time, event);
}

//go to local storage and get the event corresponding to the time
function getEvent(time) {
  return localStorage.getItem(time);
}

saveEvent("9AM", "assignment");
$(document).ready(function() {
  let currentHour = moment().hours(); //to get the current hour of the day i.e there are 24 so the value should be between 0-24

  $(".timeEvent").each(function() {
    let timeText = $(this).text(); //to get the text 9AM - 9PM
    let timeBlockHour = parseHour(timeText);
    let currentEvent = getEvent(timeText);
    if (currentHour > timeBlockHour) {
      //then this is the past and the time block should be grey and not be able to change event
      $(this)
        .next(".eventCreated")
        .css("background-color", "grey")
        .prop("disabled", true);
    } else if (currentHour == timeBlockHour) {
      //then this is the current and the time block should be red
      $(this)
        .next(".eventCreated")
        .css("background-color", "red");
    } else {
      //then this is the future and the time block should be green
      $(this)
        .next(".eventCreated")
        .css("background-color", "green");
    }

    //to set event
    if (currentEvent != null) {
      $(this)
        .siblings(".eventCreated")
        .first()
        .text(currentEvent);
    }
  });

  $(document).on("click", ".saveButton", function(e) {
    e.preventDefault();
    let time = $(this)
      .siblings(".timeEvent")
      .first()
      .text(); //to get the time, .text() because its not an input
    let event = $(this)
      .siblings(".eventCreated")
      .first()
      .val(); //to get the event, .val() because its an input
    saveEvent(time, event);
  });
});
