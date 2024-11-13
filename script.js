let contenedorPrincipal = document.getElementById("contenedorPrincipal");
let idGasolinera = document.getElementById("eleccionGasolinera");

function mostrarCarga() {
    contenedorPrincipal.innerHTML = '<p>Cargando datos, por favor espere...</p>';
}

function elegirProvincia() {
    let id = idGasolinera.value;
    mostrarCarga();
    // Crear una instancia de XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud: método, URL y si es asincrónica (true)
    xhr.open('GET', `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/${id}`, true);

    // Definir una función que se ejecutará cuando cambie el estado de la solicitud
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { // 4 significa "completado", 200 es "OK"
            // La respuesta del servidor se encuentra en xhr.responseText
            var data = JSON.parse(xhr.responseText); // Convertir JSON en objeto de JavaScript
            console.log(data);
            setTimeout(() => {
                mostrarGasolineras(data.ListaEESSPrecio);
            }, 2000); 
        }
    };

    // Enviar la solicitud
    xhr.send();
}


function mostrarGasolineras(gasolineras) {
    contenedorPrincipal.innerHTML = '';

    gasolineras.forEach(gasolinera => {

        gasolineras.sort((a, b) => {
            if (a.Rótulo < b.Rótulo) return -1;
            if (a.Rótulo > b.Rótulo) return 1;
            return 0;
        });    

        let contenedorIndividual = document.createElement("div");
        contenedorIndividual.classList.add("gasolinera");


        let nombreGasolinera = document.createElement("p");
        nombreGasolinera.innerHTML = `Nombre: ${gasolinera.Rótulo}`;
        contenedorIndividual.appendChild(nombreGasolinera);


        let direccionGasolinera = document.createElement("p");
        direccionGasolinera.innerHTML = `Dirección: ${gasolinera.Dirección}`;
        contenedorIndividual.appendChild(direccionGasolinera);

        let listaTipos = document.createElement("ul");


        if(gasolinera['Precio Gasolina 95 E5'] != ""){
        let tipoGasolina = document.createElement('li');
        tipoGasolina.textContent = `⛽ Gasolina 95 : `+ gasolinera['Precio Gasolina 95 E5'] + `€/L`;
        listaTipos.appendChild(tipoGasolina);
        }

        if(gasolinera['Precio Gasoleo A'] != ""){
        let tipoGasoleo = document.createElement('li');
        tipoGasoleo.textContent = `🚛 Gasoleo A : `+ gasolinera['Precio Gasoleo A'] + `€/L`;
        listaTipos.appendChild(tipoGasoleo);
        }

        if(gasolinera['Precio Gasolina 98 E5'] != ""){
        let tipoGasolina98 = document.createElement('li');
        tipoGasolina98.textContent = `⚡ Gasolina 98 : `+ gasolinera['Precio Gasolina 98 E5'] + `€/L`;;
        listaTipos.appendChild(tipoGasolina98);
        }


        contenedorIndividual.appendChild(listaTipos);
        contenedorPrincipal.appendChild(contenedorIndividual);
    });
}

idGasolinera.addEventListener('change', elegirProvincia);


