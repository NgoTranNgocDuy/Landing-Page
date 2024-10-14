// Initialize an empty cart
let cart = {};
// Function to add a product to the cart
function addToCart(id, name, price, imageUrl) {
    // If the product is already in the cart, increment the quantity
    if (cart[id]) {
        cart[id].quantity++;
    } else {
        // Otherwise, add the product to the cart with a quantity of 1
        cart[id] = {
            name: name,
            price: price,
            quantity: 1,
            imageUrl: imageUrl
        };
    }
    displayMessage(`${name} has been added to the cart.\nThere are now ${cart[id].quantity} of this item in the cart.`);
}

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();

        let box = event.target.parentElement;
        let id = box.dataset.id;
        let name = box.querySelector('h3').textContent;
        let price = box.querySelector('.price').textContent.split(' ')[0].slice(1);
        let imageUrl = box.querySelector('img').src;

        addToCart(id, name, price, imageUrl);
        updateCartUI();
    });
});
// Function to display a temporary message on the screen
function displayMessage(message) {
    // Create a new div element for the message and add some css
    let messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.bottom = '50%';
    messageDiv.style.right = '50%';
    messageDiv.style.transform = 'translate(50%, 50%)';
    messageDiv.style.padding = '20px';
    messageDiv.style.fontSize = '30px';
    messageDiv.style.backgroundColor = '#d4edda';
    messageDiv.style.color = '#155724';
    messageDiv.style.border = 'solid 1px #c3e6cb';
    messageDiv.style.borderRadius = '20px';
    messageDiv.style.opacity = '0';
    messageDiv.style.transition = 'opacity 1s';
    messageDiv.style.whiteSpace = 'pre'

    // Add the message div to the body
    document.body.appendChild(messageDiv);

    // Fade in the message div
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 100);

    // Fade out the message div after 1 second
    setTimeout(() => {
        messageDiv.style.opacity = '0';
    }, 3000);

    // Remove the message div after the transition ends
    messageDiv.addEventListener('transitionend', () => {
        if (messageDiv.style.opacity === '0') {
            document.body.removeChild(messageDiv);
        }
    });
}

// Function to remove a product from the cart
function removeFromCart(id) {
    // If the product is in the cart, decrement the quantity
    if (cart[id]) {
        cart[id].quantity--;
        // If the quantity is 0, remove the product from the cart
        if (cart[id].quantity === 0) {
            delete cart[id];
        }
    }
}
// Function to calculate the total price of the cart
function calculateTotal() {
    let total = 0;
    for (let id in cart) {
        let item = cart[id];
        total += item.price * item.quantity;
    }
    return total;
}

// Update the cart UI
function updateCartUI() {
    let container = document.querySelector('.cart-items-container .cart-item');
    container.innerHTML = '';

    for (let id in cart) {
        let item = cart[id];
        // Create a new div element for the cart item and add some css
        let div = document.createElement('div');
        div.className = 'cart-item';
        div.style.display = 'flex';
        div.style.alignItems = 'center';

        // Create an image element for the product image and add some css
        let img = document.createElement('img');
        img.src = item.imageUrl;
        img.style.width = '50px';
        img.style.height = '50px';

        // Create a span element for the remove button and add some css
        let span = document.createElement('span');
        span.className = 'fas fa-times';
        span.addEventListener('click', () => {
            removeFromCart(id);
            updateCartUI();
        });

        // Create a span element for the product name and price
        let nameSpan = document.createElement('span');
        nameSpan.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        nameSpan.style.fontSize = '15px'; 
        nameSpan.style.marginLeft = '10px'; 
        div.append(img);
        div.append(span);
        div.append(nameSpan);
        container.append(div);
    }

    // Calculate and display the total price and add some css
    let total = calculateTotal();
    let totalDiv = document.createElement('div');
    totalDiv.style.display = 'flex';
    totalDiv.style.justifyContent = 'center';
    totalDiv.style.marginTop = '100px';
    totalDiv.style.padding = '10px';
    totalDiv.style.backgroundColor = '#0f7309'
    totalDiv.style.border = '1px solid #ced4da';
    totalDiv.style.borderRadius = '5px'; 
    totalDiv.style.fontSize = '20px';
    totalDiv.style.fontWeight = 'bold'; 
    totalDiv.style.color = 'white'; 
    totalDiv.textContent = `Total Price: $${total.toFixed(2)}`;
    container.append(totalDiv);
}