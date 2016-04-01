$(document).ready(function() {
  $("#button").click(function() {
    //Run the function and set the params
    if (document.getElementById("firstY").value === 0) {
      solve(document.getElementById("firstY").value, document.getElementById("secondY").value, document.getElementById("firstPop").value, document.getElementById("secondPop").value, document.getElementById("desiredY").value);
    } else {
      solve(document.getElementById("firstY").value - document.getElementById("firstY").value, document.getElementById("secondY").value - document.getElementById("firstY").value, document.getElementById("firstPop").value, document.getElementById("secondPop").value, document.getElementById("desiredY").value - document.getElementById("firstY").value);
    }
  });
  
  //What to do when solve is clicked
  var solve = function(fY, sY, fP, sP, dY) {
    //Console.log all of the Variables
    nSY = sY * -1;
    console.log("Negative Second Year: " + nSY);
    console.log("Second Year: " + sY);
    console.log("First Population: " + fP);
    console.log("Second Population: " + sP);
    console.log("Desired Year: " + dY);
    
    //Find what should be rooted
    var toBeRooted = sP/fP;
    console.log("To Be Rotted: " + toBeRooted);
    
    //Root it to find Growth Factor
    var gF = Math.pow(toBeRooted, 1/sY);
    console.log("Growth Factor: " + gF);
    console.log("Equation: " + fP + "(" + gF + ")^x");
    
    //Find the Population they want
    var temp = Math.pow(gF, dY);
    console.log("After taking Growth Factor * Desired Year: " + temp);
    
    //Find the temp * fP
    var fin = temp * fP;
    console.log("Finish: " + fin);
    $("#finPop").empty();
    $("#finPop").append(Math.round(fin));
    $("#eq").empty();
    $("#eq").append(fP + "(" + gF + ")^x");
  };
});