//Geoapify Code for Admin Tab

addressAutocomplete(document.getElementById("autocomplete-container-station"), (data) => {
    console.log("Selected option: ");
    console.log(data);
    if (data != null) {
        console.log("From Address - Lat: " + data.properties.lat + ", Lon:" + data.properties.lon);
        document.getElementById('station_address_lat').value = data.properties.lat;
        document.getElementById('station_address_lng').value = data.properties.lon;
    }
}, 'station_address');

document.getElementById('station_address').disabled = false;
