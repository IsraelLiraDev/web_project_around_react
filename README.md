# Around The U.S. (React)

Aplicación web en **React** para compartir lugares con fotos: un perfil de usuario, una galería de tarjetas y ventanas emergentes para editar datos, ver imágenes y confirmar eliminaciones. Es el proyecto del sprint de React del curso de Desarrollo Web de **TripleTen**, migrado de HTML/CSS/JS puro a componentes React con **Vite**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-build%20tool-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-configurado-4B32C3?logo=eslint&logoColor=white)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo funciona la aplicación](#cómo-funciona-la-aplicación)
- [Conceptos de React practicados](#conceptos-de-react-practicados)
- [Próximos pasos](#próximos-pasos)
- [Autor](#autor)

---

## Funcionalidades

- **Perfil de usuario** con nombre, descripción y avatar.
- **Galería de tarjetas** renderizada de forma dinámica a partir de un array de datos (mock data).
- **Dar y quitar «me gusta»** en una tarjeta, con el corazón actualizado al instante.
- **Eliminar tarjeta con confirmación**: una ventana «¿Estás seguro?» evita eliminaciones accidentales.
- **Ventana de imagen**: al hacer clic en la foto de una tarjeta se abre la imagen ampliada con su pie de foto.
- **Ventanas con formularios** para añadir un lugar nuevo, editar el perfil y cambiar la foto del perfil.
- **Ventana emergente reutilizable**: un único componente `Popup` sirve para todos los casos, cambiando solo el título y el contenido.
- **Diseño adaptable (responsive)**, heredado del proyecto original en HTML/CSS (metodología BEM).

## Tecnologías

| Tecnología | Uso |
|---|---|
| [React](https://react.dev/) | Interfaz con componentes funcionales y Hooks |
| [Vite](https://vite.dev/) | Servidor de desarrollo rápido y compilación para producción |
| JavaScript (ES6+) | Lógica de la aplicación |
| HTML5 / CSS3 | Marcado semántico y estilos organizados por bloques (BEM) |
| [ESLint](https://eslint.org/) | Estandarización y revisión del código |

## Cómo ejecutarlo

**Requisitos previos:** [Node.js](https://nodejs.org/) (se recomienda la versión LTS) y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/IsraelLiraDev/web_project_around_react.git

# 2. Entrar en la carpeta del proyecto
cd web_project_around_react

# 3. Instalar las dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Después, abre en el navegador la dirección que aparezca en la terminal (por ejemplo, `http://localhost:3000`).

> **Atención:** si el código del proyecto está dentro de una subcarpeta del repositorio, entra en ella antes de ejecutar `npm install` (por ejemplo, `cd "EUA Afora"`). El `package.json` tiene que estar en la carpeta donde ejecutas los comandos.

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión optimizada para producción en la carpeta `dist/` |
| `npm run preview` | Sirve en local la versión generada por el build |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |

## Estructura del proyecto

```
src/
├── main.jsx                  # Punto de entrada: monta <App /> en #root
├── App.jsx                   # Componente raíz: Header + Main + Footer
├── index.css                 # Importa vendor/ y blocks/ (CSS por bloque BEM)
├── images/                   # Logo, avatar, iconos (SVG/PNG)
├── vendor/                   # normalize.css y fuentes
├── blocks/                   # Un archivo CSS por bloque (page, header, profile, card, popup...)
└── components/
    ├── Header/
    │   └── Header.jsx
    ├── Footer/
    │   └── Footer.jsx
    └── Main/
        ├── Main.jsx          # Estado de las ventanas emergentes y de las tarjetas
        └── components/
            ├── Card/
            │   └── Card.jsx
            └── Popup/
                ├── Popup.jsx             # Estructura común: botón de cerrar + título + contenido
                └── components/
                    ├── NewCard/          # Formulario de lugar nuevo
                    ├── EditProfile/      # Formulario de edición del perfil
                    ├── EditAvatar/       # Formulario de cambio de foto
                    ├── ImagePopup/       # Imagen ampliada con pie de foto
                    └── DeleteConfirmation/  # Botón «Sí» de la confirmación de eliminación
```

La organización sigue un principio sencillo: **cada componente vive junto a los componentes que solo él utiliza**. Por eso `Popup` y `Card` están dentro de `Main`, y los contenidos de las ventanas emergentes están dentro de `Popup`.

## Cómo funciona la aplicación

### Composición de componentes

```
App
├── Header
├── Main
│   ├── Card (una por tarjeta)
│   └── Popup (se renderiza solo cuando hay una ventana abierta)
│       └── NewCard | EditProfile | EditAvatar | ImagePopup | DeleteConfirmation
└── Footer
```

### Un único estado controla las ventanas emergentes

En `Main.jsx` hay un estado `popup`. Cuando vale `null`, no aparece ninguna ventana. Para abrir una, basta con guardar en él un objeto con el título y el contenido:

```jsx
const [popup, setPopup] = useState(null);

const newCardPopup = { title: "New card", children: <NewCard /> };

{popup && (
  <Popup onClose={handleClosePopup} title={popup.title}>
    {popup.children}
  </Popup>
)}
```

Abrir es `setPopup(objeto)`; cerrar es `setPopup(null)`. El componente `Popup` solo existe en el DOM mientras está abierto (renderizado condicional).

Variaciones del mismo componente:

- **Sin título** (`title` nulo): `Popup` aplica el estilo de imagen ampliada.
- **`isConfirmation`**: aplica el estilo compacto de la ventana de confirmación.

### Tarjetas, «me gusta» y eliminación

Las tarjetas viven en un estado (`cards`) inicializado con datos ficticios. Las actualizaciones son **inmutables**: en lugar de modificar el array, se crea uno nuevo.

```jsx
// Me gusta: alterna isLiked solo en la tarjeta pulsada
setCards((cards) =>
  cards.map((card) =>
    card._id === cardId ? { ...card, isLiked: !card.isLiked } : card
  )
);

// Eliminar: devuelve todas las tarjetas, menos la elegida
setCards((cards) => cards.filter((card) => card._id !== cardId));
```

El flujo de eliminación incluye un paso de protección: el botón de la papelera **no borra directamente**; abre la ventana «¿Estás seguro?», y solo el botón «Sí» llama a `handleCardDelete`.

### Imágenes y Vite

Las imágenes que están en `src/` se **importan como módulos**, en lugar de referenciarse con una ruta de texto:

```jsx
import avatar from "../../images/avatar.jpg";
<img src={avatar} alt="Avatar" />
```

De este modo Vite resuelve la ruta correcta y optimiza el archivo en el build.

## Conceptos de React practicados

- Componentes funcionales y composición (`props`, `children`)
- Hook `useState` para el estado de la interfaz y de los datos
- Renderizado condicional (`&&` y operador ternario)
- Renderizado de listas con `map()` y `key` única (`_id`)
- Manejadores de eventos (`onClick`) y funciones pasadas por props
- Actualización inmutable del estado (`map`, `filter`, spread)
- Migración de HTML a JSX (`className`, etiquetas autocerradas, expresiones entre `{}`)
- Organización de carpetas por componente e importación de CSS e imágenes en Vite

## Próximos pasos

- [ ] Validación y envío de los formularios (componentes controlados)
- [ ] Añadir tarjetas nuevas desde el formulario «Lugar nuevo»
- [ ] Editar de verdad el nombre, la descripción y el avatar del perfil
- [ ] Cerrar las ventanas emergentes con la tecla `Esc` y haciendo clic fuera
- [ ] Integración con la API (datos reales en lugar de mock data)
- [ ] Contexto global del usuario (`CurrentUserContext`)
- [ ] Despliegue de la aplicación

## Autor

**Israel Lira**
GitHub: [@IsraelLiraDev](https://github.com/IsraelLiraDev)

Proyecto desarrollado como parte del curso de Desarrollo Web de [TripleTen](https://tripleten.com/).
