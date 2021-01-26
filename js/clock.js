function changeMode(){
    var cl = document.getElementById("button").innerHTML;
    console.log(cl);
    if(cl == "Dark") {
        document.getElementById("button").value = 'light';
        document.getElementById("button").innerHTML = "Light";
        document.getElementById("button").style.backgroundColor = "#000000";
        document.getElementById("button").style.color = "#c2c2a3";
        document.getElementById("header").style.backgroundColor = "#c2c2a3";
        document.getElementById("clock").style.color = "#000000";
    } else {
        document.getElementById("button").value = 'dark';
        document.getElementById("button").innerHTML = "Dark";
        document.getElementById("button").style.backgroundColor = "#c2c2a3";
        document.getElementById("button").style.color = "#000000";
        document.getElementById("header").style.backgroundColor = "#000000";
        document.getElementById("clock").style.color =  "#c2c2a3";
    }
}

setInterval(digital, 1000); 
function digital() { 
    let time = new Date(); 
    let hour = time.getHours(); 
    let min = time.getMinutes(); 
    let sec = time.getSeconds(); 
    am_pm = "AM"; 
  
    if (hour > 12) { 
        hour -= 12; 
        am_pm = "PM"; 
    } 
    if (hour == 0) { 
        hr = 12; 
        am_pm = "AM"; 
    } 
  
    hour = hour < 10 ? "0" + hour : hour; 
    min = min < 10 ? "0" + min : min; 
    sec = sec < 10 ? "0" + sec : sec; 
  
    let currentTime = hour + ":" 
            + min + ":" + sec + " "+ am_pm; 
  
    document.getElementById("clock").innerHTML = currentTime; 
} 
// showTime();