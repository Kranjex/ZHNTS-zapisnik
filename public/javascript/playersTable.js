// Config key import
import { getFirebaseConfig } from './firebaseConfig.js';
// Firebase imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
// Firebase authentication imports
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const auth = getAuth();

// Initialize Firebase database
const database = getFirestore();
const playerRef = collection(database, 'players');
const playersDatabase = await getPlayers();

// Function for getting users database
async function getUsers(object) {
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((user) => {
    if (user.data().email == object.email) {
      // console.log(user.data().role);
      return user.data().role;
    }
  });
}

// Check if user is signed in and check its role
// Update: Probaj dodati role kak node response || role kak local variable (zaradi refreshanja strani)
auth.onAuthStateChanged(async (user) => {
  const response = await fetch('/checkRole');
  const role = await response.json();
  console.log(role);

  if (!user) {
    document.body.style.display = 'none';
    alert('You need to sign in first.');
    location.href = '/';
  } else if (role != 'Komisija') {
    document.body.style.display = 'none';
    alert('You do not have the permission to access this page. ' + role);
    location.href = history.back();
  }
});

// Constant Variables
const addButton = document.getElementById('addPlayer');
const windowAddButton = document.getElementById('windowAddPlayer');
const mainContent = document.getElementById('playerAddition');
const filterButtons = document.querySelectorAll('.filterButton');
const windowCloseButton = document.getElementById('closeButton');
const table = document.getElementById('playersTable');
// const tds = document.querySelectorAll('td');

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
  playerForm.reset();
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
      defaultOrder();
      // default sort
    }
  });
});

// DISPLAYING PLAYERS IN TABLE
// Searchbar event listener
const searchBar = document.getElementById('searchBarInput');
searchBar.addEventListener('keyup', () => {
  let value = searchBar.value;
  let data = searchDatabase(value, playersDatabase);
  displayPlayer(data);
});

// Database (array) searching function
function searchDatabase(value, array) {
  let searches = [];
  for (let i = 0; i < array.length; i++) {
    value = value.toLowerCase();
    if (
      array[i].data.name.toLowerCase().includes(value) ||
      array[i].data.lastName.toLowerCase().includes(value) ||
      array[i].data.club.toLowerCase().includes(value) ||
      array[i].data.selection1.toLowerCase().includes(value) ||
      array[i].data.selection2.toLowerCase().includes(value) ||
      array[i].data.gender.toLowerCase().includes(value)
    ) {
      searches.push(array[i]);
    }
  }
  return searches;
}

// Function for displaying players in table
function displayPlayer(array) {
  // Styling variables
  let colorPicker = 1,
    delay = 1,
    color;
  table.innerHTML = '';

  for (let i = 0; i < array.length; i++) {
    switch (colorPicker) {
      case 1:
        color = 'green';
        break;
      case -1:
        color = 'white';
        break;
    }

    const name = array[i].data.name;
    const lastName = array[i].data.lastName;
    const number = array[i].data.number;
    const birthDate = array[i].data.birthDate;
    const gender = array[i].data.gender;
    const club = array[i].data.club;
    const selection1 = array[i].data.selection1;
    const selection2 = array[i].data.selection2;
    const specialMarks = array[i].data.specialMarks;
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
                            <td style="width: 0%; display: none;">${array[i].id}</td>
                        </tr>`;
    table.innerHTML += row;
    colorPicker *= -1;
    delay++;
  }
}
displayPlayer(playersDatabase);

// Function for creating players in database
// Dodaj refresh funkcijo ob dodajanju novega igralca
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
    console.log('Document written with ID: ', newPlayer.id);
  } catch (error) {
    console.error('Error adding player to the database: ', error);
  }
}

// Function for getting players data from the database
async function getPlayers() {
  const playersData = [];
  const querySnapshot = await getDocs(playerRef);
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
getPlayers();

// Sorting function for descending order
function descOrder(array) {
  // array.unshift() doda element na začetek arraya
  const descOrderArray = [];
  let first = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= first) {
      descOrderArray.unshift(array[i]);
      first = array[i];
    }
  }
  return descOrderArray;
}
// Sorting function for ascending order
function ascOrder() {
  const ascOrderArray = [];
  let last = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] <= first) {
      ascOrderArray.unshift(array[i]);
      last = array[i];
    }
  }
  return ascOrderArray;
}
// Sorting function for default order
function defaultOrder() {
  displayPlayer(playersDatabase);
}

// Delete Player function
async function deletePlayer() {
  let id = this.parentNode.cells[14].innerHTML;
  this.parentNode.style.background = '#fb6161';
  const deleteConfirmation = confirm(
    `Ste prepričani, da želite izbrisati ${this.parentNode.cells[0].innerHTML} ${this.parentNode.cells[1].innerHTML}?`
  );
  if (deleteConfirmation) {
    this.parentNode.style.background = '#fb6161';
    this.parentNode.style.color = '#fff';
    await deleteDoc(doc(playerRef, `${id}`));
    setTimeout(() => {
      location.reload();
    }, 3000);
  } else {
    if (this.parentNode.classList.contains('green')) {
      this.parentNode.style.background =
        'linear-gradient(90deg, #1e381e, #345f34)';
    } else {
      this.parentNode.style.background = 'transparent';
      this.parentNode.style.color = '#555';
    }
  }
}

// Deleting system
const deleteIcons = await getIcons();
deleteIcons.forEach((icon) => {
  icon.setAttribute('data-status', 'once');
  icon.addEventListener('click', deletePlayer);
});

// Function for getting delete icons after they are loaded
async function getIcons() {
  return document.querySelectorAll('.delete');
}

// Club selection filter listener
const clubSelection = document.getElementById('clubSelection');
// Dodaj samostojno funkcijo za iskanje igralcev glede na klub
clubSelection.addEventListener('change', () => {
  const value = clubSelection.options[clubSelection.selectedIndex].value;
  if (value === 'vsi') {
    displayPlayer(playersDatabase);
  } else {
    const data = searchDatabase(value, playersDatabase);
    displayPlayer(data);
  }
});

// Group selection filter listener
const groupSelection = document.getElementById('groupSelection');
// Dodaj samostojno funkcijo za iskanje igralcev glede selekcije
groupSelection.addEventListener('change', () => {
  const value = groupSelection.options[groupSelection.selectedIndex].value;
  if (value === 'vse') {
    displayPlayer(playersDatabase);
  } else {
    const data = searchDatabase(value, playersDatabase);
    displayPlayer(data);
  }
});
