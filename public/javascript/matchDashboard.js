const stopwatch = document.getElementById('stopwatchContent');
const mainScreen = document.getElementById('mainScreen');
// Buttons
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const closeButton = document.getElementById('closeButton');
const addSecondButton = document.getElementById('addSecond');
const substractSecondButton = document.getElementById('substractSecond');

// Set up window elements
// Basic Data
const setUpWindow = document.getElementById('setUpWindowContainer');
const reportDate = document.getElementById('reportDate');
const reportTime = document.getElementById('reportTime');
const reportGroup = document.getElementById('reportGroup');
const reportLocation = document.getElementById('reportLocation');
const reportPitch = document.getElementById('reportPitch');
const reportMatchNumber = document.getElementById('reportNumber');
// Officials
const umpire1 = document.getElementById('umpire1');
const umpire2 = document.getElementById('umpire2');
const judge = document.getElementById('judge');
const tournamentOfficial = document.getElementById('tournamentOfficial');
const reserveUmpire = document.getElementById('reserveUmpire');
//Home coaches
const homeCoach = document.getElementById('homeCoach');
const homeManager = document.getElementById('homeManager');
// Guest coaches
const guestCoach = document.getElementById('guestCoach');
const guestManager = document.getElementById('guestManager');

// Set up window close
let safetyProtector = true;
// closeButton.onclick = () => {
//   if (safetyProtector) {
//     alert(
//       'Ste prepričani, da želite nadaljevati? \n Zaradi varnosti preglejte podatke še enkrat.'
//     );
//     safetyProtector = false;
//   } else {
//     setUpWindowContainer.style.display = 'none';
//   }
// };

closeButton.onclick = () => {
  setUpWindowContainer.style.display = 'none';
  mainScreen.style.display = 'flex';
  document.getElementById('homeTeam').style.animation =
    'elementFloatLeft 2s ease backwards 1.1s';
  document.getElementById('dashboardContainer').style.animation =
    'elementFloatDown 1s ease-out backwards .2s';
  document.getElementById('guestTeam').style.animation =
    'elementFloatRight 2s ease backwards 1.1s';

  // Local Storage system
  //Basic Data
  localStorage.clear();
  localStorage.setItem('reportDate', reportDate.value);
  localStorage.setItem('reportTime', reportTime.value);
  localStorage.setItem('reportGroup', reportGroup.value);
  localStorage.setItem('reportLocation', reportLocation.value);
  localStorage.setItem('reportPitch', reportPitch.value);
  localStorage.setItem('reportMatchNumber', reportMatchNumber.value);
  // Officials
  localStorage.setItem('umpire1', umpire1.value);
  localStorage.setItem('umpire2', umpire2.value);
  localStorage.setItem('judge', judge.value);
  localStorage.setItem('tournamentOfficial', tournamentOfficial.value);
  localStorage.setItem('reserveUmpire', reserveUmpire.value);
  // Home coaches
  localStorage.setItem('homeCoach', homeCoach.value);
  localStorage.setItem('homeManager', homeManager.value);
  // Guest coaches
  localStorage.setItem('guestCoach', guestCoach.value);
  localStorage.setItem('guestManager', guestManager.value);
};

// Date set for set up window
const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
let date = new Date();
reportDate.value = date.toLocaleString('de-DE', optionsDate);

let reportHours = date.getHours();
let reportMinutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
reportTime.value = `${reportHours}:${reportMinutes}`;

// Stopwatch system
let seconds = 0;
let Tseconds = 0;
let minutes = 0;
let Tminutes = 0;

function displayTime() {
  stopwatch.textContent = `${Tminutes}${minutes}:${Tseconds}${seconds}`;
}

let timerProtector = true;

startButton.addEventListener('click', () => {
  console.log(timerProtector);
  stopwatch.style.animation = 'startAnimation 0.8s';
  if (timerProtector === true) {
    timerProtector = false;
    const timer = setInterval(() => {
      seconds++;
      if (seconds > 9) {
        seconds = 0;
        Tseconds++;
      }
      if (Tseconds > 5) {
        Tseconds = 0;
        minutes++;
      }
      if (minutes > 9) {
        minutes = 0;
        Tminutes++;
      }
      displayTime();

      stopButton.addEventListener('click', () => {
        clearInterval(timer);
        timerProtector = true;
        stopwatch.style.animation = 'blinking .5s infinite alternate';
      });
    }, 1000);
  }
});

// Zamenjaj s switch statement
addSecondButton.onclick = () => {
  seconds++;
  displayTime();
};
substractSecondButton.onclick = () => {
  if (seconds > 0) {
    seconds--;
  }
  displayTime();
};
