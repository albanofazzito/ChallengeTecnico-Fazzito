# 🎮 JuegoContador

Aplicación web desarrollada en React como parte de un desafío técnico para el puesto de **Frontend React Junior**.

## 🧩 Descripción

Juego simple en el que el usuario debe hacer la mayor cantidad de clicks posible en un botón durante un período de 5 segundos.

El flujo del juego es el siguiente:

1. El usuario presiona el botón **"Iniciar"**
2. Se muestra una cuenta regresiva:

   * "Preparados"
   * "Listos"
   * "Ya"
3. Durante 5 segundos:

   * Se habilita el botón **"Click!"**
   * Se muestra el tiempo restante
   * Se contabilizan los clicks
4. Finalizado el tiempo:

   * Se deshabilita el botón de clicks
   * Se actualiza el puntaje máximo si corresponde

## ⚙️ Tecnologías utilizadas

* React (Hooks)
* JavaScript
* HTML + CSS básico

## 🚀 Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Acceder a la carpeta del proyecto:

```bash
cd JuegoContador
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar la aplicación:

```bash
npm run dev
```

5. Abrir en el navegador:

```
http://localhost:5173
```

## 🧠 Decisiones de implementación

* Se utilizaron **componentes funcionales** con hooks (`useState`, `useEffect`)
* Se manejó el flujo del juego mediante un estado central (`status`)
* Se utilizaron `setTimeout` para la cuenta regresiva inicial
* Se utilizó `setTimeout` controlado para el temporizador del juego
* Se evitó el uso de estados redundantes para mejorar la mantenibilidad

## 🔘 Control de botones

* El botón **"Iniciar"** solo está habilitado cuando el juego no está en curso
* El botón **"Click!"** solo está habilitado durante los 5 segundos del juego
* Nunca ambos botones están habilitados al mismo tiempo

## ✨ Posibles mejoras

* Persistir el récord usando `localStorage`
* Agregar animaciones al countdown
* Incorporar barra de progreso visual
* Mejorar estilos con una librería como Material UI
* Agregar efectos de sonido

## 📌 Consideraciones

* Se asumió que el usuario puede reiniciar el juego múltiples veces
* No se implementó persistencia del puntaje entre sesiones
* Se priorizó claridad y simplicidad en la lógica

---

## 👨‍💻 Autor

Desarrollado como parte de un desafío técnico.
