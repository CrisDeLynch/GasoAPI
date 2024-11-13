let contenedorPrincipal = document.getElementById("contenedorPrincipal");
let idGasolinera = document.getElementById("eleccionGasolinera");

function mostrarCarga() {
    contenedorPrincipal.innerHTML = '<p>Cargando datos, por favor espere...</p>';
}

function elegirProvincia() {
    let id = idGasolinera.value;
    mostrarCarga();
  
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/${id}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            var data = JSON.parse(xhr.responseText); 
            console.log(data);
            setTimeout(() => {
                mostrarGasolineras(data.ListaEESSPrecio);
            }, 2000); 
        }
    };
    xhr.send();
}


function mostrarGasolineras(gasolineras) {
    contenedorPrincipal.innerHTML = '';

    gasolineras.sort((a, b) => a.Rótulo.localeCompare(b.Rótulo));
  
    gasolineras.forEach(gasolinera => {
      
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


// Cáceres https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/10`
// Badajoz https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/6`



