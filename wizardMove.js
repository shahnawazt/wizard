const container = document.getElementById('container');
const wizard_gif = document.getElementById('wizard-gif');

// paths for the gifs
wizard_running_gif = 'http://dev.wizard.financial/wp-content/uploads/2021/06//WizardRunning.gif'
wizard_iddle_gif = 'http://dev.wizard.financial/wp-content/uploads/2021/06//WizardIdle2.gif'


wizard_gif.src = wizard_iddle_gif // start idle
var movement_time = 10 // How many times will add 1px per milisecond
var interval; // Interval to move 1px the wizard each time
var firstClick = true; // boolean to start the wizard animation
var touchClick = true;

/**
 *  Moves the wizard if the user clicked after the wizard to the position where user clicked
 * 
 */
function moveRight(cursor_position) {
    if (wizard_gif.src.replace(/^.*[\\\/]/, '') == 'WizardIdle2.gif') wizard_gif.src = wizard_running_gif; // If wizard was waiting, make him sweat
    wizard_gif.style.transform = '' //Remove rotation from moveleft if needed

    // Here comes the fun, we create an interval that will run each movement_time ms and move the wizard 1px on each. The interval is cleared each time the user clicks
    interval = setInterval(() => { 
        if (wizard_gif.offsetLeft == (cursor_position - wizard_gif.offsetWidth)) { // if user clicks over the wizard the wizard wont move
            wizard_gif.src = wizard_iddle_gif
            clearInterval(interval)
            return
        }
        // Move the wiz 1 px. If want to change do something like current_position +=2 
        current_position++
        wizard_gif.style.left = current_position + 'px';

    }, movement_time)
}
function moveLeft(cursor_position) {
    if (wizard_gif.src.replace(/^.*[\\\/]/, '') == 'WizardIdle2.gif') wizard_gif.src = wizard_running_gif; // If wizard was waiting, make him sweat
    wizard_gif.style.transform = 'rotateY(180deg)'//rotate image to left

    // Here comes the fun, we create an interval that will run each movement_time ms and move the wizard 1px on each. The interval is cleared each time the user clicks
    interval = setInterval(() => {
        if (wizard_gif.offsetLeft == cursor_position) {
            wizard_gif.src = wizard_iddle_gif;
            clearInterval(interval)
            return
        }
        // Move the wiz 1 px. If want to change do something like current_position -=2 
        current_position--
        wizard_gif.style.left = current_position + 'px';
    }, movement_time)
}


// These 2 event listener handlers (touchstart and touchmove) is to prevent to fuck everything up while scrolling
window.addEventListener('touchstart', () => {
    touchClick = true;
})
window.addEventListener('touchmove', () => {
    touchClick = false;
})

// Loop to handle the wizard walk
function logic(event) {
    if (event.type == 'click') touchClick = true
    if (!touchClick) return
    if (event.pageX >= wizard_gif.offsetLeft && event.pageX <= wizard_gif.getBoundingClientRect().right) return // if click on same height as wizard then return
    if (!firstClick) { // if first run then start runinng
        firstClick = true
        wizard_gif.src = wizard_running_gif
    }
    
    if (interval) clearInterval(interval); //If wizard was running make it recalculate

    cursor_position = event.pageX;
    current_position = wizard_gif.offsetLeft;

    if (wizard_gif.offsetLeft < cursor_position) {
        moveRight(cursor_position);
    }
    else if (wizard_gif.offsetLeft > cursor_position) {
        moveLeft(cursor_position);
    }
}


window.addEventListener('click', logic, false);
window.addEventListener('touchend', logic, false);