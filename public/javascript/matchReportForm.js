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
auth.onAuthStateChanged(async (user) => {
  const response = await fetch('/checkRole');
  const role = await response.json();
  console.log(role);

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

const printButton = document.getElementById('printButton');
const editButton = document.getElementById('editButton');

printButton.addEventListener('click', () => {
  window.print();
});

// Local Storage data access
window.onload = () => {
  // Basic Data
  const date = (document.getElementById('dateContent').textContent =
    localStorage.getItem('reportDate'));
  const time = (document.getElementById('timeContent').textContent =
    localStorage.getItem('reportTime'));
  const group = (document.getElementById('groupContent').textContent =
    localStorage.getItem('reportGroup'));
  const location = (document.getElementById('locationContent').textContent =
    localStorage.getItem('reportLocation'));
  const pitch = (document.getElementById('pitchContent').textContent =
    localStorage.getItem('reportPitch'));
  const matchNumber = (document.getElementById(
    'matchNumberContent'
  ).textContent = localStorage.getItem('reportMatchNumber'));

  // Officials
  const umpire1 = (document.getElementById('umpire1Content').textContent =
    localStorage.getItem('umpire1'));
  const umpire2 = (document.getElementById('umpire2Content').textContent =
    localStorage.getItem('umpire2'));
  const judge = (document.getElementById('judgeContent').textContent =
    localStorage.getItem('judge'));
  const tournamentOfficial = (document.getElementById(
    'tournamentOfficialContent'
  ).textContent = localStorage.getItem('tournamentOfficial'));
  const reserveUmpire = (document.getElementById(
    'reserveUmpireContent'
  ).textContent = localStorage.getItem('reserveUmpire'));

  // Home coaches
  const homeCoach = (document.getElementById('homeCoach').textContent =
    localStorage.getItem('homeCoach'));
  const homeManager = (document.getElementById('homeManager').textContent =
    localStorage.getItem('homeManager'));

  // Guest coaches
  const guestCoach = (document.getElementById('guestCoach').textContent =
    localStorage.getItem('guestCoach'));
  const guestManager = (document.getElementById('guestManager').textContent =
    localStorage.getItem('guestManager'));

  // Add home players to the report
  const homePlayersNames = document.querySelectorAll(
    '[data-home-player] > .playerName'
  );
  const homePlayersNumbers = document.querySelectorAll(
    '[data-home-player] > .playerNum'
  );
  const homePlayers = JSON.parse(localStorage.getItem('homePlayers'));
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
  const guestPlayers = JSON.parse(localStorage.getItem('guestPlayers'));
  for (let i = 0; i < guestPlayers.length; ) {
    guestPlayersNames[i].innerHTML =
      guestPlayers[i].data.name + ' ' + guestPlayers[i].data.lastName;
    guestPlayersNumbers[i].innerHTML = guestPlayers[i].data.number;
    i++;
  }
};
