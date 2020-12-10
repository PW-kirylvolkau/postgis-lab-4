// Functions for initializing the form and other important variables
const modes = {
	from: 'from',
	to: 'to'
}

let mymap;
let fromMarker;
let toMarker;
let polyline;
let mode = modes.from;
const toInput = document.getElementById('toAddress');
const fromInput = document.getElementById('fromAddress');
const pickup_lat_tb = document.getElementById('fromLatCoords');
const pickup_lng_tb = document.getElementById('fromLngCoords');
const delivery_lat_tb = document.getElementById('toLatCoords');
const delivery_lng_tb = document.getElementById('toLngCoords');

initGeneralPage();
initAdminPage();
//initMaps();
