function Character(name, health, attack, counter, picture){
    this.name = name;
    this.health = health;
    this.base = attack;
    this.attack = attack;
    this.counter = counter;
    this.picture = picture;
}

var characters = [];
//Use id variable as character identifier?

var enemies = [];
//var opponent = [];

var obiWan = new Character("obiWan", 15, 3, 5, "assets/images/obi-wan.jpg");
var luke = new Character("luke", 10, 3, 5, "assets/images/luke.jpg");
var vader = new Character("vader", 20, 8, 30, "assets/images/vader.jpg")
var dooku = new Character("dooku", 30, 8, 30, "assets/images/dooku.jpg")

characters.push(obiWan);
characters.push(luke);
characters.push(vader);
characters.push(dooku);

$("#start-btn").on("click", function(){
    console.log(characters);

    $.each(characters, function(i, char){
        var charBox = $("<div>");
        charBox.addClass("char");
        charBox.attr("name", char.name);
        charBox.attr("health", char.health);
        charBox.text(char.name);
        $("#character-row").append(charBox);
    });

});

// $.each(letters, function(i, letter){
//     // $("#buttons").append('<button class="letter-btn">' + letter + '</button>');
//     var letterBtn = $("<button>");
//     letterBtn.addClass("letter-button letter letter-button-color");
//     letterBtn.attr("data-letter", letter);
//     letterBtn.text(letter);
//     $("#buttons").append(letterBtn);
// });


$(".row").on("click", function(){
    console.log("Hi");
});

$("img").on("click", function(){
    console.log("Hiz");
});

$(".char").on("click", "img", function(){
    console.log("Hizz");
    console.log($("#char1").hasClass("char-pic"));
    console.log($(this).attr("health"));
});

$(".game-row").on("click", ".char", function(){
    console.log("Hizz");
    console.log($(this).attr("health"));
});



$(document).ready(function(){

});