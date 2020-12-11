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