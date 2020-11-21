const express = require('express');
const app = express();
const parser = require('body-parser');

const PORT = 3000;

app.use(parser.json());

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
})

app.get('/vehicles', (req, res) => {
	const payload = require('./samples/vehicles.json');
	res.send(payload);
});

app.get('/stations', (req, res) => {
	const payload = require('./samples/stations.json');
	res.send(payload);
});

app.get('/orders', (req, res) => {
	const payload = require('./samples/orders.json');
	res.send(payload);
});

app.get('/orders/:vehicleId', (req, res) => {
	const data = require('./samples/orders.json');
	let payload;
	if(req.params.vehicleId == 1) {
		payload = data.slice(0,2);
	}
	else {
		payload = data.slice(2);
	}
	res.send(payload);
});

app.get('/code_samples/:fileName', (req, res) => {
	res.sendFile(`${__dirname}/code_samplesа/${req.params.fileName}`);
})

app.listen(PORT, () => {
	console.log('Sample API for Matthew D. Chapman is listening at port ' + PORT);
	console.log(`Address: http://localhost:${PORT}`);
});