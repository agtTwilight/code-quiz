const boxEl =  document.querySelectorAll(".box");
const initialDisplay = document.querySelector("#start");
const finalDisplay = document.querySelector("#final")
var currentDisplay = initialDisplay;

// Gives me a list of index positions in boxEl that have not been displayed
var displaysAvailable = []
for (i = 1; i < boxEl.length; i ++) {
        displaysAvailable.push(i)
}

// On button press, start the quiz
// TODO add timer start feature within the code block.
initialDisplay.children[1].addEventListener("click", function(event){
        initialDisplay.setAttribute("style", "display: none;")
        boxEl[displaysAvailable[0]].setAttribute("style", "display: flex;")
        currentDisplay = boxEl[displaysAvailable[0]]
        displaysAvailable.shift()
})

// Click function to move to the next question
for (i = 1; i < boxEl.length -1; i ++) {
        boxEl[i].addEventListener("click", function(event) {
                var element = event.target;
                console.log(element)
        
                // TODO add T/F attribute checker & time deductions feature (on F selection)
                // TODO add feedback on answer click ("incorrect."/"correct!")
                if (element.matches("li")){
                        currentDisplay.setAttribute("style", "display: none;");
                        boxEl[displaysAvailable[0]].setAttribute("style", "display: flex;")
                        currentDisplay = boxEl[displaysAvailable[0]]
                        displaysAvailable.shift()
                }
        })
}

// TODO add event listener for quiz submission on final box.
// TODO add emoji effects on click during completion screen (for pass and fail instances)

