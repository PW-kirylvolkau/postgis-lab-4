//Geoapify_code calls for New Order Tab

addressAutocomplete(document.getElementById("autocomplete-container-from"), (data) => {
    console.log("Selected option: ");
    console.log(data);
    if (data != null) {
        document.getElementById('fromLatCoords').value = data.properties.lat;
        document.getElementById('fromLngCoords').value = data.properties.lon;
        console.log("From Address - Lat: " + data.properties.lat + ", Lon:" + data.properties.lon);
    }
}, 'fromAddress');

addressAutocomplete(document.getElementById("autocomplete-container-to"), (data) => {
    console.log("Selected option: ");
    console.log(data);
    if (data != null) {
        document.getElementById('toLatCoords').value = data.properties.lat;
        document.getElementById('toLngCoords').value = data.properties.lon;
        console.log("To Address - Lat: " + data.properties.lat + ", Lon:" + data.properties.lon);
    }
}, 'toAddress');