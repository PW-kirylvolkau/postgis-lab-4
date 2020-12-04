//Code to communicate the forms for orders with the backend


const uri = "/api/Orders";
let allOrders = [];
//GET Orders

function getOrders() {
    fetch(uri)
        .then(response => response.json())
        .then(data => tableAddOrders(data))
        .catch(error => console.error('Unable to get orders.', error));
}

//GET Order from id

function getOrder(id) {
    fetch(`${uri}/${id}`)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => console.error('Unable to get order.', error));
}

//POST Orders
function addNewOrder() {
    //All necessary forms
    const sNameTextbox = document.getElementById('sender_name');
    const sSurnameTextbox = document.getElementById('sender_surname');
    const rNameTextbox = document.getElementById('recipient_name');
    const rSurnameTextbox = document.getElementById('recipient_surname');
    const pWeightTextbox = document.getElementById('pweight');
    const fromAddressTextbox = document.getElementById('fromAddress');
    const toAddressTextbox = document.getElementById('toAddress');
    const fromLatTextbox = document.getElementById('fromLatCoords');
    const fromLngTextbox = document.getElementById('fromLngCoords');
    const toLatTextbox = document.getElementById('toLatCoords');
    const toLngTextbox = document.getElementById('toLngCoords');
    //Validation here

    const newOrder = {
        sender: sNameTextbox.value.trim() + " " + sSurnameTextbox.value.trim(),
        recipient: rNameTextbox.value.trim() + " " + rSurnameTextbox.value.trim(),
        pickupAddress: fromAddressTextbox.value.trim(),
        deliveryAddress: toAddressTextbox.value.trim(),
        packageWeight: parseFloat(pWeightTextbox.value.trim()),
        pickupLat: parseFloat(fromLatTextbox.value.trim()),
        pickupLng: parseFloat(fromLngTextbox.value.trim()),
        deliveryLat: parseFloat(toLatTextbox.value.trim()),
        deliveryLng: parseFloat(toLngTextbox.value.trim())
    };
    //console.log(newOrder);

    console.log(JSON.stringify(newOrder));

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
    })
        .then(() => {
            getOrders();
            sNameTextbox.value = '';
            sSurnameTextbox.value = '';
            rNameTextbox.value = '';
            rSurnameTextbox.value = '';
            fromAddressTextbox.value = '';
            fromLatTextbox.value = '';
            fromLngTextbox.value = '';
            toAddressTextbox.value = '';
            toLatTextbox.value = '';
            toLngTextbox.value = '';
            pWeightTextbox.value = 1;
        })
        .catch(error => console.error('Unable to add order.', error));
    addListItems();
}


//Display the edit form
function displayEditForm(id) {
    const currentOrder = allOrders.find(order => order.id === id);
    console.log(currentOrder);
    document.getElementById('edit-id').value = currentOrder.id;
    document.getElementById('sender-fname-edit').value = currentOrder.sender;
    document.getElementById('recipient-fname-edit').value = currentOrder.recipient;
    document.getElementById('pickupAddress-edit').value = currentOrder.pickupAddress;
    document.getElementById('pickup-Lat-edit').value = currentOrder.pickupLat;
    document.getElementById('pickup-Lon-edit').value = currentOrder.pickupLng;
    document.getElementById('deliveryAddress-edit').value = currentOrder.deliveryAddress
    document.getElementById('delivery-Lat-edit').value = currentOrder.deliveryLat;
    document.getElementById('delivery-Lon-edit').value = currentOrder.deliveryLng;
    document.getElementById('packageWeight-edit').value = currentOrder.packageWeight;
    document.getElementById('editForm').style.display = "block";

}
//PUT (Update) Orders
function updateOrder() {
    const orderId = parseInt(document.getElementById('edit-id').value.trim(), 10);
    const newOrder = {
        id: orderId,
        sender: document.getElementById('sender-fname-edit').value.trim(),
        recipient: document.getElementById('recipient-fname-edit').value.trim(),
        pickupAddress: document.getElementById('pickupAddress-edit').value.trim(),
        deliveryAddress: document.getElementById('deliveryAddress-edit').value.trim(),
        packageWeight: parseFloat(document.getElementById('packageWeight-edit').value.trim()),
        pickupLat: parseFloat(document.getElementById('pickup-Lat-edit').value.trim()),
        pickupLng: parseFloat(document.getElementById('pickup-Lon-edit').value.trim()),
        deliveryLat: parseFloat(document.getElementById('delivery-Lat-edit').value.trim()),
        deliveryLng: parseFloat(document.getElementById('delivery-Lon-edit').value.trim())
    };

    fetch(`${uri}/${orderId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
    })
        .then(() => getOrders())
        .catch(error => console.error('Unable to update order.', error));
    closeInput();
}

//Close edit form 
function closeInput() {
    document.getElementById('editForm').style.display = 'none';
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
        textNode = document.createTextNode(order.pickupAddress);
        td4.appendChild(textNode);

        let td5 = tr.insertCell(4);
        textNode = document.createTextNode(order.deliveryAddress);
        td5.appendChild(textNode);

        let td6 = tr.insertCell(5);
        textNode = document.createTextNode(order.packageWeight);
        td6.appendChild(textNode);

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('class', 'btn btn-primary');
        editButton.setAttribute('onclick', `displayEditForm(${order.id})`);
        let td7 = tr.insertCell(6);
        td7.appendChild(editButton);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('class', 'btn btn-danger');
        deleteButton.setAttribute('onclick', `deleteOrder(${order.id})`);
        let td8 = tr.insertCell(7);
        td8.appendChild(deleteButton);
    });
    allOrders = data;
    addListItems();
}