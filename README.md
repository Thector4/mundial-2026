# 🏆 Mundial 2026 - Clasificación de Grupos

Página web interactiva que muestra la clasificación de los grupos del Mundial 2026 en tiempo real, utilizando la API de [football-data.org](https://www.football-data.org/).

## ✨ Características

- 📊 **Clasificación en tiempo real** de los 12 grupos del Mundial 2026
- ⚽ **Resultados anteriores** con marcadores y fechas
- 🗓️ **Próximos partidos** con indicador "🔥 HOY"
- 🏆 **Árbol de eliminatorias** desde 16avos hasta la final
- 🎮 **Simulador interactivo** para predecir resultados y ver cómo avanza el torneo
- 🎨 Diseño moderno con temática oscura
- 📱 Responsive (funciona en móviles y tablets)
- 🏳️ Banderas de todos los países participantes
- 🌍 Nombres de equipos traducidos al español

## 🚀 Tecnologías

- **HTML5** - Estructura de la página
- **CSS3** - Estilos y diseño (con CSS modules)
- **JavaScript (ES6)** - Lógica y peticiones a la API
- **football-data.org API** - Datos de clasificación, partidos y resultados
- **Netlify Functions** - Backend serverless para proteger la API Key
- **Netlify CLI** - Desarrollo local y despliegue

## 🔒 Seguridad

La API Key de football-data.org está protegida mediante **variables de entorno de Netlify**. Nunca se expone en el código fuente.