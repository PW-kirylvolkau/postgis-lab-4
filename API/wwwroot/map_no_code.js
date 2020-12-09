
let map_no;

function initNewOrderMap() {
    map_no = L.map('map-no', {
        center: [0, 0],
        zoom: 2
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        tileSize: 512
    }).addTo(map_no);
    L.control.scale().addTo(map_no);
}
initNewOrderMap();