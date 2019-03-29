function Character(id, name, health, attack, counter, picture){
    this.id = id;
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

var obiWan = new Character("obiWan", "Obi Wan", 120, 8, 15, "assets/images/obi-wan.jpg");
var luke = new Character("luke", "Luke Skywalker", 100, 15, 5, "assets/images/luke.jpg");
var dooku = new Character("dooku", "Count Dooku", 150, 8, 20, "assets/images/dooku.jpg");
var vader = new Character("vader", "Darth Vader", 170, 5, 25, "assets/images/vader.jpg");

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
            charBox.attr("name", char.id);
            charBox.attr("health", char.health);
            charBox.css("text-align", "center");
            charBox.text(char.name);

            var pic = $("<img>");
            pic.attr("src", char.picture);
            pic.addClass("char-pic");
            charBox.append(pic);

            var pHealth = $("<p>");
            pHealth.text(char.health);
            charBox.append(pHealth);

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
        var charBox = $("<div>");
        charBox.addClass("char");
        charBox.attr("name", yourCharacter.id);
        charBox.attr("health", yourCharacter.health);
        charBox.css("text-align", "center");
        charBox.text(yourCharacter.name);

        var pic = $("<img>");
        pic.attr("src", yourCharacter.picture);
        pic.addClass("char-pic");
        charBox.append(pic);

        var pHealth = $("<p>");
        pHealth.text(yourCharacter.health);
        charBox.append(pHealth);

        $("#character-row").append(charBox);

        //Add enemies to enemies row
        $.each(enemies, function(i, enemy){
            var enemyBox = $("<div>");
            enemyBox.addClass("char");
            enemyBox.attr("name", enemy.id);
            enemyBox.attr("health", enemy.health);
            enemyBox.css("text-align", "center");
            enemyBox.text(enemy.name);

            var enemyPic = $("<img>");
            enemyPic.attr("src", enemy.picture);
            enemyPic.addClass("char-pic");
            enemyBox.append(enemyPic);

            var pHealthEnemy = $("<p>");
            pHealthEnemy.text(enemy.health);
            enemyBox.append(pHealthEnemy);

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
        var defenderBox = $("<div>");
        defenderBox.addClass("char");
        defenderBox.attr("name", defender.id);
        defenderBox.attr("health", defender.health);
        defenderBox.css("text-align", "center");
        defenderBox.text(defender.name);

        var pic = $("<img>");
        pic.attr("src", defender.picture);
        pic.addClass("char-pic");
        defenderBox.append(pic);

        var pHealth = $("<p>");
        pHealth.text(defender.health);
        defenderBox.append(pHealth);

        $("#defender-row").append(defenderBox);

        //Add enemies to enemies row
        $.each(enemies, function(i, enemy){
            var enemyBox = $("<div>");
            enemyBox.addClass("char");
            enemyBox.attr("name", enemy.id);
            enemyBox.attr("health", enemy.health);
            enemyBox.css("text-align", "center");
            enemyBox.text(enemy.name);

            var enemyPic = $("<img>");
            enemyPic.attr("src", enemy.picture);
            enemyPic.addClass("char-pic");
            enemyBox.append(enemyPic);

            var pHealthEnemy = $("<p>");
            pHealthEnemy.text(enemy.health);
            enemyBox.append(pHealthEnemy);

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
                defenderBox.attr("name", defender.id);
                defenderBox.attr("health", defender.health);
                defenderBox.css("text-align", "center");
                defenderBox.text(defender.name);

                var pic = $("<img>");
                pic.attr("src", defender.picture);
                pic.addClass("char-pic");
                defenderBox.append(pic);

                var pHealth = $("<p>");
                pHealth.text(defender.health);
                defenderBox.append(pHealth);

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
            charBox.attr("name", yourCharacter.id);
            charBox.attr("health", yourCharacter.health);
            charBox.css("text-align", "center");
            charBox.text(yourCharacter.name);

            var pic = $("<img>");
            pic.attr("src", yourCharacter.picture);
            pic.addClass("char-pic");
            charBox.append(pic);

            var pHealth = $("<p>");
            pHealth.text(yourCharacter.health);
            charBox.append(pHealth);

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