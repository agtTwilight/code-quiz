const boxEl =  document.querySelectorAll(".box");
const quizButtons = document.querySelectorAll(".quizBtn")
const submitDisplay = document.querySelector("#submit");
const scoresDisplay = document.querySelector("#highscores");
// this is the highscore in header
const placeholder = document.querySelector("#leaderboard")
var currentDisplay = document.querySelector("#start");
var deductions = document.querySelector("#deductions");
var timeDisplay = document.querySelector("span");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submitBtn");
var leaderboard = document.querySelector("#scores")

// pulls scores from local storage
var scores = JSON.parse(localStorage.getItem("scores"));

// has to be globally scoped so two functions can update it at once
var secondsLeft = 101

// Gives me a list of index positions in boxEl that have not been displayed
var displaysAvailable = []

// On button press, start the quiz
quizButtons[0].addEventListener("click", function(){
        quiz()
        transitionDisplay()
        timer()
})

// Reset quiz
quizButtons[1].addEventListener("click", function(){
        window.location.reload();
})

// View leaderboard
placeholder.addEventListener("click", function(){
        currentDisplay.setAttribute("style", "display: none;")
        scoresDisplay.setAttribute("style", "display: flex;")
        updateLeaderboard()
})

// Moves you to the next unused display
function transitionDisplay() {
        currentDisplay.setAttribute("style", "display: none;")
        currentDisplay = boxEl[displaysAvailable[0]]
        currentDisplay.setAttribute("style", "display: flex;")
        displaysAvailable.shift()
}

// Click function to move to the next question
function quiz() {
        for (i = 1; i < boxEl.length; i ++) {
                displaysAvailable.push(i)
        }

        secondsLeft = 101

        for (i = 1; i < boxEl.length -1; i ++) {
                boxEl[i].addEventListener("click", function(event) {
                        var element = event.target;
                
                        if (element.matches("li")){
                                // check if their answer was correct
                                if (element.getAttribute("data-answer") === "false") {
                                        secondsLeft = secondsLeft-10
                                        deductions.textContent = "-10"
                                        // boxEl[displaysAvailable[0]].children[2].textContent = "Incorrect."
                                } else {
                                        // boxEl[displaysAvailable[0]].children[2].textContent = "Correct!"
                                }
                                transitionDisplay()
                        }
                })
        }
}

function timer() {
        // var secondsLeft = 101;
        var timerInterval = setInterval(function() {
                secondsLeft--;
                timeDisplay.textContent = secondsLeft;

                // in case they finish
                if (displaysAvailable.length === 1) {
                        clearInterval(timerInterval);
                }

                // in case they dont finish
                if (secondsLeft === 0) {
                        // TODO make failiure screen pop up
                }
        }, 1000);
}

submitButton.addEventListener("click", function(){
        // in this case we don't prevent default such that the li's in highscore get reset on button press.
        var user = [initialsInput.value, secondsLeft]

        // make sure the object exists
        if (!scores) {
                scores = [user]
                localStorage.setItem("scores", JSON.stringify(scores))
        } else {
                // append data to our obj and save locally
                for (i = 0; i < scores.length; i++) {
                        if (secondsLeft >= scores[i][1]) {
                                scores.splice(i, 0, user)
                                localStorage.setItem("scores", JSON.stringify(scores))
                                break
                        } else if (i === scores.length - 1){
                                scores.push(user)
                                localStorage.setItem("scores", JSON.stringify(scores))
                                break
                        } else {
                                continue
                        }
                }
        }

        updateLeaderboard()
        transitionDisplay()
        console.log(displaysAvailable)
})

// Display the leaderboard
function updateLeaderboard() {
        for (i = 0; i < scores.length; i++) {
                var li = document.createElement("li");
                li.textContent = scores[i][0] + " " + scores[i][1]
                leaderboard.appendChild(li)
        }
}

