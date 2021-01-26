function changeMode(){
    var cl = document.getElementById("button").innerHTML;
    console.log(cl);
    if(cl == "Dark") {
        document.getElementById("button").value = 'light';
        document.getElementById("button").innerHTML = "Light";
        document.getElementById("button").style.backgroundColor = "#000000";
        document.getElementById("button").style.color = "#c2c2a3";

        document.getElementById("stopWatch").value = 'light';
        document.getElementById("stopWatch").innerHTML = "Light";
        document.getElementById("stopWatch").style.backgroundColor = "#000000";
        document.getElementById("stopWatch").style.color = "#c2c2a3";

        document.getElementById("header").style.backgroundColor = "#c2c2a3";
        document.getElementById("clock").style.color = "#000000";
    } else {
        document.getElementById("button").value = 'dark';
        document.getElementById("button").innerHTML = "Dark";
        document.getElementById("button").style.backgroundColor = "#c2c2a3";
        document.getElementById("button").style.color = "#000000";

        document.getElementById("stopWatch").value = 'dark';
        document.getElementById("stopWatch").innerHTML = "Dark";
        document.getElementById("stopWatch").style.backgroundColor = "#c2c2a3";
        document.getElementById("stopWatch").style.color = "#000000";

        document.getElementById("header").style.backgroundColor = "#000000";
        document.getElementById("clock").style.color =  "#c2c2a3";
    }
}

var timeElapsedSec = 0;
var timeElapsedMin = 0;
var timeElapsedHrs = 0;
var myTimer = 0;
var s = "";
function start() {
    if(document.getElementById("start").style.display != "none") {
        document.getElementById("start").style.display = "none";
        document.getElementById("end").style.display = "inline";
    }
    myTimer = setInterval(function() {
        s="";
        timeElapsedSec += 1;
        if(timeElapsedHrs < 10) {
            s += "0";
            s +=timeElapsedHrs;
            s += ":"
        } else {
            s +=timeElapsedHrs;
            s += ":"
        }
        if(timeElapsedMin < 10) {
            s += "0";
            s +=timeElapsedMin;
            s += ":"
        } else {
            s +=timeElapsedMin;
            s += ":"
        }
        if(timeElapsedSec < 10) {
            s += "0";
            s +=timeElapsedSec;
        } else {
            s +=timeElapsedSec;
        }
        document.getElementById("clock").innerText = s;
        if(timeElapsedSec == 60) {
        timeElapsedMin += 1;
        timeElapsedSec = 0;
        }
        if(timeElapsedMin == 60) {
            timeElapsedHrs += 1;
            timeElapsedMin = 0;
        }
    }, 1000) ;
}

function end() {
    clearInterval(myTimer);
    document.getElementById("clock").innerText = s;
    document.getElementById("start").style.display = "inline";
    document.getElementById("end").style.display = "none";
}

function reset() {
    location.reload();
}