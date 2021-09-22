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
auth.onAuthStateChanged(async (user) => {
  const response = await fetch('/checkRole');
  const role = await response.json();

  if (!user) {
    document.body.style.display = 'none';
    alert('You need to sign in first.');
    location.href = '/';
  } else if (role != 'Delegat') {
    document.body.style.display = 'none';
    alert('You do not have the permission to access this page. ' + role);
    location.href = history.back();
  }
});

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
      console.log(club.innerHTML);
      searchPlayers(guestData, club, 'guest', guestTeamSelectionContainer);
    });
  });
});

// Function for searching players
function searchPlayers(data, club, team, container) {
  let counter = 0;
  playersDatabase.forEach((player) => {
    // Dodaj še primerjavo selekcij
    console.log(reportGroup.value);
    if (reportGroup.value != '') {
      if (
        player.data.club == club.dataset.club &&
        (reportGroup.value.toLowerCase() == player.data.selection1 ||
          reportGroup.value.toLowerCase() == player.dataselection2)
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
        const teamContainer = document.getElementById(`${team}TeamContainer`);
        playerRowContainer.append(playerRow, playerRowLabel);
        teamContainer.append(playerRowContainer);
        counter++;
      }
    } else {
      container.style.display = 'flex';
    }
  });
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

    // Add home players to the local storage
    localStorage.setItem('homePlayers', JSON.stringify(homeData));
    console.log(homeData);
    // Add guest players to the local storage
    localStorage.setItem('guestPlayers', JSON.stringify(guestData));
  }
};
