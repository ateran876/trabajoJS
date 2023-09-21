let productos = [
    {
        "id": "Iphone1",
        "titulo": "Iphone 11",
        "imagen": "./img/iphones/11.png",
        "categoria": {
            "nombre": "Iphone",
            "id": "iphone"
        },
        "precio": 150000
    },
    {
        "id": "abrigo-02",
        "titulo": "Iphone 12",
        "imagen": "./img/iphones/12.png",
        "categoria": {
            "nombre": "Iphone",
            "id": "iphone"
        },
        "precio": 435000
    },
    {
        "id": "Iphone3",
        "titulo": "Iphone 13",
        "imagen": "./img/iphones/13.png",
        "categoria": {
            "nombre": "Iphone",
            "id": "iphone"
        },
        "precio": 550000
    },

    {
        "id": "Iphone4",
        "titulo": "Iphone 14",
        "imagen": "./img/iphones/14.png",
        "categoria": {
            "nombre": "Iphone",
            "id": "iphone"
        },
        "precio": 750000
    },
    {
        "id": "ipad1",
        "titulo": "Ipad 9na",
        "imagen": "./img/ipads/1.png",
        "categoria": {
            "nombre": "Ipad",
            "id": "ipad"
        },
        "precio": 650000
    },
    {
        "id": "ipad2",
        "titulo": "Ipad Mini",
        "imagen": "./img/ipads/2.png",
        "categoria": {
            "nombre": "Ipad",
            "id": "ipad"
        },
        "precio": 755000
    },
    {
        "id": "ipad3",
        "titulo": "Ipad Pro",
        "imagen": "./img/ipads/3.png",
        "categoria": {
            "nombre": "Ipad",
            "id": "ipad"
        },
        "precio": 975000
    },
    {
        "id": "applewacht1",
        "titulo": "Apple Wacht SE",
        "imagen": "./img/wachts/1.png",
        "categoria": {
            "nombre": "Apple Wacht",
            "id": "applewacht"
        },
        "precio": 80000
    },
    {
        "id": "applewacht2",
        "titulo": "Apple Wacht 6",
        "imagen": "./img/wachts/2.png",
        "categoria": {
            "nombre": "Apple Wacht",
            "id": "applewacht"
        },
        "precio": 100000
    },
    {
        "id": "applewacht3",
        "titulo": "Apple Wacht 7",
        "imagen": "./img/wachts/3.png",
        "categoria": {
            "nombre": "Apple Wacht",
            "id": "applewacht"
        },
        "precio": 135000
    },
    {
        "id": "applewacht4",
        "titulo": "Apple Wacht 8",
        "imagen": "./img/wachts/4.png",
        "categoria": {
            "nombre": "Apple Wacht",
            "id": "applewacht"
        },
        "precio": 160000
    },
];

// let productos = [];

fetch("productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #777777, #777777)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}