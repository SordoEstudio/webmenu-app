# WebMenu App

Aplicación web construida con Next.js 14, TypeScript, Material-UI y Tailwind CSS, optimizada para deploy en Vercel.

## 🚀 Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Material-UI (MUI)** - Componentes de UI
- **Tailwind CSS** - Framework de utilidades CSS
- **Vercel** - Plataforma de deploy

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📤 Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Next.js
3. El deploy se realizará automáticamente en cada push a la rama principal

O usa la CLI de Vercel:

```bash
npm i -g vercel
vercel
```

## 📁 Estructura del Proyecto

```
webmenu-app/
├── app/              # App Router de Next.js
│   ├── layout.tsx   # Layout principal
│   ├── page.tsx     # Página principal
│   └── globals.css  # Estilos globales
├── components/       # Componentes reutilizables
│   └── ThemeProvider.tsx
├── public/          # Archivos estáticos
└── ...config files
```

## 🎨 Uso de Material-UI y Tailwind

Este proyecto combina Material-UI y Tailwind CSS. Puedes usar ambos según tus necesidades:

- **Material-UI**: Para componentes complejos y consistentes
- **Tailwind**: Para utilidades rápidas y estilos personalizados
