/* Preseli ves firebaseConfig.js file v ta file, tisti file naj bo samo za pridobitev firebase config key, vse ostale funkcije naj bodo v tem filu, querying naredi znotraj firebasa - pazi na omejitve glede read in write, querying = search bar, filters, zamenjava podatkovne baze za firestore in po potrebi izbriši ta projekt in naredi novega - podatkovna baza in omejitve */

// FIREBASE IMPORTS
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
// Firestore imports
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
// Config key import
import { getFirebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

// Initialize Firebase database
// const database = getDatabase();
const database = getFirestore();
// const playerRef = ref(database, 'players');
const playerRef = collection(database, 'players');

if (firebaseApp) {
  console.log('Initializing Firebase');
}

// Constant Variables
const addButton = document.getElementById('addPlayer');
const windowAddButton = document.getElementById('windowAddPlayer');
const mainContent = document.getElementById('playerAddition');
const filterButtons = document.querySelectorAll('.filterButton');
const windowCloseButton = document.getElementById('closeButton');

// Adding window system
// Open / close buttons
addButton.addEventListener('click', () => {
  mainContent.classList.remove('hidden');
  mainContent.classList.add('showUpAnimation');
});

windowCloseButton.addEventListener('click', () => {
  mainContent.classList.add('hidden');
});

windowAddButton.addEventListener('click', () => {
  mainContent.classList.add('hidden');
});

// Add player form
const playerForm = document.getElementById('playerAddForm');
playerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPlayer = {
    name: document.getElementById('playerNameInput').value,
    lastName: document.getElementById('playerLastNameInput').value,
    number: document.getElementById('playerNumberInput').value,
    birthDate: document.getElementById('playerBirthDateInput').value,
    gender: document.getElementById('playerGenderSelect').value,
    club: document.getElementById('playerClubSelect').value,
    selection1: document.getElementById('playerSelection1').value,
    selection2: document.getElementById('playerSelection2').value,
    specialMarks: document.getElementById('playerSpecialMarksSelect').value,
    goals: 0,
    cards: { green: 0, yellow: 0, red: 0 },
  };
  createPlayer(newPlayer);
});

// Filter system
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filterArrows = button.childNodes;
    if (filterArrows.item(1).classList.contains('none')) {
      filterArrows.item(1).classList.remove('none');
      filterArrows.item(1).classList.add('down');
      // sort in descending order
    } else if (filterArrows.item(1).classList.contains('down')) {
      filterArrows.item(1).classList.remove('down');
      filterArrows.item(1).classList.add('up');
      // sort in ascending order
    } else {
      filterArrows.item(1).classList.remove('up');
      filterArrows.item(1).classList.add('none');
      // default sort
    }
  });
});

// DISPLAYING PLAYERS IN TABLE
// SEARCHBAR
// searchBar.addEventListener('keyup', () => {
//   let value = searchBar.value;
//   let data = searchDatabase(value, playersArray);
//   displayPlayer(data);
// });

// function searchDatabase(value, array) {
//   let searches = [];
//   for (let i = 0; i < array.length; i++) {
//     value = value.toLowerCase();
//     let name = array[i].name.toLowerCase();
//     let lastname = array[i].last_name.toLowerCase();
//     let club = array[i].Club.toLowerCase();
//     if (
//       name.includes(value) ||
//       lastname.includes(value) ||
//       club.includes(value)
//     ) {
//       searches.push(array[i]);
//     }
//   }
//   return searches;
// }
// let colorPicker = 1;
// displayPlayer(playersArray);
// getPlayers();

let colorPicker = 1,
  delay = 1,
  color;

const table = document.getElementById('playersTable');

function displayPlayer(element) {
  table.innerHTML = '';
  switch (colorPicker) {
    case 1:
      color = 'green';
      break;
    case -1:
      color = 'white';
      break;
  }
  const name = element.data().name;
  const lastName = element.data().lastName;
  const number = element.data().number;
  const birthDate = element.data().birthDate;
  const gender = element.data().gender;
  const club = element.data().club;
  const selection1 = element.data().selection1;
  const selection2 = element.data().selection2;
  const specialMarks = element.data().specialMarks;
  const goals = 0;
  const cards = { green: 0, yellow: 0, red: 0 };
  // const deleteIcon = document.createElement('div');
  // deleteIcon.classList.add('deleteIcon');
  const row = `<tr class="${color}" style="--index: ${delay}">
                            <td style="width:11%;">${name}</td>
                            <td style="width:15%;">${lastName}</td>
                            <td style="width:4%;">${number}</td>
                            <td style="width:10%;">${birthDate}</td>
                            <td style="width:7%;">${gender}</td>
                            <td style="width:15%;">${club}</td>
                            <td style="width:6%;">${selection1}</td>
                            <td style="width:6%;">${selection2}</td>
                            <td style="width:8%;">${specialMarks}</td>
                            <td style="width:auto;">${goals}</td>
                            <td style="width:auto;">${cards.green}</td>
                            <td style="width:auto;">${cards.yellow}</td>
                            <td style="width:auto;">${cards.red}</td>
                            <td style="width:2%;" class="delete">X</td>
                        </tr>`;
  table.innerHTML += row;
  colorPicker *= -1;
  delay++;
}

// Function for creating players in database
async function createPlayer(object) {
  try {
    const newPlayer = await addDoc(playerRef, {
      name: object.name,
      lastName: object.lastName,
      number: object.number,
      birthDate: object.birthDate,
      gender: object.gender,
      club: object.club,
      selection1: object.selection1,
      selection2: object.selection2,
      specialMarks: object.specialMarks,
      goals: object.name,
      cards: { green: 0, yellow: 0, red: 0 },
    });
    console.log('Document.written with ID: ', newPlayer.id);
  } catch (error) {
    console.error('Error adding player to the database: ', error);
  }
}

// Function for getting players data from database
async function getPlayers() {
  const documents = [];
  const querySnapshot = await getDocs(playerRef);
  querySnapshot.forEach((doc) => {
    documents.push(doc.data());
  });
  return documents;
}

getPlayers();

const players = Promise.resolve(getPlayers());
players.then((value) => {
  console.log(value);
});

// Sorting function for descending order
function descOrder() {}
// Sorting function for ascending order
function ascOrder() {}
// Sorting function for default order
function defaultOrder() {}

// Delete Player function
function deletePlayer() {}
