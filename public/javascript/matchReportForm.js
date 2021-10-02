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
const usersRef = collection(database, 'users');

// Check if user is signed in and check its role
// auth.onAuthStateChanged(async (user) => {
//   const response = await fetch('/checkRole');
//   const role = await response.json();
//   console.log(role);

//   if (!user) {
//     document.body.style.display = 'none';
//     alert('You need to sign in first.');
//     location.href = '/';
//   } else if (role != 'Delegat') {
//     document.body.style.display = 'none';
//     alert('You do not have the permission to access this page. ' + role);
//     location.href = history.back();
//   }
// });

const printButton = document.getElementById('printButton');
const editButton = document.getElementById('editButton');

printButton.addEventListener('click', () => {
  window.print();
});

// Local Storage data access
window.onload = () => {
  // Basic Data
  const date = (document.getElementById('dateContent').textContent =
    sessionStorage.getItem('reportDate'));
  const time = (document.getElementById('timeContent').textContent =
    sessionStorage.getItem('reportTime'));
  const group = (document.getElementById('groupContent').textContent =
    sessionStorage.getItem('reportGroup'));
  const location = (document.getElementById('locationContent').textContent =
    sessionStorage.getItem('reportLocation'));
  const pitch = (document.getElementById('pitchContent').textContent =
    sessionStorage.getItem('reportPitch'));
  const matchNumber = (document.getElementById(
    'matchNumberContent'
  ).textContent = sessionStorage.getItem('reportMatchNumber'));

  // Teams
  const homeTeam = (document.getElementById('homeTeam').textContent =
    sessionStorage.getItem('homeTeam'));
  const guestTeam = (document.getElementById('guestTeam').textContent =
    sessionStorage.getItem('guestTeam'));

  // Officials
  const umpire1 = (document.getElementById('umpire1Content').textContent =
    sessionStorage.getItem('umpire1'));
  const umpire2 = (document.getElementById('umpire2Content').textContent =
    sessionStorage.getItem('umpire2'));
  const judge = (document.getElementById('judgeContent').textContent =
    sessionStorage.getItem('judge'));
  const tournamentOfficial = (document.getElementById(
    'tournamentOfficialContent'
  ).textContent = sessionStorage.getItem('tournamentOfficial'));
  const reserveUmpire = (document.getElementById(
    'reserveUmpireContent'
  ).textContent = sessionStorage.getItem('reserveUmpire'));

  // Home coaches
  const homeCoach = (document.getElementById('homeCoach').textContent =
    sessionStorage.getItem('homeCoach'));
  const homeManager = (document.getElementById('homeManager').textContent =
    sessionStorage.getItem('homeManager'));

  // Guest coaches
  const guestCoach = (document.getElementById('guestCoach').textContent =
    sessionStorage.getItem('guestCoach'));
  const guestManager = (document.getElementById('guestManager').textContent =
    sessionStorage.getItem('guestManager'));

  // Add home players to the report
  const homePlayersNames = document.querySelectorAll(
    '[data-home-player] > .playerName'
  );
  const homePlayersNumbers = document.querySelectorAll(
    '[data-home-player] > .playerNum'
  );
  const homePlayers = JSON.parse(sessionStorage.getItem('homePlayers'));
  for (let i = 0; i < homePlayers.length; ) {
    homePlayersNames[i].innerHTML =
      homePlayers[i].data.name + ' ' + homePlayers[i].data.lastName;
    homePlayersNumbers[i].innerHTML = homePlayers[i].data.number;
    i++;
  }
  // Add guest players to the report
  const guestPlayersNames = document.querySelectorAll(
    '[data-guest-player] > .playerName'
  );
  const guestPlayersNumbers = document.querySelectorAll(
    '[data-guest-player] > .playerNum'
  );
  const guestPlayers = JSON.parse(sessionStorage.getItem('guestPlayers'));
  for (let i = 0; i < guestPlayers.length; ) {
    guestPlayersNames[i].innerHTML =
      guestPlayers[i].data.name + ' ' + guestPlayers[i].data.lastName;
    guestPlayersNumbers[i].innerHTML = guestPlayers[i].data.number;
    i++;
  }
  // Add goals to the report
  const goalsArray = JSON.parse(sessionStorage.getItem('goalsArray'));
  const scoreboardRow = document.querySelectorAll('.scoreboardRow');
  let counter = 1;
  for (let i = 0; i < goalsArray.length; i++) {
    switch (goalsArray[i].team) {
      case 'HK Moravske Toplice':
        goalsArray[i].team = 'HKMT';
        break;
      case 'HK Lipovci':
        goalsArray[i].team = 'HKL';
        break;
      case 'HK Predanovci':
        goalsArray[i].team = 'HKP';
        break;
    }
    scoreboardRow[i].childNodes[1].textContent = goalsArray[i].team;
    scoreboardRow[i].childNodes[3].textContent = goalsArray[i].timestamp;
    scoreboardRow[i].childNodes[5].textContent = counter;
    scoreboardRow[i].childNodes[7].textContent = goalsArray[i].type;
    scoreboardRow[i].childNodes[9].textContent = goalsArray[i].score;
    counter++;
  }
  // Add cards to the report
  const playerRows = document.querySelectorAll('.player');
  console.log(playerRows[13].childNodes[7].innerHTML);
  const cardsArray = JSON.parse(sessionStorage.getItem('cardsArray'));
  const greenCardPlaceholders = document.querySelectorAll('.playerGreen');
  const yellowCardPlaceholders = document.querySelectorAll('.playerYellow');
  const redCardPlaceholders = document.querySelectorAll('.playerRed');

  for (let i = 0; i < cardsArray.length; i++) {
    // if (playerRows[i].childNodes[7].innerHTML !== '') {
    switch (cardsArray[i].type) {
      case 'green':
        greenCardPlaceholders[cardsArray[i].player].textContent =
          cardsArray[i].timestamp;
        break;
      case 'yellow':
        yellowCardPlaceholders[cardsArray[i].player].textContent =
          cardsArray[i].timestamp;
        break;
      case 'red':
        redCardPlaceholders[cardsArray[i].player].textContent =
          cardsArray[i].timestamp;
        break;
    }
    // } else {
    //   i--;
    // }
  }

  // Final results
  const finalResultsContainer =
    document.getElementById('finalResults').children[1];
  finalResultsContainer.textContent = goalsArray[goalsArray.length - 1].score;
};
