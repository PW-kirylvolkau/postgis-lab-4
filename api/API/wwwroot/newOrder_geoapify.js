//Geoapify_code calls for New Order Tab

addressAutocomplete(document.getElementById("autocomplete-container-from"), (data) => {
    console.log("Selected option: ");
    console.log(data);
}, 'fromAddress');

addressAutocomplete(document.getElementById("autocomplete-container-to"), (data) => {
    console.log("Selected option: ");
    console.log(data);
}, 'toAddress');