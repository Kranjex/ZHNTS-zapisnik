// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyAXkna25443BS7PEGh-cgIwPH1zfUPvdAc',
  authDomain: 'zhnts-hockey-portal.firebaseapp.com',
  databaseURL:
    'https://zhnts-hockey-portal-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'zhnts-hockey-portal',
  storageBucket: 'zhnts-hockey-portal.appspot.com',
  messagingSenderId: '879248294340',
  appId: '1:879248294340:web:41a42ea407a7f06c992491',
};
// Initialize Firebase
export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    ('No Firebase configuration object provided.');
  } else {
    return config;
  }
}
// const app = initializeApp(firebaseConfig);

/*
const database = getDatabase();
console.log('Firebase connected');

// Write into database - PLAYERS
export function sendData(object) {
  // ID maker
  let ID = Date.now();
  set(ref(database, 'players/' + ID), {
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

// Read from database - PLAYERS
const playersArray = [];
const playersData = ref(database, 'players/');

let color;
let colorPicker = 1,
  delay = 1;

export async function getPlayers() {
  const table = document.getElementById('playersTable');
  table.innerHTML = '';
  onValue(playersData, (snapshot) => {
    snapshot.forEach((value) => {
      // Naredi template za igralca, da še enkrat dobi vse podatke, enako kot pri sendData();
      const player = {
        name: value.val().name,
        lastName: value.val().lastName,
        number: value.val().number,
        birthDate: value.val().birthDate,
        gender: value.val().gender,
        club: value.val().club,
        selection1: value.val().selection1,
        selection2: value.val().selection2,
        specialMarks: value.val().specialMarks,
        goals: 0,
        cards: { green: 0, yellow: 0, red: 0 },
      };
      //   console.log(value.JSON());
      //   console.log(value.val());
      //   playersArray.push(value.toJSON());
      //   console.log(value.val().name);
      playersArray.push(player);
      //   console.log(player.club);

      switch (colorPicker) {
        case 1:
          color = 'green';
          break;
        case -1:
          color = 'white';
          break;
      }

      const row = `<tr class="${color}" style="--index: ${delay}">
                            <td style="width:11%;">${player.name}</td>
                            <td style="width:15%;">${player.lastName}</td>
                            <td style="width:4%;">${player.number}</td>
                            <td style="width:10%;">${player.birthDate}</td>
                            <td style="width:7%;">${player.gender}</td>
                            <td style="width:15%;">${player.club}</td>
                            <td style="width:6%;">${player.selection1}</td>
                            <td style="width:6%;">${player.selection2}</td>
                            <td style="width:8%;">${player.specialMarks}</td>
                            <td style="width:auto;">${player.goals}</td>
                            <td style="width:auto;">${player.cards.green}</td>
                            <td style="width:auto;">${player.cards.yellow}</td>
                            <td style="width:auto;">${player.cards.red}</td>
                            <td style="width:2%;" class="delete">X</td>
                        </tr>`;
      table.innerHTML += row;
      colorPicker *= -1;
      delay++;
    });
  });
  console.log(colorPicker);
}

// const reference = ref(database, 'players/');
// onValue(reference, (snapshot) => {
//   snapshot.forEach(function (child) {
//     // console.log(child.key + ' : ' + child.val());
//     console.log(child.val().name + ' --- ' + JSON.stringify(child.val().name));
//     playersArray.push(JSON.stringify(child.val().name));
//   });
// });

console.log(playersArray);

// Write into database - USERS
// Read from database - USERS

export { playersArray };

// Function for displaying players
function displayPlayers() {}

*/
