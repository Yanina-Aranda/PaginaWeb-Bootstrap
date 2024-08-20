//Formulario, Validacion y Modal de alerta
document.getElementById("contactForm").addEventListener("submit", function (event) {
    // Validación del formulario
    if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        this.classList.add('was-validated');
    } else {
        event.preventDefault(); // Evita el envío real del formulario

        // Muestra el modal de alerta
        var alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
        alertModal.show();

        // Restablece el formulario después de mostrar el modal
        this.reset();
        this.classList.remove('was-validated'); // Eliminar clase de validación para restablecer el estado del formulario
    }
});

// Función para agregar un producto al carrito
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Mostrar el modal de confirmación
    var cartConfirmationModal = new bootstrap.Modal(document.getElementById('cartConfirmationModal'));
    cartConfirmationModal.show();
}

// Función para abrir el modal del carrito y mostrar los productos
function openCart() {
    // Mostrar los productos del carrito en el modal
    displayCartItems();

    // Mostrar el modal del carrito
    var cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartCount').innerText = cart.length;
}

// Función para mostrar los productos en el modal del carrito
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        let li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${item.name} - $${item.price} <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItems.appendChild(li);
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Agregar más productos
document.getElementById('btn-cargar-mas').addEventListener('click', function () {
    const masProductos = [
        {
            img: './img/cake.jpg',
            alt: 'Pastel de Limón',
            title: 'Pastel de Limón',
            text: 'Delicioso pastel con sabor a limón.',
            price: 9,
        },
        {
            img: './img/cake.jpg',
            alt: 'Pastel Red Velvet',
            title: 'Pastel Red Velvet',
            text: 'Pastel clásico Red Velvet con glaseado de queso crema.',
            price: 11,
        },
        {
            img: './img/cake.jpg',
            alt: 'Pastel Red Velvet',
            title: 'Pastel Red Velvet',
            text: 'Pastel clásico Red Velvet con glaseado de queso crema.',
            price: 11,
        },
        {
            img: './img/cake.jpg',
            alt: 'Pastel Red Velvet',
            title: 'Pastel Red Velvet',
            text: 'Pastel clásico Red Velvet con glaseado de queso crema.',
            price: 11,
        },
        // Puedes agregar más productos aquí
    ];

    const contenedor = document.getElementById('produc');

    masProductos.forEach(producto => {
        const productHtml = `
            <div class="col-md-6 col-lg-3">
                <div class="card mb-4">
                    <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">${producto.text}</p>
                        <button class="btn btn-success addToCart" data-name="${producto.title}" data-price="${producto.price}">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.insertAdjacentHTML('beforeend', productHtml);
    });

    document.getElementById('produc').addEventListener('click', function (event) {
        if (event.target.classList.contains('addToCart')) {
            const name = event.target.getAttribute('data-name');
            const price = event.target.getAttribute('data-price');
            addToCart(name, price);
        }
    });
    this.style.display = 'none';// Ocultar el botón
});

// Event listener para agregar productos al carrito
document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        addToCart(name, price);
    });
});

// Mostrar los productos del carrito al abrir el modal
document.getElementById('cartModal').addEventListener('show.bs.modal', displayCartItems);

// Actualizar el contador del carrito al cargar la página
updateCartCount();
