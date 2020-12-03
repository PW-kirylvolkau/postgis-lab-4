

class listItem {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
    }
}

let items = [];
items.push(new listItem(1, "First Order", "over there"));
items.push(new listItem(2, "Second Order", "over here"));
items.push(new listItem(3, "Third Order", "everywhere"));
items.push(new listItem(4, "bru Order", "over there"));
items.push(new listItem(5, "huh Order", "over here"));
items.push(new listItem(6, "you Order", "everywhere"));
items.push(new listItem(7, "me Order", "over there"));
items.push(new listItem(8, "yesyou Order", "over here"));
items.push(new listItem(9, "owshit Order", "everywhere"));

const list_view = document.getElementById('order-list-tab');

function addListItems() {
    items.forEach(order => {
        let order_tab = document.createElement('a');
        order_tab.setAttribute('class', 'list-group-item');
        order_tab.setAttribute('id', `list-order-${order.id}`);
        order_tab.setAttribute('data-toggle', 'list');
        order_tab.setAttribute('role', 'tab');
        order_tab.setAttribute('aria-controls', `order${order.id}`);
        order_tab.innerHTML = "Order: " + order.id;
        list_view.appendChild(order_tab);
    });
}



addListItems();