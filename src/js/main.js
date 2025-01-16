//Importar las fuinciones de los demas
import { createPost, savePostsToLocalStorage, loadPostsFromLocalStorage, posts } from './posts.js';
import { createComment } from './comments.js';

// Inicializamos los datos desde localStorage
loadPostsFromLocalStorage();






//Eventos de los Botones

//Evento de Prueba con el Boton de publicar
document.querySelector('.submit-btn').addEventListener('click', (e) =>{
    e.preventDefault(); //evitamos que se cargue por default el evento del form
    
    //obtenemos los valores dle formulario usando querySlector (aun no con Jquery).
    const nameU = 'Jorge';
    const title = document.querySelector('#post-title').value;
    const date = document.querySelector('#post-date').value;
    const content = document.querySelector('#post-content').value;
    
    //Creamos el objeto de tipo Post, ya que es una funcionFlecha, se retorna a si misma
    const postCreadoo = createPost('1', nameU, title, date, content );
    
    //agregamos el post al arrays de posts
    posts.push(postCreadoo);

    //guardamos en el local storage
    savePostsToLocalStorage();

    //mostramos en consola el postCreado
    console.log(posts);

    //crear un alert del post agregado correctamente
    alert('Se agrego el post con exitooo');
});
