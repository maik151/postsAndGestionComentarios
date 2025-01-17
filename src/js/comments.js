// Función para crear un comentario
export const createComment = (nameC, content, fechaC = new Date().toISOString().split("T")[0]) => {
    return {
      idComment: '',  // El ID se asignará dinámicamente más tarde
      nameC,          // Nombre del usuario que comenta
      fechaC,         // Fecha del comentario
      content,        // Contenido del comentario
    };
};

// Función para visualizar un comentario en un post
export const visualizarComentario = () => {
    const commentHTML =  `
      <div class="comment-item">
        <div class="comment-header">
          <div class="avatar">aaa</div>
          <div class="user-info">
            <span class="username">@$</span>
            <span class="comment-date"></span>
          </div>
        </div>
        <div class="comment-content">
          <p>asda}</p>
        </div>
      </div>
    `;

    return commentHTML;
};