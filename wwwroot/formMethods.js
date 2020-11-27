const uri = 'api/Orders';
let orders = [];
/*
function getOrders() {
    fetch(uri)
        .then(response => response.json())
        .then(data => displayOrders(data))
        .catch(error => console.error('Unable to get orders.', error))
}*/

function addOrder() {
    //All necessary forms
    const senderNameTB = document.getElementById('sender_name');
    const senderSurTB = document.getElementById('sender_surname');
    const weightTB = document.getElementById('pweight');

    const order = {
        
    }
}