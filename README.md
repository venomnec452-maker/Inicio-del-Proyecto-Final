# 🛒 TechStore IDT - Proyecto Integrador Final de Frontend

> **Curso:** Frontend / FullStack - Grupo iDT  
> **Tema:** Maquetación, diseño responsivo, interactividad con JavaScript, consumo de APIs y control de versiones con Git/GitHub.

---

## 📋 Tabla de Contenidos
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Objetivos Cumplidos (PDF)](#objetivos-cumplidos)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Guía Paso a Paso para Ejecutar el Proyecto](#guía-paso-a-paso-para-ejecutar-el-proyecto)
6. [Flujo de Trabajo con Git y GitHub (Paso a Paso)](#flujo-de-trabajo-con-git-y-github)
7. [Cómo Explicar el Proyecto en la Presentación Final](#cómo-explicar-el-proyecto-en-la-presentación-final)

---

## 🌟 Descripción del Proyecto

**TechStore IDT** es una plataforma de comercio electrónico interactiva desarrollada desde cero para el proyecto final integrador. Permite explorar un catálogo dinámico de productos traídos en tiempo real desde una API externa (`FakeStoreAPI`), filtrar por categorías, buscar productos en tiempo real, ver detalles en modal, agregar productos a un carrito persistente (`localStorage`), modificar cantidades, calcular subtotal, impuestos y envío gratis, y simular la finalización de compra.

---

## 🎯 Objetivos Cumplidos

Siguiendo estrictamente los **Criterios de la Clase como de la Diapositiva**:

- [x] **Estructura HTML semántica y accesible:** Uso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`, junto con roles ARIA, etiquetas descriptivas y navegación por teclado.
- [x] **Diseño responsivo bien implementado:** Maquetación mobile-first adaptada a pantallas móviles (375px+), tablets y computadoras de escritorio mediante el sistema de Grid y Flexbox de **Tailwind CSS**.
- [x] **Código limpio y bien comentado:** Estructura modular (`app.js`, `cart.js`, `styles.css`) con separación de responsabilidades y comentarios didácticos en cada función.
- [x] **Uso eficiente de Git/GitHub:** Repositorio inicializado con `.gitignore`, commits atómicos descriptivos, y uso de ramas para nuevas funcionalidades (`git checkout -b`).
- [x] **Interactividad con JavaScript:** Consumo de API REST asíncrona con `async/await` y `fetch()`, manipulación del DOM, eventos reactivos (`click`, `input`, `change`, `keydown`) y persistencia de datos con `localStorage`.

---

## 📁 Estructura del Proyecto

```plaintext
FS-4-TM-25/
├── .gitignore               # Excluye node_modules, dist, .env del repositorio (Slide 13)
├── README.md                # Documentación y guía didáctica completa
├── index.html               # Estructura semántica principal y maquetación con Tailwind CSS
├── css/
│   └── styles.css           # Estilos adicionales, animaciones y scrollbar personalizado
├── js/
│   ├── app.js               # Lógica principal: fetch de API, renderizado dinámico, filtros y búsqueda
│   └── cart.js              # Módulo del carrito: cálculo de totales, LocalStorage y eventos
└── assets/                  # Directorio para recursos estáticos e imágenes locales
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Marcado semántico para SEO y accesibilidad.
- **Tailwind CSS (v3.4 CDN):** Framework de utilidades para estilizado ágil y diseño responsive.
- **CSS3:** Keyframes para animaciones personalizadas (fade-in, slide-in, rebote de badge).
- **JavaScript (ES6+):** Módulos nativos (`import`/`export`), `async/await`, `fetch()`, `localStorage`, Array Methods (`map`, `filter`, `reduce`).
- **FakeStoreAPI:** API REST pública para catálogo de productos (con fallback local automático para uso sin conexión).
- **Git & GitHub:** Sistema de control de versiones distribuido.

---

## 🚀 Guía Paso a Paso para Ejecutar el Proyecto

### Opción 1: Abrir directamente en el navegador (Sin instalación)
1. Ve a la carpeta del proyecto en tu explorador de archivos.
2. Haz doble clic en el archivo `index.html`.
3. ¡Listo! Se abrirá en tu navegador predeterminado (Chrome, Edge, Firefox).

### Opción 2: Usando VS Code y Live Server (Recomendado para desarrollo)
1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Si tienes la extensión **Live Server** instalada, haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

---

## 🐙 Flujo de Trabajo con Git y GitHub (Paso a Paso)

Este flujo aplica exactamente las diapositivas **10, 11, 12 y 13** del curso:

### Paso 1: Configurar archivos a ignorar (`.gitignore` - Diapositiva 13)
El archivo `.gitignore` ya está creado e ignora:
```gitignore
node_modules/
dist/
.env
```

### Paso 2: Inicializar el proyecto y primer commit (Diapositiva 10)
Abre tu terminal (PowerShell o Git Bash) en la carpeta del proyecto y ejecuta:
```bash
git init
git add .
git commit -m "Inicio del Proyecto Final"
```

### Paso 3: Trabajar con ramas para nuevas funcionalidades (Diapositiva 12)
Para añadir cambios de forma ordenada y profesional:
```bash
# Crear y cambiar a una rama de funcionalidad
git checkout -b feature/maquetacion-y-carrito

# Realizar modificaciones y guardar un commit
git add .
git commit -m "feat: implementar catalogo dinamico con api y carrito funcional"

# Volver a la rama principal e integrar los cambios
git checkout main
git merge feature/maquetacion-y-carrito
```

### Paso 4: Subir tu proyecto a tu repositorio de GitHub (Diapositiva 11)
1. Ingresa a [GitHub](https://github.com/) e inicia sesión.
2. Haz clic en el botón verde **"New"** para crear un nuevo repositorio (por ejemplo: `proyecto-final-frontend`).
3. No marques la opción de inicializar con README (ya tenemos uno local).
4. Copia los comandos que te da GitHub y ejecútalos en tu terminal:
```bash
# Vincular con tu repositorio remoto (reemplaza 'tu-usuario' y 'tu-repo')
git remote add origin https://github.com/tu-usuario/proyecto-final-frontend.git

# Renombrar la rama a main y subir los cambios
git branch -M main
git push -u origin main
```

---

## 🎤 Cómo Explicar el Proyecto en la Presentación Final (Diapositiva 14 y 15)

Cuando te toque exponer ante el profesor y tus compañeros, te sugerimos seguir este orden de 4 a 5 minutos:

1. **Introducción (30 segundos):**
   - *"Buenas tardes profesor y compañeros. Hoy les presento TechStore IDT, una aplicación web de comercio electrónico desarrollada como proyecto final integrador del módulo de Frontend."*
2. **Estructura y Maquetación (1 minuto):**
   - Explica el uso de **HTML5 semántico** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
   - Muestra cómo la página se adapta perfectamente si cambias el tamaño de pantalla a móvil y tableta gracias a **Tailwind CSS** (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
3. **Interactividad y JavaScript (2 minutos):**
   - **Consumo de API:** Muestra la consola del navegador y explica cómo `fetchProducts()` utiliza `async/await` para traer los datos desde una API REST externa, y cómo cuenta con un fallback local para garantizar que nunca falle si no hay internet.
   - **Búsqueda y Filtros en tiempo real:** Escribe en la barra de búsqueda y haz clic en las pestañas de categorías para ver el filtrado reactivo.
   - **Carrito de compras:** Agrega un par de productos, muestra cómo el badge numérico del navbar se anima, abre el panel lateral, cambia cantidades con los botones `+` y `-`, y muestra cómo se actualizan los subtotales e impuestos en tiempo real.
   - **Persistencia:** Recarga la página (`F5`) y muestra con orgullo que el carrito sigue guardado gracias a `localStorage`.
   - **Finalizar Compra:** Haz clic en *"Finalizar Compra"* para mostrar el modal de confirmación.
4. **Versionado con Git (30 segundos):**
   - Menciona el uso de `git init`, el archivo `.gitignore` protegiendo dependencias y variables de entorno, los commits descriptivos y el desarrollo ordenado mediante ramas (`git checkout -b`).
5. **Conclusión:**
   - Cierra agradeciendo el feedback y destacando que el proyecto cumple al 100% con los criterios de la rúbrica.
