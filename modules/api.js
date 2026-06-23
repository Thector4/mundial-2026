// ========================================== //
// api.js - Configuración de la API          //
// ========================================== //

async function fetchAPI(endpoint) {
    // endpoint es '/clasificacion' o '/partidos'
    console.log(`Llamando a Netlify Function: ${endpoint}`);
    const response = await fetch(`/.netlify/functions${endpoint}`);
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}