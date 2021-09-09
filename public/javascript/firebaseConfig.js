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
