let cart = [];
let total = 0;

// Función para agregar productos al carrito
function addToCart(product, price) {
    // Busca si el producto ya existe en el carrito
    const existingProduct = cart.find(item => item.product === product);

    if (existingProduct) {
        // Si el producto ya existe, incrementa la cantidad
        existingProduct.quantity += 1;
        existingProduct.price += price; // Actualiza el precio total de ese producto
    } else {
        // Si el producto no existe, lo agrega al carrito con cantidad 1
        cart.push({ product, unitPrice: price, price: price, quantity: 1 });
    }

    // Actualiza el total
    total += price;
    // Muestra el carrito actualizado
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

// Función para mostrar el carrito y el total
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Limpia el contenido previo

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

    // Actualiza el total en el DOM
    document.getElementById('total').textContent = `Total: $${total}`;
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