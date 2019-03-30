function Character(id, name, health, attack, counter, picture){
    this.id = id;
    this.name = name;
    this.health = health;
    this.base = attack;
    this.attack = attack;
    this.counter = counter;
    this.picture = picture;
}

function addCharacter(char, charClass){
    var charDiv = $("<div>");
    charDiv.addClass("char");
    charDiv.addClass(charClass);
    charDiv.attr("name", char.id);
    charDiv.attr("health", char.health);
    charDiv.css("text-align", "center");
    charDiv.text(char.name);

    var pic = $("<img>");
    pic.attr("src", char.picture);
    pic.addClass("char-pic");
    charDiv.append(pic);

    var pHealth = $("<p>");
    pHealth.text(char.health);
    charDiv.append(pHealth);

    return(charDiv);
}

//Hold all characters in the game
var characters = [];

//Holds enemy characters
var enemies = [];

//Characters in game
var yourCharacter;
var defender;

//Used to keep track of game's progress
var gameState = 0;


function restart(){
    //Hide restart button
    $("#restart-btn").css("display", "none");
    
    //Empty all rows
    $("#character-row").empty();
    $("#enemy-row").empty();
    $("#defender-row").empty();

    //Empty all game arrays
    characters = [];
    enemies = [];

    var obiWan = new Character("obiWan", "Obi Wan", 120, 8, 15, "assets/images/obi-wan.jpg");
    var luke = new Character("luke", "Luke Skywalker", 100, 15, 5, "assets/images/luke.jpg");
    var dooku = new Character("dooku", "Count Dooku", 150, 8, 20, "assets/images/dooku.jpg");
    var vader = new Character("vader", "Darth Vader", 170, 5, 25, "assets/images/vader.jpg");

    //Adds characters to character array
    characters.push(obiWan);
    characters.push(luke);
    characters.push(vader);
    characters.push(dooku);

    $.each(characters, function(i, char){
        //Create character div with function and add to character row
        var charBox = addCharacter(char, "default");
        $("#character-row").append(charBox);
    });

    gameState = 1;

    //Update game messages
    $("#game-direction").text("Select your character.");
    $("#player-message").text("");
    $("#defender-message").text("");
    $("#game-state").text(gameState);
}


//Character select phase: state 1
$("#character-row").on("click", ".char", function(){
    if(gameState == 1){

        //Set the player's character
        var clickedName = $(this).attr("name");
        $.each(characters, function(i, char){
            if(char.id == clickedName){
                yourCharacter = char;
            } else {
                enemies.push(char);
            }
        });

        console.log("Your Character:" + yourCharacter.name);

        //Debug
        $.each(enemies, function(i, char){
            console.log("Enemy " + (i+1) + ": " + char.name);
        });

        //Empty the character select row
        $("#character-row").empty();

        //Add player's character to character row
        var charBox = addCharacter(yourCharacter, "player");
        $("#character-row").append(charBox);

        //Add enemies to enemies row
        $.each(enemies, function(i, enemy){
            var enemyBox = addCharacter(enemy, "enemy");
            $("#enemy-row").append(enemyBox);
        });

        //Advance game
        gameState = 2;
    }

    //Update game messages
    $("#game-direction").text("Choose your opponent.");
    $("#player-message").text("");
    $("#defender-message").text("");
    $("#game-state").text(gameState);
});

//Enemy select phase: state 2
$("#enemy-row").on("click", ".char", function(){
    if(gameState == 2){

        //Empty the enemies array
        tempEnemies = enemies;
        enemies = [];

        //Set the defender
        var clickedName = $(this).attr("name");
        $.each(tempEnemies, function(i, char){
            if(char.id == clickedName){
                defender = char;
            } else {
                enemies.push(char);
            }
        });

        //Debug
        console.log("Your Character:" + yourCharacter.name);
        console.log("Your Defender:" + defender.name);

        $.each(enemies, function(i, char){
            console.log("Enemy " + (i+1) + ": " + char.name);
        });

        //Empty the enemy select row
        $("#enemy-row").empty();

        //Add defender's character to defender row
        var defenderBox = addCharacter(defender, "defender");
        $("#defender-row").append(defenderBox);

        //Add enemies to enemies row
        $.each(enemies, function(i, enemy){
            var enemyBox = addCharacter(enemy, "enemy");
            $("#enemy-row").append(enemyBox);
        });

        //Advance game
        gameState = 3;
    }

    //Update game messages
    $("#game-direction").text("Fight! (Click the attack button to attack!)");
    $("#player-message").text("");
    $("#defender-message").text("");
    $("#game-state").text(gameState);
});

$("#attack-btn").on("click", function(){
    if(gameState == 3){
        if(defender.health > 0){

            //Fight sequence
            
            //Display player damage
            $("#player-message").text("You dealt " + yourCharacter.attack + " damage!");

            defender.health -= yourCharacter.attack;
            yourCharacter.attack += yourCharacter.base;

            //If defender is alive, they will counterattack
            if(defender.health > 0){
                yourCharacter.health -= defender.counter;

                //Display Defender damage
                $("#defender-message").text(defender.name + " countered for " + defender.counter + " damage!");
                
                //Remove defender from row and re-add with new stats
                $("#defender-row").empty();

                var defenderBox = addCharacter(defender, "defender");
                $("#defender-row").append(defenderBox);

                if(yourCharacter.health <= 0){

                    //Prevents player health from going below 0
                    yourCharacter.health = 0;

                    //Game Over state
                    gameState = 99;
                    $("#restart-btn").css("display", "inline-block");
                    $("#game-direction").text("Game over... (Click the Restart button to try again!)");
                } else {
                    $("#game-direction").text("Fight! (Click the attack button to attack!)");
                }

            } else {
                //Prevents defender health from going below 0
                defender.health = 0;

                //Remove defender from row (defeated)
                $("#defender-row").empty();

                //Display Defender damage (Didn't counter attack)
                $("#defender-message").text(defender.name + " has been defeated!");

                //Go back to defender select state
                if(enemies.length > 0){
                    gameState = 2;
                    $("#game-direction").text("Choose your next opponent.");
                } else {
                    //Game Win state
                    gameState = 77;
                    $("#restart-btn").css("display", "inline-block");
                    $("#game-direction").text("You won! (Click the Restart button to play again!)");
                }
            }

            //Remove character from row and re-add with new stats
            $("#character-row").empty();

            var charBox = addCharacter(yourCharacter, "player");
            $("#character-row").append(charBox);

            

            console.log("Your health: " + yourCharacter.health);
            console.log("Your attack: " + yourCharacter.attack);
            
            console.log("Defender health: " + defender.health);

        }
    
    }
    $("#game-state").text(gameState);
});

$("#restart-btn").on("click", function(){
    restart();
});


$(document).ready(function(){
    restart();
});
