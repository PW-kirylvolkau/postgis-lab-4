let generalMap;
let lines = [];
let markers = [];
const initGeneralMap = () => initMap('map-general');

const colors = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

const randomColor = () => {
    const keys = Object.keys(colors);
    return colors[keys[ keys.length * Math.random() << 0]];
};

function initGeneralPage() {
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
    generalMap = initGeneralMap();
    displayRoutes();
}

function displayRoutes() {
    getVehicles(addRoutesToMap);
}

function addRoutesToMap(vehicles) {
    clearMap();
    for(const vehicle of vehicles) {
        const stationMarker = L.marker([vehicle.station.lat, vehicle.station.lng])
            .bindPopup(`Station ${vehicle.station.id}`)
            .openPopup();
        stationMarker.addTo(generalMap);
        markers.push(stationMarker);
        let routes = [
            [
                vehicle.station.lat,
                vehicle.station.lng
            ]
        ];
        for(const route of vehicle.routes)
        {
            const order = route.order;
            const pickupMarker = L.marker([order.pickupLat, order.pickupLng])
                .bindPopup(`<b>Pickup order ${order.id}</b><br>I am a popup.`).openPopup();
            const deliveryMarker = L.marker([order.deliveryLat, order.deliveryLng])
                .bindPopup(`<b>Delivery order ${order.id}</b><br>I am a popup.`).openPopup();
            
            markers.push(pickupMarker, deliveryMarker);

            pickupMarker.addTo(generalMap);
            deliveryMarker.addTo(generalMap);
            routes.push([order.pickupLat, order.pickupLng] , [order.deliveryLat, order.deliveryLng]);
        }
        routes.push([vehicle.station.lat, vehicle.station.lng]);
        const pl = L.polyline(routes, {color: randomColor()}).addTo(generalMap);
        lines.push(pl);
    }
}

function clearMap() {
    for(let marker of markers) {
        marker.remove();
    }
    markers = [];
    for(let line of lines) {
        line.remove();
    }
    lines = [];
}
// TODO
function clearOrdersTable() {}
function addRouteToTable(vehicle) {}