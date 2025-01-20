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

const buscarPost = () => {
    const searchKeyword = $("#filter-input").val().toLowerCase(); // Obtener palabra clave
    const posts = JSON.parse(localStorage.getItem("posts")) || []; // Obtener los posts del localStorage

    // Filtrar los posts que contienen la palabra clave en el título o contenido
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchKeyword) || 
        post.content.toLowerCase().includes(searchKeyword)
    );

    // Mostrar los posts filtrados
    $(".post-card").empty(); // Limpiar los posts previos
    filteredPosts.forEach(post => {
        // Definir el nombre del usuario activo para los comentarios
        const leterUserActive = $('.userNav').text(); // Aquí pon tu lógica para obtener el usuario activo

        // Crear la estructura HTML para cada post
        $(".post-card").append(`
            <div class="post-item">
                <div class="post-header">
                    <div class="avatar">${post.nameUser[0].toUpperCase()}</div>
                    <div class="user-info">
                        <span class="username">@${post.nameUser}</span>
                        <span class="post-date">${post.date}</span>
                    </div>
                </div>
                <div class="post-content">
                    <h2 class="post-title">${post.title}</h2>
                    <p>${post.content}</p>
                </div>
                <div class="post-footer">
                    <button class="comment-btn">Comentar</button>
                </div>

                <div class="comments-section" style="display: none;">
                    <!-- Aquí van los comentarios -->
                    <div class="comment-form">
                        <div class="avatar">${leterUserActive[0].toUpperCase()}</div> <!-- Mostrar avatar del usuario activo -->
                        <div class="comment-input">
                            <input type="text" placeholder="Escribe un comentario..." class="comment-box">
                            <button class="submit-comment">Comentar</button>
                        </div>
                    </div>
                    <div class="comment-list">
                        <!-- Aquí se mostrarán los comentarios -->
                    </div> 
                </div>
            </div>
        `);
    });

    // Si no se encuentran posts
    if (filteredPosts.length === 0) {
        $(".post-card").append("<p>No se encontraron posts con esa palabra clave.</p>");
    }

    // Cerrar el modal después de realizar la búsqueda
    $("#filterModal").hide();
};

const reloadPosts = () => {
    $(".post-card").empty(); // Limpiar los posts previos
    loadPostsFromLocalStorage();
}




//---------------------------Eventos----------------------------

//Evento para ejecutar las funcioners apenas se cargue el document
$(document).ready(() => {
    setUserName(); // Configurar el nombre de usuario
    loadPostsFromLocalStorage(); // Cargar los posts existentes
    // Mostrar el modal cuando se hace clic en el botón de filtro
    $(".filter-btn").on("click", function() {
        $("#filterModal").show(); // Mostrar el modal
    });
    // Cerrar el modal cuando se hace clic en la 'X'
    $(".close-btn").on("click", function() {
        $("#filterModal").hide(); // Ocultar el modal
    });
    // Asignar el evento de envío al formulario
    
});

$('#post-form').on('submit', handlePostSubmit);

$('.filter-btn').on('click',)

$("#filter-search").on("click", buscarPost);

$(".reload-btn").on("click", reloadPosts);