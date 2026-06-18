// ========================================== //
// script.js - Toda la lógica de la página   //
// ========================================== //

const container = document.getElementById('groupsContainer');

// ========================================== //
// MAPA DE PAÍSES A BANDERAS                 //
// ========================================== //
const FLAG_MAP = {
    // Grupo A
    'Mexico': 'https://flagcdn.com/mx.svg',
    'South Korea': 'https://flagcdn.com/kr.svg',
    'Czechia': 'https://flagcdn.com/cz.svg',
    'South Africa': 'https://flagcdn.com/za.svg',

    // Grupo B
    'Switzerland': 'https://flagcdn.com/ch.svg',
    'Canada': 'https://flagcdn.com/ca.svg',
    'Bosnia-Herzegovina': 'https://flagcdn.com/ba.svg',
    'Qatar': 'https://flagcdn.com/qa.svg',

    // Grupo C
    'Scotland': 'https://flagcdn.com/gb-sct.svg',
    'Morocco': 'https://flagcdn.com/ma.svg',
    'Brazil': 'https://flagcdn.com/br.svg',
    'Haiti': 'https://flagcdn.com/ht.svg',

    // Grupo D
    'United States': 'https://flagcdn.com/us.svg',
    'Australia': 'https://flagcdn.com/au.svg',
    'Turkey': 'https://flagcdn.com/tr.svg',
    'Paraguay': 'https://flagcdn.com/py.svg',

    // Grupo E
    'Germany': 'https://flagcdn.com/de.svg',
    'Ivory Coast': 'https://flagcdn.com/ci.svg',
    'Ecuador': 'https://flagcdn.com/ec.svg',
    'Curaçao': 'https://flagcdn.com/cw.svg',

    // Grupo F
    'Sweden': 'https://flagcdn.com/se.svg',
    'Japan': 'https://flagcdn.com/jp.svg',
    'Netherlands': 'https://flagcdn.com/nl.svg',
    'Tunisia': 'https://flagcdn.com/tn.svg',

    // Grupo G
    'New Zealand': 'https://flagcdn.com/nz.svg',
    'Iran': 'https://flagcdn.com/ir.svg',
    'Belgium': 'https://flagcdn.com/be.svg',
    'Egypt': 'https://flagcdn.com/eg.svg',

    // Grupo H
    'Uruguay': 'https://flagcdn.com/uy.svg',
    'Saudi Arabia': 'https://flagcdn.com/sa.svg',
    'Spain': 'https://flagcdn.com/es.svg',
    'Cape Verde Islands': 'https://flagcdn.com/cv.svg',

    // Grupo I
    'Norway': 'https://flagcdn.com/no.svg',
    'France': 'https://flagcdn.com/fr.svg',
    'Senegal': 'https://flagcdn.com/sn.svg',
    'Iraq': 'https://flagcdn.com/iq.svg',

    // Grupo J
    'Argentina': 'https://flagcdn.com/ar.svg',
    'Austria': 'https://flagcdn.com/at.svg',
    'Jordan': 'https://flagcdn.com/jo.svg',
    'Algeria': 'https://flagcdn.com/dz.svg',

    // Grupo K
    'Colombia': 'https://flagcdn.com/co.svg',
    'Congo DR': 'https://flagcdn.com/cd.svg',
    'Portugal': 'https://flagcdn.com/pt.svg',
    'Uzbekistan': 'https://flagcdn.com/uz.svg',

    // Grupo L
    'England': 'https://flagcdn.com/gb-eng.svg',
    'Ghana': 'https://flagcdn.com/gh.svg',
    'Panama': 'https://flagcdn.com/pa.svg',
    'Croatia': 'https://flagcdn.com/hr.svg',
};

// ========================================== //
// FUNCIÓN PARA OBTENER LA BANDERA            //
// ========================================== //
function getFlag(countryName) {
    if (!countryName) return '⚽';
    const flagUrl = FLAG_MAP[countryName];
    if (flagUrl) {
        return `<img src="${flagUrl}" alt="${countryName}" class="team-flag-img" />`;
    }
    // Si no está en el mapa, buscar por coincidencia parcial
    const lower = countryName.toLowerCase();
    for (const [key, url] of Object.entries(FLAG_MAP)) {
        if (key.toLowerCase().includes(lower) || lower.includes(key.toLowerCase())) {
            return `<img src="${url}" alt="${key}" class="team-flag-img" />`;
        }
    }
    return '⚽';
}

// ========================================== //
// FUNCIÓN PARA PINTAR LOS GRUPOS             //
// ========================================== //
function renderGroups(data) {
    if (!data || data.length === 0) {
        container.innerHTML = `<div class="status">⚠️ No se encontraron datos de grupos.</div>`;
        return;
    }

    let html = `<div class="groups-grid">`;
    data.forEach(group => {
        const groupName = group.name || 'Grupo';
        const teams = group.teams || [];
        html += `
            <div class="group-card">
                <div class="group-header">
                    <span class="group-name">${groupName}</span>
                    <span class="group-flag">🏁</span>
                </div>
                <table class="table">
                    <thead>
                        <tr><th>#</th><th>Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>Pts</th></tr>
                    </thead>
                    <tbody>
        `;
        const sorted = [...teams].sort((a, b) => b.points - a.points);
        sorted.forEach((team, index) => {
            const position = index + 1;
            let posClass = 'pos';
            if (position === 1) posClass += ' pos-1';
            else if (position === 2) posClass += ' pos-2';
            else if (position === 3) posClass += ' pos-3';
            
            html += `
                <tr>
                    <td class="${posClass}">${position}</td>
                    <td class="team-name">
                        ${getFlag(team.name)}
                        ${team.name || 'Sin nombre'}
                    </td>
                    <td class="stats">${team.played || 0}</td>
                    <td class="stats">${team.won || 0}</td>
                    <td class="stats">${team.drawn || 0}</td>
                    <td class="stats">${team.lost || 0}</td>
                    <td class="stats pts">${team.points || 0}</td>
                </tr>
            `;
        });
        html += `</tbody></table></div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
    container.innerHTML += `<div class="status success" style="margin-top:1rem;">✅ Datos cargados correctamente</div>`;
}

// ========================================== //
// FUNCIÓN PARA MOSTRAR ERRORES               //
// ========================================== //
function showError(message) {
    container.innerHTML = `
        <div class="error-box">
            <div class="status error">❌ Error al cargar los datos</div>
            <p style="text-align:center;color:#94a3b8;margin:1rem 0;">${message}</p>
            <div style="text-align:center;">
                <button class="refresh-btn" onclick="loadData()">🔄 Reintentar</button>
            </div>
        </div>
    `;
}

// ========================================== //
// FUNCIÓN PRINCIPAL PARA CARGAR DATOS        //
// ========================================== //
async function loadData() {
    container.innerHTML = `<div class="status">⏳ Cargando clasificaciones...</div>`;
    
    try {
        const response = await fetch('/.netlify/functions/clasificacion');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        if (data.standings && data.standings.length > 0) {
            const groups = data.standings.map(standing => ({
                name: standing.group || 'Clasificación',
                teams: standing.table.map(entry => ({
                    name: entry.team.name,
                    played: entry.playedGames || 0,
                    won: entry.won || 0,
                    drawn: entry.draw || 0,
                    lost: entry.lost || 0,
                    points: entry.points || 0
                }))
            }));
            renderGroups(groups);
            return;
        }
        
        throw new Error('No se encontraron datos de clasificación');
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Error desconocido al cargar los datos. Verifica tu conexión y la configuración de Netlify.');
    }
}

// ========================================== //
// EJECUTAR AL CARGAR LA PÁGINA              //
// ========================================== //
loadData();