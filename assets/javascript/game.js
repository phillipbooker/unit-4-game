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

var obiWan = new Character("obi", 15, 3, 5, "assets/images/obi-wan.jpg");
var luke = new Character("luke", 15, 3, 5, "assets/images/luke.jpg");

characters.push(obiWan);
characters.push(luke);

$("#attack-btn").on("click", function(){
    // $("#characters-div").append(obiWan.health);
    // $("<p>" + obiWan.health + "</p>").appendTo("#characters-div");

    // $("#characters-div").append('<img class ="char-pic" src="' + obiWan.picture + '">');
    // $("#characters-div").append('<img class ="char-pic" src="' + luke.picture + '">');
    // console.log(obiWan.health);

    console.log(characters);

    $.each(characters, function(i, char){
        $("#char" + (i+1)).html('<img class ="char-pic" src="' + char.picture + '">');
    });
});

$(".row").on("click", function(){
    console.log("Hi");
});

$("img").on("click", function(){
    console.log("Hiz");
});

$(document).ready(function(){

});