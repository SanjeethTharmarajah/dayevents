// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timesArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var currHour;
var html1, html2, html3, html4, html5, html6, html7;
var allHtml="";
var today = dayjs();
var currStatus;
var hours1;
var AMPM;
var storedEvents = ["","","","","","","","",""];

$('#currentDay').text(today.format('dddd, MMM D, YYYY'));
currHour = today.format('H');

getEvents();

$(function () {
 
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


 
    $.each (timesArr, function( indexes, values ) {

      if(Number(values) < Number(currHour)){
        currStatus = "past";
      }
      if(Number(values) == Number(currHour)){
        currStatus = "present";
      }
      if(Number(values) > Number(currHour)){
        currStatus = "future";
      }
     
      if(values <= 12){
        hours1 = values;
      }
      else{
        hours1 = values-12;
      }
      if(values < 12){
          AMPM = "AM"
      }
      else {
        AMPM = "PM"
      }

      html1='<div class="row time-block ' + currStatus + '">';
      html2 = '<div class="col-2 col-md-1 hour text-center py-3">' +  hours1 + AMPM + '</div>';
      html3 = '<textarea class="col-8 col-md-10 description" rows="3" id="events' + indexes + '">' + storedEvents[indexes] + '</textarea>';
      html4 = '<button class="btn saveBtn col-2 col-md-1" aria-label="save" id="buttons' + indexes + '" onclick="saveEvents(' + indexes + ')">';
      html5 = '<i class="fas fa-save" aria-hidden="true"></i>';
      html6 ='</button>';
      html7 = '</div>'
      allHtml+= html1 + html2 + html3 + html4 + html5 + html6 + html7;
      $("#eventsEl").html(allHtml);

    }); 
    
});

function saveEvents(index){
  for(var i = 0 ; i < timesArr.length; i++){
    if(index==i){
      storedEvents[i] = $("#events" + i).val();
    }
  }
  localStorage.setItem('events', JSON.stringify(storedEvents));
}

function getEvents(){
 var storedEvents2 = JSON.parse(localStorage.getItem('events'));
  if(storedEvents2 == null){
    for(var i = 0 ; i < timesArr.length; i++){
      storedEvents[i] = "";
    }
    localStorage.setItem('events', JSON.stringify(storedEvents));
  }
  else {
    storedEvents = storedEvents2;
  }
}


