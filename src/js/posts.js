// posts.js

let posts = []; // Array de posts
const postsKey = "posts"; // Clave para almacenar los posts en localStorage

// Función para crear un objeto Post
export const createPost = (id,nameUser, title, date, content) => ({
  id: Date.now(), // ID único basado en la fecha actual
  nameUser, // Nombre del usuario
  title, // Título del post
  date, // Fecha del post
  content, // Contenido del post
  comments: [], // Array de comentarios dentro del post
});

// Función para guardar un post en el array y en localStorage
export const addPostToArrayAndStorage = (id, nameUser, title, date, content) => {
  const newPost = createPost(id, nameUser, title, date, content); // Crear el post
  posts.unshift(newPost); // Agregar al inicio del array, ademas de que unshift devuelve la longitud del array.
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
export const visualizarPost = (postParameter, isNew = false) => {
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
    </div>
  `;

  if (isNew) {
    $(".post-card").prepend(postHTML); // Agregar al inicio si es un nuevo post
  } else {
    $(".post-card").append(postHTML); // Agregar al final si se está cargando
  }
};

// Exportar el array de posts
export { posts };
