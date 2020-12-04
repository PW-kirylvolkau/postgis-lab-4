//Geoapify_code calls for General Tab

addressAutocomplete(document.getElementById("autocomplete-container-pickup-edit"), (data) => {
    console.log("Selected option: ");
    console.log(data);
}, 'pickupAddress-edit');

document.getElementById('pickupAddress-edit').disabled = false;

addressAutocomplete(document.getElementById("autocomplete-container-delivery-edit"), (data) => {
    console.log("Selected option: ");
    console.log(data);
}, 'deliveryAddress-edit');

document.getElementById('deliveryAddress-edit').disabled = false;