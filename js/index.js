var resultData;
var slot2;

function slot() {
    var pin = document.getElementById('pin').value;
    var age = document.getElementById('age').value;
    slot2 = document.getElementById('dose2').checked;
    console.log(slot2);
    if(pin.length == 0){
        alert("Please enter valid PIN")
    } else {
        let i = 1;
        setTimeout(function run() {
            document.getElementById('click').innerHTML = "Running..."
            document.getElementById('click').disabled = true;
            document.getElementById('message').innerHTML = "! It Will Ring once any slot available please don't close browser and tab !"
            document.getElementById('message').style.color = "Red";
            var date = new Date();
            var dateStr = GetFormattedDate(date);
            document.getElementById('table').innerHTML = "";
            runSchedule(date, pin, age);
            // console.log(dateStr)
            setTimeout(run, 20000);
        }, 100);
    }
}

function GetFormattedDate(todayTime) {
    var month = format(todayTime.getMonth() + 1);
    var day = format(todayTime.getDate());
    var year = format(todayTime.getFullYear());
    return day + "-" + month + "-" + year;
}

function format(val) {
    val = val.toString();
    if(val.length == 1){
        return '0' + val;
    } else {
        return val;
    }
}

function runSchedule(date, pin, age){
    resultData = {};
    // curDate = date;
    for(var i=0; i<15;i++) {
        var dateStr = GetFormattedDate(date)
        getData(dateStr, pin, age);
        date = addDays(date, 1);    
    }
    
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

function getData(dateStr, pin, age) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=' + pin + '&date=' +  dateStr, true)
        request.send();
        request.onreadystatechange = (e) =>{
        resultData[dateStr] = jQuery.parseJSON(request.responseText);
        formatResult(resultData, age);
    }
}

function formatResult(data, age) {
    for(var d in data){
        dateData = data[d]['centers'];
        for(var i = 0;i<dateData.length ;i++){
            centerData = dateData[i];
            if('sessions' in centerData){
                sessionData = centerData['sessions'][0]; 
                cap = sessionData['available_capacity'];
                if(slot2 == true) {
                    cap = sessionData['available_capacity_dose2'];
                }
                if(cap !=0 && sessionData['min_age_limit'] == '45' && age >= 45){
                    addInTable(d, centerData['center_id'], centerData['name'], centerData['district_name'], cap)
                    console.log(centerData['center_id'] + centerData['name'] + centerData['district_name'] + cap + sessionData['min_age_limit']);
                    play();
                } else if(cap !=0 && age < 45 && age > 18 && sessionData['min_age_limit'] != '45') {
                    addInTable(d, centerData['center_id'], centerData['name'], centerData['district_name'],cap)
                    console.log(centerData['center_id'] + centerData['name'] + centerData['district_name'] + cap + sessionData['min_age_limit']);
                    play();
                } 
            }
        }
    }
}

function addInTable(date, center_id, center_name, district, cap) {
    var s = "<tr>";
    s += '<td class="px-4 py-3">' + date + '</td>';
    s += '<td class="px-4 py-3">' + center_id + '</td>';
    s += '<td class="px-4 py-3">' + center_name + '</td>';
    s += '<td class="px-4 py-3">' + district + '</td>';
    s += '<td class="px-4 py-3">' + cap + '</td>';
    s += '</tr>';
    document.getElementById('table').innerHTML += s;
}

function play() { 
    var beepsound = new Audio("sound/beep-04.mp3"); 
    beepsound.play(); 
}

function goToCowin() {
    location.replace("https://www.cowin.gov.in/home")
}
