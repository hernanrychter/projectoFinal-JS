$(() => {

//Genera Cards en el HTML
function generarHTML(array) {
  for (const inmueble of array) {
      $("#inmuebleCtnVentas").append(
          `<div class="card" id=${inmueble.codigo} style="width: 22rem;">
              <img class="card-img-top" src=${inmueble.imagen} alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title">${inmueble.nombre}</h5>
              <p class="card-Inmueble">${inmueble.tipoPropiedad} de ${inmueble.ambientes} ambientes en ${inmueble.tipoOperacion}</p>
              <p class="card-text">${inmueble.descripcion}</p>
              <p class="card-precio">U$D ${inmueble.precio}</p>
              <a href="#" class="btn btn-primary">Mas info</a>
              </div>
              </div>`);
  }
}


listaNueva = JSON.parse(localStorage.getItem("listaInmuebles"));

  // generarHTML(listaNueva) en VENTAS;
  let arrayFiltradoVentas = listaNueva.filter(inmueble => inmueble.tipoOperacion == 'Venta');
  console.log(arrayFiltradoVentas)
  generarHTML(arrayFiltradoVentas);

  
})