# 🛒 E-commerce Frontend

Este proyecto es el frontend de un e-commerce desarrollado con **React + Vite**, basado en un diseño provisto por el curso.

## 🚀 Funcionalidades implementadas

- Navegación entre rutas con React Router DOM
- Diseño responsive (adaptado a mobile y desktop)
- Páginas completas:
  - `/` Página de inicio con productos destacados
  - `/signin` Formulario de login
  - `/profile` Vista del perfil del usuario
  - `/search?q=` Página de búsqueda de productos
  - `/item/{itemId}` Detalle de producto
  - `/checkout/{itemId}` Inicia el proceso de compra
  - `/thanks` Página de agradecimiento post-pago
  - `/logout` Cierra sesión y redirige a la home

##  ⚙️ Tecnologías

- React + Vite
- TypeScript
- Axios
- React Router DOM
- CSS Modules / Tailwind / estilos propios

## 🔗 Backend

El backend ya se encuentra desarrollado y desplegado. El frontend fue pensado para consumir esta API, aunque **en esta versión actual aún no está completamente integrada**.

> ✅ Está planificado integrar el backend con el frontend en una próxima versión.

## 📦 Cómo correr el proyecto localmente

1. Cloná el repositorio:
```bash
git clone https://github.com/usuario/frontend-ecommerce.git
cd frontend-ecommerce
Instalá dependencias:



Iniciá el servidor de desarrollo:


npm run dev
🚀 Deploy en Vercel
Este proyecto está desplegado en Vercel. Podés verlo en:

🔗 https://frontend-ecommerce.vercel.app

La variable VITE_API_URL está configurada en Vercel para consumir la API correctamente.

📝 Notas
El diseño fue respetado tanto en versión mobile como desktop

Se utilizó una arquitectura simple pero escalable, separando componentes reutilizables

Algunas funcionalidades dinámicas (login, carrito, compra) están preparadas pero no activas por falta de integración con backend

📌 Estado del proyecto
✅ Diseño completado
✅ Navegación funcional
