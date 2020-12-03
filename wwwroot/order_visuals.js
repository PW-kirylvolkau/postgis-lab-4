const handButton = document.getElementById('hand-button');
const textButton = document.getElementById('text-button');
const fromRadio = document.getElementById('fromRadio');
const toRadio = document.getElementById('toRadio');
const locationButton = document.getElementById('location-button');

function onHandButtonClick() {
	if (!handButton.classList.contains('btn-primary')) {
		textButton.classList.remove('btn-primary');
		textButton.classList.add('btn-secondary');
		handButton.classList.remove('btn-secondary');
		handButton.classList.add('btn-primary');
	}
	addMapEventHandlers();
	toInput.setAttribute('disabled', 'true');
	fromInput.setAttribute('disabled', 'true');
	toRadio.removeAttribute('disabled');
	fromRadio.removeAttribute('disabled');
	locationButton.removeAttribute('disabled');
}

function onTextButtonClick() {
	if (!textButton.classList.contains('btn-primary')) {
		handButton.classList.remove('btn-primary');
		handButton.classList.add('btn-secondary');
		textButton.classList.remove('btn-secondary');
		textButton.classList.add('btn-primary');
	}
	clearMap();
	toInput.removeAttribute('disabled');
	fromInput.removeAttribute('disabled');
	toRadio.setAttribute('disabled', 'true');
	fromRadio.setAttribute('disabled', 'true');
	locationButton.setAttribute('disabled', 'true');
}