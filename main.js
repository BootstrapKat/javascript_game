
// Obstacles
var obstacle = '<img class="obstacle" src="./images/obstacle.png">';

// Weapons
var weapon1 = '<img class="weapon" id="weapon1" src="./images/weapon1.png" data-damage="10">';
var weapon2 = '<img class="weapon" id="weapon2" src="./images/weapon2.png" data-damage="20">';
var weapon3 = '<img class="weapon" id="weapon3" src="./images/weapon3.png" data-damage="30">';
var weapon4 = '<img class="weapon" id="weapon4" src="./images/weapon4.png" data-damage="40">';



// PLAYER OBJECTS
var hunter = {
  type: "hunter",
  avatar:
    '<img class="hunter" id="hunter" alt="hunter" src="./images/hunter.png">',
  position: {
    col: 0,
    row: 0
  },
  health: 100,
  weapon: {
    image:
      "<img src='images/weapon1.png' id='weapon1' class='weapon' data-damage='10' alt='Default Weapon'>",
    damage: 10,
    oldWeapon: ""
  },
  shield: false
};

var huntress = {
  type: "huntress",
  avatar:
    '<img class="huntress" id="huntress" alt="huntress" src="./images/huntress.png">',
  position: {
    col: 0,
    row: 0
  },
  health: 100,
  weapon: {
    image:
      "<img src='images/weapon1.png' id='weapon1' class='weapon' data-damage='10' alt='Default Weapon'>",
    damage: 10,
    oldWeapon: ""
  },
  shield: false
};


//current player start with hunter
var currentPlayer = hunter.type;


// Random number between 1-10 helper function
function random() {
  let rand = null;
  rand = Math.floor(Math.random() * 10) + 1;
  return rand;
}
// Random number between 1-100 helper function 
function random100() {
  let rand = null;
  rand = Math.floor(Math.random() * 100) + 1;
  return rand;
}

// Generates the grid squares and fills in data-row/data-columns
function makeGrid() {
  let column = 0;
  let row = 1;

  for (let col = 0; col < 100; col++) {
    column++;

    $("#map").append(
      `<div data-row="${row}" data-col="${column}"></div>`
    );

    if (column === 10) {
      row++;
      column = 0;
    }
  }
}

//Generate the actual map -calling the makeGrid function
makeGrid();

// Create an array based on the grid
var gridSquares = $("#map > div").toArray();



// Places obstacles randomly onto the map and adds class "full" to signify that square is taken and checks to make sure there are no repeats
function placeObstacle() {
  for (let v = 0; v < 15; v++) {
    var randomNum = random100();
    var randomSquare = gridSquares[randomNum];
    if (!$(randomSquare).hasClass("full")) {
      $(randomSquare).addClass('full').append(obstacle);
    } else {
      v--;
    }

  }
}


function placeWeapon(weapon) {
  for (let h = 0; h < gridSquares.length; h++) {
    var randomNum = random100();
    var randomSquare = gridSquares[randomNum];

    if (!$(randomSquare).hasClass("full")) {
      $(randomSquare).append(weapon);
      break;
    }

  }
}

// Places player token on the map randomly, making sure players are not stacked or spawned next to each other
function placePlayer(player) {
  for (let h = 0; h < gridSquares.length; h++) {
    var randomNum = random100();
    var randomSquare = gridSquares[randomNum];
    var rightSquare = gridSquares[randomNum + 1];
    var leftSquare = gridSquares[randomNum - 1];
    var topSquare = gridSquares[randomNum - 10];
    var bottomSquare = gridSquares[randomNum + 10];

    if (!$(randomSquare).hasClass('full') &&
      !$(rightSquare).hasClass('full') &&
      !$(leftSquare).hasClass('full') &&
      !$(topSquare).hasClass('full') &&
      !$(bottomSquare).hasClass('full')) {
      $(randomSquare).addClass('full').append(player.avatar);
      player.position.col = randomSquare.dataset.col;
      player.position.row = randomSquare.dataset.row;
      break;
    }

  }
}


var movement = {
  north: function(player) {
    // create var for 3 squares north of current player
    var north_1 = Number(player.position.row) - 1;
    var north_2 = Number(player.position.row) - 2;
    var north_3 = Number(player.position.row) - 3;

    //if closest square is NOT full, highlight it and proceed to the next square
    if (
      !$(
        "[data-row=" + north_1 + "][data-col=" + player.position.col + "]"
      ).hasClass("full")
    ) {
      $(
        "[data-row=" + north_1 + "][data-col=" + player.position.col + "]"
      ).addClass("highlight");
      if (
        !$(
          "[data-row=" + north_2 + "][data-col=" + player.position.col + "]"
        ).hasClass("full")
      ) {
        $(
          "[data-row=" + north_2 + "][data-col=" + player.position.col + "]"
        ).addClass("highlight");
        if (
          !$(
            "[data-row=" + north_3 + "][data-col=" + player.position.col + "]"
          ).hasClass("full")
        ) {
          $(
            "[data-row=" + north_3 + "][data-col=" + player.position.col + "]"
          ).addClass("highlight");
        }
      }
    }
  },
  

  south: function(player) {
    // create var for 3 squares south of current player
    var south_1 = Number(player.position.row) + 1;
    var south_2 = Number(player.position.row) + 2;
    var south_3 = Number(player.position.row) + 3;

    //if closest square is NOT full, highlight it and proceed to the next square
    if (
      !$(
        "[data-row=" + south_1 + "][data-col=" + player.position.col + "]"
      ).hasClass("full")
    ) {
      $(
        "[data-row=" + south_1 + "][data-col=" + player.position.col + "]"
      ).addClass("highlight");
      if (
        !$(
          "[data-row=" + south_2 + "][data-col=" + player.position.col + "]"
        ).hasClass("full")
      ) {
        $(
          "[data-row=" + south_2 + "][data-col=" + player.position.col + "]"
        ).addClass("highlight");
        if (
          !$(
            "[data-row=" + south_3 + "][data-col=" + player.position.col + "]"
          ).hasClass("full")
        ) {
          $(
            "[data-row=" + south_3 + "][data-col=" + player.position.col + "]"
          ).addClass("highlight");
        }
      }
    }
  },
 

  east: function(player) {
    // create var for 3 squares east of current player
    var east_1 = Number(player.position.col) + 1;
    var east_2 = Number(player.position.col) + 2;
    var east_3 = Number(player.position.col) + 3;

    //if closest square is NOT full, highlight it and proceed to the next square
    if (
      !$(
        "[data-col=" + east_1 + "][data-row=" + player.position.row + "]"
      ).hasClass("full")
    ) {
      $(
        "[data-col=" + east_1 + "][data-row=" + player.position.row + "]"
      ).addClass("highlight");
      if (
        !$(
          "[data-col=" + east_2 + "][data-row=" + player.position.row + "]"
        ).hasClass("full")
      ) {
        $(
          "[data-col=" + east_2 + "][data-row=" + player.position.row + "]"
        ).addClass("highlight");
        if (
          !$(
            "[data-col=" + east_3 + "][data-row=" + player.position.row + "]"
          ).hasClass("full")
        ) {
          $(
            "[data-col=" + east_3 + "][data-row=" + player.position.row + "]"
          ).addClass("highlight");
        }
      }
    }
  },
  

  west: function(player) {
    // create var for 3 squares west of current player
    var west_1 = Number(player.position.col) - 1;
    var west_2 = Number(player.position.col) - 2;
    var west_3 = Number(player.position.col) - 3;

    //if closest square is NOT full, highlight it and proceed to the next square
    if (
      !$(
        "[data-col=" + west_1 + "][data-row=" + player.position.row + "]"
      ).hasClass("full")
    ) {
      $(
        "[data-col=" + west_1 + "][data-row=" + player.position.row + "]"
      ).addClass("highlight");
      if (
        !$(
          "[data-col=" + west_2 + "][data-row=" + player.position.row + "]"
        ).hasClass("full")
      ) {
        $(
          "[data-col=" + west_2 + "][data-row=" + player.position.row + "]"
        ).addClass("highlight");
        if (
          !$(
            "[data-col=" + west_3 + "][data-row=" + player.position.row + "]"
          ).hasClass("full")
        ) {
          $(
            "[data-col=" + west_3 + "][data-row=" + player.position.row + "]"
          ).addClass("highlight");
        }
      }
    }
  },
  

  //on player 1 mouse over, highlight functions runs for player 1
  showMoveshunter: function() {
    movement.north(hunter);
    movement.south(hunter);
    movement.east(hunter);
    movement.west(hunter);

    //enables highlighted squares to be clicked
    $(".highlight").on("click", function() {
      movement.movePlayer.call(this, hunter);
    });
  },

  //on player 2 mouse over, highlight function runs for player 2
  showMoveshuntress: function() {
    movement.north(huntress);
    movement.south(huntress);
    movement.east(huntress);
    movement.west(huntress);

    //enables highlighted squares to be clicked
    $(".highlight").on("click", function() {
      movement.movePlayer.call(this, huntress);
    });
  },

  //on highlight click, this moves players and updates the weapons
movePlayer: function(player) {
  if ($(this).hasClass("highlight")) {

    //remove old player image and leave old weapon in previous square
    if (player == hunter) {
      $("img#hunter")
      .parent()
      .append(player.weapon.oldWeapon);
      player.weapon.oldWeapon= "";
      $("img#hunter").remove();
    } else {
      $("img#huntress")
      .parent()
      .append(player.weapon.oldWeapon);
      player.weapon.oldWeapon = "";
      $("img#huntress").remove();
    }

    $(`[data-col="${player.position.col}"][data-row="${player.position.row}"]`).removeClass("full");

    //place player image in new location and update class to full
    $(this).prepend(player.avatar);
    $(this).addClass("full");

    //if weapon is in grid, swap the weapons and update the player panel
    if (
      $(this)
        .children()
        .is("img.weapon")
    ) {
      player.weapon.oldWeapon = player.weapon.image;
      player.weapon.image = $(this)
        .children(".weapon")
        .prop("outerHTML");
      $("#" + player.type + "WeaponPanel")
        .children("img")
        .remove();
      $("#" + player.type + "WeaponPanel").prepend(player.weapon.image);
      inputUpdate($("#" + player.type + "AttackInput"));
      $("#" + player.type + "AttackInput").html(
        $(this)
          .children(".weapon")
          .attr("data-damage")
      );
      player.weapon.damage = Number(
        $(this)
          .children(".weapon")
          .attr("data-damage")
      );

      if (player == hunter) {
        $('#p1_damage').html(player.weapon.damage)
      }else{
        $('#p2_damage').html(player.weapon.damage)
      }

      $(this)
        .children(".weapon")
        .remove();
    }

    //update player position
    player.position.col = this.dataset.col;
    player.position.row = this.dataset.row;
   

    //remove highlight class
    $("#map > div").removeClass("highlight");
    $("#map > div").off("click");

     // MOVE ON TO DETECT BATTLE FUNCTION
     setTimeout(gameTurn.detectBattle, 500);
  }
}
};

var gameTurn = {
// START TURN BY ENABLING LISTENER FOR PLAYER MOVEMENT OBJECT FOR CURRENT PLAYER
detectTurn: function() {
  // REMOVE CURRENT PLAYER PANEL HIGHLIGHT
  $(".player-board").removeClass("activePlayer");
  // IF NEW CURRENT PLAYER IS PLAYER#1
  if (currentPlayer == "hunter") {
    $("#player1").addClass("activePlayer");
    $("#hunter").mouseenter(movement.showMoveshunter);
    // IF NEW CURRENT PLAYER IS PLAYER#2
  } else if (currentPlayer == "huntress") {
    $("#player2").addClass("activePlayer");
    $("#huntress").mouseenter(movement.showMoveshuntress);
  }
},

// DETERMINE IF THERE WILL BE A BATTLE
detectBattle: function() {
  var columnDif = hunter.position.col - huntress.position.col;
  var rowDif = hunter.position.row - huntress.position.row;
  // IF AFTER MOVEMENT PLAYERS ARE TOUCHING, ENTER BATTLE
  if (
    (hunter.position.col == huntress.position.col &&
      (rowDif == -1 || rowDif == +1)) ||
    (hunter.position.row == huntress.position.row &&
      (columnDif == -1 || columnDif == +1))
  ) {
    // ON PLAYER#1 TURN
    if (currentPlayer == "hunter") {
      // IF PLAYER#2 HAS NO SHIELD
      if (huntress.shield === false) {
        huntress.health = huntress.health - hunter.weapon.damage;
        inputUpdate($("#p2_health"));
        $("#p2_health").html(huntress.health);
        changeProfilePic(huntress);
        // CHECK FOR PLAYER DEFEAT BEFORE RETALIATION
        if (huntress.health <= 0) {
          setTimeout(gameOver, 500);
        } else {
          // RETALIATION
          hunter.health = hunter.health - huntress.weapon.damage;
          inputUpdate($("#p1_health"));
          $("#p1_health").html(hunter.health);
          changeProfilePic(hunter);
        }
        // IF PLAYER#2 HAS SHIELD
      } else if (huntress.shield === true) {
        huntress.health = huntress.health - hunter.weapon.damage / 2;
        inputUpdate($("#p2_health"));
        $("#p2_health").html(huntress.health);
        changeProfilePic(huntress);
      }
      // ON PLAYER#2 TURN
    } else if (currentPlayer == "huntress") {
      // IF PLAYER#1 HAS NO SHIELD
      if (hunter.shield === false) {
        hunter.health = hunter.health - huntress.weapon.damage;
        inputUpdate($("#p1_health"));
        $("#p1_health").html(hunter.health);
        changeProfilePic(hunter);
        // CHECK FOR PLAYER DEFEAT BEFORE RETALIATION
        if (hunter.health <= 0) {
          setTimeout(gameOver, 500);
        } else {
          // RETALIATE
          inputUpdate($("#p2_health"));
          hunter.health = huntress.health - hunter.weapon.damage;
          $("#p2_health").html(huntress.health);
          changeProfilePic(huntress);
        }
        // IF PLAYER#1 HAS SHIELD
      } else if (hunter.shield === true) {
        hunter.health = hunter.health - huntress.weapon.damage / 2;
        inputUpdate($("#p1_health"));
        $("#p1_health").html(hunter.health);
        changeProfilePic(hunter);
      }
    }
    // CHECK FOR PLAYER DEFEAT
    if (hunter.health <= 0 || huntress.health <= 0) {
      setTimeout(gameOver, 500);
    } else {
      // IF NO PLAYER DEFEATED PROCEED TO SHIELD FUNCTION
      setTimeout(gameTurn.shieldStatus, 700);
    }
  } else {
    // IF NOT TOUCHING OPPONENT PROCEED TO SHIELD FUNCTION
    setTimeout(gameTurn.shieldStatus, 700);
  }
},

// ASK PLAYER IF THEY WANT TO ENABLE SHIELD
shieldStatus: function() {
  $("#shieldModal").css("display", "block");
  $(".shieldButton").on("click", function() {
    // IF PLAYER CHOOSES SHIELD UP, UPADTE PLAYER OBJECT AND PANEL
    if ($(this).attr("id") === "shieldUp") {
      if (currentPlayer == "hunter") {
        hunter.shield = true;
        inputUpdate($("#p1_shield"));
        $("#p1_shield").html("UP");
      } else if (currentPlayer == "huntress") {
        huntress.shield = true;
        inputUpdate($("#p2_shield"));
        $("#p2_shield").html("UP");
      }
      // IF PLAYER CHOOSES SHIELD DOWN, UPADTE PLAYER OBJECT AND PANEL
    } else if ($(this).attr("id") === "shieldDown") {
      if (currentPlayer == "hunter") {
        hunter.shield = false;
        inputUpdate($("#p1_shield"));
        $("#p1_shield").html("DOWN");
      } else if (currentPlayer == "huntress") {
        huntress.shield = false;
        inputUpdate($("#p2_shield"));
        $("#p2_shield").html("DOWN");
      }
    }
    // DISABLE CLICK LISTENER FOR SHIELD AND HIDE MODAL
    $(".shieldButton").off();
    $("#shieldModal").css("display", "none");
    // PROCEED TO CHANGE TURN FUNCTION
    setTimeout(gameTurn.changeTurn, 500);
  });
},

// CHANGE CURRENT PLAYER VARIABLE
changeTurn: function() {
  switch (true) {
    case currentPlayer == "hunter":
      currentPlayer = "huntress";
      break;
    case currentPlayer == "huntress":
      currentPlayer = "hunter";
      break;
  }
  // PROCEED TO START OF TURN CYCLE AGAIN
  setTimeout(gameTurn.detectTurn, 500);

}
};

// CHANGE PROFILE PHOTO OPACITY ON HEALTH CHANGE
//Under construction
function changeProfilePic(player) {
  switch (true) {
    case player.health <= 60 && player.health > 30:
      $("#profilePic_" + player.type).css("opacity", 0.6);
      break;
    case player.playerHealth <= 30 && player.playerHealth > 0:
      $("#profilePic_" + player.type).css("opacity", 0.3);
      break;
    case player.playerHealth <= 0:
      $("#profilePic_" + player.type).css("opacity", 0.1);
      break;
  }
}

// FLASH COLOUR ON INPUT FIELD UPON CHANGE OF CONTENT
function inputUpdate(updateItem) {
  updateItem.addClass("valueChanged");
  setTimeout(function() {
    updateItem.removeClass("valueChanged");
  }, 1500);
}

// GAME OVER FUNCTION
function gameOver() {
  var winner;
  if (hunter.health <= 0) {
    winner = huntress.type;
  } else if (huntress.health <= 0) {
    winner = hunter.type;
  }
  $("#winner").html(winner);
  $("#gameOverModal").css("display", "block");

  $("#gameOverClose").on("click", function() {
    $("#gameOverModal").css("display", "none");
  });
}

// RESET GAME MAP
function reset() {
  $("#map > div").removeClass("full highlight");
  $("#map > div").empty();
}

function boardSetup() {
  $("#p1_health").html(hunter.health);
  $("#p2_health").html(huntress.health);
  $("#p1_damage").html(hunter.weapon.damage);
  $("#p2_damage").html(huntress.weapon.damage);
}


console.log(gridSquares);




$(function () {  

  $("#rules").on("click", function () {
    $("body").addClass("popup-active");
  });

  $(".close").on("click", function(e) {
    e.preventDefault();
    $("body").removeClass("popup-active");
  });

  $("#newGame").on("click", function() {
    reset();
    placeObstacle();
    placePlayer(hunter);
    placePlayer(huntress);
    placeWeapon(weapon1);
    placeWeapon(weapon2);
    placeWeapon(weapon3);
    placeWeapon(weapon4);
    boardSetup();
    gameTurn.detectTurn();
  });
});