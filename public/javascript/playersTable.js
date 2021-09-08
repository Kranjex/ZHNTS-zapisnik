/* Preseli ves firebaseConfig.js file v ta file, tisti file naj bo samo za pridobitev firebase config key, vse ostale funkcije naj bodo v tem filu, querying naredi znotraj firebasa - pazi na omejitve glede read in write, querying = search bar, filters, zamenjava podatkovne baze za firestore in po potrebi izbriši ta projekt in naredi novega - podatkovna baza in omejitve */

// FIREBASE IMPORTS
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { getFirebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

// Initialize Firebase database
const database = getDatabase();
const playerRef = ref(database, 'players');

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
  // createPlyer(newPlayer);
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
  // table.innerHTML = '';

  switch (colorPicker) {
    case 1:
      color = 'green';
      break;
    case -1:
      color = 'white';
      break;
  }

  const name = element.val().name;
  const lastName = element.val().lastName;
  const number = element.val().number;
  const birthDate = element.val().birthDate;
  const gender = element.val().gender;
  const club = element.val().club;
  const selection1 = element.val().selection1;
  const selection2 = element.val().selection2;
  const specialMarks = element.val().specialMarks;
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
function createPlayer(object) {
  const newPlayer = push(playerRef);
  set(newPlayer, {
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
}

// Function for getting players data from database
async function getPlayers() {
  table.innerHTML = '';
  const searchBar = document.getElementById('searchBarInput');
  onValue(playerRef, (snapshot) => {
    searchBar.addEventListener('keyup', () => {
      const content = searchBar.value.toLowerCase();
      table.innerHTML = '';
      colorPicker = 1;
      snapshot.forEach((value) => {
        if (
          value.val().name.toLowerCase().includes(content) ||
          value.val().lastName.toLowerCase().includes(content) ||
          value.val().number.toLowerCase().includes(content) ||
          searchBar.value === ''
        ) {
          displayPlayer(value);
        }
      });
    });
  });
}

function initialPlayerShowUp() {
  onValue(playerRef, (snapshot) => {
    snapshot.forEach((value) => {
      displayPlayer(value);
    });
  });
}

initialPlayerShowUp();
getPlayers();
