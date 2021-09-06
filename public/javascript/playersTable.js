// FIREBASE IMPORTS
import { sendData, playersArray, getPlayers } from './firebaseApp.js';
// playersDatabase = JSON.parse(playersArray);
// console.log(playersDatabase);

const array = [
  { name: 'John' },
  { name: 'John' },
  { name: 'John' },
  { name: 'John' },
  { name: 'John' },
];

console.log(array);
// playersArray.forEach((player) => {
//   console.log(player);
// });

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
  sendData(newPlayer);
});

// Filter system
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filterArrows = button.childNodes;
    if (filterArrows.item(1).classList.contains('none')) {
      filterArrows.item(1).classList.remove('none');
      filterArrows.item(1).classList.add('down');
    } else if (filterArrows.item(1).classList.contains('down')) {
      filterArrows.item(1).classList.remove('down');
      filterArrows.item(1).classList.add('up');
    } else {
      filterArrows.item(1).classList.remove('up');
      filterArrows.item(1).classList.add('none');
    }
  });
});

// SEARCHBAR
// playersArray = players database

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
getPlayers();

function displayPlayer(element) {
  const table = document.getElementById('playersTable');
  table.innerHTML = '';
  let color;
  console.log(element);
  for (let i = 0; i < element.length; i++) {
    switch (colorPicker) {
      case 1:
        color = 'green';
        break;
      case -1:
        color = 'white';
        break;
    }
    console.log('dela');
    const name = element[i].name;
    const lastName = element[i].lastName;
    const number = element[i].number;
    const birthDate = element[i].birthDate;
    const gender = element[i].gender;
    const club = element[i].club;
    const selection1 = element[i].selection1;
    const selection2 = element[i].selection2;
    const specialMarks = element[i].specialMarks;
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
    picker = picker * -1;
    delay++;
  }
}
