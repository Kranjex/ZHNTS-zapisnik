const Users = [
  {
    name: 'Vid',
    lastName: 'Kranjec',
    email: 'vid.kranjec@email.com',
    role: 'admin',
  },
  {
    name: 'Vid',
    lastName: 'Kranjec',
    email: 'vid.kranjec@email.com',
    role: 'admin',
  },
  {
    name: 'Vid',
    lastName: 'Kranjec',
    email: 'vid.kranjec@email.com',
    role: 'admin',
  },
  {
    name: 'Vid',
    lastName: 'Kranjec',
    email: 'vid.kranjec@email.com',
    role: 'admin',
  },
];

displayPlayer(Users);

function displayPlayer(player) {
  const table = document.getElementById('table');
  table.innerHTML = '';
  let colorPicker = 1;
  for (let i = 0; i < player.length; i++) {
    if (colorPicker == 1) {
      color = 'green';
    } else {
      color = 'white';
    }
    const row = `<tr style="--index: ${i};" class="${color}">
                            <td style="width:25%;">${player[i].name}</td>
                            <td style="width:25%;">${player[i].lastName}</td>
                            <td style="width:25%;">${player[i].email}</td>                         
                            <td style="width:25%;">${player[i].role}</td>                         
                        </tr>`;
    table.innerHTML += row;
    colorPicker *= -1;
  }
}
