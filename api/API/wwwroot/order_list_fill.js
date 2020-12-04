

//Adding orders to a list of selectable items
//Necessary interaction between a function that gets items from DB
function addListItems() {
    const list_view = document.getElementById('order-list-tab');
    allOrders.forEach(order => {
        let order_tab = document.createElement('a');
        order_tab.setAttribute('class', 'list-group-item');
        order_tab.setAttribute('id', `list-order-${order.id}`);
        order_tab.setAttribute('data-toggle', 'list');
        order_tab.setAttribute('role', 'tab');
        order_tab.setAttribute('aria-controls', `order${order.id}`);
        order_tab.innerHTML = "#" + order.id+ " "+order.sender;
        //Function to display map points after clicking on the order
        order_tab.addEventListener("onclick", function () {

        });
        list_view.appendChild(order_tab);
    });
}


//function for viewing order
function displayOrderView() {
    document.getElementById('error-message').style.display = "block";
    const list = document.getElementById('order-list-tab').getElementsByTagName('a');
    for (i = 0; i < list.length; i++) {
        if (list[i].getAttribute('class').indexOf('active') !== -1) {
            document.getElementById('error-message').style.display = "none";
            let stringArr = list[i].getAttribute('id').split("-"); 
            console.log(stringArr);
            let order = getOrder(parseInt(stringArr[2],10));
            document.getElementById('sender-content').innerHTML = order.sender;
            document.getElementById('recipient-content').innerHTML = order.recipient;
            document.getElementById('pickup-content').innerHTML = order.pickupAddress;
            document.getElementById('delivery-content').innerHTML = order.deliveryAddress;
            document.getElementById('package-content').innerHTML = order.packageWeight;
            break;
        }
    }

}
