// posts.js
import { visualizarComentario} from './comments.js';
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
  const id = posts.length; // Usamos el índice del arreglo como ID
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
  posts.forEach((post) => visualizarPost(post, false)); // Mostrar cada post en la interfaz
};

// Función para visualizar un post en el contenedor `.post-card`
export const visualizarPost = (post, isNew = false) => {
    const postHTML = `
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
            <div class="avatar">A</div>
            <div class="comment-input">
              <input type="text" placeholder="Escribe un comentario..." id="comment-input">
              <button class="submit-comment">Comentar</button>
            </div>
          </div>
          <div class="comment-list"></div> <!-- Aquí se mostrarán los comentarios -->
        </div>
      </div>
    `;
  
    if (isNew) {
      $(".post-card").prepend(postHTML); // Agregar al inicio si es un nuevo post
    } else {
      $(".post-card").append(postHTML); // Agregar al final si se está cargando
    }
  };


  $(".post-card").on('click', '.comment-btn', function() {
    const postElement = $(this).closest(".post-item"); // Encontrar el post donde se hizo clic
  
    // Mostrar/Ocultar la sección de comentarios
    const commentsSection = postElement.find(".comments-section");
    commentsSection.toggle(); // Toggle: Si está visible la oculta, si está oculta la muestra
  
    console.log("Caja de comentarios en este post:", postElement);
  });


  $(".post-card").on('click', '.submit-comment', function() {
    const postElement = $(this).closest(".post-item"); // Encontrar el post donde se hizo clic
    const commentText = postElement.find("#comment-input").val(); // Obtener el texto del comentario
  
    if (commentText.trim() === "") {
      alert("Por favor, escribe un comentario.");
      return;
    }
  
    // Crear y agregar el comentario
    const newCommentHTML = `
      <div class="comment-item">
        <div class="comment-header">
          <div class="avatar">U</div>
          <div class="user-info">
            <span class="username">Usuario</span>
            <span class="comment-date">${new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <div class="comment-content">
          <p>${commentText}</p>
        </div>
      </div>
    `;
  
    // Agregar el comentario en el contenedor de comentarios
    postElement.find(".comment-list").append(newCommentHTML);
  
    // Limpiar el campo de entrada del comentario
    postElement.find("#comment-input").val("");
    console.log("Comentario agregado en el post con título:", postElement.find('.post-title').text()); // Verificar con el título del post
    console.log("Comentario agregado en este post:", postElement);
  });

//$(".post-card").on('click', '.comment-btn', function() {
//    const postElement = $(this).closest(".post-item"); // Encontrar el post-item más cercano al botón de comentar
//   
//    if (postElement.length) {  // Si el post-item existe
 //     postElement.find(".comments-section").append(visualizarComentario()); // Agregar comentario al post específico
//      console.log("Comentario agregado en el post con título:", postElement.find('.post-title').text()); // Verificar con el título del post
//    } else {
//      console.log("No se encontró el post correspondiente.");
//    }
//  });


// Exportar el array de posts
export { posts };
