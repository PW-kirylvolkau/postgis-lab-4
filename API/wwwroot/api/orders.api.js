function addOrder(payload, callback) {
    fetch(API_ORDERS, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then((response) => {
            callback(response);
        })
        .catch(error => toastr.error(`Error encountered: ${error}`));
}

function getAllOrders(callback) {
    fetch(API_ORDERS)
        .then(response => response.json())
        .then(json => callback(json))
        .catch(error => toastr.error(`Error encountered at some point: ${error}`));
}

function deleteOrder(orderId, callback) {
    fetch(`${API_ORDERS}/${orderId}`, {
        method: 'DELETE'
    })
        .then(() => callback)
        .catch(e => toastr.error(`Error deleting order: ${e}`));
}

function updateOrder(payload, callback) {
    fetch(`${API_ORDERS}/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        callback(response);
    })
        .catch(error => toastr.error(`Can't update order: ${error}`));
}