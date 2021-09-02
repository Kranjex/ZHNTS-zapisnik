const printButton = document.getElementById('printButton');
const editButton = document.getElementById('editButton');

printButton.addEventListener('click', () => {
  window.print();
});

// Local Storage data access
window.onload = () => {
  // Basic Data
  const date = (document.getElementById('dateContent').textContent =
    localStorage.getItem('reportDate'));
  const time = (document.getElementById('timeContent').textContent =
    localStorage.getItem('reportTime'));
  const group = (document.getElementById('groupContent').textContent =
    localStorage.getItem('reportGroup'));
  const location = (document.getElementById('locationContent').textContent =
    localStorage.getItem('reportLocation'));
  const pitch = (document.getElementById('pitchContent').textContent =
    localStorage.getItem('reportPitch'));
  const matchNumber = (document.getElementById(
    'matchNumberContent'
  ).textContent = localStorage.getItem('reportMatchNumber'));

  // Officials
  const umpire1 = (document.getElementById('umpire1Content').textContent =
    localStorage.getItem('umpire1'));
  const umpire2 = (document.getElementById('umpire2Content').textContent =
    localStorage.getItem('umpire2'));
  const judge = (document.getElementById('judgeContent').textContent =
    localStorage.getItem('judge'));
  const tournamentOfficial = (document.getElementById(
    'tournamentOfficialContent'
  ).textContent = localStorage.getItem('tournamentOfficial'));
  const reserveUmpire = (document.getElementById(
    'reserveUmpireContent'
  ).textContent = localStorage.getItem('reserveUmpire'));

  // Home coaches
  const homeCoach = (document.getElementById('homeCoach').textContent =
    localStorage.getItem('homeCoach'));
  const homeManager = (document.getElementById('homeManager').textContent =
    localStorage.getItem('homeManager'));

  // Guest coaches
  const guestCoach = (document.getElementById('guestCoach').textContent =
    localStorage.getItem('guestCoach'));
  const guestManager = (document.getElementById('guestManager').textContent =
    localStorage.getItem('guestManager'));
};

window.onunload = () => {
  // localStorage.removeItem('reportDate');
  // localStorage.removeItem('reportTime');
  // localStorage.removeItem('reportGroup');
  // localStorage.removeItem('reportLocation');
  // localStorage.removeItem('reportPitch');
  // localStorage.removeItem('reportMatchNumber');
  // localStorage.removeItem('umpire1');
  // localStorage.removeItem('umpire2');
  // localStorage.removeItem('judge');
  // localStorage.removeItem('tournamentOfficial');
  // localStorage.removeItem('reserveUmpire');
  // localStorage.clear();
};
