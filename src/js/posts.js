//---------------Declarar Variables---------------------
// Array de posts
let posts = [];


//------------ Crear Arrow Functions
// Función para crear un objeto Post
export const createPost = (id, nameUser,title,  date, content) => ({
    id,
    nameUser,
    title,
    date,
    content,
    comments: [] // Array de comentarios dentro del post

});

// Función para guardar los posts en localStorage
export const savePostsToLocalStorage = () => {
    localStorage.setItem('posts', JSON.stringify(posts));
};

// Función para cargar los posts desde localStorage
export const loadPostsFromLocalStorage = () => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
    }
};

// Función para agregar un post al array y al localStorage
export const addPostToArrayAndStorage = (id, nameUser, title, date, content) => {
    const post = createPost(id, nameUser, title, date, content); // Creamos el post
    posts.push(post); // Lo agregamos al array
    savePostsToLocalStorage(); // Lo guardamos en localStorage
};

// Exportar el array de posts
export { posts };