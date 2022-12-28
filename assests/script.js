const boxEl =  document.querySelectorAll(".box")
currentDisplay = displayContent()

// it might be better to set the start ID to visible and all boxes to display none by default in css. Then you can use ID to make start be the initial display variable, and use one function.
// TODO set box objects to display none as defualt css & set ID start to display flex by default in css.
// TODO change the following function so it doesn't iterate through all boxEl's whenever it is called (that's not efficient!). Instead, make the update function be called on click (whenever a click happens, update the current display to display none, and update the next display to display flex). To keep track of the displays you've used between clicks, you will need to create a global variable that is an array of indexs the length of boxEl. Then, each time a click happens, your function will also need to apply .shift() (pops the first value on an array) to update the "available displays".

function displayContent() {
        for (i = 0; i < boxEl.length; i++) {
                var state = boxEl[i].getAttribute("data-state")
                if (state === "hidden") {
                        boxEl[i].setAttribute("style", "display: none;")
                } else {
                        boxEl[i].setAttribute("style", "display: flex;")
                        var visible = boxEl[i]
                }
        }
        return visible
}

// This function will be called on section click to update the data-state of the current display to hidden, and set a new display to visible. It then calls the display content function to update the page. Will need to be update to go through an array of boxEl questions.

boxEl[0].addEventListener("click", function updateContent() {
        currentDisplay.setAttribute("data-state", "hidden")
        boxEl[1].setAttribute("data-state", "visible")
        displayContent()
})