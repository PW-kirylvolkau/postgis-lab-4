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


setListOfCountries();
initMaps();
