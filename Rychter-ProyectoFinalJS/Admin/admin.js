$(() => {

    /* CONSTRUCTOR */
    class Inmueble {
        constructor(nombre, codigo, tipoOperacion, tipoPropiedad, ambientes, precio, descripcion, imagen) {
            this.nombre = nombre;
            this.codigo = codigo;
            this.tipoOperacion = tipoOperacion;
            this.tipoPropiedad = tipoPropiedad;
            this.ambientes = ambientes;
            this.precio = precio;
            this.descripcion = descripcion;
            this.imagen = imagen;
        }
    }


    /* FUNCIONES */

    //Genera Cards en el HTML
    function generarHTML(array) {
        for (const inmueble of array) {
            if(inmueble.tipoOperacion=="Venta"){
            $("#inmueblesVenta").append(
                `<div class="card" id=${inmueble.codigo} style="width: 22rem;">
                <div class="eliminar">Eliminar</div>
                    <img class="card-img-top" src=${inmueble.imagen} alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">${inmueble.nombre}</h5>
                    <p class="card-Inmueble">${inmueble.tipoPropiedad} de ${inmueble.ambientes} ambientes en ${inmueble.tipoOperacion}</p>
                    <p class="card-text">${inmueble.descripcion}</p>
                    <p class="card-precio">${inmueble.tipoOperacion=="Venta"?"U$D":"$"} ${inmueble.precio}</p>
                    <a href="#" class="btn btn-primary">Mas info</a>
                    </div>
                    </div>`);
            }
            else{
                $("#inmueblesAlquiler").append(
                    `<div class="card" id=${inmueble.codigo} style="width: 22rem;">
                    <div class="eliminar">Eliminar</div>
                        <img class="card-img-top" src=${inmueble.imagen} alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${inmueble.nombre}</h5>
                        <p class="card-Inmueble">${inmueble.tipoPropiedad} de ${inmueble.ambientes} ambientes en ${inmueble.tipoOperacion}</p>
                        <p class="card-text">${inmueble.descripcion}</p>
                        <p class="card-precio">${inmueble.tipoOperacion=="Venta"?"U$D":"$"} ${inmueble.precio}</p>
                        <a href="#" class="btn btn-primary">Mas info</a>
                        </div>
                        </div>`);
            }
        }
    }

     // Inicio de la Funcion altaInmuebles //
     function altaInmuebles(e) {
        e.preventDefault();

        let nombre = document.getElementById("nombreProp").value;
        let codigo = Math.floor(Math.random() * 10000);
        let tipoOperacion = document.getElementById("tipoOperacion").value;
        let tipoPropiedad = document.getElementById("tipoPropiedad").value;
        let ambientes = document.getElementById("cantAmbientes").value;
        let precio = document.getElementById("precio").value;
        let descripcion = document.getElementById("descripcion").value;
        let imagen = document.getElementById("imagen").value;

        const inmueble = new Inmueble(nombre, codigo, tipoOperacion, tipoPropiedad, ambientes, precio, descripcion, imagen);
        

        //LOCAL STORAGE//
        //Si en el local storage no hay inmuebles, pushea el nuevo y guarda ese array en el local
        if (localStorage.getItem("listaInmuebles") == null) {
            inmuebles.push(inmueble);
            localStorage.setItem("listaInmuebles", JSON.stringify(inmuebles));

            //Borro el HTML para que no se repitan los productos ya cargados//
            $("#inmueblesVenta").html("")

            //Agrego el inmueble en el HTML//

            generarHTML(inmuebles);

            //Si hay inmuebles en el  Local Storage, los meto en un nuevo array y le pusheo el nuevo inmueble
        } else {
            let listaNueva = JSON.parse(localStorage.getItem("listaInmuebles"));
            listaNueva.push(inmueble);
            localStorage.setItem("listaInmuebles", JSON.stringify(listaNueva));

            //Borro el HTML para que no se repitan los productos ya cargados//
            $("#inmueblesVenta").html("")

            //Agrego el inmueble en el HTML//
            generarHTML(listaNueva);
        }
        $("#formProp")[0].reset(); //Reseteo el formulario
    }
   
    //Fin de la Funcion altaInmuebles//



    // Array para guardar dentro los inmuebles que voy dando de alta //
    const inmuebles = [];

    // Alta de inmuebles completando el formulario y haciendo click en el boton Alta Inmueble // 
    $("#btn_crear").on('click', (altaInmuebles))
   

    //Hago que aparezcan al iniciar la web los inmuebles que estan cargados en el local
    listaNueva = JSON.parse(localStorage.getItem("listaInmuebles"));
    generarHTML(listaNueva);

    /* ANIMACIONES PARA ELIMINAR CARDS */
    //Click en la card para que aparezca el boton de eliminar y se borre el de Mas Info
    $(".card").on("click", function() {
        $(".eliminar", this).toggle(400);
        $(".btn-primary", this).toggle(200);
    })

    //Al hacer click en Eliminar se borra la card
    $(".eliminar").on("click", function () {
        let inmuebleBorrado = $(this).parent().attr("id"); //Guardo el ID de la card a borrar en la variable
       
        let arrayFiltrado = listaNueva.filter(inmueble => inmueble.codigo != inmuebleBorrado)//Creo nuevo array filtrado que no contengan el ID del que quiero eliminar
       
        localStorage.setItem("listaInmuebles", JSON.stringify(arrayFiltrado)); //Actualizo el Array en el Local y borro la card
        $(this).parent().remove();
    })

//FIN READY()
});



//AJAX
const URL = "/datos.json"

$(".btn-json").click(()=>{
    $.getJSON(URL,function(respuesta,estado){
        if(estado==="success"){
            let datos = respuesta;
            console.log(estado);

            for (const dato of datos) {
                if(dato.tipoOperacion=="Venta"){
                $("#inmueblesVenta").append(
                    `<div class="card" id=${dato.codigo} style="width: 22rem;">
                    <div class="eliminar">Eliminar</div>
                        <img class="card-img-top" src=${dato.imagen} alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${dato.nombre}</h5>
                        <p class="card-Inmueble">${dato.tipoPropiedad} de ${dato.ambientes} ambientes en ${dato.tipoOperacion}</p>
                        <p class="card-text">${dato.descripcion}</p>
                        <p class="card-precio">${dato.tipoOperacion=="Venta"?"U$D":"$"} ${dato.precio}</p>
                        <a href="#" class="btn btn-primary">Mas info</a>
                        </div>
                        </div>`);
                }
                else{
                    $("#inmueblesAlquiler").append(
                        `<div class="card" id=${dato.codigo} style="width: 22rem;">
                        <div class="eliminar">Eliminar</div>
                            <img class="card-img-top" src=${dato.imagen} alt="Card image cap">
                            <div class="card-body">
                            <h5 class="card-title">${dato.nombre}</h5>
                            <p class="card-Inmueble">${dato.tipoPropiedad} de ${dato.ambientes} ambientes en ${dato.tipoOperacion}</p>
                            <p class="card-text">${dato.descripcion}</p>
                            <p class="card-precio">${dato.tipoOperacion=="Venta"?"U$D":"$"} ${dato.precio}</p>
                            <a href="#" class="btn btn-primary">Mas info</a>
                            </div>
                            </div>`);
                }

                if(localStorage.getItem("listaInmuebles") == null){
                    listaNueva.push(dato);
                    console.log(listaNueva)
                    localStorage.setItem("listaInmuebles", JSON.stringify(datos));
    
                }else{
                            listaNueva = JSON.parse(localStorage.getItem("listaInmuebles"));
                            console.log(listaNueva)//Control de que me trae toda la info del Local
                            listaNueva.push(dato);
                            console.log(listaNueva)//Control de que me agrega los Objetos del .JSON
                            localStorage.setItem("listaInmuebles", JSON.stringify(listaNueva));
                            console.log(listaNueva)//Control de que en el local estan los anteriores y los .JSON nuevos
                        }





            }
            
                }

            
    });
});