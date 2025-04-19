const ring = new Audio("./sounds/ring.wav");
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");
const restingButton = document.querySelector(".resting-button");
const minutesDiv = document.querySelector(".minutes");
const secondsDiv = document.querySelector(".seconds");
const tittle = document.querySelector(".tittle");

let myInterval; 
let totalSeconds;
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
        totalSeconds = 25 * 60;

        minutesDiv.textContent = "25";
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
    totalSeconds = 25 * 60;

    minutesDiv.textContent = "25";
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

        minutesDiv.textContent = restingTime;
        secondsDiv.textContent = "00";
        
        resetButton.classList.add("disabled-button");

        totalSeconds = restingTime * 60;
        myInterval = setInterval(updateSeconds, 1000);
        isRunning = true;
        isPaused = false;
    }
    else{
        alert("You must complete a session to start the resting timer.")
    }
}

startButton.addEventListener("click", appTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
restingButton.addEventListener("click", restingTimer);

// personal project, made by @giordanamartins :)