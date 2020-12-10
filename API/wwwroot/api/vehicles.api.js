function getVehicles(callback) {
    fetch(API_VEHICLES)
        .then(response => response.json())
        .then(vehicles => callback(vehicles))
        .catch(e => toastr.error('Error encountered : ' + e));
}

function addVehicle(payload, callback) {
    fetch(API_VEHICLES,  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => callback(response))
        .catch(e => toastr.error('Error encountered : ' + e));
}