# postsAndGestionComentarios
Repositoprio de la actividad de aplicaciones sobre el desarrollo de la gestion de post y comentarios de una red social.
- Descripción del Proyecto
Este proyecto es una aplicación web de gestión de publicaciones y comentarios. Permite a los usuarios interactuar con publicaciones, agregar comentarios, editar y eliminar tanto publicaciones como comentarios. La interfaz de usuario se adapta a las necesidades de los usuarios, y los datos se almacenan localmente en el navegador.

- Estructura de Archivos
index.html: Archivo principal que contiene la estructura básica de la página.
styles.css: Contiene los estilos para la interfaz de usuario.
main.js: Archivo JavaScript principal que maneja la carga de la página y la interacción de los usuarios.
posts.js: Archivo JavaScript que maneja las publicaciones, como la carga, creación, edición y eliminación.
comments.js: Archivo JavaScript que maneja los comentarios, permitiendo agregar, editar y eliminar comentarios.

---------------------------------------------------------------------------------------------------------------------------------------------
- Justificación del Código
-- main.js
---Función principal:
----Inicialización y carga de la página:
Al cargar la página, se inicializa el sistema de manejo de publicaciones y comentarios. La función loadPostsFromLocalStorage() carga los datos de las publicaciones guardadas localmente en el navegador para mostrarlas automáticamente.
El código asociado con el modal para el login se asegura de que el usuario ingrese su nombre antes de interactuar con la página.
Exceso de líneas en comparación con el mínimo esperado:

149 líneas de código: Aunque se esperaba un máximo de 120 líneas, las funciones de inicialización, validaciones, manejo de eventos (como los botones de filtro y las interacciones con el modal) y la carga de datos aumentaron la complejidad del archivo. Esto es necesario para garantizar que todos los elementos de la interfaz de usuario funcionen correctamente sin problemas.

Justificación del exceso: Se agregaron líneas para mejorar la usabilidad, como mostrar el modal de inicio de sesión, asignar el nombre del usuario al avatar y la navegación, y otras interacciones adicionales que requieren más líneas de código para un funcionamiento eficiente
---------------------------------------------------------------------------------------------------------------------------------------------
-- posts.js
--- Función principal:

---- Carga de publicaciones:
Esta función maneja las publicaciones, permitiendo que los usuarios vean, creen, editen y eliminen publicaciones.
El archivo también maneja la actualización de los datos en el almacenamiento local después de cada cambio realizado (creación, edición o eliminación de publicaciones).
Exceso de líneas en comparación con el mínimo esperado:

100 líneas de código: La razón de este incremento es que se incluyeron varias funciones de validación, manejo de eventos de usuario y actualizaciones del DOM para garantizar una interacción fluida entre el usuario y la interfaz.

Justificación del exceso: Para poder realizar una experiencia de usuario adecuada, se agregaron validaciones para asegurar que las publicaciones sean correctamente gestionadas (por ejemplo, asegurarse de que los campos no estén vacíos, o manejar la edición de forma adecuada). Esto incrementó las líneas de código, pero es esencial para la integridad del sistema.
---------------------------------------------------------------------------------------------------------------------------------------------
-- comments.js
--- Función principal:

---- Manejo de comentarios:
Al igual que con las publicaciones, este archivo se encarga de manejar la creación, visualización, edición y eliminación de comentarios. Además, sincroniza los datos con el almacenamiento local.
Exceso de líneas en comparación con el mínimo esperado:

129 líneas de código: La gestión de los comentarios incluye más validaciones y manipulación del DOM que lo que originalmente se había estimado. Esto incluye la lógica para mostrar y ocultar los comentarios, actualizar la interfaz después de un cambio y gestionar las interacciones del usuario de manera eficiente.

Justificación del exceso: El aumento en la cantidad de líneas se debe a la necesidad de manejar diferentes estados de los comentarios (mostrar, editar, eliminar) de man
---------------------------------------------------------------------------------------------------------------------------------------------
Justificación del Estilo CSS
Exceso de líneas de CSS:

820 líneas de código en CSS: El archivo CSS es más largo de lo esperado debido a que se diseñó una interfaz con detalles estéticos y funcionales. Esto incluye estilos para los modales, los comentarios, las publicaciones, la barra de navegación y otros elementos que requieren interacciones visuales complejas.

Justificación del exceso: La interfaz de usuario fue diseñada para ser dinámica y fácil de usar. Se implementaron transiciones suaves, efectos hover, y una disposición adecuada de los elementos para facilitar la interacción. Estos detalles de diseño aumentaron el número de líneas en el archivo CSS, pero son necesarios para una experiencia de usuario agradable y fluida.
---------------------------------------------------------------------------------------------------------------------------------------------
Funcionalidad General
La aplicación permite a los usuarios realizar las siguientes acciones:

Login: Al iniciar la página, el usuario debe ingresar un nombre que se muestra en el avatar y en la barra de navegación.
Gestión de publicaciones: Los usuarios pueden crear nuevas publicaciones, editar las existentes y eliminar las que ya no deseen.
Gestión de comentarios: Cada publicación puede tener comentarios, que los usuarios pueden agregar, editar o eliminar.
Interactividad: Se implementaron modales y botones interactivos que permiten filtrar publicaciones y gestionar las interacciones de manera eficiente.
---------------------------------------------------------------------------------------------------------------------------------------------
Conclusión
Aunque la cantidad de código sobrepasó las expectativas iniciales, esto se debió a la implementación de diversas funcionalidades para asegurar una experiencia de usuario fluida y una mayor interactividad en la aplicación. Las funciones adicionales que mejoran la usabilidad y las validaciones son esenciales para mantener la integridad de la aplicación y asegurar que los usuarios puedan interactuar con ella sin problemas.
