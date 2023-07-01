//Declaring global variables
var timesArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var currHour;
var html1, html2, html3, html4, html5, html6, html7;
var allHtml="";
var today = dayjs();
var currStatus;
var hours1;
var AMPM;
var storedEvents = ["","","","","","","","",""];

//get and set current day from day.js
$('#currentDay').text(today.format('dddd, MMM D, YYYY'));
currHour = today.format('H');

//gets current events from local storage
getEvents();

$(function () {
    //function to display calender events
    $.each (timesArr, function( indexes, values ) {
      //checks to see calender past, present, future hours
      if(Number(values) < Number(currHour)){
        currStatus = "past";
      }
      if(Number(values) == Number(currHour)){
        currStatus = "present";
      }
      if(Number(values) > Number(currHour)){
        currStatus = "future";
      }

     //sets time in calender
      if(values <= 12){
        hours1 = values;
      }
      else{
        hours1 = values-12;
      }
     //sets AM or PM in calender
      if(values < 12){
          AMPM = "AM"
      }
      else {
        AMPM = "PM"
      }
      //sets and displays dom calender events
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

//function to save events in local storage
function saveEvents(index){
  for(var i = 0 ; i < timesArr.length; i++){
    if(index==i){
      storedEvents[i] = $("#events" + i).val();
    }
  }
  localStorage.setItem('events', JSON.stringify(storedEvents));
}

//function to get stored events from local storage
//this function displays stored events in local storage
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


