// posts.js
import { agregarComentario, visualizarComentario, eliminarComentario, editarComentario} from './comments.js';

let posts = []; // Array de posts
const postsKey = "posts"; // Clave para almacenar los posts en localStorage

// Función para crear un objeto Post
export const createPost = (id, nameUser, title, date, content) => ({
  id, // Usamos el índice como ID
  nameUser, // Nombre del usuario
  title, // Título del post
  date, // Fecha del post
  content, // Contenido del post
  comments: [], // Array de comentarios dentro del post
});

// Función para guardar un post en el array y en localStorage
export const addPostToArrayAndStorage = (nameUser, title, date, content) => {
  const id = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1; // El primer post tendrá ID 1, el siguiente 2, etc.
  const newPost = createPost(id, nameUser, title, date, content); // Crear el post
  posts.unshift(newPost); // Agregar al inicio del array
  savePostsToLocalStorage(); // Guardar el array actualizado en localStorage
  return newPost; // Retornar el post creado
};

// Función para guardar los posts en localStorage
export const savePostsToLocalStorage = () => {
  localStorage.setItem(postsKey, JSON.stringify(posts));
};

// Función para cargar los posts desde localStorage
export const loadPostsFromLocalStorage = () => {
  const storedPosts = JSON.parse(localStorage.getItem(postsKey)) || [];
    posts = storedPosts; // Sincronizar el array local con los datos almacenados
    

    posts.forEach((post) => {
    if (post && post.nameUser && post.id) {
      // Visualiza el post
      visualizarPost(post, false); 

      // Cargar los comentarios del post en su sección correspondiente
      const postElement = $(".post-item").last(); // Seleccionar el último post visualizado
      post.comments.forEach((comment) => {
        // Pasar el contenedor correcto de cada post
        visualizarComentario(comment, postElement); 
      });
    } else {
      console.error("Post inválido o sin ID:", post);
      $('.post-card').text('No hay nada que cargar');
    }
  });
};

// Función para visualizar un post en el contenedor `.post-card`
export const visualizarPost = (postParameter, isNew = false) => {
  const leterUserActive = $('.userNav').text()[0].toUpperCase();
  console.log(leterUserActive);
  
  const postHTML = `
      <div class="post-item">
        <div class="post-header">
          <div class="avatar">${postParameter.nameUser[0].toUpperCase()}</div>
          <div class="user-info">
            <span class="username">@${postParameter.nameUser}</span>
            <span class="post-date">${postParameter.date}</span>
          </div>
        </div>
        <div class="post-content">
          <h2 class="post-title">${postParameter.title}</h2>
          <p>${postParameter.content}</p>
        </div>
        <div class="post-footer">
          <button class="comment-btn">Comentar</button>
        </div>

        
        <div class="comments-section" style="display: none;">
          <!-- Aquí van los comentarios -->
          <div class="comment-form">
            <div class="avatar">${leterUserActive}</div>
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
    `;

    
    if (isNew) {
      $(".post-card").prepend(postHTML); // Agregar al inicio si es un nuevo post
    } else {
      $(".post-card").append(postHTML); // Agregar al final si se está cargando
    }
  };


//--------------------------------eventos----------------------------------------------
 //Evento del boton de comment para mostar la caja de comentarios
$(".post-card").on('click', '.comment-btn', function() {
    const postElement = $(this).closest(".post-item"); // Encontrar el post donde se hizo clic
  
    // Mostrar/Ocultar la sección de comentarios
    const commentsSection = postElement.find(".comments-section");
    commentsSection.toggle(); // Toggle: Si está visible la oculta, si está oculta la muestra
  
    //console.log("Caja de comentarios en este post:", postElement);
  });

//Evento para el boton de registrar comentario
  $(".post-card").on('click', '.submit-comment', function() {

    const postElement = $(this).closest(".post-item"); // Buscar el elemento del post
    //obtenemos el nombre dle post de donde se clickea le evento
    const nameSearch = postElement.find('.username').first().text().replace('@','');
    

    const postElementArray = posts.find(postElement => postElement.nameUser === nameSearch);
    console.log(postElementArray);
    

    // Verificar si el post fue encontrado
    if (!postElementArray) {
    console.error("Post no encontrado");
    return; // Detener la ejecución si el post no se encuentra
    }

    const postId = postElementArray.id; // Obtener el ID del post
    console.log(postId);
    const content = postElement.find(".comment-box").val(); // Obtener el contenido del input

    const nameUserUsed = $('.userNav').text();
    if ($.trim(content) !== "") {
      const newComment =  agregarComentario(postId,nameUserUsed , content); // Llamar a la función para agregar comentario
      postElement.find("#comment-input").val(""); // Limpiar el input
      visualizarComentario(newComment, postElement)

      $('.comment-box').val('');
    }
    
    

  });


  $(document).on("click", ".delete-comment", function () {

    // Obtener el elemento del post
    const postElementC = $(this).closest(".post-item");
    
    // Obtener el nombre del usuario del post donde se clickea el evento
    const nameSearch = postElementC.find('.username').first().text().replace('@', '');

    // Obtener el ID del comentario que se va a eliminar
    const commentId = $(this).closest(".comment-item").data("id");

    // Llamar a la función eliminarComentario para eliminar el comentario
    eliminarComentario(commentId, nameSearch);

    // Eliminar el comentario de la interfaz
    $(this).closest(".comment-item").remove();

    
  });


  $(document).on("click", ".edit-comment", function () {

    const postElementC = $(this).closest(".post-item"); // Obtener el post donde se hace clic
    const nameSearch = postElementC.find('.username').first().text().replace('@', ''); // Obtener el nombre del usuario
    
    // Obtener los posts del localStorage
    const posts = JSON.parse(localStorage.getItem("posts")) || []; 
  
    // Buscar el post correspondiente
    const postElementArray = posts.find(post => post.nameUser === nameSearch);
    
    if (!postElementArray) {
      console.error("Post no encontrado.");
      return;
    }
  
    // Obtener el array de comentarios del post
    const commentElementArray = postElementArray.comments;
  
    // Obtener el ID del comentario que se va a editar
    const commentId = $(this).closest(".comment-item").data("id");
  
    // Buscar el comentario en el arreglo
    const comment = commentElementArray.find(comment => comment.idComment === commentId);
  
    if (!comment) {
      console.error("Comentario no encontrado.");
      return;
    }
  
    // Convertir el contenido del comentario en un input text
    const commentContent = $(this).closest(".comment-item").find(".comment-text").text();
    const inputHTML = `
      <input type="text" class="edit-comment-input" value="${commentContent}" />
      <button class="save-comment"><i class="fa-solid fa-check"></i></button>
    `;
  
    $(this).closest(".comment-item").find(".comment-content").html(inputHTML); // Reemplazar el contenido por el input
  
    // Evento para guardar el comentario editado
    $(document).on("click", ".save-comment", function () {
      const newContent = $(this).siblings(".edit-comment-input").val(); // Obtener el nuevo contenido del input
      if (newContent.trim() === "") {
        console.error("El contenido no puede estar vacío.");
        return;
      }
  
      // Llamar a la función para actualizar el comentario
      const updatedComment = editarComentario(commentId, newContent, postElementArray.id);
  
      // Actualizar el comentario visualmente
      $(this).closest(".comment-item").find(".comment-content").html(`<p class="comment-text">${updatedComment.content}</p>`);
  
      console.log("Comentario actualizado correctamente.");
    });
  });


// Exportar el array de posts
export { posts };
