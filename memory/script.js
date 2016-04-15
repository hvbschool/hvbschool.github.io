$(document).ready(function() {
  //DATABASE
  var temp = 0;
  var difficulty = 0;
  var rand = 0;
  var shuffleLength = 4;
  var seconds = 0;
  var minutes = 0;
  var timerID = 0;
  var timerVal = "";
  //END OF DATABASE
  
  //I do the app in a object type thing kinda like Java
  var app = {
    
    //The initialize functino
    init: function() {
      //Input and make sure it is correct
      difficulty = prompt("Choose Your Difficulty!\n\n1. EASY (Numbers)\n2. MED (Letter Pairs)\n3. HARD (x+/-y Math)\n\nInput Number");
      while (difficulty != "1" && difficulty != "2" && difficulty != "3") {
        difficulty = prompt("INVALID INPUT\n\nChoose Your Difficulty!\n\n1. EASY (Numbers)\n2. MED (Letter Pairs)\n3. HARD (Letter/Number Combos)\n\nInput Number");
      }
      console.log("The user chose: " + difficulty);
      
      //Shuffle and timer after initializatino
      app.shuffle(difficulty);
      timerID = setInterval(app.updateTimer, 1000);
    },
    
    //Card Arrays
    cards: {
      easy: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12],
      medium: ["AY", "AY", "CB", "CB", "ES", "ES", "OQ", "OQ", "BT", "BT", "LS", "LS", "AS", "AS", "HN", "HN", "PX", "PX", "CM", "CM", "IX", "IX", "CK", "CK"],
      hard: ["1A23", "1A23", "5B09", "5B09", "8C12", "8C12", "5D63", "5D63", "1E95", "1E95", "8F52", "8F52", "9G01", "9G01", "4H21", "4H21", "7I15", "7I15", "0J91", "0J91", "5K83", "5K83", "1L94", "1L94"],
    },
    
    //Shuffle Functino
    shuffle: function(dif) {
      
      //Chech what difficulty
      if (dif == "1") {
        
        difficulty = "easy";
        //Iterate thru cards
        for (x=0; x<shuffleLength; x++) {
          for (i=0; i<app.cards.easy.length; i++) {
            rand = Math.floor(Math.random() * 24);
            temp = app.cards.easy[i];
            app.cards.easy[i] = app.cards.easy[rand];
            app.cards.easy[rand] = temp;
          }
        }
        console.log("Shuffled Cards: " + app.cards.easy);
      } else if (dif == "2") {
        
        difficulty = "medium";
        for (x=0; x<shuffleLength; x++) {
          for (i=0; i<app.cards.medium.length; i++) {
            rand = Math.floor(Math.random() * 24);
            temp = app.cards.medium[i];
            app.cards.medium[i] = app.cards.medium[rand];
            app.cards.medium[rand] = temp;
          }
        }
        console.log("Shuffled Cards: " + app.cards.medium);
      } else {
        
        difficulty = "hard";
        for (x=0; x<shuffleLength; x++) {
          for (i=0; i<app.cards.hard.length; i++) {
            rand = Math.floor(Math.random() * 24);
            temp = app.cards.hard[i];
            app.cards.hard[i] = app.cards.hard[rand];
            app.cards.hard[rand] = temp;
          }
        }
        console.log("Shuffled Cards: " + app.cards.hard);
      }
      
      //Assign after shuffle
      app.assign();
    },
    //Assign the cards to values
    assign: function() {
      $(".card").each(function(index) {
        if (difficulty == "easy") {
          $(this).attr("data-card-value", app.cards.easy[index]);
        } else if (difficulty == "medium") {
          $(this).attr("data-card-value", app.cards.medium[index]);
        } else {
          $(this).attr("data-card-value", app.cards.hard[index]);
        }
      });
      
      //Start the Click Handler
      app.clickHandler();
    },
    clickHandler: function() {
      $(".card").click(function() {
        if ($(".selected").length < 2) {
          //Make sure only 2 are selected
          $(this).html("<h1>" + $(this).data("cardValue") + "</h1>").addClass("selected");
        
          //Check if 2 are selected and remove them
          if ($(".selected").length == 2) {
            
            //Check if match
            if ($(".selected").first().data("cardValue") == $(".selected").last().data("cardValue")) {
              setTimeout(function(){
                $(".selected").each(function() {
                  $(this).fadeTo(500, 0);
                  $(this).removeClass("unmatched");
                });
              }, 1000);
            }
            
            //If not matc
            setTimeout(function(){
              $(".selected").each(function() {
                $(this).html("");
                $(this).removeClass("selected");
              });
            }, 1000);
          }
        }
        setTimeout(function(){
          if ($(".unmatched").length === 0) {
            $("#container").html("<h1 id='timer'>"+timerVal+"</h1><Br/><p id='winText'>YOU WIN</p><Br/><button id='restart' onclick='location.reload()'>PLAY AGIN</button>");
            clearInterval(timerID);
            console.log("true");
          }
        }, 1000);
      });
    },
    updateTimer: function() {
      //do a timer
      seconds = seconds+1;
      if (seconds == 59) {
        seconds = 0;
        minutes = minutes + 1;
      }
      if (seconds < 10) {
        timerVal = String(minutes) + ":0" + String(seconds);
        $("#timer").html(timerVal);
      } else {
        timerVal = String(minutes) +":"+ String(seconds);
        $("#timer").html(timerVal);
      }
    }
  };
  
  //Initialize it
  app.init();
});
