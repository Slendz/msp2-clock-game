let correctTime; // Selected from the 4 randomly generated times
let timeChoices = []; // 4 Randomly generated times
function submitBtnCallback(){
    // Select the time that the user selected (from the options)
    // Check if the time selected by the user matches the one stored in the "correct time variable"
    // If yes increase the score, if no do something...

    // Generate 4 times which will be displayed
    timeChoices = ["12:00", "10:00", "11:00", "09:00"]; // Randomly generated generateRandomTimes
    // Assign one time which is the correct time
    correctTime = "10:00" // Randomly selected
    // Display time depends on the API of the clock
    setClockTime();
}
//The clock that is displayed
function toggleClass() {
    const body = document.querySelector('body');
    body.classList.toggle('light');
    body.style.transition = `0.3s linear`;
}
const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
})
/*
This function takes the correctTime and displays the correct minute and hour hand
*/
function setClockTime(){
    // Assuming correctTime is "10:00"
    hourStr = parseInt(correctTime.substring(0, 2)); // Selects e.g. 10
    minutes = parseInt(correctTime.substring(3, 5)); // Selects e.g. 00
    seconds = 0;
}

function generateRandomTimes(){
    // returns a list of 4 times
    //for loop to push each randomly generated time to the array
    return //the array
}
/*
Randomly generates a number between 0 and 59
*/
function generateRandomMinute(){
    // every 15 minutes: (Math.floor(Math.random() * 60) % 4) * 15
    minute = Math.floor(Math.random() * 60) % 15;
    // add a 0 if < 2 digits
    return minute;
}
/*
Randomly generates a number between 0 and 11
*/
function generateRandomHour(){
    hour = Math.floor(Math.random() * 12);
    // add a 0 if < 2 digits
    return hour;
}
function generateRandomTime(){
    hour = generateRandomHour();
    minute = generateRandomMinute();
    return `${hour}:${minute}`
}