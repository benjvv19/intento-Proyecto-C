import { getCharactersFetch  } from "./fetchs/getCharactersFetch.js";

let currentPage = 1;
let loadedcomics = [];

let isLoading = false;

const enviarData = (id,categoria, name , precio , imagen , stock) => {
    const rutaArchivoHTML = '../comics.html';
    
    // Realiza una solicitud para obtener el contenido del archivo HTML
    fetch(rutaArchivoHTML)
        .then(response => response.text())
        .then(html => {

            // Una vez que hayas obtenido el contenido del archivo HTML, puedes manipularlo
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

        // Modifica el contenido del archivo HTML como desees
        const imagePage = doc.getElementById('imagePage');
        imagePage.src = imagen;

        const namePage = doc.getElementById('name');
        namePage.textContent = name;

        const categoriaPage = doc.getElementById('categoria');
        categoriaPage.textContent = `Categoria : ${categoria}`;

        const PrecioPage = doc.getElementById('precio');
        PrecioPage.textContent = `Precio : ${precio}`;

        const stockPage = doc.getElementById('stock');
        stockPage.textContent = `Disponibles : ${stock}`;

     // Convierte el documento de nuevo a una cadena de texto HTML
     const nuevoHTML = new XMLSerializer().serializeToString(doc);

     // Finalmente, puedes usar el nuevo HTML como desees, por ejemplo, inyectándolo en tu página actual
     document.body.innerHTML = nuevoHTML;
   })
   .catch(error => {
     console.error('Error al cargar el archivo HTML:', error);
   });
}

export const createCharacterCards = async (comics) => {    

    const personajesRow = document.getElementById('personajesRow');

     comics.map((comic) => {
         const { id,categoria, name , precio , imagen , stock } = comic;

         if (!loadedcomics.includes(id)) {
             loadedcomics.push(id);

             const divRow = document.createElement('div');
             divRow.classList.add("col-xl-3");
             divRow.classList.add("col-lg-3");
             divRow.classList.add("col-md-3");
             divRow.classList.add("col-sm-12");
             divRow.classList.add("col-xs-12");

             const card = document.createElement('div');
             card.classList.add('card');
             card.classList.add('mt-2');
             card.classList.add('mb-2');

             const imgCard = document.createElement('img');
             imgCard.classList.add('card-img-top');
             imgCard.classList.add('mt-2');
             imgCard.classList.add('mx-auto');
             imgCard.classList.add('w-75');
             imgCard.src = imagen;

             const divBody = document.createElement('div');
             divBody.classList.add('card-body');
             divBody.classList.add('text-center');
             divBody.classList.add('mx-auto');

             const tituloC = document.createElement('h5');
             tituloC.classList.add('card-title');
             tituloC.textContent = name;

             const levelC = document.createElement('p');
             levelC.classList.add('card-text');
             levelC.textContent = categoria;

             const btnVer = document.createElement('button');
             btnVer.classList.add('btn');
             btnVer.classList.add('btn-primary');
             btnVer.classList.add('text-center');
             btnVer.classList.add('mx-auto');

             btnVer.textContent = 'Ver detalles';
             btnVer.addEventListener("click", () => enviarData(id,categoria, name , precio , imagen , stock));

             divRow.appendChild(card);
             card.appendChild(imgCard);
             card.appendChild(divBody);

             divBody.appendChild(tituloC);
             divBody.appendChild(levelC);
             divBody.appendChild(btnVer);

             personajesRow.appendChild(divRow);
         }
     });
}

export const createOneCharacterCard = async (comic) => {

    const personajesRow = document.getElementById('personajesRow');
     
    const { id, name, race, ki, description, image, maxKi, gender } = comic;

      
            const divRow = document.createElement('div');
            divRow.classList.add("col-xl-3");
            divRow.classList.add("col-lg-3");
            divRow.classList.add("col-md-3");
            divRow.classList.add("col-sm-12");
            divRow.classList.add("col-xs-12");

            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('mt-2');
            card.classList.add('mb-2');

            const imgCard = document.createElement('img');
            imgCard.classList.add('card-img-top');
            imgCard.classList.add('mt-2');
            imgCard.classList.add('mx-auto');
            imgCard.classList.add('w-75');
            imgCard.src = image;

            const divBody = document.createElement('div');
            divBody.classList.add('card-body');
            divBody.classList.add('text-center');
            divBody.classList.add('mx-auto');

            const tituloC = document.createElement('h5');
            tituloC.classList.add('card-title');
            tituloC.textContent = name;

            const levelC = document.createElement('p');
            levelC.classList.add('card-text');
            levelC.textContent = categoria;

            const btnVer = document.createElement('button');
            btnVer.classList.add('btn');
            btnVer.classList.add('btn-primary');
            btnVer.classList.add('text-center');
            btnVer.classList.add('mx-auto');

            btnVer.textContent = 'Ver detalles';
            btnVer.addEventListener("click", () => enviarData(id, name, race, ki, description, image, maxKi, gender));

            divRow.appendChild(card);
            card.appendChild(imgCard);
            card.appendChild(divBody);

            divBody.appendChild(tituloC);
            divBody.appendChild(levelC);
            divBody.appendChild(btnVer);

            personajesRow.appendChild(divRow);            
}


export const loadMoreCharacters = async () => {
    if (isLoading) return;
    isLoading = true;

    currentPage++;
    const comics = await getCharactersFetch(currentPage);
    if (comics.length > 0) {
        createCharacterCards(comics);
    } else {
        // No more characters to load
        alert("No hay más comics disponibles.");
    }

    isLoading = false;
}

export const loadInitialCharacters = async () => {
    const comics = await getCharactersFetch();
    createCharacterCards(comics);
}

export const loadOneCharacter = async (personaje) => {

    let char = personaje[0];    
                                
    let personajesRow = document.getElementById("personajesRow");
    personajesRow.innerHTML = '';    

    console.log(char);
    console.log(typeof(char));

    if(char){        
        createOneCharacterCard(char);
     }else{
         return;
     }

    
 }