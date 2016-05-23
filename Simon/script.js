var vars = {
	stage: 0,
	fadeDuration: 250,
	fadeOpacity: 0.4,
	active: false,
	playerTurn: false,
	developerMode: false,
	sequence: [],
	tempSequence: [],
};

var Simon = {
	init: function() {
		Simon.clickHandler();
	  $(document).click(function() {
	    if (vars.stage === 0) {
	      $("#startText").css("opacity", "0");
	      $("#stageText").css("opacity", "1");
	      $("#simon").css("opacity", "1");
	      vars.stage = 1;
    		Simon.pcTurn();
	    }
	  });
	},

	press: function(elem, dur) {
		if (vars.playerTurn) {
			vars.active = false;
		}
		elem.fadeTo(dur, vars.fadeOpacity, function() {
			elem.fadeTo(dur, 1, function() {
				if (vars.playerTurn) {
					vars.active = true;
				}
			});
		});
	},

	clickHandler: function() {
		$(document).keydown(function(e) {
		  Simon.developerLog(e.keyCode);
			if (e.keyCode === 192) {
			  if (vars.developerMode) {
			    vars.developerMode = false;
			    console.log("Developer Mode Disabled");
			  } else {
			    vars.developerMode = true;
			    console.log("Developer Mode Enabled");
			  }
			}
		});
		$(".color").click(function() {
			if (vars.active) {
			  if ($(this).attr("id") === vars.tempSequence[0]) {
				  Simon.press($("#" + $(this).attr("id")), vars.fadeDuration);
				  Simon.developerLog($(this).attr("id") + " Clicked");
				  vars.tempSequence.splice(0, 1);
				  if (vars.tempSequence.length === 0) {
				    vars.sequence = [];
				    vars.playerTurn = false;
				    vars.stage++;
				    if (vars.stage > 100) {
				      $("#stageText").empty();
				      $("#stageText").append(vars.stage);
				    } else if (vars.stage > 10) {
				      $("#stageText").empty();
				      $("#stageText").append("0" + vars.stage);
				    } else {
				      $("#stageText").empty();
				      $("#stageText").append("00" + vars.stage);
				    }
				    setTimeout(Simon.pcTurn, vars.fadeDuration+500);
				  }
			  } else {
			    console.log("You Lose. The correct sequence was " + vars.sequence);
			    $("#simonCont").css("opacity", "0");
			    if (vars.sequence.length > 1) {	
			    	for (i=0; i<vars.sequence.length; i++) {
			    		if (i === vars.sequence.length-1) {
			    			$("#correctSequence").append(vars.sequence[i]);
			    		} else {
			    			$("#correctSequence").append(vars.sequence[i] + ", ");
			    		}
			    	}
			    } else {
			    	$("#correctSequence").append(vars.sequence[0]);
			    }
			    $("#lose").css("opacity", "1");
			  }
			}
		});
	},
	
	developerLog: function(message) {
	  if (vars.developerMode) {
	    console.log(message);
	  }
	},
	
	pcTurn: function() {
	  for (i=0; i<vars.stage; i++) {
      var random = Math.floor(Math.random()*4)+1;
      Simon.developerLog("Random value is " + random);
      if (random === 1) {
        vars.sequence.push("Red");
      } else if (random === 2) {
        vars.sequence.push("Green");
      } else if (random === 3) {
        vars.sequence.push("Blue");
      } else if (random === 4) {
        vars.sequence.push("Yellow");
      }
	  }
	  Simon.developerLog("Sequence is " + vars.sequence);
	  Simon.displaySequence();
	},
	
	displaySequence: function() {
	  i=0;
	  var loop = function() {
	    if (i < vars.stage) {
	      Simon.press($("#" + vars.sequence[i]));
	      i++;
	      setTimeout(loop, vars.fadeDuration+500);
	    } else {
	      vars.tempSequence = vars.sequence;
	      vars.playerTurn = true;
	    }
	  };
	  loop();
	},
};

$(document).ready(function() {
    Simon.init();
});