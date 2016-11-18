$(document).ready(function() {

var o_game = { //game object for elements that change throughout
    header_text: "Hangman", //set header text
    subtitle_text: "Internet Cat", //set subtitle text
    intro_text: "Press Any Key to Get Started!", //intro text
    words: ["lil bub", "brother cream", "grumpy cat", "henri", "longcat", "limecat", "nyan cat", "happy cat", "business cat", "tacgnol", "ceiling cat"], //word bank
    wins_text: "Wins", //Wins
    current_word_text: "Current Word", //current_word_text: Curent Word
    guesses_remaining_text: "Number of Guesses Remaining", //guesses_remaining_text: Number of Guesses Remaining
    guesses_text: "Already Guessed", //guesses_text: Letters Already Guessed
    max_guesses: 8, //max number of guesses, this can be changed
    random_word: "", //generated random word from word bank
    random_letters: [], //array of letters &/ spaces generated from random word
    hidden_letters: [], //array of underscores &/ spaces that will change upon player guesses
    hidden_word: "", //string that will be updated depending on player guesses, compare to random word
    keypress_guess: "", //generated from keypress
    guesses_remaining: this.max_guesses, //number of guesses Remaining
    wins_counter: 0, //number of player wins
    losses_counter: 0, //number of player losses
    rounds_counter: 0, //number of rounds played
    intro: false, //init intro screen
    start: false, //init game screen
    round: false, //init game round
    turn: false, //init turn
    match: false, //init match
    wrong: false, //init wrong
    win: false, //init win
    lose: false, //init lose
    game_over: false //init game over screen
};

function f_intro() {
    o_game.intro = true; //set intro to true
    //set header text, intro text
     $("#header_title").html( //display o_start_textcreen.header_text
        "<h1>" + o_game.header_text + "</h1>" +
        "<h2>" + o_game.subtitle_text + "</h2>" );    
    $("#intro").html(o_game.intro_text); //display o_start_text.intro_text

    $(document).on('keypress', function (event) {
        o_game.intro = false;
        o_game.start = true; //start game
        $("#intro").remove(); //remove press any key text
        f_init_game(); //init game
    });
};

function f_init_game() {
    console.log("o_game.start ", o_game.start);
    if (o_game.start) { //set initial game text
        console.log("asfsafsafasfasfasfasfasfasfas");
        $("#wins").html(o_game.wins_text + "<br />"); //display wins text
        $("#hidden_word").html(o_game.current_word_text + "<br />"); //display hidden word text
        $("#guesses_remaining").html(o_game.guesses_remaining_text + "<br />"); //display guesses remaining text
        $("#guesses_letters").html(o_game.guesses_text + "<br />"); //display letters guessed text

        o_game.random_word = f_random_word(o_game.words);
        o_game.random_letters = f_random_letters(o_game.random_word);
        o_game.hidden_letters = f_hidden_letters(o_game.random_letters); //array of letters &/ spaces generated from random word
        o_game.hidden_word = f_hidden_word(o_game.hidden_letters); 

        $("#hidden_word").append(o_game.hidden_word);

        $(document).on('keypress', function (event) {
            var keypress = String.fromCharCode(event.keyCode); //get char from keypress
            if (/[a-zA-Z0-9]/.test(keypress)) {//if keypress A-Za-z0-9
                o_game.round = true; //start turn
                o_game.keypress_guess = key.toUpperCase() + " ";
                f_round(); //start round
            };
        });
    };
};

function f_round() {
    if (o_game.round) {
        o_game.turn = true;
        if (o_game.turn) {
            //check for matches
            //check if wrong
        };
    };
};

function f_random_word(o_game_words) {
    var random_word = o_game.words[Math.floor(Math.random() * o_game.words.length)];
    return random_word;
};

function f_random_letters(o_game_random_word) {
    var random_letters = o_game.random_word.split("");

    for(i=0; i < random_letters.length; i++) {
        if (random_letters[i] === " ") {
            random_letters[i] === "&nbsp;&nbsp;"
        } else {
            random_letters[i] = random_letters[i].toUpperCase() + " ";
        };
    };

    debugger;

    return random_letters;
};

function f_hidden_letters(o_game_random_letters) {
    var hidden_letters = [];

    for (i = 0; i < o_game.random_letters.length; i++) {
        while (o_game.random_letters[i] != "&nbsp;&nbsp;") {
            hidden_letters[i] = "_ ";
        };
    };

    debugger;

    return hidden_letters;
};

function f_hidden_word(o_game_hidden_letters) {
    var hidden_word = o_game.hidden_letters.join("");
    return hidden_word;
};


f_intro(); //initial screen

}); //end document ready