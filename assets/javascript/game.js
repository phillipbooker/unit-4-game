function Character(name, health, attack, counter, picture){
    this.name = name;
    this.health = health;
    this.base = attack;
    this.attack = attack;
    this.counter = counter;
    this.picture = picture;
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

var obiWan = new Character("obiWan", 120, 8, 6, "assets/images/obi-wan.jpg");
var luke = new Character("luke", 100, 3, 5, "assets/images/luke.jpg");
var dooku = new Character("dooku", 150, 8, 20, "assets/images/dooku.jpg");
var vader = new Character("vader", 180, 8, 25, "assets/images/vader.jpg");

//Adds characters to character array
characters.push(obiWan);
characters.push(luke);
characters.push(vader);
characters.push(dooku);

$("#start-btn").on("click", function(){
    if(gameState == 0){
        console.log(characters);

        $.each(characters, function(i, char){
            var charBox = $("<div>");
            charBox.addClass("char");
            charBox.attr("name", char.name);
            charBox.attr("health", char.health);
            charBox.text(char.name);
            $("#character-row").append(charBox);
        });
    
        gameState = 1;
    }

    $("#game-state").text(gameState);
});

//Character select phase: state 1
$("#character-row").on("click", ".char", function(){
    if(gameState == 1){

        //Set the player's character
        var clickedName = $(this).attr("name");
        $.each(characters, function(i, char){
            if(char.name == clickedName){
                yourCharacter = char;
            } else {
                enemies.push(char);
            }
        });

        console.log("Your Character:" + yourCharacter.name);

        $.each(enemies, function(i, char){
            console.log("Enemy " + (i+1) + ": " + char.name);
        });

        //Empty the character select row
        $("#character-row").empty();

        //Add player's character to character row
        var charBox = $("<div>");
        charBox.addClass("char");
        // charBox.attr("id", "player");
        charBox.attr("name", yourCharacter.name);
        charBox.attr("health", yourCharacter.health);
        charBox.text(yourCharacter.name);
        $("#character-row").append(charBox);

        //Add enemies to enemies row
        $.each(enemies, function(i, enemy){
            var enemyBox = $("<div>");
            enemyBox.addClass("char");
            enemyBox.attr("name", enemy.name);
            enemyBox.attr("health", enemy.health);
            enemyBox.text(enemy.name);
            $("#enemy-row").append(enemyBox);
        });

        //Advance game
        gameState = 2;
    }
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
            if(char.name == clickedName){
                defender = char;
            } else {
                enemies.push(char);
            }
        });

        console.log("Your Character:" + yourCharacter.name);
        console.log("Your Defender:" + defender.name);

        $.each(enemies, function(i, char){
            console.log("Enemy " + (i+1) + ": " + char.name);
        });

        //Empty the enemy select row
        $("#enemy-row").empty();

        //Add defender's character to defender row
        var charBox = $("<div>");
        charBox.addClass("char");
        // charBox.attr("id", "defender");
        charBox.attr("name", defender.name);
        charBox.attr("health", defender.health);
        charBox.text(defender.name);
        $("#defender-row").append(charBox);

        //Add enemies to enemies row
        $.each(enemies, function(i, enemy){
            var enemyBox = $("<div>");
            enemyBox.addClass("char");
            enemyBox.attr("name", enemy.name);
            enemyBox.attr("health", enemy.health);
            enemyBox.text(enemy.name);
            $("#enemy-row").append(enemyBox);
        });

        //Advance game
        gameState = 3;
    }
    $("#game-state").text(gameState);
});

$("#attack-btn").on("click", function(){
    if(gameState == 3){
        if(defender.health > 0){

            //Fight sequence
            
            defender.health -= yourCharacter.attack;
            yourCharacter.attack += yourCharacter.base;

            //If defender is alive, they will counterattack
            if(defender.health > 0){
                yourCharacter.health -= defender.counter;

                //Remove defender from row and re-add with new stats
                $("#defender-row").empty();

                var defenderBox = $("<div>");
                defenderBox.addClass("char");
                defenderBox.attr("name", defender.name);
                defenderBox.attr("health", defender.health);
                defenderBox.text(defender.name);
                $("#defender-row").append(defenderBox);

                if(yourCharacter.health <= 0){
                    //Game Over state
                    gameState = 99;
                }

            } else {
                //Remove defender from row (defeated)
                $("#defender-row").empty();

                //Go back to defender select state
                if(enemies.length > 0){
                    gameState = 2;
                } else {
                    //Game Win state
                    gameState = 77;
                }
            }

            //Remove character from row and re-add with new stats
            $("#character-row").empty();

            var charBox = $("<div>");
            charBox.addClass("char");
            charBox.attr("name", yourCharacter.name);
            charBox.attr("health", yourCharacter.health);
            charBox.text(yourCharacter.name);
            $("#character-row").append(charBox);

            

            console.log("Your health: " + yourCharacter.health);
            console.log("Your attack: " + yourCharacter.attack);
            
            console.log("Defender health: " + defender.health);

        }
    
    }
    $("#game-state").text(gameState);
});


$(document).ready(function(){

});


//Testing
// $(".row").on("click", function(){
//     console.log("Hi");
// });

// $("img").on("click", function(){
//     console.log("Hiz");
// });

// $(".char").on("click", "img", function(){
//     console.log("Hizz");
//     console.log($("#char1").hasClass("char-pic"));
//     console.log($(this).attr("health"));
// });