// Firebase configuration key
import { getFirebaseConfig } from './firebaseConfig.js';
// Firebase imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
// Firebase authentication imports
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Initialize Firebase
const firebaseConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
// Initialize Firebase database
const database = getFirestore();
const playersRef = collection(database, 'players');
const playersDatabase = await getPlayers();

// Check if user is signed in and check its role
// auth.onAuthStateChanged(async (user) => {
//   const response = await fetch('/checkRole');
//   const role = await response.json();
//   if (!user) {
//     document.body.style.display = 'none';
//     alert('You need to sign in first.');
//     location.href = '/';
//   } else if (role != 'Delegat') {
//     document.body.style.display = 'none';
//     alert('You do not have the permission to access this page. ' + role);
//     location.href = history.back();
//   } else {
//     const welcomeText = (document.getElementById(
//       'welcomeText'
//     ).childNodes[0].innerHTML = `Pozdravljen ${auth.currentUser.displayName}`);
//   }
// });

const stopwatch = document.getElementById('stopwatchContent');
const mainScreen = document.getElementById('mainScreen');
// Buttons
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const closeButton = document.getElementById('closeButton');
const addSecondButton = document.getElementById('addSecond');
const substractSecondButton = document.getElementById('substractSecond');

// Set up window elements
// Basic Data
const setUpWindow = document.getElementById('setUpWindowContainer');
const reportDate = document.getElementById('reportDate');
const reportTime = document.getElementById('reportTime');
const reportGroup = document.getElementById('reportGroup');
const reportLocation = document.getElementById('reportLocation');
const reportPitch = document.getElementById('reportPitch');
const reportMatchNumber = document.getElementById('reportNumber');
// Stopwatch settings
let periodLength, periodNumber;
// Officials
const umpire1 = document.getElementById('umpire1');
const umpire2 = document.getElementById('umpire2');
const judge = document.getElementById('judge');
const tournamentOfficial = document.getElementById('tournamentOfficial');
const reserveUmpire = document.getElementById('reserveUmpire');
// Home coaches
const homeCoach = document.getElementById('homeCoach');
const homeManager = document.getElementById('homeManager');
// Guest coaches
const guestCoach = document.getElementById('guestCoach');
const guestManager = document.getElementById('guestManager');

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

// Logout event listener
const logOut = document.getElementById('logOut');
logOut.addEventListener('click', (e) => {
	e.preventDefault();
	signOut(auth).then(() => {
		console.log('Logged out');
		localStorage.clear();
		location.href = '/';
	});
});

// Clear sessionStorage before next match
sessionStorage.clear();

// Date set for set up window
const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
let date = new Date();
reportDate.value = date.toLocaleString('de-DE', optionsDate);

let reportHours = date.getHours();
let reportMinutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
reportTime.value = `${reportHours}:${reportMinutes}`;

// Function for getting players
async function getPlayers() {
	const playersData = [];
	const querySnapshot = await getDocs(playersRef);
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

let homeChecked = 0,
	guestChecked = 0;

// Button event listener for home team
let homeData = [];
const homeTeamButton = document.getElementById('addHomeTeam');
homeTeamButton.addEventListener('click', () => {
	homeTeamButton.style.display = 'none';
	const homeTeamSelectionContainer = document.getElementById('homeTeamSelectionContainer');
	homeTeamSelectionContainer.style.display = 'flex';
	homeTeamSelectionContainer.style.animation = 'showUp 0.5s ease-out';
	const clubSelection = document.querySelectorAll('.homeTeamSelection');
	clubSelection.forEach((club) => {
		club.addEventListener('click', () => {
			homeTeamSelectionContainer.style.display = 'none';
			sessionStorage.setItem('homeTeam', club.innerHTML);
			searchPlayers(homeData, club, 'home', homeTeamSelectionContainer);
		});
	});
});

// Button event listener for guest team
let guestData = [];
const guestTeamButton = document.getElementById('addGuestTeam');
guestTeamButton.addEventListener('click', () => {
	guestTeamButton.style.display = 'none';
	const guestTeamSelectionContainer = document.getElementById('guestTeamSelectionContainer');
	guestTeamSelectionContainer.style.display = 'flex';
	guestTeamSelectionContainer.style.animation = 'showUp 0.5s ease-out';
	const clubSelection = document.querySelectorAll('.guestTeamSelection');
	clubSelection.forEach((club) => {
		club.addEventListener('click', () => {
			guestTeamSelectionContainer.style.display = 'none';
			sessionStorage.setItem('guestTeam', club.innerHTML);
			searchPlayers(guestData, club, 'guest', guestTeamSelectionContainer);
		});
	});
});

// Function for searching players
function searchPlayers(data, club, team, container) {
	let counter = 0;
	const teamContainer = document.getElementById(`${team}TeamContainer`);
	playersDatabase.forEach((player) => {
		if (reportGroup.value != '') {
			if (
				player.data.club == club.dataset.club &&
				(reportGroup.value.toLowerCase() == player.data.selection1 || reportGroup.value.toLowerCase() == player.data.selection2)
			) {
				data.push(player);
				const playerRowContainer = document.createElement('div');
				playerRowContainer.className = 'playerRowContainer';
				const playerRow = document.createElement('input');
				playerRow.setAttribute('type', 'checkbox');
				playerRow.setAttribute('name', `player${counter}`);
				playerRow.setAttribute('style', `--index:${counter}`);
				const playerRowLabel = document.createElement('label');
				playerRowLabel.setAttribute('for', `player${counter}`);
				playerRowLabel.innerHTML = `${player.data.name} ${player.data.lastName} ${player.data.number} ${player.data.specialMarks}`;
				playerRow.addEventListener('click', () => {
					switch (team) {
						case 'home':
							if (!playerRow.checked) {
								homeChecked--;
							} else if (playerRow.checked) {
								homeChecked++;
								if (homeChecked > 12) {
									// zunaj 18!
									alert('Največje dovoljeno število igralcev je 12!');
								}
							}
							break;
						case 'guest':
							guestChecked++;
							if (guestChecked > 12) {
								// zunaj 18!
								alert('Največje dovoljeno število igralcev je 12!');
							}
							break;
					}
					console.log(homeChecked, guestChecked);
				});

				playerRowContainer.append(playerRow, playerRowLabel);
				teamContainer.append(playerRowContainer);
				counter++;
			}
		} else {
			container.style.display = 'flex';
		}
	});
	// Check all checkboxes button
	const checkButton = document.createElement('button');
	checkButton.setAttribute('class', 'checkButton');
	checkButton.innerHTML = 'Izberi vse';
	checkButton.addEventListener('click', () => {
		const checkboxes = teamContainer.querySelectorAll('input[type=checkbox]');
		for (let i = 0; i < 18; i++) {
			checkboxes[i].checked = true;
		}
	});
	teamContainer.append(checkButton);
}

let greenCards, yellowCards, redCards;

// Set up window close
closeButton.onclick = () => {
	const safetyProtector = confirm('Ste prepričani, da želite nadaljevati? \n Zaradi varnosti preglejte podatke še enkrat.');
	if (safetyProtector && homeChecked <= 18 && guestChecked <= 18) {
		setUpWindowContainer.style.display = 'none';

		mainScreen.style.display = 'flex';
		document.getElementById('homeTeam').style.animation = 'elementFloatLeft 2s ease backwards 1.1s';
		document.getElementById('dashboardContainer').style.animation = 'elementFloatDown 1s ease-out backwards .2s';
		document.getElementById('guestTeam').style.animation = 'elementFloatRight 2s ease backwards 1.1s';

		// Local Storage system
		//Basic Data
		sessionStorage.setItem('reportDate', reportDate.value);
		sessionStorage.setItem('reportTime', reportTime.value);
		sessionStorage.setItem('reportGroup', reportGroup.value);
		sessionStorage.setItem('reportLocation', reportLocation.value);
		sessionStorage.setItem('reportPitch', reportPitch.value);
		sessionStorage.setItem('reportMatchNumber', reportMatchNumber.value);
		// Officials
		sessionStorage.setItem('umpire1', umpire1.value);
		sessionStorage.setItem('umpire2', umpire2.value);
		sessionStorage.setItem('judge', judge.value);
		sessionStorage.setItem('tournamentOfficial', tournamentOfficial.value);
		sessionStorage.setItem('reserveUmpire', reserveUmpire.value);
		// Home coaches
		sessionStorage.setItem('homeCoach', homeCoach.value);
		sessionStorage.setItem('homeManager', homeManager.value);
		// Guest coaches
		sessionStorage.setItem('guestCoach', guestCoach.value);
		sessionStorage.setItem('guestManager', guestManager.value);

		// Add home players to the local storage
		const homeTeamContainer = document.getElementById('homeTeamContainer');
		const homeCheckboxes = homeTeamContainer.querySelectorAll('input[type=checkbox]');
		let homePlayers = [];
		// let homeChecked = 0;
		for (let i = 0; i < homeCheckboxes.length; i++) {
			if (homeCheckboxes[i].checked) {
				homePlayers.push(homeData[i]);
			}
		}
		homeCheckboxes.forEach((checkbox) => {
			checkbox.addEventListener('click', () => {
				console.log(homeChecked);
				homeChecked++;
				if (homeChecked >= 18) {
					alert('Izberete lahko največ 18 igralcev!');
				}
			});
		});
		sessionStorage.setItem('homePlayers', JSON.stringify(homePlayers));
		showHomePlayers('home');

		// Add guest players to the local storage
		const guestTeamContainer = document.getElementById('guestTeamContainer');
		const guestCheckboxes = guestTeamContainer.querySelectorAll('input[type=checkbox]');
		let guestPlayers = [];
		for (let i = 0; i < guestCheckboxes.length; i++) {
			if (guestCheckboxes[i].checked) {
				guestPlayers.push(guestData[i]);
			}
		}
		sessionStorage.setItem('guestPlayers', JSON.stringify(guestPlayers));
		showHomePlayers('guest');

		// Display clubs' names
		const homeTeamNameContainer = (document.getElementById('homeName').textContent = sessionStorage.getItem('homeTeam'));

		const guestTeamNameContainer = (document.getElementById('guestName').textContent = sessionStorage.getItem('guestTeam'));

		// Display clubs' logos
		// Home logo
		const homeLogo = document.querySelector('#backgroundContainerHome > #image');
		homeLogo.style.backgroundImage = `url(../img/${sessionStorage.getItem('homeTeam').trim().replace(/ /g, '_')}.png)`;
		// Guest logo
		const guestLogo = document.querySelector('#backgroundContainerGuest > #image');
		guestLogo.style.backgroundImage = `url(../img/${sessionStorage.getItem('guestTeam').trim().replace(/ /g, '_')}.png)`;

		// get cards
		const cardsContainers = document.querySelectorAll('.cardContainer');
		let cardsArray = [];
		// Green cards
		greenCards = document.querySelectorAll('.triangle');
		for (let i = 0; i < greenCards.length; i++) {
			greenCards[i].addEventListener('click', () => {
				greenCards[i].classList.toggle('fullOpacity');
				greenCards[i].style.pointerEvents = 'none';
				// insert penalty timer
				const mainScreen = document.querySelector('#mainScreen');
				const playerRow = mainScreen.querySelectorAll('.playerRowContainer');
				const penaltyTimer = document.createElement('div');
				penaltyTimer.textContent = '01:00';
				penaltyTimer.classList.add('penaltyTimer');
				playerRow[i].style.pointerEvents = 'none';
				playerRow[i].insertBefore(penaltyTimer, cardsContainers[i]);
				// countdown timer
				let Gseconds = 0,
					GTseconds = 0,
					Gminutes = 1,
					GTminutes = 0,
					Gtime = '';
				startButton.addEventListener('click', () => {
					const greenInterval = setInterval(() => {
						Gseconds--;

						if (Gseconds < 0) {
							Gseconds = 9;
							GTseconds--;
						}
						if (GTseconds < 0) {
							GTseconds = 5;
							Gminutes--;
						}
						if (Gminutes < 0) {
							Gminutes = 9;
							GTminutes--;
						}
						if (Gminutes === 0 && GTseconds === 0 && Gseconds === 0) {
							clearInterval(greenInterval);
							penaltyTimer.remove();
							playerRow[i].style.pointerEvents = 'auto';
						}
						Gtime = `${GTminutes}${Gminutes}:${GTseconds}${Gseconds}`;
						penaltyTimer.textContent = Gtime;
					}, 1000);
					stopButton.addEventListener('click', () => {
						clearInterval(greenInterval);
					});
				});
				let eventMinute = `${minutes + 1}'`;
				// add card to the player - database
				addCard(playersDatabase, 'green', playerRow[i]);
				// add card to the session storage
				cardSorage(cardsArray, i, eventMinute, 'green');
				// add card to history section
				const playerData = playerRow[i].childNodes[0].textContent;
				cardHistory(playerData, eventMinute, 'green');
			});
		}
		// Yellow cards
		yellowCards = document.querySelectorAll('.square');
		for (let i = 0; i < yellowCards.length; i++) {
			yellowCards[i].addEventListener('click', () => {
				yellowCards[i].classList.toggle('fullOpacity');
				greenCards[i].style.pointerEvents = 'none';
				// insert penalty timer
				const mainScreen = document.querySelector('#mainScreen');
				const playerRow = mainScreen.querySelectorAll('.playerRowContainer');
				const penaltyTimer = document.createElement('div');
				// penaltyTimer.textContent = '02:00';
				penaltyTimer.classList.add('penaltyTimer');
				playerRow[i].style.pointerEvents = 'none';
				playerRow[i].insertBefore(penaltyTimer, cardsContainers[i]);
				const duration = window.prompt(
					// 'Vnesite dolžino kazni: \n Milejša kazen: 5 min \n Strožja kazen: 10 min'
					'Vnesite dolžino kazni v minutah! Najmanj 3 minute.'
				);
				// countdown timer
				let Yseconds = 0,
					YTseconds = 0,
					Yminutes = 0,
					YTminutes = 0,
					Ytime = '';
				let durationInt = parseInt(duration);

				if (duration > 9) {
					Yminutes = durationInt % 10;
					YTminutes = Math.floor(durationInt / 10);
					penaltyTimer.textContent = `${duration}:00`;
				} else {
					Yminutes = parseInt(duration);
					penaltyTimer.textContent = `0${duration}:00`;
				}

				// if (duration == 5) {
				//   Yminutes = 5;
				//   penaltyTimer.textContent = `0${duration}:00`;
				// } else if (duration == 10) {
				//   YTminutes = 1;
				//   penaltyTimer.textContent = `${duration}:00`;
				// }

				startButton.addEventListener('click', () => {
					const yellowInterval = setInterval(() => {
						Yseconds--;

						if (Yseconds < 0) {
							Yseconds = 9;
							YTseconds--;
						}
						if (YTseconds < 0) {
							YTseconds = 5;
							Yminutes--;
						}
						if (Yminutes < 0) {
							Yminutes = 9;
							YTminutes--;
						}
						if (YTminutes === 0 && Yminutes === 0 && YTseconds === 0 && Yseconds === 0) {
							clearInterval(yellowInterval);
							penaltyTimer.remove();
							playerRow[i].style.pointerEvents = 'auto';
						}
						Ytime = `${YTminutes}${Yminutes}:${YTseconds}${Yseconds}`;
						penaltyTimer.textContent = Ytime;
					}, 1000);
					stopButton.addEventListener('click', () => {
						clearInterval(yellowInterval);
					});
				});
				let eventMinute = `${minutes + 1}'`;
				// add card to the player - database
				addCard(playersDatabase, 'yellow', playerRow[i]);
				// add card to the session storage
				cardSorage(cardsArray, i, eventMinute, 'yellow');
				// add card to history section
				const playerData = playerRow[i].childNodes[0].textContent;
				cardHistory(playerData, eventMinute, 'yellow');
			});
		}
		// Red cards
		redCards = document.querySelectorAll('.circle');
		for (let i = 0; i < greenCards.length; i++) {
			redCards[i].addEventListener('click', () => {
				// Toggle full opacity
				redCards[i].classList.toggle('fullOpacity');
				// Add penalty timer
				const mainScreen = document.querySelector('#mainScreen');
				const playerRow = mainScreen.querySelectorAll('.playerRowContainer');
				const penaltyTimer = document.createElement('div');
				penaltyTimer.classList.add('penaltyTimer');
				penaltyTimer.textContent = 'Izključen';
				playerRow[i].insertBefore(penaltyTimer, cardsContainers[i]);
				// Display red overlay
				playerRow[i].style.backgroundColor = '#fb6161';
				playerRow[i].style.pointerEvents = 'none';
				playerRow[i].style.cursor = 'not-allowed';
				// Event time
				let eventMinute = `${minutes + 1}'`;
				// Add card to player - database
				addCard(playersDatabase, 'red', playerRow[i]);
				// add card to session storage
				cardSorage(cardsArray, i, eventMinute, 'red');
				// add card to history section
				const playerData = playerRow[i].childNodes[0].innerHTML;
				cardHistory(playerData, eventMinute, 'red');
			});
		}

		// Stopwatch data
		periodLength = document.querySelector('#timeSettingsContainer > input[name="periodLength"]');
		periodNumber = document.querySelector('#timeSettingsContainer > input[name="periodNumber"]');
		console.log(periodLength.value);
		console.log(periodNumber.value);
		for (let i = 1; i < periodNumber.value + 1; i++) {
			timeStops.push(periodLength * i);
			console.log(timeStops);
		}
	}

	// Opens new tab to print out report form with static data (in case program crashes)
	window.open('./zapisnik', '_blank');
};
// This code can stand on its own
// Set up match dashboard
// System for displaying and adding goals
let homeGoalCount = parseInt(document.getElementById('homeScore').innerHTML);
let guestGoalCount = parseInt(document.getElementById('guestScore').innerHTML);
let goalType = '';
let goalsArray = [];

// Novi sistem
let seconds = 0,
	minutes = 0;

function displayTime() {
	// Novi sistem
	if (seconds < 10) {
		seconds = '0' + seconds.toString();
	}

	if (minutes < 10) {
		// minutes = '0' + minutes.toString();
	}
	stopwatch.textContent = `${minutes}:${seconds}`;
}

let period = 1; // For displaying period start in history section
let timeStops = [];

function checkTime() {
	for (let i = 0; i < timeStops.length; i++) {
		// if (minutes == periodLength.value * i && Tseconds == 0 && seconds == 0) {
		if (minutes == periodLength.value * i && seconds == 0) {
			stopButton.click();
			// Play sound
			console.log('Period finished');
			period++;
		}
	}
	if (minutes == periodLength.value * periodNumber.value && seconds == 0) {
		stopButton.click();
		console.log('Game finished');
		startButton.addEventListener('click', () => {
			location.href = '/zapisnik';
		});
	}
}

let periodStartAdded = 0; // For displaying period start in history section§
let timerProtector = true; // For timer protection
const historyContainer = document.getElementById('history');

startButton.addEventListener('click', () => {
	stopwatch.style.animation = 'startAnimation 0.8s';
	if (timerProtector === true) {
		// Timer protector
		timerProtector = false;
		// Stopwatch system
		const timer = setInterval(() => {
			// Novi sistem
			seconds++;
			if (seconds > 59) {
				minutes++;
				seconds = 0;
			}
			displayTime();
			checkTime();
		}, 1000);

		stopButton.addEventListener('click', () => {
			clearInterval(timer);
			timerProtector = true;
			stopwatch.style.animation = 'blinking .5s infinite alternate';
		});

		stopButton.addEventListener('dblclick', () => {
			clearInterval(timer);
			const endGame = confirm('Ali ste prepričani, da želite prekiniti tekmo?');
			if (endGame) {
				location.href = '/zapisnik';
			}
		});

		// Show that period [i] started
		if (periodStartAdded < period) {
			const startRow = document.createElement('div');
			startRow.innerHTML = `Začetek ${period}. periode - ${minutes}:${seconds}`;
			startRow.setAttribute('class', 'periodStart');
			historyContainer.append(startRow);
			periodStartAdded++;
		}

		// Buttons
		const actionButton = document.getElementById('actionButton');
		const cornerButton = document.getElementById('cornerButton');
		const penaltyButton = document.getElementById('penaltyButton');

		// Action type
		actionButton.addEventListener('click', function () {
			toggleHighlight();
			goalType = 'AK';
			const players = document.querySelectorAll(`.playerRowContainer`);
			players.forEach((player) => {
				// Animations and style
				player.style.cursor = 'pointer';
				// Event listener
				player.addEventListener('click', () => {
					console.log(player.dataset.playerid);
					if (player.style.cursor === 'pointer') {
						removeHighlight();
						const team = player.dataset.team;
						// Home team
						if (team === 'home-player') {
							homeGoalCount = parseInt(document.getElementById('homeScore').innerHTML) + 1;
							const homeScore = (document.getElementById('homeScore').innerHTML = homeGoalCount);
							const homeTeamName = sessionStorage.getItem('homeTeam').trim();
							goalEvent(player, homeTeamName, goalType, homeGoalCount, guestGoalCount, goalsArray);
						} // Guest Team
						else if (team === 'guest-player') {
							guestGoalCount = parseInt(document.getElementById('guestScore').innerHTML) + 1;
							const guestScore = (document.getElementById('guestScore').innerHTML = guestGoalCount);
							const guestTeamName = sessionStorage.getItem('guestTeam').trim();
							goalEvent(player, guestTeamName, goalType, homeGoalCount, guestGoalCount, goalsArray);
						}
						players.forEach((player) => {
							player.style.cursor = 'default';
						});
					}
					// player.classList.toggle('highlight');
				});
			});
		});

		// Corner type
		cornerButton.addEventListener('click', function () {
			toggleHighlight();
			goalType = 'KK';
			const players = document.querySelectorAll(`.playerRowContainer`);
			players.forEach((player) => {
				// Animations and style
				player.style.cursor = 'pointer';
				// Event listener
				player.addEventListener('click', () => {
					if (player.style.cursor === 'pointer') {
						removeHighlight();
						const team = player.dataset.team;
						// Home team
						if (team === 'home-player') {
							homeGoalCount++;
							const homeScore = (document.getElementById('homeScore').innerHTML = homeGoalCount);
							const homeTeamName = sessionStorage.getItem('homeTeam').trim();
							goalEvent(player, homeTeamName, goalType, homeGoalCount, guestGoalCount, goalsArray);
						} // Guest Team
						else if (team === 'guest-player') {
							guestGoalCount++;
							const guestScore = (document.getElementById('guestScore').innerHTML = guestGoalCount);
							const guestTeamName = sessionStorage.getItem('guestTeam').trim();
							goalEvent(player, guestTeamName, goalType, homeGoalCount, guestGoalCount, goalsArray);
						}
						players.forEach((player) => {
							player.style.cursor = 'default';
						});
					}
				});
			});
		});

		// Penalty type
		penaltyButton.addEventListener('click', function () {
			toggleHighlight();
			goalType = 'KS';
			const players = document.querySelectorAll(`.playerRowContainer`);
			players.forEach((player) => {
				// Animations and style
				player.style.cursor = 'pointer';
				// Event listener
				player.addEventListener('click', () => {
					if (player.style.cursor === 'pointer') {
						removeHighlight();
						const team = player.dataset.team;
						// Home team
						if (team === 'home-player') {
							homeGoalCount++;
							const homeScore = (document.getElementById('homeScore').innerHTML = homeGoalCount);
							const homeTeamName = sessionStorage.getItem('homeTeam').trim();
							goalEvent(player, homeTeamName, goalType, homeGoalCount, guestGoalCount, goalsArray);
						} // Guest Team
						else if (team === 'guest-player') {
							guestGoalCount++;
							const guestScore = (document.getElementById('guestScore').innerHTML = guestGoalCount);
							const guestTeamName = sessionStorage.getItem('guestTeam').trim();
							goalEvent(player, guestTeamName, goalType, homeGoalCount, guestGoalCount, goalsArray);
						}
						players.forEach((player) => {
							player.style.cursor = 'default';
						});
					}
				});
			});
		});
	}
});

// Display status in history section
stopButton.addEventListener('click', () => {
	const stopRow = document.createElement('div');
	// stopRow.innerHTML = `Zaustavljen čas - ${Tminutes}${minutes}:${Tseconds}${seconds}`;
	stopRow.innerHTML = `Zaustavljen čas - ${minutes}:${seconds}`;
	stopRow.setAttribute('class', 'periodStop');
	historyContainer.append(stopRow);
});

addSecondButton.onclick = () => {
	seconds++;
	displayTime();
};
substractSecondButton.onclick = () => {
	if (seconds > 0) {
		seconds--;
	} else {
		seconds = 59;
		minutes--;
		seconds--;
	}
	displayTime();
};

// Event listener for removing last scored goal
const homeScoreContainer = document.getElementById('homeScoreContainer');
homeScoreContainer.addEventListener('dblclick', () => {
	if (homeScore.innerHTML != 0) {
		const homeScore = document.getElementById('homeScore');
		homeScore.innerHTML = parseInt(homeScore.innerHTML) - 1;
		// Removes goal from system
		goalsArray.pop();
		sessionStorage.setItem('goalsArray', JSON.stringify(goalsArray));
		// Removes goal from report's history section
		historyContainer.removeChild(historyContainer.lastChild);
		// Updates players' database
	}
});

const guestScoreContainer = document.getElementById('guestScoreContainer');
guestScoreContainer.addEventListener('dblclick', () => {
	if (homeScore.innerHTML != 0) {
		const guestScore = document.getElementById('guestScore');
		guestScore.innerHTML = parseInt(guestScore.innerHTML) - 1;
		// Removes goal from system
		goalsArray.pop();
		sessionStorage.setItem('goalsArray', JSON.stringify(goalsArray));
		// Removes goal from report's history section
		historyContainer.removeChild(historyContainer.lastChild);
		// Updates players' database
	}
});

// Functions that need to be nested inside settings confirmation statement
// Function for displaying players in dashboard
function showHomePlayers(team) {
	const container = document.getElementById(team + 'PlayersContainer');
	const playersArray = JSON.parse(sessionStorage.getItem(team + 'Players'));
	playersArray.forEach((player) => {
		const data = player.data;
		const playerRowContainer = document.createElement('div');
		playerRowContainer.setAttribute('data-team', team + '-player');
		playerRowContainer.setAttribute('class', 'playerRowContainer');
		playerRowContainer.innerHTML = `<div><b class="boldNumber">${data.number}</b>  ${data.name} ${data.lastName}</div> <div class="cardContainer"><span class="triangle"></span><span class="square"></span><span class="circle"></span></div>`;
		playerRowContainer.setAttribute('data-playerId', player.id);
		container.append(playerRowContainer);
	});
}

// Function for updating goals and scores
// Preveri funkcijo in jo zamenjaj v event listenerjih
function addGoal(type, homeGoalCount, guestGoalCount) {
	let goalType = type;
	// Functionality for goal types
	const players = document.querySelectorAll(`.playerRowContainer`);
	players.forEach((player) => {
		// Animations and style
		player.style.cursor = 'pointer';
		// Event listener
		player.addEventListener('click', () => {
			if (player.style.cursor === 'pointer') {
				const team = player.dataset.team;
				// Home team
				if (team === 'home-player') {
					homeGoalCount++;
					const homeScore = (document.getElementById('homeScore').innerHTML = homeGoalCount);
					const homeTeamName = sessionStorage.getItem('homeTeam').trim();
					goalEvent(player, homeTeamName, goalType);
				} // Guest Team
				else if (team === 'guest-player') {
					guestGoalCount++;
					const guestScore = (document.getElementById('homeScore').innerHTML = guestGoalCount);
					const guestTeamName = sessionStorage.getItem('guestTeam').trim();
					goalEvent(player, guestTeamName, goalType);
				}
				players.forEach((player) => {
					player.style.cursor = 'default';
				});
			}
		});
	});
}

// Function for ading goal event in history section and session storage
function goalEvent(player, team, type, homeGoalCount, guestGoalCount, goalsArray) {
	// Display name in history section
	// console.log(player.textContent.slice(0, 2));
	const goalRow = document.createElement('div');
	const time = parseInt(minutes) + 1;
	goalRow.innerHTML = `<b>${time}' GOL  ${type} : </b> ${player.textContent} - ${team}`;
	goalRow.setAttribute('class', 'goalRow');
	historyContainer.append(goalRow);
	// Save to session storage for report
	const newGoal = {
		team: team,
		score: `${homeGoalCount}:${guestGoalCount}`,
		timestamp: time + "'",
		type: type,
		number: player.textContent.slice(0, 2),
	};
	console.log(newGoal);
	goalsArray.push(newGoal);
	sessionStorage.setItem('goalsArray', JSON.stringify(goalsArray));
	// Update player's database
	playersDatabase.forEach(async (playerOfArray) => {
		if (playerOfArray.id === player.dataset.playerid) {
			const goalsRef = doc(database, 'players', playerOfArray.id);
			const playerGoals = playerOfArray.data.goals;
			await updateDoc(goalsRef, { goals: playerGoals + 1 });
		}
	});
}

// Function for adding cards to players database
function addCard(database1, type, player) {
	console.log('Card added');
	playersDatabase.forEach(async (playerOfArray) => {
		if (playerOfArray.id === player.dataset.playerid) {
			const cardsRef = doc(playersRef, playerOfArray.id);
			console.log(cardsRef);
			const greenCard = playerOfArray.data.cards.green;
			const yellowCard = playerOfArray.data.cards.yellow;
			const redCard = playerOfArray.data.cards.red;
			switch (type) {
				case 'green':
					await updateDoc(cardsRef, 'cards', {
						green: greenCard + 1,
						yellow: yellowCard,
						red: redCard,
					});
					break;
				case 'yellow':
					await updateDoc(cardsRef, 'cards', {
						green: greenCard,
						yellow: yellowCard + 1,
						red: redCard,
					});
					break;
				case 'red':
					await updateDoc(cardsRef, 'cards', {
						green: greenCard,
						yellow: yellowCard,
						red: redCard + 1,
					});
					break;
			}
		}
	});
}

// Function for saving cards to session storage
function cardSorage(array, player, time, type) {
	const newCard = {
		player: player,
		timestamp: time,
		type: type,
	};
	array.push(newCard);
	sessionStorage.setItem('cardsArray', JSON.stringify(array));
}
// Function for displaying cards in history section
function cardHistory(player, time, type) {
	let displayType;
	const cardRow = document.createElement('div');
	cardRow.classList.add('cardRow');
	switch (type) {
		case 'green':
			displayType = 'Zeleni';
			break;
		case 'yellow':
			displayType = 'Rumeni';
			break;
		case 'red':
			displayType = 'Rdeči';
			break;
	}
	cardRow.innerHTML = `<b>${time}</b> <span class='${type}Card'>${displayType}</span> - ${player}`;
	historyContainer.append(cardRow);
}

// Function for highlighting playerRowContainers on hover
function toggleHighlight() {
	const playersRows = document.querySelectorAll('.playerRowContainer');
	playersRows.forEach((row) => {
		row.classList.toggle('highlight');
	});
}

// Function for removing highlighting playerRowContainers on hover
function removeHighlight() {
	const playersRows = document.querySelectorAll('.playerRowContainer');
	playersRows.forEach((row) => {
		row.classList.remove('highlight');
	});
}

/* ===================================================================================================================================

TODO: 
1. Poskusi premakniti event listenerje za kartone iz event listenerja za startButton, da se prepreči ponavljanje in podvajanje kazni - štoparica za kazensko klop.
  ~ Poskusi z async funkcijo, ki najprej dobi vse kartone, tako kot zdaj, vendar izven event listenerja pred klikom ti kartoni še ne obstajajo!

*** DONE ***

2. Popravi funkcijo, ki preverja trenutni čas periode in prekine oziroma označi konec periode in na koncu javi, da je tekma končaca (zadnje deluje!)

*** DONE ***

3. Dodaj omejitev za igralce, maximalno 18 igralcev!

*** DONE *** 

4. Popravi postavitev funkcije, ki pridobi igralce iz podatkovne baze tako, da program najprej počaka na vrednost v input za selekcijo in nato v array doda samo tiste igralce, ki ustrezajo pogojem (selekcija, klub) - preveri če se read podatki nabirajo že ob samem preverjanju igralcev.
  ~ Prestrukturiranje podatkovne baze - OBVEZNO za zmanjšanje porabe podatkov in zelo uporabno za nadaljno uporabo, pri dodajanju posameznih klubov. Namesto podatkovne baze igralcev naredi podatkovne baze posameznih klubov.

5. Dodelaj event listener, ki razveljavi zadnji dodani gol za posamezno ekipo (že deluje) in tudi izbriše gol iz zgodovine zapisnika in posodobi igralčevo podatkovno bazo (samo še zadnja točka)

*** DONE ***

=================================================================================================================================== */
