export const getCharactersFetchById = async(id) => {
    try{

        const response = await fetch(`https://api-comics-l6l7.onrender.com`);
        const data = await response.json();
        return data;

    }catch(error){
        console.log(`Error al obtener los personajes: ${error}`);
        return [];//Retorno un array vacio.
    }
}