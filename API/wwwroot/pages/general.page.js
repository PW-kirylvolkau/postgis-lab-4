let generalMap;
let lines = [];
let markers = [];
let vehiclesAll = [];
let orders = [];
let currentOrder;
const initGeneralMap = () => initMap('map-general');
const orderTable = document.getElementById("orderTable");

const colors = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

const randomColor = () => {
    const keys = Object.keys(colors);
    return colors[keys[ keys.length * Math.random() << 0]];
};

function initGeneralPage() {
    addressAutocomplete(document.getElementById("autocomplete-container-pickup-edit"), (data) => {
        console.log("Selected option: ");
        console.log(data);
        if (data != null) {
            document.getElementById('pickup-Lat-edit').value = data.properties.lat;
            document.getElementById('pickup-Lon-edit').value = data.properties.lon;
            console.log("From Address - Lat: " + data.properties.lat + ", Lon:" + data.properties.lon);
        }
    }, 'pickupAddress-edit');

    document.getElementById('pickupAddress-edit').disabled = false;

    addressAutocomplete(document.getElementById("autocomplete-container-delivery-edit"), (data) => {
        console.log("Selected option: ");
        console.log(data);
        if (data != null) {
            document.getElementById('delivery-Lat-edit').value = data.properties.lat;
            document.getElementById('delivery-Lon-edit').value = data.properties.lon;
            console.log("From Address - Lat: " + data.properties.lat + ", Lon:" + data.properties.lon);
        }
    }, 'deliveryAddress-edit');

    document.getElementById('deliveryAddress-edit').disabled = false;
    generalMap = initGeneralMap();
    updateGeneralPage();
}

function displayRoutes() {
    getVehicles(addRoutesToMap);
}

function addRoutesToMap(vehicles) {
    vehiclesAll = vehicles;
    setOrdersTable();
    clearMap();
    for(const vehicle of vehicles) {
        const stationMarker = L.marker([vehicle.station.lat, vehicle.station.lng])
            .bindPopup(`Station ${vehicle.station.id}`)
            .openPopup();
        stationMarker.addTo(generalMap);
        markers.push(stationMarker);
        let routes = [
            [
                vehicle.station.lat,
                vehicle.station.lng
            ]
        ];
        for(const route of vehicle.routes)
        {
            const order = route.order;
            const pickupMarker = L.marker([order.pickupLat, order.pickupLng])
                .bindPopup(`<b>Pickup order ${order.id}</b><br>I am a popup.`).openPopup();
            const deliveryMarker = L.marker([order.deliveryLat, order.deliveryLng])
                .bindPopup(`<b>Delivery order ${order.id}</b><br>I am a popup.`).openPopup();
            
            markers.push(pickupMarker, deliveryMarker);

            pickupMarker.addTo(generalMap);
            deliveryMarker.addTo(generalMap);
            routes.push([order.pickupLat, order.pickupLng] , [order.deliveryLat, order.deliveryLng]);
        }
        routes.push([vehicle.station.lat, vehicle.station.lng]);
        const pl = L.polyline(routes, {color: randomColor()}).addTo(generalMap);
        lines.push(pl);
    }
}

function clearMap() {
    for(let marker of markers) {
        marker.remove();
    }
    markers = [];
    for(let line of lines) {
        line.remove();
    }
    lines = [];
}

function updateGeneralPage() {
    displayRoutes();
}

function setOrdersTable() {
    getAllOrders((orders) => {
        orderTable.innerHTML = '';
        for(const order of orders) {
            const row = document.createElement("tr");
            const id = document.createElement("td");
            const sender = document.createElement("td");
            const recipient = document.createElement("td");
            const pickup = document.createElement("td");
            const weight = document.createElement("td");
            const delivery = document.createElement("td");
            const vehicleId = document.createElement("td");
            const stationId = document.createElement("td");
            const delButton = document.createElement("td");
            const updButton = document.createElement("td");
            
            id.innerText = order.id;
            sender.innerText = order.sender;
            recipient.innerText = order.recipient;
            pickup.innerText = order.pickupAddress;
            delivery.innerText = order.deliveryAddress;
            weight.innerText = order.packageWeight;
            let vid;
            let sid;
            for(const v of vehiclesAll) {
                for(const r of v.routes) {
                    if(r.order.id === order.id) {
                        vid = v.id;
                        sid = v.station.id;
                        break;
                    }
                }
                if(vid) {
                    break;
                }
            }
            
            vehicleId.innerText = vid ?? '-';
            stationId.innerText = sid ?? '-';
            
            const del = document.createElement("button");
            del.innerText = "Delete";
            del.classList.add("btn", "btn-danger", "m-3");
            del.addEventListener('click', (e) => {
                deleteOrder(order.id, updateGeneralPage);
            });
            delButton.appendChild(del);

            const upd = document.createElement("button");
            upd.innerText = "Update";
            upd.classList.add("btn", "btn-warning", "m-3");
            upd.addEventListener('click', () => displayEditForm(order));
            updButton.appendChild(upd);
            
            row.appendChild(id);
            row.appendChild(sender);
            row.appendChild(recipient);
            row.appendChild(pickup);
            row.appendChild(delivery);
            row.appendChild(weight);
            row.appendChild(vehicleId);
            row.appendChild(stationId);
            row.appendChild(updButton);
            row.appendChild(delButton);
            
            row.addEventListener('click', () => {
                setCurrentOrder(order);
            })
            
            orderTable.appendChild(row);
        }
    })
}

function displayEditForm(currentOrder) {
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

function updateOrderFromMenu() {
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

    updateOrder(newOrder, (res) => {
        if(res.status === 400) {
            toastr.error("Unable to update order");
            return;
        }
        updateGeneralPage();
    })
    closeInput();
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function displayOrderView() {
    document.getElementById("sender-content").innerText = currentOrder.sender;
    document.getElementById("recipient-content").innerText = currentOrder.recipient;
    document.getElementById("pickup-content").innerText = currentOrder.pickupAddress;
    document.getElementById("delivery-content").innerText = currentOrder.deliveryAddress;
    document.getElementById("package-content").innerText = currentOrder.packageWeight;
}

function setCurrentOrder(order) {
    currentOrder = order;
    document.getElementById("order-list-tab").innerText = order.id;
}