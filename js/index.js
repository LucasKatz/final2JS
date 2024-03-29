const d = document,
w = window;
let title = document.getElementById('title');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.logo');
const botonParaSubir = document.querySelector("button");
const nombreUsuario = document.getElementById("usuario");
const contenedor = document.getElementById("contenedorCarpas");





window.addEventListener('scroll', (e) =>{
    // let value = w.scrollY; 
    // title.style.marginTop = value * .7 + 'px';
    // nav.classList.toggle('active', window.scrollY > 0);
    // logo.classList.toggle('active', window.scrollY > 0);
});

// agregar eventos

botonParaSubir.addEventListener("click", ()=>{

    window.scrollTo(0, 0);
    
});

// carpas constructor

class Carpas{
    constructor(id, nombre, precio, personas, imag){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.personas = parseInt(personas);
        this.imag = imag

    }

}

const carpaArray = [];

//carrito constructor

class StockCarrito{

    constructor(producto, cantidad){
        this.producto = producto,
        this.cantidad = cantidad

    }
};

//variable donde vamos a guardar los elementos 

let stockCarrito = [];

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarritoReservas = document.querySelector("#items");
const contenedorFooterCarrito = document.getElementById("footer");

// carga de carpas

function CargarCarpas(){

    carpaArray.push(new Carpas(1, "Carpa Sirirí", 2500, 4,"./assets/pexels-cottonbro-5358920.jpg"));
    carpaArray.push(new Carpas(2, "Carpa Calandria", 2000, 2,"./assets/carpa3.jpg"));
    carpaArray.push(new Carpas(3, "Carpa Muitú", 3200, 3, "./assets/navDesplegada2.jpg"));
    carpaArray.push(new Carpas(4, "Cabaña Ipacaá", 4800, 6, "./assets/cabaña.jpg"));
}

CargarCarpas();
dibujarCatalogoProductos()

//----------------------------------------------------------------------------------//

//localstorage setear productos (usada como base de datos)

const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor)}

for (const carpa of carpaArray){
    guardarLocal(carpa.id, JSON.stringify(carpaArray)) //almacena en el local

}

const busquedaLocalS = JSON.parse(localStorage.getItem(1));

console.log(busquedaLocalS);

//buscardor en el dom

let inputBuscador2 = document.querySelector(".inputBuscador2");
let inputBuscador3 = document.querySelector(".inputBuscador3");
let inputBuscador4 = document.querySelector(".inputBuscador4");
let inputBuscador6 = document.querySelector(".inputBuscador6");
let contBtn =document.querySelector(".btn-group")


contBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    function mostrarRecomendado(){

        if(e.target.classList.contains("inputBuscador2")){

            let findLocalStorage = busquedaLocalS.find(elemento =>{return  elemento.personas == 2})

            swal(`Tu mejor opción es ${findLocalStorage.nombre}`);
        }
        if(e.target.classList.contains("inputBuscador3")){

            let findLocalStorage = busquedaLocalS.find(elemento =>{return  elemento.personas == 3})

            swal(`Tu mejor opción es ${findLocalStorage.nombre}`);
        }
        if(e.target.classList.contains("inputBuscador4")){

            let findLocalStorage = busquedaLocalS.find(elemento =>{return  elemento.personas == 4})

            swal(`Tu mejor opción es ${findLocalStorage.nombre}`);

        }else if(e.target.classList.contains("inputBuscador6")){

            let findLocalStorage = busquedaLocalS.find(elemento =>{return  elemento.personas == 6})

            swal(`Tu mejor opción es ${findLocalStorage.nombre}`);

        }

    }
    mostrarRecomendado()

    
})


contBtn.innerHTML= `
<input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
<label class=" inputBuscador2 btn btn-outline-primary" for="btnradio1">2 personas</label>

<input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
<label class=" inputBuscador3 btn btn-outline-primary" for="btnradio2">3 personas</label>

<input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
<label class="inputBuscador4 btn btn-outline-primary" for="btnradio3">4 personas</label>

<input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
<label class="inputBuscador6 btn btn-outline-primary" for="btnradio3">6 personas</label>
`
//-------------------------------------------------------------------------------------//

function dibujarCatalogoProductos(){
    contenedorProductos.innerHTML = "";

    carpaArray.forEach(
        (producto) =>{
            let carta = crearCard(producto);
            contenedorProductos.append(carta);

        }
    )
};

function crearCard(producto){

    //boton

    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success d-grid gap-2 col-6 mx-auto";
    botonAgregar.innerText = "Reservar";

    //cuerpo carta
    
    let cuerpoCard = document.createElement("div");
    cuerpoCard.className = "card-body";
    cuerpoCard.innerHTML =`
    <h5 class="d-flex justify-content-center">${producto.nombre}</h5>
    <p class="d-flex justify-content-center">Precio $ ${producto.precio}</p>
    <p class="d-flex justify-content-center">Capacidad ${producto.personas} personas</p>
    `;
    cuerpoCard.append(botonAgregar)


    //imagen
    let imagen = document.createElement("img");
    imagen.src = producto.imag;
    imagen.className = "card-img-top h-3";
    imagen.alt = producto.nombre;

    // carta

    let carta = document.createElement("div");
    carta.className = "card m-2 p-3 mb-5 mt-3";
    carta.style = "width: 40rem";
    carta.append(imagen);
    carta.append(cuerpoCard);

    // evento del boton

    botonAgregar.onclick = (e) =>{

        stockCarrito.push(new StockCarrito(producto, 1));
        
        
        dibujarCarrito();

        swal({
            title: "¡Producto Agregado!",
            text: `La ${producto.nombre} fue agregada al carrito de reservas`,
            icon: "success",
            buttons:{
                cerrar:{
                    text: "Cerrar",
                    value: false
                },
                carrito:{
                    text: "Ir al carrito",
                    value: true
                }
            }
        }).then((irACarrito) =>{

            if(irACarrito){

                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.querySelector('#toggleMyModal');
                myModal.show(modalToggle);
                
            }
        });
    }

    return carta
}

function dibujarCarrito(){
    contenedorCarritoReservas.innerHTML = "";

    let totalCarrito = 0;
    let totalProductos = 1;
    let totalCantidad = 0;


    stockCarrito.forEach(
        (elemento) => {

        //agregar numero al boton Reservas
            
        const modalToggle = document.querySelector('#toggleMyModal');

        modalToggle.innerHTML=`<span class="badge text-bg-secondary">Reservas  <i class="fas fa-shopping-cart"></i> ${totalProductos}</span>`
       
        totalProductos+=parseInt(elemento.cantidad);
        totalCantidad+=parseInt(elemento.cantidad) 

            let renglonCarrito = document.createElement("tr");

            renglonCarrito.innerHTML = `
            <td>${elemento.producto.id}</td>
            <td>${elemento.producto.nombre}</td>
            <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="3" step="1" style="width:70px"</td>
            <td>${elemento.producto.precio}</td>
            <td>${elemento.producto.precio*elemento.cantidad}</td>

            `;
            contenedorCarritoReservas.append(renglonCarrito)

            totalCarrito+=elemento.producto.precio*elemento.cantidad;
            contenedorCarritoReservas.append(renglonCarrito);

            let inputCantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);

            inputCantidadProductos.addEventListener("change", (e)=>{
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
               

                dibujarCarrito();
            })

        }
    );

  

    if(stockCarrito.length == 0){

        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;
    
    }else{
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="5">Total de la reserva $ ${totalCarrito}, ${totalCantidad} carpas reservadas</th>`
    };

    //variables de los botones reservar y cerrar(suspenso)

    const cerrarCarrito = document.querySelector("#modalFooterClose");
    const reservarCarrito = document.querySelector("#modalFooterReserv");

    //confirmacion de la reserva (suspenso)

    reservarCarrito.addEventListener("click", condiconalVacio);
    

    function condiconalVacio(){
//librerias sweet alert
            swal({
                title: "Esta seguro que desea confirmar tu reservación",
                text: "Una vez confirmada se realizara el cobro de la estadía",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {

                if (willDelete) {
                swal("¡Felicitaciones! Tu reserva ha sido confirmada, revisa tu casilla de mensajes para mas informacion", {
                    icon: "success",
                });
               
                stockCarrito=[];
                dibujarCarrito();

                } else {
                swal("Puedes seguir con tu proceso cuando quieras");
                } 
                
            });
};   };   


//-------------------------api rest-----------------------------//

const containerHolidays = document.getElementById("apiHolidays")
const containerApi = document.getElementById("conteinerApi")
const searchCity = document.getElementById("searchCity")
const searchInputCiudad = document.getElementById("searchInputCiudad")
const searchInputMes = document.getElementById("searchInputMes")
const feriadosOn = document.getElementById("feriadosOn")




let pais = "ar" //prompt("ingrese pais")
let mes = 5 //prompt("ingrese mes")

const displayInfo = (data) =>{

    const infoInput = ()=>{
        for(i=0; i<=data.response.holidays.length;i++){
        let dataName = data.response.holidays[i].name
        let dataDate = data.response.holidays[i].date.datetime.day
        let dataCountry =data.response.holidays[i].country.name
          
        feriadosOn.innerHTML+=`
        <table class="table table-bordered" id="table>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">nombre</th>
                    <th scope="col">fecha</th>
                    <th scope="col">pais</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td scope="row">${dataName}</td>
                    <td scope="roy">${dataDate}</td>
                    <td scope="row" >${dataCountry}</td>
                </tr>
                </tbody>
        </table>
        `
        //el codigo funciona solo debe configurarse la tabla
        }  
        
    }
   infoInput()

}
const diasFeriados = async(pais, mes)=>{

    let apiKey = "e67bf66973834fc2bd09d7570a9cdb0871111b34"
    let api = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${pais}&month=${mes}&year=2022`

    const response = await fetch(api)
    const data  = await response.json()
   // const err = console.log(err)  chequearlo

    displayInfo(data)
    
   
}

searchCity.addEventListener("submit", (e)=>{
    e.preventDefault()
    // console.log(searchInputCiudad.value)
    // console.log(searchInputMes.value)
    feriadosOn.innerHTML=""
    diasFeriados(searchInputCiudad.value, searchInputMes.value)
    
} )







