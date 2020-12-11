function initAdminPage() {
    updateStationsTable();
    updateVehiclesTable();
    addressAutocomplete(document.getElementById("autocomplete-container-station"), (data) => {
        if (data != null) {
            console.log("From Address - Lat: " + data.properties.lat + ", Lon:" + data.properties.lon);
            document.getElementById('station_address_lat').value = data.properties.lat;
            document.getElementById('station_address_lng').value = data.properties.lon;
        }
    }, 'station_address');
    document.getElementById('station_address').disabled = false;
}

function updateAdminPage() {
    updateStationsTable();
    updateVehiclesTable();
}

function updateStationsTable() {
    getStations(setStationsTable);
}

function setStationsTable(stations) {
    const tBody = document.getElementById('stationTable');
    tBody.innerHTML = '';
    stations.forEach(station => {
        const tr = tBody.insertRow();

        const td1 = tr.insertCell(0);
        const id = document.createTextNode(station.id);
        td1.appendChild(id);

        const td2 = tr.insertCell(1);
        const name = document.createTextNode(station.name);
        td2.appendChild(name);

        const td3 = tr.insertCell(2);
        const address = document.createTextNode(station.address);
        td3.appendChild(address);
    });
}

function updateVehiclesTable() {
    getVehicles(setVehiclesTable);
}

function setVehiclesTable(vehicles) {
    const tBody = document.getElementById('vehicle_table');
    tBody.innerHTML = '';
    vehicles.forEach(vehicle => {
        const tr = tBody.insertRow();

        const td1 = tr.insertCell(0);
        const id = document.createTextNode(vehicle.id);
        td1.appendChild(id);

        const td2 = tr.insertCell(1);
        const name = document.createTextNode(vehicle.name);
        td2.appendChild(name);

        const td3 = tr.insertCell(2);
        const station_id = document.createTextNode(vehicle.stationId);
        td3.appendChild(station_id);

        const td4 = tr.insertCell(3);
        const capacity = document.createTextNode(vehicle.capacity);
        td4.appendChild(capacity);
    });
}

function addNewStation() {
    const name = document.getElementById('station_name');
    const address = document.getElementById('station_address');
    const lat = document.getElementById('station_address_lat');
    const lng = document.getElementById('station_address_lng');

    const newStation = {
        name: name.value.trim(),
        address: address.value.trim(),
        lat: parseFloat(lat.value.trim()),
        lng: parseFloat(lng.value.trim()),
    }
    
    addStation(newStation, (response) => {
        if(response.status !== 201) {
            toastr.error("Unable to add the station.");
            return;
        }
        name.value = '';
        address.value = '';
        lat.value = '';
        lng.value = '';
        toastr.success("Station added successfully!")
        updateStationsTable();
    });
}

function addNewVehicle() {
    const name = document.getElementById('vehicle_name');
    const station = document.getElementById('vehicle_station_id');
    const capacity = document.getElementById('vehicle_capacity');

    const newVehicle = {
        name: name.value.trim(),
        stationId: parseInt(station.value),
        capacity: parseFloat(capacity.value)
    }
    
    addVehicle(newVehicle, (result) => {
        console.log(result);
        if(result.status === 400) {
            result.json().then(json => toastr.error("Error:\n" + JSON.stringify(json)));
            return;
        }
        updateVehiclesTable();
        name.value = '';
        station.value = '';
        capacity.value = '';
        toastr.success("Vehicle successfully added!");
        updateVehiclesTable();
    })
    
}









