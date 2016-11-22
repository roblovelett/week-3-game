$(document).ready(function() {

    var o_game = {
        string: {
            header_text: "Hangman", //set header text,
            subtitle_text: "Internet Cat", //set subtitle text,
            intro_text: "Press Any Key to Get Started!" //intro text
        },
        flag: {
            intro: true //intro state
        }
    };

    $("#header_title").html( //display o_start_textcreen.header_text
        "<h1>" + o_game.string.header_text + "</h1>" +
        "<h2>" + o_game.string.subtitle_text + "</h2>" 
    );

    $("#intro").html(o_game.string.intro_text); //display o_start_text.intro_text

    $(document).on('keypress', function (event) { //on keypress

        if (o_game.flag.intro) { //if intro screen state
            
            o_game.flag.intro = false; //leave intro screen state
            $("#intro").remove(); //remove press any key text
            
            //create default game text
            o_game.string.wins_text = "Wins"; //Wins
            o_game.string.current_word_text = "Current Word", //current_word_text: Curent Word
            o_game.string.guesses_remaining_text = "Number of Guesses Remaining"; //guesses_remaining_text: Number of Guesses Remaining
            o_game.string.already_guessed_text = "Already Guessed"; //guesses_text: Letters Already Guessed
            o_game.array = {
                words: ["lil bub", "brother cream", "grumpy cat", "henri", "longcat", "limecat", "nyan cat", "happy cat", "business cat", "tacgnol", "ceiling cat"] //word bank
            };

            //create game counters
            o_game.counter = {
                wins: 0, //init wins to 0
                losses: 0, //init losses to 0
                round: 0, //init round to 0
                turn: 0 //init turn to 0
            };

            //output default game text
            $("#wins").html(o_game.string.wins_text + "<br />"); //display wins text
            $("#hidden_word_label").html(o_game.string.current_word_text + "<br />"); //display hidden word text
            $("#guesses_remaining").html(o_game.string.guesses_remaining_text + "<br />"); //display guesses remaining text
            $("#guesses_letters_label").html(o_game.string.already_guessed_text + "<br />"); //display letters guessed text

            f_init_round(); //initialize the first round
            
        } else if (o_game.flag.init_round) {
            
            f_init_round(); //initialize the first round
            
            o_game.string.key = String.fromCharCode(event.keyCode); //get char from keypress            

            if (/[a-zA-Z0-9]/.test(o_game.string.key)) { //if keypress A-Za-z0-9
                o_game.string.key = o_game.string.key.toUpperCase() + " "; //set to to be capitalized and have a space
                f_turn(); //play first turn
            };

        } else if (o_game.flag.turn) {

            o_game.string.key = String.fromCharCode(event.keyCode); //get char from keypress            
            
            if (/[a-zA-Z0-9]/.test(o_game.string.key)) { //if keypress A-Za-z0-9
                o_game.string.key = o_game.string.key.toUpperCase() + " "; //set to to be capitalized and have a space
                f_turn(); //play first turn
            };
               
        };
    });

    function f_turn() {

        o_game.counter.turn ++; //add 1 to turns counter

        for (i = 0; i < o_game.array.hidden_letters.length; i ++) { //check if keypress is match/incorrect
            if (o_game.string.key === o_game.array.random_letters[i]) { //if key = >= 1 of entries in random letters array
                o_game.flag.match = true; //set match state to true
                o_game.array.hidden_letters[i] = o_game.string.key; //replace matching letters to key
            } else { //else if key does not equal any entries in random word array
                o_game.flag.wrong = true; //set wrong state to true
            };
        };

        if (o_game.flag.match) {
            //play an awesome sound!1
            o_game.flag.match = false; //leave match state
        };

        if (o_game.flag.wrong) { //if incorrect guess
            //play an awersome sound!1
            o_game.counter.guesses --; //subtract 1 from remaining guesses
            o_game.string.guesses += o_game.string.key; //add missed key to guess string
            $("#guesses_counter").html(o_game.counter.guesses); //display # of guesses remaining
            $("#guesses_letters").html(o_game.string.guesses); //display guessed letters
            o_game.flag.wrong = false; //leave wrong state
        };

        //update output
        o_game.string.hidden_word = o_game.array.hidden_letters.join(""); //update hidden word by joining hidden letters
        $("#hidden_word").html(o_game.string.hidden_word); //replace hidden word output

        console.log(
            "random word: ", o_game.string.random_word,
            "random letters: ", o_game.array.random_letters,
            "correct word: ", o_game.string.correct_word,
            "hidden letters: ", o_game.array.hidden_letters,
            "hidden word: ", o_game.string.hidden_word,
            "round #: ", o_game.counter.round,
            "guesses #: ", o_game.counter.guesses,
            "guesses string: ", o_game.string.guesses
        );

        //win/lose conditions
        if (o_game.string.hidden_word === o_game.string.correct_word) { 
            o_game.flag.win = true; //user wins
            o_game.counter.wins ++; //add 1 to wins counter
            $("#wins_counter").html(o_game.counter.wins); //display updated wins number 
        } else if (o_game.counter.guesses === 0) {
            o_game.flag.lose = true; //user loses
            o_game.counter.losses ++; //add 1 to losses counter
        };
        
        if (o_game.flag.win || o_game.flag.lose) {
            o_game.flag.turn = false; //end turns state
            o_game.flag.lose = false; //end lose state
            o_game.flag.win = false; //end win state
            o_game.flag.init_round = true; //start init new round state
        };

    };

    function f_init_round() {

        //pick random word, create hidden word, initialize counter, guesses
        o_game.string.random_word = o_game.array.words[Math.floor(Math.random() * o_game.array.words.length)]; //pick random word
        o_game.array.random_letters = f_random_letters(); //create random letters array
        o_game.string.correct_word = o_game.array.random_letters.join(""); //create correct word to compare hidden word
        o_game.array.hidden_letters = f_hidden_letters(); //create hidden letters
        o_game.string.hidden_word = o_game.array.hidden_letters.join(""); //create hidden word by joining hidden letters
        o_game.counter.round ++; //add 1 to rounds counter
        o_game.counter.guesses = 8; //init guesses to 8
        o_game.string.guesses = ""; //init guesses string

        //display hidden word
        $("#hidden_word").html(o_game.string.hidden_word);

        o_game.flag.init_round = false; //leave init round state
        o_game.flag.turn = true; //start turns state

    };

    function f_hidden_letters() {

        var a_hidden_letters = []; //init hidden letters array

        for (i = 0; i < o_game.array.random_letters.length; i++) {
            if (o_game.array.random_letters[i] === "&nbsp;&nbsp;") {
                a_hidden_letters[i] = o_game.array.random_letters[i];
            } else { 
                a_hidden_letters[i] = "_ ";
            };
        };

        return a_hidden_letters;

    };

    function f_random_letters() {
        
        var a_random_letters = o_game.string.random_word.split("");

        for (i = 0; i < a_random_letters.length; i++) {
            if (a_random_letters[i] === " ") {
                a_random_letters[i] = "&nbsp;&nbsp;"; //convert single space to double
            } else {
                a_random_letters[i] = a_random_letters[i].toUpperCase() + " "; //capitalize letter, add space
            };
        };

        return a_random_letters;

    };

}); //end document ready