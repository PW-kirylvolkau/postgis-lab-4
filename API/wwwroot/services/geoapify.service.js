function getAddressFromCoords(lat, long, DOMNode) {
	fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&lang=en&limit=1&apiKey=${GEOAPIFY_API_KEY}`)
		.then(response => response.json())
		.then(response => response.features)
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