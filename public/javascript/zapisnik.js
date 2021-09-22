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

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const ratio = window.devicePixelRatio;

const screenWidth = screen.width;
const screenHeight = screen.height;

console.log(screenWidth, screenHeight);
console.log(windowWidth, windowHeight, ratio);

window.onload = () => {
  // Add basic data
  const date = document.getElementById('date');
  date.textContent = localStorage.getItem('reportDate');

  // Add home players to the report
  const homePlayersPlaceholders = document.querySelectorAll(
    '[data-home-player] playerName'
  );
  console.log(homePlayersPlaceholders);
  const homePlayers = localStorage.getItem('homePlayers');
  homePlayersPlaceholders.forEach((placeholder) => {
    for (let i = 0; i < homePlayers; ) {
      placeholder.textContent = homePlayers[i];
      console.log('homePlayers'[i]);
      i++;
    }
  });
  // Add guest players to the report
  const guestPlayersPlaceholders = document.querySelectorAll(
    '[data-guest-player] playerName'
  );
  console.log(guestPlayersPlaceholders);
  const guestPlayers = localStorage.getItem('guestPlayers');
  guestPlayersPlaceholders.forEach((placeholder) => {
    for (let i = 0; i < guestPlayers; ) {
      placeholder.textContent = guestPlayers[i];
      console.log('guestPlayers'[i]);
      i++;
    }
  });
};
