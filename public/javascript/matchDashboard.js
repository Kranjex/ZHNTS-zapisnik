// Firebase configuration key
import { getFirebaseConfig } from './firebaseConfig.js';
// Firebase imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
// Firebase authentication imports
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Initialize Firebase
const firebaseConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
// Initialize Firebase database
const database = getFirestore();
const playersRef = collection(database, 'players');
const playersDatabase = await getPlayers();

// Check if user is signed in and check its role
// auth.onAuthStateChanged(async (user) => {
//   const response = await fetch('/checkRole');
//   const role = await response.json();
//   if (!user) {
//     document.body.style.display = 'none';
//     alert('You need to sign in first.');
//     location.href = '/';
//   } else if (role != 'Delegat') {
//     document.body.style.display = 'none';
//     alert('You do not have the permission to access this page. ' + role);
//     location.href = history.back();
//   } else {
//     const welcomeText = (document.getElementById(
//       'welcomeText'
//     ).childNodes[0].innerHTML = `Pozdravljen ${auth.currentUser.displayName}`);
//   }
// });

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

// Menu navigation bar functions
const menuIcon = document.querySelector('.menuHamburger');
const links = document.querySelectorAll('li');
menuIcon.addEventListener('click', () => {
  // menuIcon icon changes
  // toggle links
  links.forEach((link) => {
    link.classList.toggle('show');
  });
});

// Logout event listener
const logOut = document.getElementById('logOut');
logOut.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    console.log('Logged out');
    localStorage.clear();
    location.href = '/';
  });
});

// Date set for set up window
const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
let date = new Date();
reportDate.value = date.toLocaleString('de-DE', optionsDate);

let reportHours = date.getHours();
let reportMinutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
reportTime.value = `${reportHours}:${reportMinutes}`;

// Function for getting players
async function getPlayers() {
  const playersData = [];
  const querySnapshot = await getDocs(playersRef);
  if (querySnapshot) {
    querySnapshot.forEach((player) => {
      const playerObject = { id: player.id, data: player.data() };
      playersData.push(playerObject);
    });
    return playersData;
  } else {
    console.log('No internet connection or no players available.');
  }
}

// Button event listener for home team
let homeData = [];
const homeTeamButton = document.getElementById('addHomeTeam');
homeTeamButton.addEventListener('click', () => {
  homeTeamButton.style.display = 'none';
  const homeTeamSelectionContainer = document.getElementById(
    'homeTeamSelectionContainer'
  );
  homeTeamSelectionContainer.style.display = 'flex';
  homeTeamSelectionContainer.style.animation = 'showUp 0.5s ease-out';
  const clubSelection = document.querySelectorAll('.homeTeamSelection');
  clubSelection.forEach((club) => {
    club.addEventListener('click', () => {
      homeTeamSelectionContainer.style.display = 'none';
      localStorage.setItem('homeTeam', club.innerHTML);
      searchPlayers(homeData, club, 'home', homeTeamSelectionContainer);
    });
  });
});

// Button event listener for guest team
let guestData = [];
const guestTeamButton = document.getElementById('addGuestTeam');
guestTeamButton.addEventListener('click', () => {
  guestTeamButton.style.display = 'none';
  const guestTeamSelectionContainer = document.getElementById(
    'guestTeamSelectionContainer'
  );
  guestTeamSelectionContainer.style.display = 'flex';
  guestTeamSelectionContainer.style.animation = 'showUp 0.5s ease-out';
  const clubSelection = document.querySelectorAll('.guestTeamSelection');
  clubSelection.forEach((club) => {
    club.addEventListener('click', () => {
      guestTeamSelectionContainer.style.display = 'none';
      localStorage.setItem('guestTeam', club.innerHTML);
      searchPlayers(guestData, club, 'guest', guestTeamSelectionContainer);
    });
  });
});

// Function for searching players
function searchPlayers(data, club, team, container) {
  let counter = 0;
  const teamContainer = document.getElementById(`${team}TeamContainer`);
  playersDatabase.forEach((player) => {
    if (reportGroup.value != '') {
      if (
        player.data.club == club.dataset.club &&
        (reportGroup.value.toLowerCase() == player.data.selection1 ||
          reportGroup.value.toLowerCase() == player.data.selection2)
      ) {
        data.push(player);
        const playerRowContainer = document.createElement('div');
        playerRowContainer.className = 'playerRowContainer';
        const playerRow = document.createElement('input');
        playerRow.setAttribute('type', 'checkbox');
        playerRow.setAttribute('name', `player${counter}`);
        playerRow.setAttribute('style', `--index:${counter}`);
        const playerRowLabel = document.createElement('label');
        playerRowLabel.setAttribute('for', `player${counter}`);
        playerRowLabel.innerHTML = `${player.data.name} ${player.data.lastName} ${player.data.number} ${player.data.specialMarks}`;

        playerRowContainer.append(playerRow, playerRowLabel);
        teamContainer.append(playerRowContainer);
        counter++;
      }
    } else {
      container.style.display = 'flex';
    }
  });
  const checkButton = document.createElement('button');
  checkButton.setAttribute('class', 'checkButton');
  checkButton.innerHTML = 'Izberi vse';
  checkButton.addEventListener('click', () => {
    const checkboxes = teamContainer.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
    }
  });
  teamContainer.append(checkButton);
}

// Set up window close
closeButton.onclick = () => {
  const safetyProtector = confirm(
    'Ste prepričani, da želite nadaljevati? \n Zaradi varnosti preglejte podatke še enkrat.'
  );
  if (safetyProtector) {
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

    // Add home players to the local storage
    const homeTeamContainer = document.getElementById('homeTeamContainer');
    const homeCheckboxes = homeTeamContainer.querySelectorAll(
      'input[type=checkbox]'
    );
    let homePlayers = [];
    for (let i = 0; i < homeCheckboxes.length; i++) {
      if (homeCheckboxes[i].checked) {
        homePlayers.push(homeData[i]);
      }
    }
    localStorage.setItem('homePlayers', JSON.stringify(homePlayers));
    showHomePlayers('home');
    playerEventListener('home');

    // Add guest players to the local storage
    const guestTeamContainer = document.getElementById('guestTeamContainer');
    const guestCheckboxes = guestTeamContainer.querySelectorAll(
      'input[type=checkbox]'
    );
    let guestPlayers = [];
    for (let i = 0; i < guestCheckboxes.length; i++) {
      if (guestCheckboxes[i].checked) {
        guestPlayers.push(guestData[i]);
      }
    }
    localStorage.setItem('guestPlayers', JSON.stringify(guestPlayers));
    showHomePlayers('guest');
    playerEventListener('guest');

    // Display clubs' names
    const homeTeamNameContainer = (document.getElementById(
      'homeName'
    ).innerHTML = localStorage.getItem('homeTeam'));

    const guestTeamNameContainer = (document.getElementById(
      'guestName'
    ).innerHTML = localStorage.getItem('guestTeam'));
  }
};

// This code can stand on its own
// Set up match dashboard
const periodLength = document.querySelector(
  '#timeSettingsContainer > input[name="periodLength"]'
);
const periodNumber = document.querySelector(
  '#timeSettingsContainer > input[name="periodNumber"]'
);

// Stopwatch system
let seconds = 0;
let Tseconds = 0;
let minutes = 0;
let Tminutes = 0;

function displayTime() {
  stopwatch.textContent = `${Tminutes}${minutes}:${Tseconds}${seconds}`;
}

let timerProtector = true;
const historyContainer = document.getElementById('history');

startButton.addEventListener('click', () => {
  stopwatch.style.animation = 'startAnimation 0.8s';
  if (timerProtector === true) {
    // Timer protector
    timerProtector = false;
    // Stopwatch system
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
    }, 1000);

    stopButton.addEventListener('click', () => {
      clearInterval(timer);
      timerProtector = true;
      stopwatch.style.animation = 'blinking .5s infinite alternate';
    });

    stopButton.addEventListener('dblclick', () => {
      clearInterval(timer);
      const endGame = confirm('Ali ste prepričani, da želite prekiniti tekmo?');
      if (endGame) {
        location.href = '/zapisnik';
      }
    });

    // Show that period [i] started
    const startRow = document.createElement('div');
    startRow.innerHTML = `Začetek 1. četrtine - ${Tminutes}${minutes}:${Tseconds}${seconds}`;
    startRow.setAttribute('class', 'periodStart');
    historyContainer.append(startRow);
  }
});

// Display status in history section
stopButton.addEventListener('click', () => {
  const stopRow = document.createElement('div');
  stopRow.innerHTML = `Zaustavljen čas - ${Tminutes}${minutes}:${Tseconds}${seconds}`;
  stopRow.setAttribute('class', 'periodStop');
  historyContainer.append(stopRow);
});

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

// Functions that need to be nested inside settings confirmation statement
// Function for displaying players in dashboard
function showHomePlayers(team) {
  const container = document.getElementById(team + 'PlayersContainer');
  const playersArray = JSON.parse(localStorage.getItem(team + 'Players'));
  playersArray.forEach((player) => {
    const data = player.data;
    const playerRowContainer = document.createElement('div');
    playerRowContainer.setAttribute('data-team', team + '-player');
    playerRowContainer.setAttribute('class', 'playerRowContainer');
    playerRowContainer.innerHTML = `<div><b class="boldNumber">${data.number}</b>  ${data.name} ${data.lastName}</div> <div class="cardContainer"><span class="triangle"></span><span class="square"></span><span class="circle"></span></div>`;
    container.append(playerRowContainer);
  });
}

// Function for players event listener
function playerEventListener(team) {
  const dashboardHomePlayers = document
    .querySelectorAll(`[data-team = "${team}-player"]`)
    .forEach((player) => {
      player.addEventListener('click', () => {
        // console.log(`${player.innerHTML}`);
        console.log(this);
      });
    });
}

// Function for displaying and adding goals
function addGoal() {
  console.log(this);
}
// Funkcija z this

// Function for displaying and adding cards
