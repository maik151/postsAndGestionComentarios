// Función para crear un comentario
import { savePostsToLocalStorage} from './posts.js';


export const createComment = (idComment, nameC, content, fechaC = new Date().toISOString().split("T")[0]) => {
    return {
      idComment,  // El ID se asignará dinámicamente más tarde
      nameC,          // Nombre del usuario que comenta
      fechaC,         // Fecha del comentario
      content,        // Contenido del comentario
    };
};

// Función para visualizar un comentario en un post
export const visualizarComentario = (comment, postElement) => {
    const commentHTML =  `
      <div class="comment-item" data-id="${comment.idComment}">
          <div class="comment-header">
              <div class="avatar">${comment.nameC.charAt(0).toUpperCase()}</div> <!-- Inicial del nombre -->
              <div class="user-info">
                <span class="username">@${comment.nameC}</span> <!-- Nombre del usuario -->
                <span class="comment-date">${comment.fechaC}</span> <!-- Fecha del comentario -->
              </div>
          </div>
          <div class="comment-content">
            <p>${comment.content}</p> <!-- Contenido dinámico -->
          </div>
      </div>
    `;

    postElement.find((".comment-list")).prepend(commentHTML); // Agregar al inicio si es un nuevo post

    return commentHTML;
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