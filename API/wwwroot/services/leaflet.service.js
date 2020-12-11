function initMap(mapId) {
    const mapVar = L.map(mapId, {
        center: [53.893009, 27.567444],
        zoom: 10
    });
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + MAPBOX_ACCESS_TOKEN, {
        attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mapVar);
    L.control.scale().addTo(mapVar);
    return mapVar;
}

function setMarker(coords, mapVar, text) {
    const marker = new L.marker(coords);
    marker.bindPopup(text).openPopup();
    marker.addTo(mapVar);
    return marker;
}

function addMapEventHandler(mapVar, event, handler) {
    mapVar.on(event, (e) => handler(e));
}