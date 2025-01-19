//Importar las fuinciones de los demas
import { createPost, addPostToArrayAndStorage, savePostsToLocalStorage, loadPostsFromLocalStorage, posts, visualizarPost } from './posts.js';
//import { createComment } from './comments.js';

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

    const newPost = addPostToArrayAndStorage(nameU, title, date, content);
    visualizarPost(newPost, true);

    alert('¡Se agregó el post con éxito!');// Mostramos un mensaje de éxito
    // Limpiamos el formulario (opcional)

    $('#post-title').val(''); 
    $('#post-date').val('');
    $('#post-content').val('');
    //PROVISIONAL//
    console.log(posts); 
    
};

// Función provisional para obtener el nombre usando jQuery
const setUserName  = () => {

    const name = prompt("Ingresa tu nombre de usuario, por favor").trim();
    if (name) {
        $('.userNav').text(name); // Mostrar el nombre del usuario
        $('#avatarName').text(name[0].toUpperCase()); // Inicial para el avatar
    }
}


//---------------------------Eventos----------------------------

//Evento para ejecutar las funcioners apenas se cargue el document
$(document).ready(() => {
    setUserName(); // Configurar el nombre de usuario
    loadPostsFromLocalStorage(); // Cargar los posts existentes

    // Asignar el evento de envío al formulario
    
});

$('#post-form').on('submit', handlePostSubmit);


