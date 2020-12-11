function getStations(callback) {
    fetch(API_STATIONS)
        .then(response => response.json())
        .then(stations => callback(stations))
        .catch(e => console.log("Unable to get stations:", e));
}

function addStation(payload, callback) {
        fetch(API_STATIONS, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
               callback(response);
            })
            .catch(error => toastr.error(`Error encountered: ${error}`));
}