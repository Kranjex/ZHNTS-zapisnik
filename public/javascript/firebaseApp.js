import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
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
const app = initializeApp(firebaseConfig);
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

await getPlayers();

async function getPlayers() {
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
      //   console.log(player.name);
    });
  });
  console.log(playersArray);
}

// Write into database - USERS
// Read from database - USERS

export { playersArray };
