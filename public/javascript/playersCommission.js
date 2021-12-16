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
//   } else if (role != 'Komisija') {
//     document.body.style.display = 'none';
//     alert('You do not have the permission to access this page. ' + role);
//     location.href = history.back();
//   }
// });
