const BASE_URL = 'https://localhost:5001/package';
let packages;

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const weightInput = document.getElementById("weight");
const cityInput = document.getElementById("city");
const addressInput = document.getElementById("address");
let table = document.getElementById("table");

document.getElementById("submit")
	.addEventListener("click", (e) => onSubmitButton(e));

getPackages();

function getPackages() {
	const new_tbody = document.createElement('tbody');
	new_tbody.id = "table";

	fetch(BASE_URL)
		.then(response => response.json())
		.then(json => packages = json)
		.then(
			() => {
				packages.map((p, index) => {
						const row = document.createElement("tr");
						const header = document.createElement("th");
						header.textContent = `${index+1}`;
						const name = document.createElement("td");
						name.textContent = p.name;
						const surname = document.createElement("td");
						surname.textContent = p.surname;
						const address = document.createElement("td");
						address.textContent = p.address;
						const weight = document.createElement("td");
						weight.textContent = p.weight;
						const city = document.createElement("td");
						city.textContent = p.city;

						row.appendChild(header);
						row.appendChild(name);
						row.appendChild(surname);
						row.appendChild(weight);
						row.appendChild(city);
						row.appendChild(address);



						new_tbody.appendChild(row);
						table.parentNode.replaceChild(new_tbody, table);
						table = document.getElementById('table');
					}
				)});
}

async function onSubmitButton(e)
{
	e.preventDefault();
	const payload = {
		name: nameInput.value,
		surname: surnameInput.value,
		weight: parseFloat(weightInput.value),
		city: cityInput.options[cityInput.selectedIndex].text,
		address: addressInput.value
	}
	const response = await postData( `${BASE_URL}`, payload);
	if(response === 400) {
		alert("Please, input weight between 0 and 100 and select the city of delivery.");
	}
	else {
		clearInput();
		getPackages();
	}
}

async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.status;
}

function clearInput() {
	nameInput.value = '';
	surnameInput.value = '';
	weightInput.value = '';
	cityInput.value = '';
	addressInput.value = '';
}
