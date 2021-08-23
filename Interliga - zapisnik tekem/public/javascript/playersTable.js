const addButton = document.getElementById('addPlayer');
const windowAddButton = document.getElementById('windowAddPlayer');
const mainContent = document.getElementById('playerAddition');

addButton.addEventListener('click', () => {
  mainContent.classList.remove('hidden');
  mainContent.classList.add('showUpAnimation');
});

windowAddButton.addEventListener('click', () => {
  // mainContent.classList.add('reverseShowUpAnimation');
  mainContent.classList.add('hidden');
});

mainContent.addEventListener('click', () => {
  mainContent.classList.add('hidden');
});

const playersData = [
  {
    name: 'Ema',
    last_name: 'Vöröš',
    Club: 'HK Moravske Toplice',
    _id: '4paPlLqASRaFX9vO',
  },
  {
    name: 'Nuša',
    last_name: 'Rantaša',
    Club: 'HK Moravske Toplice',
    _id: '9hrBVgX9Aiu1emNX',
  },
  {
    name: 'Neja',
    last_name: 'Dragojlović',
    Club: 'HK Moravske Toplice',
    _id: 'PNt8Bg3mI9UqJiQ4',
  },
  {
    name: 'Špela',
    last_name: 'Berden',
    Club: 'HK Lipovci',
    _id: 'Qe52asaxvJa3RLcb',
  },
  {
    name: 'Ana',
    last_name: 'Vegič',
    Club: 'HK Lipovci',
    _id: 'T4qSdwQCQLy7pPwW',
  },
  {
    name: 'Maja',
    last_name: 'Legen',
    Club: 'HK Lipovci',
    _id: 'YByx7307kkFpouw6',
  },
  {
    name: 'Maja',
    last_name: 'Ošlaj',
    Club: 'HK Moravske Toplice',
    _id: 'aJswMzcYLj6OUH87',
  },
  {
    name: 'Danaja',
    last_name: 'Škrilec',
    Club: 'HK Moravske Toplice',
    _id: 'r8kubHYXogpAB3F8',
  },
  {
    name: 'Eva',
    last_name: 'Maučec',
    Club: 'HK Lipovci',
    _id: 'vhkGFoTzFQwMK0L2',
  },
  {
    name: 'Tanja',
    last_name: 'Könye',
    Club: 'HK Moravske Toplice',
    _id: 'xD6lodvWiNoB8Wy0',
  },
  {
    name: 'Ema',
    last_name: 'Vöröš',
    Club: 'HK Moravske Toplice',
    _id: '4paPlLqASRaFX9vO',
  },
  {
    name: 'Nuša',
    last_name: 'Rantaša',
    Club: 'HK Moravske Toplice',
    _id: '9hrBVgX9Aiu1emNX',
  },
  {
    name: 'Neja',
    last_name: 'Dragojlović',
    Club: 'HK Moravske Toplice',
    _id: 'PNt8Bg3mI9UqJiQ4',
  },
  {
    name: 'Špela',
    last_name: 'Berden',
    Club: 'HK Lipovci',
    _id: 'Qe52asaxvJa3RLcb',
  },
  {
    name: 'Ana',
    last_name: 'Vegič',
    Club: 'HK Lipovci',
    _id: 'T4qSdwQCQLy7pPwW',
  },
  {
    name: 'Maja',
    last_name: 'Legen',
    Club: 'HK Lipovci',
    _id: 'YByx7307kkFpouw6',
  },
  {
    name: 'Maja',
    last_name: 'Ošlaj',
    Club: 'HK Moravske Toplice',
    _id: 'aJswMzcYLj6OUH87',
  },
  {
    name: 'Danaja',
    last_name: 'Škrilec',
    Club: 'HK Moravske Toplice',
    _id: 'r8kubHYXogpAB3F8',
  },
  {
    name: 'Eva',
    last_name: 'Maučec',
    Club: 'HK Lipovci',
    _id: 'vhkGFoTzFQwMK0L2',
  },
  {
    name: 'Tanja',
    last_name: 'Könye',
    Club: 'HK Moravske Toplice',
    _id: 'xD6lodvWiNoB8Wy0',
  },
  {
    name: 'Ema',
    last_name: 'Vöröš',
    Club: 'HK Moravske Toplice',
    _id: '4paPlLqASRaFX9vO',
  },
  {
    name: 'Nuša',
    last_name: 'Rantaša',
    Club: 'HK Moravske Toplice',
    _id: '9hrBVgX9Aiu1emNX',
  },
  {
    name: 'Neja',
    last_name: 'Dragojlović',
    Club: 'HK Moravske Toplice',
    _id: 'PNt8Bg3mI9UqJiQ4',
  },
  {
    name: 'Špela',
    last_name: 'Berden',
    Club: 'HK Lipovci',
    _id: 'Qe52asaxvJa3RLcb',
  },
  {
    name: 'Ana',
    last_name: 'Vegič',
    Club: 'HK Lipovci',
    _id: 'T4qSdwQCQLy7pPwW',
  },
  {
    name: 'Maja',
    last_name: 'Legen',
    Club: 'HK Lipovci',
    _id: 'YByx7307kkFpouw6',
  },
  {
    name: 'Maja',
    last_name: 'Ošlaj',
    Club: 'HK Moravske Toplice',
    _id: 'aJswMzcYLj6OUH87',
  },
  {
    name: 'Danaja',
    last_name: 'Škrilec',
    Club: 'HK Moravske Toplice',
    _id: 'r8kubHYXogpAB3F8',
  },
  {
    name: 'Eva',
    last_name: 'Maučec',
    Club: 'HK Lipovci',
    _id: 'vhkGFoTzFQwMK0L2',
  },
  {
    name: 'Tanja',
    last_name: 'Könye',
    Club: 'HK Moravske Toplice',
    _id: 'xD6lodvWiNoB8Wy0',
  },
  {
    name: 'Ema',
    last_name: 'Vöröš',
    Club: 'HK Moravske Toplice',
    _id: '4paPlLqASRaFX9vO',
  },
  {
    name: 'Nuša',
    last_name: 'Rantaša',
    Club: 'HK Moravske Toplice',
    _id: '9hrBVgX9Aiu1emNX',
  },
  {
    name: 'Neja',
    last_name: 'Dragojlović',
    Club: 'HK Moravske Toplice',
    _id: 'PNt8Bg3mI9UqJiQ4',
  },
  {
    name: 'Špela',
    last_name: 'Berden',
    Club: 'HK Lipovci',
    _id: 'Qe52asaxvJa3RLcb',
  },
  {
    name: 'Ana',
    last_name: 'Vegič',
    Club: 'HK Lipovci',
    _id: 'T4qSdwQCQLy7pPwW',
  },
  {
    name: 'Maja',
    last_name: 'Legen',
    Club: 'HK Lipovci',
    _id: 'YByx7307kkFpouw6',
  },
  {
    name: 'Maja',
    last_name: 'Ošlaj',
    Club: 'HK Moravske Toplice',
    _id: 'aJswMzcYLj6OUH87',
  },
  {
    name: 'Danaja',
    last_name: 'Škrilec',
    Club: 'HK Moravske Toplice',
    _id: 'r8kubHYXogpAB3F8',
  },
  {
    name: 'Eva',
    last_name: 'Maučec',
    Club: 'HK Lipovci',
    _id: 'vhkGFoTzFQwMK0L2',
  },
  {
    name: 'Tanja',
    last_name: 'Könye',
    Club: 'HK Moravske Toplice',
    _id: 'xD6lodvWiNoB8Wy0',
  },
];

const searchBar = document.getElementById('searchBarInput');
searchBar.addEventListener('keyup', () => {
  let value = searchBar.value;
  let data = searchDatabase(value, playersData);
  displayPlayer(data);
});

function searchDatabase(value, array) {
  let searches = [];

  for (let i = 0; i < array.length; i++) {
    value = value.toLowerCase();
    let name = array[i].name.toLowerCase();
    let lastname = array[i].last_name.toLowerCase();
    let club = array[i].Club.toLowerCase();

    if (
      name.includes(value) ||
      lastname.includes(value) ||
      club.includes(value)
    ) {
      searches.push(array[i]);
    }
  }
  return searches;
}

displayPlayer(playersData);

function displayPlayer(player) {
  const table = document.getElementById('playersTable');
  table.innerHTML = '';
  let colorPicker = 1;
  for (let i = 0; i < player.length; i++) {
    if (colorPicker == 1) {
      color = 'green';
    } else {
      color = 'white';
    }
    const row = `<tr style="--index: ${i};" class="${color}">
                            <td style="width:100px;">${player[i].name}</td>
                            <td style="width:100px;">${player[i].last_name}</td>
                            <td style="width:200px;">${player[i].Club}</td>                         
                        </tr>`;
    table.innerHTML += row;
    colorPicker *= -1;
  }
}
