// Función para crear un comentario
import { savePostsToLocalStorage} from './posts.js';

//funcion para crear objertos de tipo comment
export const createComment = (idComment, nameC, content, fechaC = new Date().toISOString().split("T")[0]) => {
    return {
      idComment,  // El ID se asignará dinámicamente más tarde
      nameC,          // Nombre del usuario que comenta
      fechaC,         // Fecha del comentario
      content,        // Contenido del comentario
    };
};

// Función para visualizar un comentario (con botones Editar y Eliminar)
export const visualizarComentario = (comment, postElement) => {
  const commentHTML = `
    <div class="comment-item" data-id="${comment.idComment}">
      <div class="comment-header">
        <div class="avatar">${comment.nameC.charAt(0).toUpperCase()}</div> <!-- Inicial del nombre -->
        <div class="user-info">
          <span class="username">@${comment.nameC}</span> <!-- Nombre del usuario -->
          <span class="comment-date">${comment.fechaC}</span> <!-- Fecha del comentario -->
        </div>
      </div>
      <div class="comment-content">
        <p class="comment-text">${comment.content}</p> <!-- Contenido dinámico -->
      </div>

      <div class="comment-actions">
        <button class="edit-comment"><i class="fa-solid fa-pencil"></i></button>
        <button class="delete-comment"><i class="fa-solid fa-trash"></i> </button>
      </div>
    </div>
  `;

  postElement.find(".comment-list").prepend(commentHTML); // Insertar en la lista de comentarios del post
};


//funcion para obtener posts desde el localStorage
const getPostsFromStorage = () => {
  const posts = localStorage.getItem("posts"); // Recuperar el arreglo desde localStorage
  return posts ? JSON.parse(posts) : [];      // Parsear si existe, o devolver un arreglo vacío
};

// Función para guardar los posts actualizados en localStorage
const savePostsToStorage = (posts) => {
  localStorage.setItem("posts", JSON.stringify(posts)); // Guardar posts actualizado
};

// Función para agregar un comentario a un post
export const agregarComentario = (postId, postName, content) => {
  
  const posts = getPostsFromStorage(); // Cargar los posts
  const post = posts.find((p) => p.id === postId); // Buscar el post por su ID
  if (!post) return; // Si no existe, salir
  
  const newComment = createComment(post.comments.length + 1, postName,content,  new Date().toISOString().split("T")[0] );
  
  // Agregar el comentario al arreglo del post
  post.comments.push(newComment);
  
  // Guardar los posts actualizados en localStorage
  savePostsToStorage(posts);
  return newComment;

  
};


// Función para eliminar un comentario de un post
export const eliminarComentario = (commentId, nameSearch) => {
  // Obtener los posts desde el localStorage
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  // Buscar el post correspondiente
  const postElementArray = posts.find(post => post.nameUser === nameSearch);
  
  if (!postElementArray) {
    console.error("Post no encontrado.");
    return;
  }

  // Obtener el array de comentarios del post
  const commentElementArray = postElementArray.comments;

  // Buscar el índice del comentario a eliminar
  const commentIndex = commentElementArray.findIndex((comment) => comment.idComment === commentId);
  
  if (commentIndex === -1) {
    console.error("Comentario no encontrado.");
    return;
  }

  // Eliminar el comentario del arreglo de comentarios
  postElementArray.comments.splice(commentIndex, 1); // Eliminar comentario del arreglo

  // Actualizar el localStorage con los cambios
  localStorage.setItem("posts", JSON.stringify(posts));

  console.log("Comentario eliminado correctamente.");
};