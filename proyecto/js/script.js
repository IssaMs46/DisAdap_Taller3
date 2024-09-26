let cart = [];
let total = 0;

// Función para agregar productos al carrito
function addToCart(product, price) {
    const existingProduct = cart.find(item => item.product === product);

    if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.price += price;
    } else {
        cart.push({ product, unitPrice: price, price: price, quantity: 1 });
        toggleQuantityControls(product); // Muestra los botones de + y - y oculta "Agregar al Carrito"
    }

    total += price;
    updateQuantityDisplay(product);
    displayCart();
}

// Función para eliminar productos del carrito

function removeFromCart(index) {
    const product = cart[index];

    if (product.quantity > 1) {
        // Si hay más de un producto, reduce la cantidad y el precio total
        product.quantity -= 1;
        product.price -= product.unitPrice;
    } else {
        // Si solo hay uno, lo elimina del carrito
        cart.splice(index, 1);
    }

    // Actualiza el total
    total -= product.unitPrice;
    // Muestra el carrito actualizado
    displayCart();
}
// Función para eliminar productos del carrito desde la galería
function removeFromCartInGallery(product, price) {
    const productIndex = cart.findIndex(item => item.product === product);

    if (productIndex > -1) {
        const existingProduct = cart[productIndex];
        if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
            existingProduct.price -= price;
        } else {
            // Elimina el producto si solo queda uno y vuelve a mostrar el botón de "Agregar al Carrito"
            cart.splice(productIndex, 1);
            toggleAddButton(product);
        }
        total -= price;
        updateQuantityDisplay(product);
        displayCart();
    }
}
// Función para mostrar el carrito y el total
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <p>${item.product} - $${item.price} (${item.quantity})</p>
                <button onclick="addToCart('${item.product}', ${item.unitPrice})">Añadir</button>
                <button onclick="removeFromCart(${index})">Quitar</button>
            `;
            cartItemsDiv.appendChild(cartItem);
        });
    }

    document.getElementById('total').textContent = `Total: $${total}`;

    // Después de actualizar el carrito, sincronizamos la galería
    syncGalleryWithCart();
}
function syncGalleryWithCart() {
    // Recorre los productos en el carrito y actualiza sus contadores en la galería
    const products = ['Estadía', 'Tours', 'Rentar Carro', 'Masajes', 'Mejora de Habitación'];

    products.forEach(product => {
        const productInCart = cart.find(item => item.product === product);
        const quantitySpan = document.getElementById(`${product}-quantity`);

        if (productInCart) {
            quantitySpan.textContent = productInCart.quantity;  // Actualiza el contador en la galería
            toggleQuantityControls(product);  // Muestra + y - si está en el carrito
        } else {
            quantitySpan.textContent = 0;  // Reinicia el contador si no está en el carrito
            toggleAddButton(product);  // Vuelve a mostrar "Agregar al Carrito" si no está en el carrito
        }
    });
}
// Función para mostrar los controles de cantidad (+ y -) y ocultar el botón "Agregar al Carrito"
function toggleQuantityControls(product) {
    const addButton = document.getElementById(`${product}-add`);
    const controls = document.getElementById(`${product}-controls`);

    if (addButton && controls) {
        addButton.style.display = 'none';  // Oculta el botón "Agregar al Carrito"
        controls.style.display = 'flex';   // Muestra los controles de cantidad
    }
}
// Función para actualizar el contador de la cantidad en la galería
function updateQuantityDisplay(product) {
    const productInCart = cart.find(item => item.product === product);
    const quantitySpan = document.getElementById(`${product}-quantity`);
    if (productInCart) {
        quantitySpan.textContent = productInCart.quantity;
    } else {
        quantitySpan.textContent = 0;
    }
}
// Función para mostrar el botón "Agregar al Carrito" si se eliminan todos los productos
function toggleAddButton(product) {
    const addButton = document.getElementById(`${product}-add`);
    const controls = document.getElementById(`${product}-controls`);

    if (addButton && controls) {
        addButton.style.display = 'block';  // Muestra el botón "Agregar al Carrito"
        controls.style.display = 'none';    // Oculta los controles de cantidad
    }
}
// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    const gallerySection = document.getElementById('gallery-section');

    if (cartSection.style.display === 'none' || cartSection.style.display === '') {
        cartSection.style.display = 'block';
        gallerySection.style.display = 'none';
    } else {
        cartSection.style.display = 'none';
        gallerySection.style.display = 'flex';
    }
}
function sendWhatsAppMessage() {
    // Define el número de teléfono
    const phoneNumber = '+573003298265';
    // Define el mensaje que quieres enviar
    const message = 'Hola Hotel Pegazuleco! estoy interesado en comprar los siguientes productos: ' + cart.map(item => `${item.product} - $${item.price}`).join(', ') + `. Total: $${total}`;
    // Crea la URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Abre WhatsApp en una nueva pestaña
    window.open(whatsappUrl, '_blank');
}