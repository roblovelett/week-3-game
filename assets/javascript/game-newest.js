$(document).ready(function() {

var o_game = {
    string: {
        header_text: "Hangman", //set header text,
        subtitle_text: "Internet Cat", //set subtitle text,
        intro_text: "Press Any Key to Get Started!" //intro text
    } 
};

f_intro(); //intro screen

function f_intro() {
    
    $("#header_title").html( //display o_start_textcreen.header_text
        "<h1>" + o_game.string.header_text + "</h1>" +
        "<h2>" + o_game.string.subtitle_text + "</h2>" 
    );    
    $("#intro").html(o_game.string.intro_text); //display o_start_text.intro_text

    $(document).on('keypress', function (event) {
        $("#intro").remove(); //remove press any key text
        f_game(); //start game
    });

};

function f_game() {

    o_game.string.wins_text = "Wins"; //Wins
    o_game.string.current_word_text = "Current Word", //current_word_text: Curent Word
    o_game.string.guesses_remaining_text = "Number of Guesses Remaining"; //guesses_remaining_text: Number of Guesses Remaining
    o_game.string.already_guessed_text = "Already Guessed"; //guesses_text: Letters Already Guessed
    o_game.array = {
        words: ["lil bub", "brother cream", "grumpy cat", "henri", "longcat", "limecat", "nyan cat", "happy cat", "business cat", "tacgnol", "ceiling cat"] //word bank
    };

    o_game.string.random_word = o_game.array.words[Math.floor(Math.random() * o_game.array.words.length)];
    console.log(o_game.string.random_word);
    //o_game.array.random_letters = f_random_letters();
    //o_game.array.random_letters = o_game.array.random_letters.map(toUpper);
    //o_game.string.correct_word = o_game.array.random_letters.join("");
        
    //add default game text
    $("#wins").html(o_game.string.wins_text + "<br />"); //display wins text
    $("#hidden_word").html(o_game.string.current_word_text + "<br />"); //display hidden word text
    $("#guesses_remaining").html(o_game.string.guesses_remaining_text + "<br />"); //display guesses remaining text
    $("#guesses_letters").html(o_game.string.guesses_text + "<br />"); //display letters guessed text

    /*
    o_game.array.hidden_letters = f_hidden_letters(o_game.random_letters); //array of letters &/ spaces generated from random word
    o_game.string.hidden_word = o_game.hidden_letters.join(""); //create hidden word by joining hidden letters
*/
};

function f_random_letters() {
    o_

};

function f_init_game() {

    if (o_game.start) { //set initial game text
        
        


        o_game.guesses_remaining = 8; //init guesses remaining
        o_game.guesses_letters = []; //init/clear array of letters guessed

        $("#hidden_word").append(o_game.hidden_word); //add hidden word to game

        $(document).on('keypress', function (event) { //on keypress
            var keypress = String.fromCharCode(event.keyCode); //get char from keypress
            if (/[a-zA-Z0-9]/.test(keypress)) {//if keypress A-Za-z0-9
                o_game.round = true; //start first round
                o_game.rounds_counter ++; //add 1 to rounds counter
                o_game.turn = true; //start first turn
                o_game.keypress_guess = keypress.toUpperCase() + " ";
                f_turn();
            };
        });
    };
};

// while guesses remaining is not zero
//   detect the keypress
//   get char from keypress
//   if keypress is valid
//     call "start the turn"
//   else (keypress is not valid)
//     subtract 1 from guesses remaining
//     output "try again" message
//   if guesses remaining equals 0
//     game over equals true, round is over, and increment loss counter
//     
//
//
// start the turn
//   change keypress to uppercase
//   

function f_round() {

    console.log("round: ", o_game.round, "o_game.win: ", o_game.win, "o_game.lose: ", o_game.lose);

    if (o_game.round) {
        console.log("I'm in here.");
        while (!o_game.win || !o_game.lose) {
            console.log("infinite loop?");
            $(document).on('keypress', function (event) { //detect keypress
                var keypress = String.fromCharCode(event.keyCode); //get char from keypress
                if (/[a-zA-Z0-9]/.test(keypress)) {//if keypress A-Za-z0-9
                    o_game.turn = true; //start first turn
                    o_game.keypress_guess = keypress.toUpperCase() + " ";
                    f_turn();
                };
            });

            //win/lose conditions
            if (o_game.hidden_word === o_game.correct_word) { //if user finds all the letters, matches correct word
                o_game.win = true; //user wins
                o_game.round = false; //end round
                o_game.wins_counter ++; //add 1 to wins counter
                $("#wins").append(o_game.wins_counter); //display wins number
            } else { //if user is out of guesses
                o_game.lose = true; //user loses round
                o_game.round = false; //end round
                o_game.losses_counter ++; //add 1 to losses    
            };
            
        };

    }; //end round
    
    o_game.rounds_counter++; //add 1 to rounds counter
    f_init_game(); //reset

};

function f_turn() {
 
    if (o_game.turn) {

        o_game.turns_counter++; //add 1 to turns counter
        
        for (i = 0; i < o_game.random_letters.length; i ++) { //check if keypress is match/incorrect
            if (o_game.keypress_guess === o_game.random_letters[i]) { //if key equals one or more of the entries in random word array
                o_game.match = true; //set match to true
                o_game.hidden_letters[i] = o_game.keypress_guess + " "; //replace matching letters to key, convert to uppercase    
            } else { //else if key does not equal any entries in random word array
                o_game.wrong = true; //set wrong to true
            };
        };

        if (o_game.wrong) { //if incorrect guess
            o_game.incorrect_counter ++; //add 1 to incorrect counter
            o_game.guesses_remaining = o_game.guesses_remaining - o_game.incorrect_counter; //subtract 1 from # of guesses remaining
            o_game.guesses_letters.push(o_game.keypress_guess); //store char from keypress into guesses array 
            o_game.guesses = o_game.guesses_letters.join(""); //join guesses string from guesses array
            $("#guesses_remaining").append(o_game.guesses_remaining); //display # of guesses remaining
            $("#guesses_letters").append(o_game.guesses); //display guessed letters
        };

        //update output
        o_game.hidden_word = o_game.hidden_letters.join(""); //update hidden word by joining hidden letters
        $("#hidden_word").html(o_game.hidden_word); //replace hidden word output

        o_game.turn = false; //end turn

    };
    
    f_round(); //back to round state

};

function f_hidden_letters(o_game_random_letters) {
    var hidden_letters = [];

    for (i = 0; i < o_game.random_letters.length; i++) {         
        if (o_game.random_letters[i] != "&nbsp;&nbsp;") {
            hidden_letters[i] = "_ ";
        } else {
            hidden_letters[i] = o_game.random_letters[i];
        };
    };

    return hidden_letters;
};

}); //end document ready