const boxEl =  document.querySelectorAll(".box");
const finalDisplay = document.querySelector("#final")
var currentDisplay = document.querySelector("#start");
var deductions = document.querySelector("#deductions")
var timeDisplay = document.querySelector("span")

// has to be globally scoped so two functions can update it at once
var secondsLeft = 101

// Gives me a list of index positions in boxEl that have not been displayed
var displaysAvailable = []
for (i = 1; i < boxEl.length; i ++) {
        displaysAvailable.push(i)
}

// On button press, start the quiz
currentDisplay.children[1].addEventListener("click", function(event){
        transitionDisplay()
        quiz()
        timer()
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
        for (i = 1; i < boxEl.length -1; i ++) {
                boxEl[i].addEventListener("click", function(event) {
                        var element = event.target;
                
                        if (element.matches("li")){
                                // check if their answer was correct
                                if (element.getAttribute("data-answer") === "false") {
                                        secondsLeft = secondsLeft-10
                                        deductions.textContent = "-10"
                                        boxEl[displaysAvailable[0]].children[2].textContent = "Incorrect."
                                } else {
                                        boxEl[displaysAvailable[0]].children[2].textContent = "Correct!"
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
                if (displaysAvailable.length === 0) {
                        clearInterval(timerInterval);
                }

                // in case they dont finish
                if (secondsLeft === 0) {
                        // TODO make failiure screen pop up
                }
        }, 1000);
}

// TODO add event listener for quiz submission on final box.
// TODO add emoji effects on click during completion screen (for pass and fail instances)
// TODO add randomizer option for question & answer order (select boxes that pull out on div hover)
