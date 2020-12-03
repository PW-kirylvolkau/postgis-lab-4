//Code to communicate the forms for orders with the backend


const uri = "/api/Orders";

//GET Orders

function getOrders() {
    fetch(uri)
        .then(response => response.json())
        .then(data => tableAddOrders(data))
        .catch(error => console.error('Unable to get orders.', error));
}



//PUT (Update) Orders
function editOrder(id) {
    console.log(id);
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
        editButton.setAttribute('onclick', `editOrder(${order.id})`);
        let td7 = tr.insertCell(6);
        td7.appendChild(editButton);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('class', 'btn btn-danger');
        deleteButton.setAttribute('onclick', `deleteOrder(${order.id})`);
        let td8 = tr.insertCell(7);
        td8.appendChild(deleteButton);
    });
}