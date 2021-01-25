function clr() {
    console.log("Called");
    document.getElementById("result").value = "";
    document.getElementById("result").focus();
    // document.getElementById("result").select();
}

function show(val) {
    document.getElementById("result").value += val;
    document.getElementById("result").focus();
    // document.getElementById("result").select();
}

function calculate() {
    try {
        let exp = document.getElementById("result").value;
        let solution = eval(exp);
        document.getElementById("result").value = solution;
        document.getElementById("result").focus();
        // document.getElementById("result").select();
    } catch (err) {
        alert("Invalid Expression : "+err);
        clr();
    }
    
}
var input = document.getElementById("result");
addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        calculate();
    }
});