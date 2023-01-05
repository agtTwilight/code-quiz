// collect the first <span> element in index.html
var timeDisplay = document.querySelector("span");

// collect an array of all elements with class boxs
var boxEl =  document.querySelectorAll(".box");

// collect an array of all elements with class quizBtn
var quizButtons = document.querySelectorAll(".quizBtn")

// collect the element with ID resetBtn
var resetButton = document.querySelector("#resetBtn")

// collect the element with ID submit
var submitDisplay = document.querySelector("#submit");

// collect the element with ID leaderboardLink
var leaderboardLink = document.querySelector("#leaderboardLink")

// collect the element with ID start
var currentDisplay = document.querySelector("#start");

// collect the element with ID leaderboard
var leaderboardDisplay = document.querySelector("#leaderboard");

// collect the element with ID deductions
var deductions = document.querySelector("#deductions");

// collect the element with ID input
var initialsInput = document.querySelector("#input");

// collect the element with ID submitBtn
var submitButton = document.querySelector("#submitBtn");

// collect the element with ID scoresOl
var scoresOl = document.querySelector("#scoresOl")

// set scores with local storage
var scores = JSON.parse(localStorage.getItem("scores"));

// globally scope secondsLeft so two functions can update it at once (timer to countdown, and quiz to subtract on incorrect answer)
var secondsLeft = 101

// Initialize an empty variable that we can update later
var displaysAvailable = []

// On button click, start the quiz, transition displays, and set a timer
quizButtons[0].addEventListener("click", function(event){
        event.preventDefault()
        quiz()
        transitionDisplay()
        timer()
})

// On button click, reload the page
quizButtons[1].addEventListener("click", function(){
        window.location.reload();
})

// On button click, display scoreOl as an empty list, and set local storage to an empty array
resetButton.addEventListener("click", function(){
        scoresOl.textContent = ""
        localStorage.setItem("scores", JSON.stringify([]))
})

// On text click, display the leaderboard
leaderboardLink.addEventListener("click", function(){
        currentDisplay.setAttribute("style", "display: none;")
        leaderboardDisplay.setAttribute("style", "display: flex;")
        updateLeaderboard()
})

submitButton.addEventListener("click", function(){
        // in this case we don't prevent default such that the li's in highscore get reset on button press.
        if (initialsInput.value != 0 ){
        var user = [initialsInput.value, secondsLeft]
        
        // make sure the scores array exists, if not, create it
        if (!scores || scores.length === 0) {
                scores = [user]
                localStorage.setItem("scores", JSON.stringify(scores))
        } else {
                // Compare the value of the current users secondsLeft to the value of locally stored scores
                for (i = 0; i < scores.length; i++) {
                        // if the user score for secondsLeft is greater than any of the stored scores, add the current users score in the appriate position and exit the loop (if the new array of scores is >10, remove the last score in the array).
                        if (secondsLeft >= scores[i][1]) {
                                scores.splice(i, 0, user)
                                if (scores.length > 10) {
                                        scores.pop()
                                }
                                localStorage.setItem("scores", JSON.stringify(scores))
                                break
                        // else, if the array of scores isn't >10, add the current user score to the end of the score array. If the array is 10, don't add the current user score to the scores array. 
                        } else if (i === scores.length - 1){
                                if (scores.length < 10) {
                                        scores.push(user)
                                        localStorage.setItem("scores", JSON.stringify(scores))
                                        break
                                }
                        } else {
                                continue
                        }
                }
        }
        updateLeaderboard()
        transitionDisplay()
        } else {
                alert("initials input cannot be left blank.")
        }
})

// Moves you to the next unused display
function transitionDisplay() {
        // set currentDisplay to display none, which will remove it from the page.
        currentDisplay.setAttribute("style", "display: none;")
        // using the boxEl and the displaysAvailable array, set the next display as the currentDisplay, and make it visible using display flex.
        currentDisplay = boxEl[displaysAvailable[0]]
        currentDisplay.setAttribute("style", "display: flex;")
        // remove the first value of displaysAvailable so the next display will be new to the user.
        displaysAvailable.shift()
}

// Click function to move to the next question
function quiz() {
        // for the length of boxEl, add a value to displays available that corresponds to the index position in boxEl of each display set to display none by defualt
        for (i = 1; i < boxEl.length; i ++) {
                displaysAvailable.push(i)
        }
        // for all of the questions, add an event listener on click
        for (i = 1; i < boxEl.length -1; i ++) {
                boxEl[i].addEventListener("click", function(event) {
                        // record the target that the click event is triggered on
                        var element = event.target;
                        // if the target is a li, do something, else, do nothing
                        if (element.matches("li")){
                                // check if their answer was incorrect, if so, deduct 20seconds and let them know.
                                if (element.getAttribute("data-answer") === "false") {
                                        secondsLeft = secondsLeft-20
                                        deductions.textContent = "-10"
                                // if the answer was correct, give them positive feedback
                                } else {
                                }
                                // in either case (as long as it was an li) bring them to the next question
                                transitionDisplay()
                        }
                })
        }
}

function timer() {
        // make a timer that subtracts one on a 1000milisecond interval (every second)
        var timerInterval = setInterval(function() {
                secondsLeft--;
                // every second, display the updated time remaining
                timeDisplay.textContent = secondsLeft;

                // in case they finish
                if (displaysAvailable.length === 1) {
                        clearInterval(timerInterval);
                }

                // in case they dont finish, display the leaderboard
                if (secondsLeft === 0) {
                        currentDisplay.setAttribute("style", "display: none;")
                        leaderboardDisplay.setAttribute("style", "display: flex;")
                        updateLeaderboard() 
                }
        }, 1000);
}

// create and append leaderboard li's based on the user data stored locally
function updateLeaderboard() {
        scoresOl.textContent = ""
        for (i = 0; i < scores.length; i++) {
                var li = document.createElement("li");
                li.textContent = scores[i][0] + " // " + scores[i][1]
                scoresOl.appendChild(li)
        }
}

