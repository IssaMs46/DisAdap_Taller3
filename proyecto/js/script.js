let cart = [];

function addToCart(product) {
    // Agrega el producto al carrito
    cart.push(product);
    // Actualiza el DOM
    displayCart();
}

function removeFromCart(index) {
    // Elimina el producto del carrito por índice
    cart.splice(index, 1);
    // Actualiza el DOM
    displayCart();
}

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Limpia el carrito antes de volver a mostrarlo

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <p>${item}</p>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartDiv.appendChild(cartItem);
        });
    }
}