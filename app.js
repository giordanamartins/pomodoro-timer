const ring = new Audio("./sounds/ring.wav");
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");
const restingButton = document.querySelector(".resting-button");
const timeButton = document.querySelector(".time-button");
const minutesDiv = document.querySelector(".minutes");
const secondsDiv = document.querySelector(".seconds");
const tittle = document.querySelector(".tittle");


let myInterval; 
let totalSeconds;
let defaultMinutes = 25;
let sessionCounter = 0;
let totalSessions = 0;
let isRunning = false;
let isPaused = false;
let isResting = false;

const updateSeconds = () => {
    if (totalSeconds <= 0) {
        clearInterval(myInterval);
        isRunning = false;
        return;
    }
    
    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds/60);
    let secondsLeft = totalSeconds % 60;

    minutesDiv.textContent = minutesLeft;
    secondsDiv.textContent = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

    tittle.textContent = `${minutesLeft}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft} | pomodoro timer!`;

    if(minutesLeft === 0 && secondsLeft === 0) {
        ring.play();
        clearInterval(myInterval);
        isRunning = false;
        totalSeconds = 0;

        if (isResting) {
            alert("Resting time is over! Let's start another session?");
            resetButton.classList.remove("disabled-button");
            isResting = false;
            sessionCounter = 0;
        }
        else{
            alert("Session finished! Good job, take a rest!");
        }
        sessionCounter++;
        totalSessions++;
        resetTimer();
    }
}

const appTimer = () => {
    if (!isRunning) {
        totalSeconds = defaultMinutes * 60;

        minutesDiv.textContent = defaultMinutes.toString();
        secondsDiv.textContent = "00";

        myInterval = setInterval(updateSeconds, 1000);
        isRunning = true;
        isPaused = false;
    } 
    else {
    alert("Timer has already started.")
    }
}

const pauseTimer = () => {
    if (!isRunning) return;

    if (!isPaused) {
        clearInterval(myInterval);
        isPaused = true;
        pauseButton.textContent = "resume";
    } 
    else {
        myInterval = setInterval(updateSeconds, 1000);
        isPaused = false;
        pauseButton.textContent = "pause";
    }
};

const resetTimer = () => {
    clearInterval(myInterval);
    totalSeconds = defaultMinutes * 60;

    minutesDiv.textContent = defaultMinutes.toString();
    secondsDiv.textContent = "00";

    if (isPaused) {
        pauseButton.textContent = "pause";
    }
    isPaused = false;
    isRunning = false;
}

const restingTimer = () => {
    let restingTime = sessionCounter * 5;
    if (totalSessions == 4){
        restingTime = 4;
        totalSessions = 0;
    }

    if (sessionCounter > 0){
        isResting = true;

        minutesDiv.textContent = restingTime.toString();
        secondsDiv.textContent = "00";
        
        resetButton.classList.add("disabled-button");

        totalSeconds = restingTime * 60;
        myInterval = setInterval(updateSeconds, 1000);
        isRunning = true;
        isPaused = false;
    }
    else{
        alert("Complete a session before you can rest!")
    }
}

const setTime = () => {
    const inputValue = prompt("How many minutes should the session last?");
    const intInput = parseInt(inputValue);

    if (!isNaN(inputValue) && inputValue > 0) {
        defaultMinutes = intInput;
        minutesDiv.textContent = defaultMinutes.toString();
        secondsDiv.textContent = "00";
        alert(`Time set to ${defaultMinutes} minutes!`);
    } 
    else {
        alert("Please insert a valid number.");
        setTime();
    }
}

startButton.addEventListener("click", appTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
restingButton.addEventListener("click", restingTimer);
timeButton.addEventListener("click", setTime);

// personal project, made by @giordanamartins :)
