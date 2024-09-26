let cart = [];
let total = 0;

// Función para agregar productos al carrito
function addToCart(product, price) {
    // Añade el producto y su precio al array del carrito
    cart.push({ product, price });
    // Actualiza el total
    total += price;
    // Muestra el carrito actualizado
    displayCart();
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
    // Resta el precio del producto eliminado del total
    total -= cart[index].price;
    // Remueve el producto del array usando el índice
    cart.splice(index, 1);
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
                <p>${item.product} - $${item.price}</p>
                <button onclick="removeFromCart(${index})">Eliminar</button>
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