$(document).ready(function() {

    var b_intro = true; //init game intro, start game @ intro screen
    
    if (b_intro){ //start intro

        var b_game = false; //init game
        var b_round = false; //init round
        
        var o_start_screen = { //create start screen object
            header_text: "Hangman", //set header text
            subtitle_text: "Internet Cat", //set subtitle text
            intro_text: "Press Any Key to Get Started!" //set intro text
        };

        $("#header_title").html( //display o_start_textcreen.header_text
            "<h1>" + o_start_screen.header_text + "</h1>" +
            "<h2>" + o_start_screen.subtitle_text + "</h2>"
        );
        
        $("#intro").html(o_start_screen.intro_text); //display o_start_text.intro_text
        $(document).on('keypress', function (event) { //if user presses key
            b_intro = false; //end game intro
            b_game = true; //start game
            b_round = true; //start first round
            f_game();
        });

    }; //leave game intro
    
    function f_game () {
        if (b_game) { //start game

            $("#intro").remove(); //remove div containing o_start_screen.intro_text
                
            var a_words = [ //create array of words
                "lil bub", "brother cream", "grumpy cat", "henri", "longcat", 
                "limecat", "nyan cat", "happy cat", "business cat", "tacgnol", "ceiling cat"];
            var a_random_letters = []; //init random letters array
            var a_hidden_letters = []; //init hidden letters array
            var a_correct_letters = []; //init correct letters array
            var a_guesses = []; //init guesses array
            var a_matches = []; //init matches array
            var b_round = true; //init round
            var b_match = false; //init match
            var b_win = false; //init win
            var b_lose = false; //init lose
            var b_turn = false; //init turn
            var b_win = false; //init win
            var i_turns = 0; //init turns counter
            var i_wins = 0; //init wins counter
            var i_losses = 0; //init losses counter
            var i_rounds = 0; //init rounds counter
            var i_incorrect = 0; //init incorrect counter
            var i_guesses_remaining = 8;  //init # of guesses remaining
            var o_game = { //create game text object
                wins_text: "Wins", //wins_text: Wins
                current_word_text: "Current Word",//current_word_text: Curent Word
                guesses_remaining_text: "Number of Guesses Remaining", //guesses_remaining_text: Number of Guesses Remaining
                guesses_text: "Already Guessed" }; //guesses_text: Letters Already Guessed
            var s_random_word = ""; //init random word 
            var s_hidden_word = ""; //init hidden word string
            var s_correct_word = ""; //init correct word string
            var s_guesses = ""; //init guesses string
            var s_key = ""; //init s_keypress
            
            $("#wins").html(o_game.wins_text + "<br />"); //display wins text
            $("#hidden_word").html(o_game.current_word_text + "<br />"); //display hidden word text
            $("#guesses_remaining").html(o_game.guesses_remaining_text + "<br />"); //display guesses remaining text
            $("#guesses_letters").html(o_game.guesses_text + "<br />"); //display letters guessed text
            
            if (b_round) { //start round of game 
                i_rounds ++; //add 1 to rounds counter
                s_random_word = a_words[Math.floor(Math.random() * a_words.length)]; //pick random word
                a_random_letters = s_random_word.split(""); //split s_random word's letters/spaces into entries for random_letters array
                a_correct_letters = a_random_letters; //set the correct letters array to have random letters array's entries

                if (i_turns < 1) { //if it is before the first turn
                    for (i = 0; i < a_random_letters.length; i++) { //create hidden letters array
                        if (a_random_letters[i] === " ") { //if the entry of a_random_letter is a space
                            a_correct_letters[i] = "&nbsp;&nbsp;"; //create entry in correct letters array to be two spaces
                            a_hidden_letters[i] = "&nbsp;&nbsp;"; //create entry in hidden letters array to be two spaces
                        } else { //else if it is anything besides a space
                            a_correct_letters[i] = a_random_letters[i].toUpperCase() + " "; //set entry in correct letters array is matching random letter entry, capitalize, & add space
                            a_hidden_letters[i] = "_ "; //create entry in hidden letters array to be an underscore and space
                        };
                    };
                };

                s_correct_word = a_correct_letters.join(""); //join correct letters array
                s_hidden_word = a_hidden_letters.join(""); //join hidden letters array
                $("#hidden_word").append(s_hidden_word); //add & output hidden word
                
                $(document).on('keypress', function (event) { //detect keypress
                    s_key = String.fromCharCode(event.keyCode); //set key to be char code from keypress
                    if (/[a-zA-Z0-9]/.test(s_key)) {//if keypress A-Za-z0-9
                        b_turn = true; //start turn
                        s_key = s_key.toUpperCase();
                        f_turn(b_turn, i_turns, a_random_letters, s_key, b_match, i_incorrect, i_guesses_remaining, a_guesses, s_guesses); //start a turn
                    };
                });

                if (s_hidden_word === s_correct_word) { //win condition
                    b_win = true; //user wins
                    b_round = false; //end round
                    i_wins ++; //add 1 to wins counter
                    $("#wins").append(i_wins); //display wins number
                };

                if (i_incorrect >= 8) { //lose condition 
                    b_lose = true; //user loses
                    b_round = false; //user ends round
                    i_losses ++; //add 1 to losses counter
                };

                if (!b_round) { //if round has ended, reset
                    s_hidden_word = ""; //create hidden word string = ""
                    a_random_word.splice(0,a_random_word.length); //clear random word
                    a_hidden_word.splice(0,a_hidden_word.length); //clear hidden word
                    b_round = true; //round = true
                }; //end if round has ended
            }; //end round
        }; //end game
    };//end function

    function f_turn(b_turn, i_turns, a_random_letters, s_key, b_match, i_incorrect, i_guesses_remaining, a_guesses, s_guesses) { 
        if (b_turn) { //start turn
            
            i_turns ++; //add 1 to turns counter

            for (i = 0; i < a_random_letters.length; i ++) { //check if keypress is match/incorrect
                if (s_key === a_random_letters[i]) { //if key equals one or more of the entries in random word array
                    b_match = true; //set match to true
                    a_hidden_letters[i] = s_key + " "; //replace matching letters to key, convert to uppercase    
                } else { //else if key does not equal any entries in random word array
                    b_match = false; //set match to false
                };
            };

            if (!b_match) { //if incorrect guess
                i_incorrect ++; //add 1 to incorrect counter
                i_guesses_remaining = i_guesses_remaining - i_incorrect; //subtract 1 from # of guesses remaining                           
                a_guesses.push(s_key.toUpperCase() + " "); //store char from keypress into guesses array
                s_guesses = a_guesses.join(""); //join s_guesses string
                $("#guesses_remaining").append(i_guesses_remaining); //display # of guesses remaining
                $("#guesses_letters").append(s_guesses); //display guessed letters
            };

            b_turn = false; //end turn
        }; //end turn
    }; //end function f_turn
});