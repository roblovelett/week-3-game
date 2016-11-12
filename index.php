<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="UTF-8">
    <title>My First Object</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  </head>
  <body>
    <header>
        <div id="header_title"></div>
    </header>    
    <main>
        <div class="container">
            <div class="row">
                <div class="six columns" id="game-image">
                    <img src="" alt="" class="" />
                </div>
                <div class="six columns">
                    <div id="intro"></div>
                    <div id="wins"></div>
                    <div id="hidden_word"></div>
                    <div id="guesses_remaining"></div>
                    <div id="guesses_letters"></div>
                </div>
            </div>
        </div>    
    </main>
    <footer></footer>
    <script type="text/javascript">
        $(document).ready(function() {
        //create game intro = true
            //if game intro = true
                //create start screen text object
                    //header_text: Hangman
                    //subtitle_text: Internet Cats
                    //intro_text: Press Any Key to Get Started!
                //display o_start_screen.header_text
                //display o_start_screen.subtitle_text
                //display o_start_screen.intro_text
                    //if user presses key
                        //set game intro = false
                        //set game = true
            //if game = true
                //remove div containing o_start_screen.intro_text
                //create array of words to use = ["bla","bla bla"]
                //create game text object
                    //wins_text: Wins
                    //current_word_text: Curent Word
                    //guesses_remaining_text: Number of Guesses Remaining
                    //guesses_text: Letters Already Guessed
                //output game_text.wins_text
                //output game_text.current_word_text
                //output game_text.guesses_text
                //create wins = 0;
                //set round = true;
                    //if round = true
                        //create hidden word string .. needs array of words to use
                            //take array of words to use
                            //create random word string = ""
                                //pick a random word from array of words to use
                                //set random word string to be random word picked from array of words to use
                            //create random word array .. needs random word string
                                /*split random word string to an array of strings, each entry consisting of
                                letters/spaces from random word string*/
                            //create hidden word array .. needs random word array
                                /*set each entry for hidden word array to be underscores & spaces from 
                                random word array*/
                            //create hidden word string by combining entries of hidden word array
                        //output hidden word string "_ _ _  _ _ _"
                        //create guesses = 0;
                        //create guesses array = []
                        //create guesses string;
                        //create win = false;
                        //create lose = false;
                        //if user presses key
                            //detect what char keypress is
                                //if keypress A-Za-z0-9
                                    //create key = char from keypress
                                    //compare key to entries of random word array
                                    //if key equals one or more of the entries in random word array
                                        //set guess_match = true
                                        //create matches_indexes array = []
                                        //get the index's of matching entries and store them into matches_indexes array
                                        //for the # of matches there are
                                            /*replace the entries inside hidden word array to the matching char from
                                            keypress in the indexes of matches_indexes array*/
                                    //else if key does not equal any of the entries in random word array
                                        //set guess_match = false
                                        //guesses++
                                        //if guesses > 8
                                            //set lose = true
                                            //round = false
                                        //store char from keypress into guesses array
                                        //update guesses string by combining entries of guesses array
                                        //output guesses string
                        //for the length of random word array
                            /*check to see if all the entries of random word array matches the entries of hidden word 
                            array*/
                            //if true
                                //set win = true
                                //wins ++
                                //output wins
                                //round = false
                    //if round = false
                        //reset
                        //create hidden word string = ""
                        //clear random word array = []
                        //clear hidden word array = []
                        //round = true
                        
            //bank of words to use
            var a_words = ["lil bub", "brother cream", "grumpy cat", "henri", "longcat", "limecat", "nyan cat", "happy cat", "business cat", "tacgnol", "ceiling cat"];
            //instructions text
            var o_instructions = {
                title_text: "Hangman",
                subtitle_text: "Internet Cats",
                intro_text: "Press Any Key to Get Started!",
                wins_text: "Wins",
                current_word_text: "Current Word",
                guesses_remaining_text: "Number of Guesses Remaining",
                guesses_text: "Letters Already Guessed"
            };
            var i_wins = 0; //game start, initialize wins to 0
            var i_guesses = 8; //game start, intialize user guesses to 8
            var s_random_word = f_choose_random(a_words);
        
            //function choose random word
            function f_choose_random(word) {
                return word[Math.floor(Math.random() * word.length)];
            };

            var a_word = s_random_word.split("");
            var a_hidden_word = f_hidden_word_array(a_word);
            
            //create hidden word array "_ _ _   _ _ _"
            function f_hidden_word_array (word_array) {
                var hidden_word_array = [];
                for (i = 0; i < word_array.length; i++) {
                    if (word_array[i] === " ") {
                        hidden_word_array[i] = "&nbsp;&nbsp;";
                    } else {
                        hidden_word_array[i] = "_ ";
                    };    
                };
                return hidden_word_array;
            };
            
            var a_hidden_word_game = []; //this array will update with every correct key press
            //copy contents of a_hidden_word to a_hidden_word_game
            for (i=0; i<a_hidden_word.length; i++) {
                a_hidden_word_game[i] = a_hidden_word[i];
            };

            //insert onto page            
            $("#header_title").html("<h1>" + o_instructions.title_text + "</h1>" + o_instructions.subtitle_text); //header title
            $("#intro").html(o_instructions.intro_text); //press any key text

            var b_intro = true; //init game intro screen
            var b_hidden_word_init = true;
            var s_hidden_word_init = ""; //init hidden word output _ _ _

            if (b_hidden_word_init) {
                s_hidden_word_init = f_hidden_word_init();
                b_hidden_word_init = false; //set init hidden word output to false
            };
            
            //output initial hidden word string
            function f_hidden_word_init() {
                var hidden_word_init = "";
                for (i=0; i<a_word.length; i++) {
                    hidden_word_init = hidden_word_init + a_hidden_word[i];
                };
                return hidden_word_init;
            };
            
            if (b_intro) {
                document.onkeypress = function f_no_intro() {
                    $("#intro").remove(); //remove intro text
                    $("#hidden_word").html(o_instructions.current_word_text + "<br />" + s_hidden_word_init);
                    $("#guesses_remaining").html(o_instructions.guesses_remaining_text + "<br />" + i_guesses); //guesses text, number
                    $("#guesses_letters").html(o_instructions.guesses_text + "<br />"); //guessed letter text, number
                };
                b_intro = false; //precursor to start game
            };

            var s_hidden_word = "";
            var a_guesses = [];
            var b_no_intro_keypress = true;
            
            if (b_intro !== true) {
                document.onkeypress = function f_game() {
                    $("#hidden_word").html(o_instructions.current_word_text + "<br />" + s_hidden_word);
                    var key = String.fromCharCode(event.keyCode); //get keycode
                   
                    if (/[a-zA-Z0-9]/.test(key)) { //if keycode in alphabet
                        //if match
                        for (i = 0; i < a_word.length; i++) {
                            if (key === a_word[i]) {
                                //replace underscore w/matching letter
                                a_hidden_word_game[i] = key.toUpperCase();
                            } else {
                                i_guesses = i_guesses - 1; //take away a guess
                                a_guesses.push(key.toUpperCase()); //add missed char to guesses array
                            };
                        };
                    };
                };
                //function f_hidden_word_array
                function f_hidden_word() {

                };
            };                 
        });


//function take hidden word array, output
/*
function f_hidden_word_output(hidden_word_array) {

    var hidden_word_output = ""; //init output to be blank string
    
    for (i = 0; i < hidden_word_array.length; i++) {
        hidden_word_output = hidden_word_output + hidden_word_array[i];
    };

    return hidden_word_output;             
};
*/
/*var a_guessed_letters = []; //initialize guessed letters array
if (i_wins > 0) { $("#wins").html(o_instructions.wins_text + "<br />" + i_wins); };
*/
/*
} else {
    document.onkeypress = function f_set_no_intro_true() {
        b_no_intro = true;
        $("#intro").remove(); //remove press any key div
    };
};*/
    </script>
  </body>
</html>