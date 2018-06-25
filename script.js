var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

var today = new Date();

var person = [{
	name:"Bodya Duck",
	day: 20,
	month: 11,
	year: 1995,
},{
	name:"Kolya Hodan",
	day: 29,
	month: 11,
	year: 1995,
}
];

var selected_person = person[0];


var calendar_date = {
	month:today.getMonth(),
	year:today.getYear(),
	day:today.getDate()
}

loadCurrentDate();
loadUpcoming(1);
loadDayList();

function loadCurrentDate(){
	var cur_mont =  month[today.getMonth()];

	var cur_day = days[getOwnDay(today)];
	var cur_year = 1900+today.getYear();
	var cur_date = today.getDate();

	loadCalendar(today.getMonth(),cur_year);

	document.getElementById("month").innerHTML = cur_mont+" , "+cur_year;
	document.getElementById("day").innerHTML = cur_day + " , "+ cur_date;
}


function loadCalendar(mm,yy){

	var tbl = document.getElementById("tbl");
	var number_of_days = daysInMonth(mm+1,yy);
	var date = new Date();
	console.log("year " +yy);
	console.log("month" +mm);
	date.setFullYear(yy, mm, 1);
	var fisrt_day = getOwnDay(date);

	var in_first_row = 7 - fisrt_day;
	var left_days = number_of_days - in_first_row;
	var rows = left_days / days.length;

	rows++;
	var days_added = 0;

	tbl.innerHTML ="";

	for(var i=0;i<rows+0;i++){
		var row = tbl.insertRow(i);
		for(var j=0;j<7;j++){
			var cell = row.insertCell(j);
			
			if(days_added<number_of_days){
				days_added++;
				if(j<fisrt_day && i==0){
					cell.className = "empty";
				}else{

					if(days_added==today.getDate())
						cell.className="today";


					cell.setAttribute("onclick","loadDay(this)");
					cell.innerHTML = "<span>"+ (days_added)+"</span>";
					var current_day_aded = 0;
					for(var k =0;k<person.length;k++){
						if(person[k].month==mm && person[k].day==days_added){
							current_day_aded++;
							cell.className += " birth_cell";

							if(current_day_aded<3){
								cell.innerHTML += "<br>" + person[k].name;
							}
						}
					}

					if(current_day_aded>2)
						cell.innerHTML += " and + " + (current_day_aded -2); 
							

				}
			}
			else cell.className = "empty";
		}

	}

}

function loadUpcoming(len){

	var cur_mont = today.getMonth();
	var number_of_days = daysInMonth(cur_mont+1,900+today.getYear());
	var day = today.getDate();
	var ul = document.getElementById("upcoming_list");
	ul.innerHTML="";
	var another_month_days =0;
	var next_month = 0;
	var day_to_paste=0;;
	var month_to_paste=0;

	if(len <100) len = len*7;
	else len = number_of_days;

	if(day + len > number_of_days){
		another_month_days = len - (number_of_days-day);
		if(cur_mont==11) next_month =0;
		else next_month = cur_mont+1;

	}

	for(var i =0;i<person.length;i++){
		if(person[i].month==cur_mont && person[i].day >=day && person[i].day<=day+len ){
  			var li = document.createElement("li");

  			if(person[i].day==today.getDate()){
  				day_to_paste = "Today";
  				month_to_paste = "";
  			}
  			else {
  				day_to_paste = person[i].day;
  				month_to_paste = month[cur_mont];
  			}


  			var string = day_to_paste+" "+ month_to_paste + " - "+ "<a  class ='person' onclick='loadProfile(this)'>"+ person[i].name + "</a>"+
			"("+(1900+today.getYear()-person[i].year) +" y.o)";


  			li.innerHTML= string;
  			ul.appendChild(li);
		}
	}

	if(another_month_days){
		for(var i =0;i<person.length;i++){
			if(person[i].month==next_month && person[i].day >=1 && person[i].day<=another_month_days){

	  			var li = document.createElement("li");

	  			var string = person[i].day+" "+ month[person[i].month] + " - " + person[i].name +
	  			"("+(1900+today.getYear()-person[i].year) +" y.o)";
	  			li.innerHTML = string;
	  			ul.appendChild(li);
			}
		}
	}

}

function loadDayList(){

	var ul = document.getElementById("day_list");
	ul.innerHTML = "";
	for(var i =0;i<person.length;i++){

		if(person[i].day== calendar_date.day && person[i].month == calendar_date.month){
			var li = document.createElement("li");
	  		var string = person[i].name + "("+(1900+today.getYear()-person[i].year) +" y.o)";
	  		li.innerHTML = string;
	  		ul.appendChild(li);
		}

	}

	document.getElementById("selected_day_title").innerHTML = calendar_date.day +" , " +month[calendar_date.month];


}

function loadDay(elem){

	var span  = elem.getElementsByTagName("span");
	var selected_cells =document.getElementsByClassName("selected_cell");

	//for(var i=0;i<selected_cells.length;i++)

	if(selected_cells.length>0)
		selected_cells[0].classList.remove("selected_cell");

	elem.classList.add("selected_cell");

	calendar_date.day = +span[0].innerHTML;

	loadDayList();
	document.getElementById("selected_day").style.display = "";


}

function loadProfile(elem){

	var name = elem.innerHTML;
	var day =0;
	var month =-1;

	for(var i=0;i<person.length;i++){
		if(name==person[i].name){
			selected_person = person[i];
			break;
		}
	}

	if(selected_person.day<10) day="0"+selected_person.day;
	else day = selected_person.day;
	month = selected_person.month+1;
	if(month<10) month ="0"+month;

	var date_str = day+"."+month;
	if(selected_person.year>0) date_str+="."+selected_person.year;

	document.getElementById("profile_name").innerHTML = selected_person.name;
	document.getElementById("profile_date").innerHTML = date_str;
	document.getElementById("edit").style.display = "block";


}

function loadEditor(){

	document.getElementById("info").style.display ="none";
	document.getElementById("edit_name").value=selected_person.name;
	document.getElementById("edit_year").value =selected_person.year;
	document.getElementById("edit_info").style.display ="block";
}


function cancelSaving(){
	document.getElementById("edit_info").style.display ="none";
	document.getElementById("info").style.display ="";
	document.getElementById("edit_name").value="";
	document.getElementById("edit_year").value ="";

}

function saveNewBirthFromDay(new_name,year){


	if(new_name){
		var day = calendar_date.day;
		var month = calendar_date.month;

		person.push({
			name:new_name,
			day:day,
			month:month,
			year:year

		});

		loadDayList();
		loadUpcoming(7);
		loadCurrentDate();
	}
	else {
		document.getElementById("day_name").style.backgroundColor ="rgba(255,0,0,0.2)";

		setTimeout("document.getElementById('day_name').style.backgroundColor = '';",750)

	}
}

function nextMonth(){

	if(calendar_date.month==11){
		calendar_date.month=0;
		calendar_date.year++;
	}else {
		calendar_date.month++;
	}

	loadCalendar(calendar_date.month,1900+calendar_date.year);

	var cur_mont =  month[calendar_date.month];
	var cur_year = 1900+calendar_date.year;
	document.getElementById("month").innerHTML = cur_mont+" , "+cur_year;
}

function prevMonth(){

	if(calendar_date.month==0){
		calendar_date.month=11;
		calendar_date.year--;
	}else {
		calendar_date.month--;
	}

	loadCalendar(calendar_date.month,1900+calendar_date.year);
	var cur_mont =  month[calendar_date.month];
	var cur_year = 1900+calendar_date.year;
	document.getElementById("month").innerHTML = cur_mont+" , "+cur_year;

}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function getOwnDay(date){

	var dd = date.getDay();

	if(dd>0){
		return --dd;
	}else{
		return 6;
	}



}