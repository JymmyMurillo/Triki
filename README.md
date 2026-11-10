# 🎮 TRIKI — Tres en Raya

**TRIKI** es un videojuego de Tres en Raya (*Tic-Tac-Toe*) desarrollado como proyecto de aprendizaje y práctica de desarrollo frontend moderno, utilizando **React, TypeScript y Vite**.

El proyecto busca ofrecer una experiencia de juego dinámica, atractiva y adaptable a diferentes dispositivos, incorporando modalidades para dos jugadores y partidas contra una inteligencia artificial con distintos niveles de dificultad.

Además de desarrollar el juego, TRIKI es un espacio para aplicar buenas prácticas de programación, organización del código, control de versiones con Git y documentación de proyectos de software.

---

## 📌 Características principales

El proyecto contempla las siguientes funcionalidades:

- **Modo Jugador vs. Jugador:** dos personas pueden jugar en el mismo dispositivo.
- **Modo Jugador vs. CPU:** posibilidad de jugar contra una inteligencia artificial.
- **Niveles de dificultad:**
  - Fácil: movimientos aleatorios.
  - Medio: la CPU intenta ganar o bloquear al jugador.
  - Difícil: utiliza el algoritmo Minimax para seleccionar sus movimientos.
- **Tablero interactivo:** cuadrícula de 3 × 3 con detección de victorias y empates.
- **Marcador de partidas:** registro de victorias y resultados.
- **Persistencia de datos:** almacenamiento local de marcadores y preferencias mediante `localStorage`.
- **Animaciones:** transiciones y efectos visuales durante las partidas.
- **Efectos de sonido:** sonidos para movimientos, victorias, empates e interacciones.
- **Tema claro y oscuro:** opción para cambiar la apariencia de la interfaz.
- **Diseño responsive:** adaptación a computadores, tabletas y dispositivos móviles.

> Algunas funcionalidades pueden encontrarse en desarrollo. Esta lista representa el alcance previsto del proyecto y se actualizará conforme se implementen.

---

## 🛠️ Tecnologías seleccionadas

El proyecto utiliza herramientas y tecnologías del ecosistema JavaScript para construir una aplicación frontend moderna, modular y mantenible.

| Tecnología | Uso dentro del proyecto |
|---|---|
| **React** | Construcción de interfaces mediante componentes reutilizables. |
| **TypeScript** | Tipado estático y mayor seguridad en el desarrollo. |
| **Vite** | Entorno de desarrollo y herramienta de construcción. |
| **CSS3** | Estilos, diseño responsive, animaciones y temas visuales. |
| **Motion** | Animaciones y transiciones de la interfaz. |
| **Lucide React** | Iconografía de la aplicación. |
| **Vitest** | Pruebas unitarias de la lógica del juego. |
| **Web Audio API** | Generación y reproducción de efectos de sonido. |
| **localStorage** | Persistencia de preferencias y marcador en el navegador. |
| **Git y GitHub** | Control de versiones y colaboración. |

### Arquitectura y organización

Se busca mantener una separación clara entre la lógica del juego, los componentes visuales y los servicios de la aplicación.

La estructura propuesta es:

```text
triki/
├── public/
│   └── sounds/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── game/
│   │   ├── scoreboard/
│   │   └── layout/
│   ├── hooks/
│   ├── logic/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Esta estructura puede evolucionar durante el desarrollo según las necesidades del proyecto.

---

## 🚀 Instalación y ejecución local

Sigue estos pasos para descargar el proyecto y ejecutarlo en tu equipo.

### 1. Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/): se recomienda utilizar una versión LTS.
- [npm](https://www.npmjs.com/): administrador de paquetes incluido con Node.js.
- [Git](https://git-scm.com/): sistema de control de versiones.
- Un editor de código, preferiblemente [Visual Studio Code](https://code.visualstudio.com/).

Puedes comprobar las instalaciones ejecutando:

```bash
node -v
npm -v
git --version
```

### 2. Clonar el repositorio

Abre una terminal y ejecuta:

```bash
git clone https://github.com/JymmyMurillo/Triki.git
```

Ingresa a la carpeta del proyecto:

```bash
cd Triki
```

### 3. Instalar dependencias

Instala los paquetes necesarios para ejecutar el proyecto:

```bash
npm install
```

Este comando lee el archivo `package.json` e instala las dependencias del proyecto.

### 4. Ejecutar el servidor de desarrollo

Inicia la aplicación en modo desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección local similar a:

```text
http://localhost:5173/
```

Abre esa dirección en tu navegador para visualizar la aplicación.

### 5. Construir la versión de producción

Cuando quieras generar una versión optimizada del proyecto, ejecuta:

```bash
npm run build
```

Los archivos generados se almacenarán en la carpeta `dist/`.

Para visualizar localmente esa versión de producción:

```bash
npm run preview
```

---

## 🌿 Flujo de trabajo con Git

El proyecto utiliza una estrategia de ramas para organizar el desarrollo y mantener una versión estable.

| Rama | Propósito |
|---|---|
| `main` | Versión estable del proyecto. |
| `develop` | Integración de nuevas funcionalidades. |
| `feature/*` | Desarrollo de funcionalidades específicas. |

### Crear una nueva funcionalidad

Para comenzar a trabajar en una nueva característica:

```bash
git switch develop
git pull origin develop
git switch -c feature/nombre-funcionalidad
```

Realiza los cambios y registra los avances:

```bash
git add .
git commit -m "feat: descripción de la funcionalidad"
```

Publica la rama:

```bash
git push -u origin feature/nombre-funcionalidad
```

Una vez terminada la funcionalidad, se recomienda crear un **Pull Request** hacia `develop` para revisar e integrar los cambios.

---

## 🧪 Pruebas

El proyecto contempla el uso de **Vitest** para realizar pruebas unitarias, especialmente sobre la lógica del juego.

Se busca verificar aspectos como:

- Detección de combinaciones ganadoras.
- Identificación de empates.
- Validación de movimientos.
- Comportamiento de los niveles de dificultad de la CPU.
- Resultados del algoritmo Minimax.

---

## 🎯 Objetivos de aprendizaje

Durante el desarrollo de TRIKI se busca fortalecer conocimientos y habilidades en:

- Desarrollo de aplicaciones con React y TypeScript.
- Diseño de interfaces modernas y adaptables.
- Arquitectura basada en componentes.
- Separación entre lógica de negocio e interfaz de usuario.
- Implementación de algoritmos de inteligencia artificial.
- Gestión del estado y persistencia de información.
- Pruebas unitarias.
- Control de versiones y flujos de trabajo con Git.
- Documentación y despliegue de aplicaciones web.

---

## 📄 Licencia

Este proyecto se desarrolla con fines educativos y de aprendizaje.

La licencia de distribución y uso se definirá posteriormente.

---

## 👨‍💻 Autor

**Jymmy Murillo**

Proyecto personal de aprendizaje y desarrollo frontend.

**Repositorio:** [github.com/JymmyMurillo/Triki](https://github.com/JymmyMurillo/Triki)
