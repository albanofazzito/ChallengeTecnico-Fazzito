# JuegoContador

Un juego simple en React donde los usuarios compiten contra sí mismos intentando hacer la mayor cantidad de clicks posibles en 5 segundos.

## Demo rápida

```
Iniciar → Preparados → Listos → ¡Ya! → [5 segundos para clickear] → Resultado
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior (incluido con Node.js)

---

## Cómo correr el proyecto localmente

### 1. Crear el proyecto base con Vite

```bash
npm create vite@latest juego-contador -- --template react
cd juego-contador
```

### 2. Reemplazar el componente principal

Copiar el archivo `JuegoContador.jsx` de este repositorio dentro de `src/`:

```
src/
└── JuegoContador.jsx   ← pegar aquí el archivo
```

Luego editar `src/App.jsx` para que use el componente:

```jsx
import JuegoContador from './JuegoContador';

function App() {
  return <JuegoContador />;
}

export default App;
```

### 3. Instalar dependencias y correr

```bash
npm install
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Estructura del componente

```
JuegoContador.jsx
├── Estados internos
│   ├── phase          — 'idle' | 'countdown' | 'playing' | 'finished'
│   ├── countdownStep  — 0 (Preparados) | 1 (Listos) | 2 (¡Ya!)
│   ├── clicks         — contador actual de la ronda
│   ├── timeLeft       — segundos restantes (0–5)
│   └── maxScore       — puntaje máximo histórico de la sesión
│
└── Flujo de juego
    ├── Idle     → usuario presiona Iniciar
    ├── Countdown → 3 mensajes con delay de 1s cada uno
    ├── Playing  → botón habilitado 5 segundos, timer visual
    └── Finished → se compara con maxScore, se habilita reinicio
```

---

## Decisiones de diseño y supuestos

### Gestión del timer
Se usa `useRef` para mantener una referencia mutable al contador de clicks (`clicksRef`) dentro del closure del intervalo. Esto evita el problema clásico de stale closures con `useState` en `setInterval`, garantizando que el valor leído al finalizar el juego sea siempre el correcto.

### Separación de responsabilidades
El hook personalizado `useGameTimer` encapsula la lógica de los intervalos, separándola del renderizado. Esto mejora la legibilidad y facilita el testing unitario futuro.

### Puntaje máximo
El `maxScore` se mantiene en estado de React y persiste únicamente durante la sesión actual (se reinicia al recargar la página). No se implementó persistencia en `localStorage` ya que el enunciado no lo requiere explícitamente, pero sería una extensión natural.

### Countdown
Los mensajes del countdown son `"Preparados"`, `"Listos"` y `"¡Ya!"` con intervalos de 1 segundo entre ellos. Al mostrarse `"¡Ya!"` el temporizador de 5 segundos comienza de inmediato.

### Accesibilidad básica
Los botones reflejan su estado disabled tanto visualmente (color, cursor) como a nivel semántico HTML (`disabled`), lo que los hace correctamente interpretados por lectores de pantalla.

### Estilos
No se utilizó ninguna librería de componentes externa (como MUI). El estilo está implementado con inline styles usando las CSS variables del sistema de diseño del entorno, garantizando compatibilidad con modo oscuro/claro de forma automática.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el bundle de producción en `/dist` |
| `npm run preview` | Sirve el build de producción localmente |
