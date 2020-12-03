
//GET orders
function getOrders() {
    /*fetch(uri)
        .then(response => response.json())
        .then(data => tableAddOrders(data))
        .catch(error => console.error('Unable to get orders.', error))*/
}

//POST Orders
function addNewOrder() {
    //All necessary forms
    const senderNameTB = document.getElementById('sender_name');
    const senderSurTB = document.getElementById('sender_surname');
    const weightTB = document.getElementById('pweight');
    const fromLatCoordsTB = document.getElementById('fromLatCoords');
    const fromLngCoordsTB = document.getElementById('fromLngCoords');
    const toLatCoordsTB = document.getElementById('toLatCoords');
    const toLngCoordsTB = document.getElementById('toLngCoords');

    const order = {
        sender: senderNameTB.value.trim() + " " + senderSurTB.value.trim,
        recipient: "Garbage Man",
        pickup_address: fromInput.value.trim(),
        delivery_address: toInput.value.trim(),
        package_weight: parseInt(weightTB.value.trim()),
        pickup_lat: parseInt(fromLatCoordsTB.value.trim()),
        pickup_lng: parseInt(fromLngCoordsTB.value.trim()),
        delivery_lat: parseInt(toLatCoordsTB.value.trim()),
        delivery_lng: parseInt(toLngCoordsTB.value.trim())
    }

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(() => {
            senderNameTB.value = '';
            senderSurTB.value = '';
            pickup_address.value = '';
            delivery_address.value = '';
            package_weight.value = 1;
        })
        .catch(error => console.error('Unable to add order.', error));
}

function displayEditForm(id) {
    const order = orders.find(order => order.id === id);
    
}

//DELETE Orders
function deleteOrder(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getOrders())
        .catch(error => console.error('Unable to delete order.', error));
}

//Function to display orders on table in General Tab
function tableAddOrders(data) {
    const tBody = document.getElementById('orderTable');
    tBody.innerHTML = '';

    const button = document.createElement('button');
    let textNode;

    data.forEach(order => {

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        textNode = document.createTextNode(order.id);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        textNode = document.createTextNode(order.sender);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        textNode = document.createTextNode(order.recipient);
        td3.appendChild(textNode);

        let td4 = tr.insertCell(3);
        textNode = document.createTextNode(order.pickup_address);
        td4.appendChild(textNode);

        let td5 = tr.insertCell(4);
        textNode = document.createTextNode(order.delivery_address);
        td5.appendChild(textNode);

        let td6 = tr.insertCell(5);
        textNode = document.createTextNode(order.package_weight);
        td6.appendChild(textNode);

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        //editButton.setAttribute('onclick');
        let td7 = tr.insertCell(6);
        td7.appendChild(editButton);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        //Add event listener
        let td8 = tr.insertCell(7);
        td8.appendChild(deleteButton);
    });

    //allOrders = data;
}