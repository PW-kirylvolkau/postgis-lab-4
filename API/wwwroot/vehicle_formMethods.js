//Methods for communication with the DB for stations
const uriVehicles = "api/Vehicles";
let allVehicles = [];

//GET stations method
function getVehicles() {
    fetch(uriVehicles)
        .then(response => response.json())
        .then(data => allVehicles = data)
        .catch(error => console.error('Unable to get Vehicles.', error));

}
//POST stations method
function addNewVehicle() {
    const nameTextbox = document.getElementById('vehicle_name');
    const stationTextbox = document.getElementById('vehicle_station_id');
    const capacityTextbox = document.getElementById('vehicle_capacity');
    let stationElement = null;
    allStations.forEach(station => {
        if (station.id === parseInt(stationTextbox.value.trim())) {
            stationElement = station;
        }
    });
    if (capacityTextbox.value > 1000 || capacityTextbox.value < 0) {
        console.log("Error: Capacity value is not valid");
        alert("Error: Capacity value is not valid");
        return;
    }
    if (stationElement == null) {
        console.log("Error: Station assigned does not exist");
        alert("Error: Station assigned does not exist");
        return;
    }

    const newVehicle = {
        name: parseInt(nameTextbox.value.trim()),
        stationId: parseInt(stationTextbox.value.trim()),
        capacity: parseFloat(capacityTextbox.value.trim())
    }

    fetch(uriVehicles, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVehicle)
    })
        .then(() => {
            getVehicles();
            nameTextbox.value = '';
            stationTextbox.value = '';
            capacityTextbox.value = '';
        })
        .catch(error => console.error('Unable to add order.', error));
}
