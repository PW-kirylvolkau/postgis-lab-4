//Geoapify_code calls for General Tab

addressAutocomplete(document.getElementById("autocomplete-container-pickup-edit"), (data) => {
    console.log("Selected option: ");
    console.log(data);
    if (data != null) {
        document.getElementById('pickup-Lat-edit').value = data.properties.lat;
        document.getElementById('pickup-Lon-edit').value = data.properties.lon;
        console.log("From Address - Lat: " + data.properties.lat + ", Lon:" + data.properties.lon);
    }
}, 'pickupAddress-edit');

document.getElementById('pickupAddress-edit').disabled = false;

addressAutocomplete(document.getElementById("autocomplete-container-delivery-edit"), (data) => {
    console.log("Selected option: ");
    console.log(data);
    if (data != null) {
        document.getElementById('delivery-Lat-edit').value = data.properties.lat;
        document.getElementById('delivery-Lon-edit').value = data.properties.lon;
        console.log("From Address - Lat: " + data.properties.lat + ", Lon:" + data.properties.lon);
    }
}, 'deliveryAddress-edit');

document.getElementById('deliveryAddress-edit').disabled = false;