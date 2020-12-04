//Methods for communication with the DB for stations

const uri = "api/Stations";

//GET stations method
function getStations() {
    fetch(uri)
        .then(response => response.json())
        .then(data => tableAddStations(data))
        .catch(error => console.error('Unable to get stations.', error));
}
//POST stations method

function addNewStation() {

}

//Display Stations


function tableAddStations(data) {

}