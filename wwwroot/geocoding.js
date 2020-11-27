const API_KEY = '6e0c42918a7c4b2abf4fda5da1a448b0'




function getCountryCoords(countrName) {
	axios
		.get(`https://api.geoapify.com/v1/geocode/search?text=${countryName}&limit=1&type=country&apiKey=${API_KEY}`)
		.then(response => response.data.features)

		.then(data => data[0])
		.then(data => data.properties)
		.then(data => {
			mymap.setView([data.lat, data.lon], 4);
		});
}