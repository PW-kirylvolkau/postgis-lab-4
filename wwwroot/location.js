function getCurrentLocation() {
	navigator.geolocation.getCurrentPosition(position => {
		const coords = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		if (mode === modes.from) {
			addFromMarker(coords);
		}
		if (mode === modes.to) {
			addToMarker(coords);
		}
	});
}


function setListOfCountries() {
	axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => response.data)
		.then(countries => {
			let list = document.getElementById('country');
			for (let country of countries) {
				let opt = document.createElement('option');
				opt.appendChild(document.createTextNode(country.name));
				opt.value = country.alpha3Code;
				list.appendChild(opt);
			}
		});
}
