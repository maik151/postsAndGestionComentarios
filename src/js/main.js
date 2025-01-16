//Importar las fuinciones de los demas
import { createPost, addPostToArrayAndStorage, savePostsToLocalStorage, loadPostsFromLocalStorage, posts } from './posts.js';
import { createComment } from './comments.js';

//---------------------Definir Constantes-------------------

//---------------------Funciones del main-----------------------

const handlePostSubmit = (e) => {
    e.preventDefault(); // Evitamos que el formulario se recargue
    const nameU = $('.userNav').text(); // Obtenemos el texto del elemento
    const title = $('#post-title').val(); // Obtenemos el valor del input
    const date = $('#post-date').val(); // Obtenemos el valor del input
    const content = $('#post-content').val(); // Obtenemos el valor del textarea

    // Obtenemos los valores del formulario usando jQuery
    if (title == '' || date == '' || content == '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    addPostToArrayAndStorage('1', nameU, title, date, content);
    alert('¡Se agregó el post con éxito!');// Mostramos un mensaje de éxito
    // Limpiamos el formulario (opcional)
    $('#post-title').val(''); $('#post-date').val(''); $('#post-content').val('');
    console.log(posts); 
};

// Función provisional para obtener el nombre usando jQuery
const ponerNombre = () => {
    let name = prompt("Ingresa tu nombre de usuario, por favor");
    $('.userNav').append(`${name}`); // Usamos .append para añadir el nombre al texto existente
    let capitalLeterAvatar = name[0].toUpperCase();
    console.log(capitalLeterAvatar);

    $('#avatarName').append(capitalLeterAvatar);

}

//---------------------------Eventos----------------------------

//Evento para ejecutar las funcioners apenas se cargue el document
$(document).ready(() => {
    ponerNombre(); // Llama aquí para asegurarte de que todo está cargado
    loadPostsFromLocalStorage();// Inicializamos los datos desde localStorage
});

//Asginar evento a el boton de submit
$('.submit-btn').on('click', handlePostSubmit);
