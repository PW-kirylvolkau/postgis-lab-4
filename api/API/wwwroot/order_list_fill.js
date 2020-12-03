

//Adding orders to a list of selectable items
//Necessary interaction between a function that gets items from DB
function addListItems() {
        console.log(allOrders);
        allOrders.forEach(order => {
        let order_tab = document.createElement('a');
        order_tab.setAttribute('class', 'list-group-item');
        order_tab.setAttribute('id', `list-order-${order.Id}`);
        order_tab.setAttribute('data-toggle', 'list');
        order_tab.setAttribute('role', 'tab');
        order_tab.setAttribute('aria-controls', `order${order.Id}`);
        order_tab.innerHTML = "#" + order.Id+ " "+order.sender;
        //Function to display map points after clicking on the order
        order_tab.addEventListener("onclick", function () {

        });
        list_view.appendChild(order_tab);
    });
}


//function for viewing order
function displayOrderView() {
    const p_cont = document.getElementById('popup-content');
    p_cont.innerHTML = "Please Choose an Order from the list.";
    const list = document.getElementById('order-list-tab').getElementsByTagName('a');
    for (i = 0; i < list.length; i++) {
        if (list[i].getAttribute('class').indexOf('active') !== -1) {
            //Access array of items and depending on id or something, display correct info
            p_cont.innerHTML = list[i].getAttribute('id');
            break;
        }
    }
}


addListItems();