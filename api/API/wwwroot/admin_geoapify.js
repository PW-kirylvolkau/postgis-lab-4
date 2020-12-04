//Geoapify Code for Admin Tab

addressAutocomplete(document.getElementById("autocomplete-container-station"), (data) => {
    console.log("Selected option: ");
    console.log(data);
}, 'station_address');

document.getElementById('station_address').disabled = false;
