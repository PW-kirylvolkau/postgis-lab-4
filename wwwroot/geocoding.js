const API_KEY = '6e0c42918a7c4b2abf4fda5da1a448b0'

function getAddresFromCoords(lat, long, DOMNode) {
	axios
		.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&lang=en&limit=1&apiKey=${API_KEY}`)
		.then(response => response.data.features)
		.then(data => data[0])
		.then(data => data.properties)
		.then(data => {
			DOMNode.value = data.address_line1 + ' ' + data.address_line2;

		})
		.catch(() => {
			DOMNode = '';
			alert('Please, provide correct address.');
		});
}


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