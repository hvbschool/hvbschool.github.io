$(document).ready(function() {
  //Database
  var tau = Math.PI*2;
  var temp1 = 0;
  var temp2 = 0;
  var lID = 0;
  var lIR = 0;
  console.log("tau = " + tau + " temp = " + temp1 + " temp2 = " + temp2 + " lID = " + lID + " lIR = " + lIR);
  //End of Database
  
  var solve = function(r, deg) {
    //Do First Part
    console.log("Equation: " + deg + "/360*tau"+r);
    temp1 = deg/360;
    console.log("After dividing by 360: " + temp1);
    
    //Second Part
    temp2 = r*tau;
    console.log("After multiplying by Tau: " + temp2);
    
    //Find Deg
    lID = temp1 * temp2;
    console.log("Arc Length: " + lID);
    
    //Find radians
    lIR = ((Math.PI/180) * lID);
    console.log("Length in Radians: " + lIR);
    
    //Put it in
    $("#degrees").empty();
    $("#degrees").append("Arc Length: " + lID + " Degrees")
    $("#radians").empty();
    $("#radians").append("Arc Length: " + lIR + " Radians")
    
  };
  $("#solveBut").click(function() {
    solve(document.getElementById("r").value, document.getElementById("deg").value);
  });
});