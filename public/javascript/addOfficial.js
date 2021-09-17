// Firebase imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
// Firebase config key import
import { getFirebaseConfig } from './firebaseConfig.js';
// Firebase imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
// Firebase database import
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);
const auth = getAuth();
// Initialize Firebase database
const database = getFirestore();
const usersRef = collection(database, 'users');

// Function for getting users database
async function getUsersRole(object) {
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((user) => {
    if (user.data().email == object.email) {
      // console.log(user.data().role);
      return user.data().role;
    }
  });
}

// Check if user is signed in and check its role
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

// Menu navigation bar functions
const menuIcon = document.querySelector('.menuHamburger');
const links = document.querySelectorAll('li');
menuIcon.addEventListener('click', () => {
  // menuIcon icon changes
  // toggle links
  links.forEach((link) => {
    link.classList.toggle('show');
  });
});

const logOut = document.getElementById('logOut');
logOut.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    console.log('Logged out');
    location.href = '/';
  });
});

// Create new user profile
const userForm = document.getElementById('addUserContainer');
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let passwordLength = 10;
  // Get user data
  const newUser = {
    name: userForm['name'].value,
    lastName: userForm['lastName'].value,
    email: userForm['email'].value,
    password: createPassword(passwordLength),
    birthDate: userForm['birthDate'].value,
    role: userForm['userRole'].value,
  };
  // create user in firebase and add it to database
  createUserWithEmailAndPassword(auth, newUser.email, newUser.password).then(
    () => {
      createUser(newUser);
    }
  );
  // Reset form input fields
  userForm.reset();
});

// Create user function
async function createUser(object) {
  try {
    const newUser = await addDoc(usersRef, {
      name: object.name,
      lastName: object.lastName,
      email: object.email,
      first_password: object.password,
      birthDate: object.birthDate,
      role: object.role,
    });
  } catch (error) {
    console.log('Error adding user to the database: ' + error);
  }
}

// Delete user function

// Password generator
function createPassword(length) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Function for getting users data from the database
async function getUsers() {
  const usersData = [];
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((user) => {
    const userObject = { id: user.id, data: user.data() };
    usersData.push(userObject);
  });
  return usersData;
}
getUsers();
// Users database
const usersDatabase = await getUsers();

// Function for displaying users in table
displayPlayer(usersDatabase);

function displayPlayer(array) {
  const table = document.getElementById('table');
  table.innerHTML = '';
  let colorPicker = 1,
    color;
  for (let i = 0; i < array.length; i++) {
    if (colorPicker == 1) {
      color = 'green';
    } else {
      color = 'white';
    }
    const row = `<tr style="--index: ${i};" class="${color}">
                            <td style="width:25%;">${array[i].data.name}</td>
                            <td style="width:25%;">${array[i].data.lastName}</td>
                            <td style="width:25%;">${array[i].data.email}</td>                         
                            <td style="width:25%;">${array[i].data.role}</td>                         
                        </tr>`;
    table.innerHTML += row;
    colorPicker *= -1;
  }
}
