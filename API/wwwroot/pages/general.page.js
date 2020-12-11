let generalMap;
const initGeneralMap = () => initMap('map-general', generalMap);

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
    initGeneralMap();
    displayRoutes();
}

function displayRoutes() {
    if(generalMap) {
        generalMap.eachLayer((layer) => {
            layer.remove();
        });
    }
    initGeneralMap();
    getVehicles(addRoutesToMap);
}

function addRoutesToMap(vehicles) {
    for(const vehicle of vehicles) {
        L.marker([vehicle.station.lat, vehicle.station.lng]).addTo(generalMap);
        let routes = [
            vehicle.station.lat,
            vehicle.station.lng
        ];
        for(const route of vehicle.routes)
        {
            const order = route.order;
            const pickupMarker = L.marker([order.pickupLat, order.pickupLng])
                .bindPopup(`<b>Pickup order ${order.id}</b><br>I am a popup.`).openPopup();
            const deliveryMarker = L.marker([order.deliveryLat, order.deliveryLng])
                .bindPopup(`<b>Delivery order ${order.id}</b><br>I am a popup.`).openPopup();

            pickupMarker.addTo(generalMap);
            deliveryMarker.addTo(generalMap);
            routes.push(order.pickupLat, order.pickupLng,order.deliveryLat, order.deliveryLng);
        }
        routes.push(vehicle.station.lat, vehicle.station.lng);
        L.polyline(routes, {color: 'red'}).addTo(generalMap);
    }
}