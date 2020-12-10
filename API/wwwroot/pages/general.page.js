let generalMap;
const initGeneralMap = () => initMap('map-general', generalMap);

function initGeneralPage() {
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