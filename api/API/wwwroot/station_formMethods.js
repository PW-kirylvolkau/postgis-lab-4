//Methods for communication with the DB for stations

const uriStations = "/api/Station";
let allStations = [];

//GET stations method
function getStations() {
    fetch(uriStations)
        .then(response => response.json())
        .then(data => tableAddStations(data))
        .catch(error => console.error('Unable to get stations.', error));
}
//POST stations method

function addNewStation() {
    const nameTextbox = document.getElementById('station_name');
    const addressTextbox = document.getElementById('station_address');
    const latTextbox = document.getElementById('station_address_lat');
    const lngTextbox = document.getElementById('station_address_lng');

    const newStation = {
        name: nameTextbox.value.trim(),
        address: addressTextbox.value.trim(),
        lat: parseFloat(latTextbox.value.trim()),
        lng: parseFloat(lngTextbox.value.trim()),
        vehicles: null
    }

    fetch(uriStations, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStation)
    })
        .then(() => {
            getStations();
            nameTextbox.value = '';
            addressTextbox.value = '';
            latTextbox.value = '';
            lngTextbox.value = '';
        })
        .catch(error => console.error('Unable to add order.', error));
}

//Display Stations


function tableAddStations(data) {
    allStations = data;
    const tBody = document.getElementById('stationTable');
    tBody.innerHTML = '';
    let textNode;

    data.forEach(station => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        textNode = document.createTextNode(station.id);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        textNode = document.createTextNode(station.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        textNode = document.createTextNode(station.address);
        td3.appendChild(textNode);

    });



}