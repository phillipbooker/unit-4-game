# unit-4-game

This is a Star Wars themed RPG game made with jQuery.

The objective of the game is to defeat all enemies before the player's health reduces to zero.

The game begins by having the player choose their character. The remaining characters will become enemies. The player will choose their opponent one by one until there are no remaining enemies. Once the first enemy is chosen, it will become the Defender.

As the player's character attacks the Defender, its attack will increase by a set value. If the Defender still has remaining health after the player's attack the Defender will counter attack. (The Defender's counter attack will always be a set value.)

Once the player defeats a Defender they will choose another opponent. Once all opponents are defeated, the player wins! If the player's health falls to zero during battle the game is over.

In order to win, the player must choose a winning sequence of opponents. Every character has the ability to win and lose the game.

As the game changes states the character boxes are created using a JavaScript function that builds the character <div> and places it in the appropriate game row.

All messages that are important to the user are shown in a message box at the bottom of the screen.

## Instructions

#### Character Select Phase
Choose your character.

#### Enemy Select Phase
Select your first opponent.

#### Fight Phase!
Attack the Defender using the "Attack" button. As your character attacks you will become stronger.

#### Defeat all enemies!
Once you defeat all enemies you win!

#### Technologies

jQuery, HTML, CSS

#### Notes