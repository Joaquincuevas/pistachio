# 🥜 Pistachio

Aplicación web de escritorio para planificar la **malla curricular de Ingeniería Civil** de la Universidad de los Andes. Visualiza ramos, prerrequisitos y avance académico en una sola vista profesional.

> Botánicamente, el pistacho no es un fruto seco: es una drupa, pariente del mango y de la hiedra venenosa.

## Características

- **Inicio de sesión** con validación de correo institucional (`@uandes.cl` / `@miuandes.cl`).
- **Selección de especialidad** (Obras Civiles, Computación, Industrial, Eléctrica, Química) que define los semestres 5–8.
- **Malla curricular** en grilla por semestres, con códigos de color por estado y **resaltado de la cadena de prerrequisitos** al pasar el cursor.
- **Panel de detalle** de cada ramo: descripción, objetivos, contenidos, prerrequisitos, ramos que habilita y selector de estado (Aprobado / Cursando / Pendiente).
- **Seguimiento de progreso** persistente en `localStorage`: avance total, por semestre y por área, con gráfico de distribución.
- **Búsqueda y filtros** en tabla por nombre, código, profesor, semestre, área y estado.
- **Perfil** con estadísticas, cambio de especialidad y cierre de sesión.

## Stack

- React 19 + Vite
- React Router (HashRouter)
- Estado global con Context API + `localStorage`
- Tipografías: Instrument Serif (display) + Inter (UI)

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run preview  # previsualizar el build
```

## Estructura

```
src/
├── App.jsx              # router + rutas protegidas + shell
├── store.jsx           # estado global (sesión, especialidad, progreso)
├── data.js             # malla de las 5 especialidades (8 semestres)
├── ui.jsx              # primitivos: Icon, Button, Modal, Card, etc.
├── components/
│   ├── Sidebar.jsx     # navegación lateral
│   ├── Topbar.jsx      # cabecera de cada vista
│   └── CoursePanel.jsx # panel deslizante de detalle de ramo
└── screens/
    ├── Login.jsx       # ingreso (split-screen)
    ├── Onboarding.jsx  # selección de especialidad
    ├── MallaView.jsx   # grilla de la malla (vista principal)
    ├── Dashboard.jsx   # progreso y analítica
    ├── Search.jsx      # búsqueda con filtros y tabla
    └── Profile.jsx     # perfil y configuración
```
