let map_grl;

function initGeneralMap() {
    map_grl = L.map('map-grl', {
        center: [0, 0],
        zoom: 1
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map_grl);
    L.control.scale().addTo(map_grl);
}

initGeneralMap();