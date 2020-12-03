const markerSettings = {
    draggable: true
};

const popupTexts = {
    from: "<b>From</b><br/>Your package will be picked up here.",
    to: "<b>To</b><br/>Your package will be delivered here."
};

const popupSettings = {
    closeOnClick: false,
    autoClose: false
};

function initMaps() {
	mymap = L.map('mapid').setView([51.505, -0.09], 13);
	addTileLayer();
}

function addTileLayer() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoidm9sa2F1a2lyeWwiLCJhIjoiY2tnazMycDdnMDYxcjJ2bXBua3JrbHU1NiJ9.7_tjscWjgCIkk7CfBkMeNA'
    }).addTo(mymap);
}

function addMapEventHandlers() {
    mymap.on('click', (e) => {
        if (mode === modes.from) {
            addFromMarker(e.latlng);
        }
        if (mode === modes.to) {
            addToMarker(e.latlng);
        }
    });
}

function addFromMarker(position) {
	if (fromMarker) {
		fromMarker.setLatLng(position);
	}
	else{
		fromMarker = new L.marker(position, markerSettings).addTo(mymap);
		fromMarker.bindPopup(popupTexts.from, popupSettings).openPopup();
		fromMarker.on('move', addPolyline);
		addPolyline();
	}
	getAddresFromCoords(position.lat, position.lng, fromInput);
}

function addToMarker(position) {
	if (toMarker) {
		toMarker.setLatLng(position);
	}
	else{
		toMarker = new L.marker(position, markerSettings).addTo(mymap);
		toMarker.bindPopup(popupTexts.to, popupSettings).openPopup();
		toMarker.on('move', addPolyline);
		addPolyline();
	}
	getAddresFromCoords(position.lat, position.lng, toInput);
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
			polyline = L.polyline([fromMarker.getLatLng(), toMarker.getLatLng()], { color: 'red' }).addTo(mymap);
		}
	}
	if(toMarker) {
		mymap.fitBounds(polyline.getBounds());
	}
}

function clearMap() {
	mymap.off('click');
	if(fromMarker) {
		mymap.removeLayer(fromMarker);
		fromMarker = null;
	}
	if(toMarker) {
		mymap.removeLayer(toMarker);
		toMarker = null;
	}
	if(polyline) {
		mymap.removeLayer(polyline);
		polyline = null;
	}
}



