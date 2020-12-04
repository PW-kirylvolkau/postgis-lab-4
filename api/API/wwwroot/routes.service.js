function displayRoutes() {
    map_grl.eachLayer((layer) => {
        layer.remove();
    });
    initGeneralMap();
    fetch('api/vehicle')
        .then(res => res.json())
        .then(json => {
            for(const vehicle in json) {
                L.marker([vehicle.station.lat, vehicle.station.lng]).addTo(map_grl);
                let routes = [
                    vehicle.station.lat, 
                    vehicle.station.lng
                ];
                for(const route in vehicle.routes)
                {
                    const order = route.order;
                    const pickupMarker = L.marker([order.pickupLat, order.pickupLng])
                        .bindPopup(`<b>Pickup order ${order.id}</b><br>I am a popup.`).openPopup(); 
                    const deliveryMarker = L.marker([order.deliveryLat, order.deliveryLng])
                        .bindPopup(`<b>Delivery order ${order.id}</b><br>I am a popup.`).openPopup();
                    
                    pickupMarker.addTo(map_grl);
                    deliveryMarker.addTo(map_grl);
                    routes.push(order.pickupLat, order.pickupLng,order.deliveryLat, order.deliveryLng);
                }
                routes.push(vehicle.station.lat, vehicle.station.lng);
                L.polyline(routes, {color: 'red'}).addTo(map_grl);
            }
        })
        .catch(console.log);
}