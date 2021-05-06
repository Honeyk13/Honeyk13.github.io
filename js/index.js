var resultData;

function slot(){
    var pin = document.getElementById('pin').value;
    var age = document.getElementById('age').value;
    if(pin.length == 0){
        alert("Please enter valid PIN")
    } else {
        let i = 1;
        setTimeout(function run() {
            var date = new Date();
            var dateStr = GetFormattedDate(date);
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
    for(var i=0; i<5;i++) {
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
                // if('available_capacity' in sessionData){ 
                    cap = sessionData['available_capacity'];
                    if(cap !=0 && sessionData['min_age_limit'] == '45' && age >= 45){
                        console.log(centerData['center_id'] + centerData['name'] + centerData['district_name'] + cap + sessionData['min_age_limit']);
                        // alert(centerData['center_id']);
                        // break;
                        // while(true){
                            play();
                        // }
                        
                    } else if(cap !=0 && age < 45 && age > 18) {
                        console.log(centerData['center_id'] + centerData['name'] + centerData['district_name'] + cap + sessionData['min_age_limit']);
                        // alert(centerData['center_id']);
                        // break;
                        // while(true){
                            play();
                        // }
                    }
                    // console.log(cap);
                // }
            }
        }
    }
}

function play() { 
    var beepsound = new Audio('https://www.soundjay.com/button/sounds/beep-01a.mp3'); 
    beepsound.play(); 
}
