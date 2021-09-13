// Configuration filer import
import { getFirebaseConfig } from '/javascript/firebaseConfig.js';
// Firebase imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
// Firebase authentication imports
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
// Firestore imports
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
// Initialize Firebase database
const database = getFirestore();
const usersRef = collection(database, 'users');
// Initialize Firebase authentication
const auth = getAuth();

if (firebaseApp) {
  console.log('Initializing Firebase');
}

// Constant Variables
const loginButton = document.getElementById('loginButton');
const sendButton = document.getElementById('sendButton');
const form = document.getElementById('fields');
const passwordResetLink = document.getElementById('passwordButton');

// Form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form['emailInput'].value;
  const password = form['passwordInput'].value;
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('User signed-in: ' + cred.user.email);
          if (cred.user) {
          }
        })
        .catch((error) => {
          console.error('Unable to log-in: ' + error);
        });
    })
    .catch((error) => {
      console.error('An error occurred: ' + error);
    });

  form.reset();
});

// Authentication interface
auth.onAuthStateChanged((user) => {
  getUsers();
  if (user) {
    console.log('User: ', user);
  } else {
    console.log('User logged out');
  }
});

// Function for getting users database
async function getUsers() {
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((user) => {
    console.log(user.data().email);
  });
}

// Reset password link event
passwordResetLink.addEventListener('click', () => {
  // Animations
  passwordResetLink.style.display = 'none';
  const emailForm = form['emailInput'];
  emailForm.placeholder = 'Vnesite svoj email za ponastavitev gesla';
  document.getElementById('resetEmailNotification').style.display = 'block';
  const passwordForm = document.querySelector('.password');
  passwordForm.style.display = 'none';
  loginButton.style.display = 'none';
  sendButton.style.display = 'block';
  // Functionality
  sendButton.addEventListener('click', () => {
    const email = form['emailInput'].value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        form.reset();
        alert('Email je poslan. Preverite svoj e-poštni predal.');
        console.log('Email je poslan. Preverite svoj e-poštni predal.');
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
