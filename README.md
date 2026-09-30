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

---

## 🌟 Descripción del Proyecto

**TechStore IDT** es una plataforma de comercio electrónico interactiva desarrollada desde cero para el proyecto final integrador. Permite explorar un catálogo dinámico de productos traídos en tiempo real desde una API externa (`FakeStoreAPI`), filtrar por categorías, buscar productos en tiempo real, ver detalles en modal, agregar productos a un carrito persistente (`localStorage`), modificar cantidades, calcular subtotal, impuestos y envío gratis, y simular la finalización de compra.

---

## 🎯 Objetivos Cumplidos

Siguiendo lo mencionado en la clase y pdf **CLASE**:

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
