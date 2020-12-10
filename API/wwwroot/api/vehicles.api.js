function getVehicles(callback) {
    return fetch(API_VEHICLES)
        .then(response => response.json)
        .then(vehicles => callback(vehicles))
        .catch(e => console.log("Unable to get vehicle: ", e));
}