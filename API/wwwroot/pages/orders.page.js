let ordersMap;
let toInput;
let fromInput;
let fromMarker;
let toMarker;
let polyline;

const handButton = document.getElementById('hand-button');
const textButton = document.getElementById('text-button');
const fromRadio = document.getElementById('fromRadio');
const toRadio = document.getElementById('toRadio');

const modes = {
    from: 'from',
    to: 'to'
};

const popupTexts = {
    from: "<b>From</b><br/>Your package will be picked up here.",
    to: "<b>To</b><br/>Your package will be delivered here."
};

const popupSettings = {
    closeOnClick: false,
    autoClose: false
};

const markerSettings = {
    draggable: true
};

let mode = modes.from;

const initOrdersMap = () => {
    ordersMap = initMap('mapid', ordersMap);
    addMapEventHandlers();
}

function initOrdersPage() {
    addressAutocomplete(document.getElementById("autocomplete-container-from"), (data) => {
        if (data != null) {
            addFromMarker({lat: data.properties.lat, lng: data.properties.lon});
        }
    }, 'fromAddress');

    addressAutocomplete(document.getElementById("autocomplete-container-to"), (data) => {
        if (data != null) {
            addToMarker({lat: data.properties.lat, lng: data.properties.lon})
        }
    }, 'toAddress');
    initOrdersMap();
    toInput = document.getElementById('toAddress');
    fromInput = document.getElementById('fromAddress');
}

function addNewOrder() {
    const sNameTextbox = document.getElementById('sender_name');
    const sSurnameTextbox = document.getElementById('sender_surname');
    const rNameTextbox = document.getElementById('recipient_name');
    const rSurnameTextbox = document.getElementById('recipient_surname');
    const pWeightTextbox = document.getElementById('pweight');
    const fromAddressTextbox = document.getElementById('fromAddress');
    const toAddressTextbox = document.getElementById('toAddress');
    const fromLatTextbox = document.getElementById('fromLatCoords');
    const fromLngTextbox = document.getElementById('fromLngCoords');
    const toLatTextbox = document.getElementById('toLatCoords');
    const toLngTextbox = document.getElementById('toLngCoords');

    const newOrder = {
        sender: sNameTextbox.value.trim() + " " + sSurnameTextbox.value.trim(),
        recipient: rNameTextbox.value.trim() + " " + rSurnameTextbox.value.trim(),
        pickupAddress: fromAddressTextbox.value.trim(),
        deliveryAddress: toAddressTextbox.value.trim(),
        packageWeight: parseFloat(pWeightTextbox.value.trim()),
        pickupLat: parseFloat(fromLatTextbox.value),
        pickupLng: parseFloat(fromLngTextbox.value),
        deliveryLat: parseFloat(toLatTextbox.value),
        deliveryLng: parseFloat(toLngTextbox.value)
    };

    addOrder(newOrder, (response) => {
        if (response.status === 400) {
            response.json().then(json => toastr.error("Error: " + JSON.stringify(json)));
            return;
        }
        sNameTextbox.value = '';
        sSurnameTextbox.value = '';
        rNameTextbox.value = '';
        rSurnameTextbox.value = '';
        fromAddressTextbox.value = '';
        fromLatTextbox.value = '';
        fromLngTextbox.value = '';
        toAddressTextbox.value = '';
        toLatTextbox.value = '';
        toLngTextbox.value = '';
        pWeightTextbox.value = 1;
        fromInput.value = '';
        toInput.value = '';
        toastr.success("New order successfully added.");
        clearNewOrderMap();
        onHandButtonClick();
        addMapEventHandlers();
    });
}

function onHandButtonClick() {
    if (!handButton.classList.contains('btn-primary')) {
        textButton.classList.remove('btn-primary');
        textButton.classList.add('btn-secondary');
        handButton.classList.remove('btn-secondary');
        handButton.classList.add('btn-primary');
    }
    
    addMapEventHandlers();
    
    toInput.setAttribute('disabled', 'true');
    fromInput.setAttribute('disabled', 'true');
    toRadio.removeAttribute('disabled');
    fromRadio.removeAttribute('disabled');
}

function onTextButtonClick() {
    if (!textButton.classList.contains('btn-primary')) {
        handButton.classList.remove('btn-primary');
        handButton.classList.add('btn-secondary');
        textButton.classList.remove('btn-secondary');
        textButton.classList.add('btn-primary');
    }
    clearNewOrderMap();
    toInput.removeAttribute('disabled');
    fromInput.removeAttribute('disabled');
    toRadio.setAttribute('disabled', 'true');
    fromRadio.setAttribute('disabled', 'true');
}

function addFromMarker(position) {
    if (fromMarker) {
        fromMarker.setLatLng(position);
    }
    else{
        fromMarker = new L.marker(position, markerSettings).addTo(ordersMap);
        fromMarker.bindPopup(popupTexts.from, popupSettings).openPopup();
        fromMarker.on('move', addPolyline);
        addPolyline();
    }
    getAddressFromCoords(position.lat, position.lng, fromInput);
    setPickupCoords(position.lat, position.lng);
}

function addToMarker(position) {
    if (toMarker) {
        toMarker.setLatLng(position);
    }
    else {
        toMarker = new L.marker(position, markerSettings).addTo(ordersMap);
        toMarker.bindPopup(popupTexts.to, popupSettings).openPopup();
        toMarker.on('move', addPolyline);
        addPolyline();
    }
    getAddressFromCoords(position.lat, position.lng, toInput);
    setDeliveryCoords(position.lat, position.lng);
}

function clearNewOrderMap() {
    if(fromMarker) {
        ordersMap.removeLayer(fromMarker);
        fromMarker = null;
    }
    if(toMarker) {
        ordersMap.removeLayer(toMarker);
        toMarker = null;
    }
    if(polyline) {
        ordersMap.removeLayer(polyline);
        polyline = null;
    }
    ordersMap.off('click');
}

function addPolyline() {
    if (polyline) {
        polyline.setLatLngs([
            fromMarker.getLatLng(),
            toMarker.getLatLng()
        ]);
    }
    else {
        if(toMarker){
            polyline = L.polyline([fromMarker.getLatLng(), toMarker.getLatLng()], { color: 'red' }).addTo(ordersMap);
        }
    }
    if(toMarker) {
        ordersMap.fitBounds(polyline.getBounds());
    }
}

function setPickupCoords(lat, lng) {
    document.getElementById('fromLatCoords').value = lat;
    document.getElementById('fromLngCoords').value = lng;
}

function setDeliveryCoords(lat, lng) {
    document.getElementById('toLatCoords').value = lat;
    document.getElementById('toLngCoords').value = lng;
}

function addMapEventHandlers() {
    addMapEventHandler(ordersMap, 'click', (e) => {
        if (mode === modes.from) {
            addFromMarker(e.latlng);
        }
        if (mode === modes.to) {
            addToMarker(e.latlng);
        }
    });
}
