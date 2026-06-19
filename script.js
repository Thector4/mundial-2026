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
                    <span class="group-name"><center>${groupName}</center></span>
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
}

// ========================================== //
// FUNCIÓN PARA MOSTRAR ERRORES               //
// ========================================== //
function showError(message) {
    container.innerHTML = `
        <div class="error-box">
            <div class="status error">Error al cargar los datos</div>
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
    container.innerHTML = `<div class="status">Cargando clasificaciones...</div>`;
    
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
// FUNCIÓN PARA CARGAR RESULTADOS             //
// ========================================== //
async function loadResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `<div class="status">Cargando resultados...</div>`;
    
    try {
        const response = await fetch('/.netlify/functions/partidos');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Partidos recibidos:', data);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        const finishedMatches = data.matches
            .filter(match => match.status === 'FINISHED')
            .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate));
        
        if (finishedMatches.length === 0) {
            resultsContainer.innerHTML = `<div class="status">ℹ️ No hay resultados disponibles todavía.</div>`;
            return;
        }
        
        renderResults(finishedMatches);
        
    } catch (error) {
        console.error('Error al cargar resultados:', error);
        resultsContainer.innerHTML = `
            <div class="status error">
                ❌ Error al cargar los resultados: ${error.message}
                <br><br>
                <button class="refresh-btn" onclick="loadResults()">🔄 Reintentar</button>
            </div>
        `;
    }
}

// ========================================== //
// FUNCIÓN PARA PINTAR RESULTADOS             //
// ========================================== //
function renderResults(matches) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    const groupedByDate = {};
    matches.forEach(match => {
        const date = new Date(match.utcDate).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (!groupedByDate[date]) {
            groupedByDate[date] = [];
        }
        groupedByDate[date].push(match);
    });
    
    let html = `<div class="results-list">`;
    
    for (const [date, matchesOfDay] of Object.entries(groupedByDate)) {
        html += `<h3 class="results-date-header"> ${date}</h3>`;
        
        matchesOfDay.forEach(match => {
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const homeGoals = match.score.fullTime.home ?? '?';
            const awayGoals = match.score.fullTime.away ?? '?';
            
            html += `
                <div class="result-card">
                    <span class="result-team-left">
                        ${homeTeam}
                        ${getFlag(homeTeam)}
                    </span>
                    <span class="result-score">${homeGoals} - ${awayGoals}</span>
                    <span class="result-team-right">
                        ${getFlag(awayTeam)}
                        ${awayTeam}
                    </span>
                </div>
            `;
        });
    }
    
    html += `</div>`;
    resultsContainer.innerHTML = html;
}

// ========================================== //
// FUNCIÓN PARA CARGAR PRÓXIMOS PARTIDOS      //
// ========================================== //
async function loadProximos() {
    const proximosContainer = document.getElementById('proximosContainer');
    proximosContainer.innerHTML = `<div class="status">Cargando próximos partidos...</div>`;
    
    try {
        const response = await fetch('/.netlify/functions/partidos');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Partidos recibidos:', data);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Fecha y hora ACTUALES (para filtrar partidos FUTUROS)
        const ahora = new Date();
        
        // Fecha límite: 3 días después (hoy + 2 días)
        const limite = new Date(ahora);
        limite.setDate(limite.getDate() + 2);
        limite.setHours(23, 59, 59, 999);
        
        // Filtrar partidos que aún NO han empezado (fecha > ahora) y dentro del límite
        const proximosPartidos = data.matches
            .filter(match => {
                const fechaPartido = new Date(match.utcDate);
                // Solo partidos futuros (aún no han empezado) y dentro del límite
                return fechaPartido > ahora && fechaPartido <= limite;
            })
            .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate)); // Más próximo primero
        
        if (proximosPartidos.length === 0) {
            proximosContainer.innerHTML = `<div class="status">ℹ️ No hay próximos partidos en los próximos 3 días.</div>`;
            return;
        }
        
        renderProximos(proximosPartidos);
        
    } catch (error) {
        console.error('Error al cargar próximos partidos:', error);
        proximosContainer.innerHTML = `
            <div class="status error">
                ❌ Error al cargar los próximos partidos: ${error.message}
                <br><br>
                <button class="refresh-btn" onclick="loadProximos()">🔄 Reintentar</button>
            </div>
        `;
    }
}

// ========================================== //
// FUNCIÓN PARA PINTAR PRÓXIMOS PARTIDOS      //
// ========================================== //
function renderProximos(matches) {
    const proximosContainer = document.getElementById('proximosContainer');
    
    const groupedByDate = {};
    matches.forEach(match => {
        const date = new Date(match.utcDate).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (!groupedByDate[date]) {
            groupedByDate[date] = [];
        }
        groupedByDate[date].push(match);
    });
    
    let html = `<div class="proximos-list">`;
    
    for (const [date, matchesOfDay] of Object.entries(groupedByDate)) {
        html += `<h3 class="proximos-date-header"> ${date}</h3>`;
        
        matchesOfDay.forEach(match => {
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const hora = new Date(match.utcDate).toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            html += `
                <div class="proximo-card">
                    <span class="proximo-team-left">
                        ${homeTeam}
                        ${getFlag(homeTeam)}
                    </span>
                    <span class="proximo-hora">${hora}</span>
                    <span class="proximo-team-right">
                        ${getFlag(awayTeam)}
                        ${awayTeam}
                    </span>
                </div>
            `;
        });
    }
    
    html += `</div>`;
    proximosContainer.innerHTML = html;
}

// ========================================== //
// FUNCIÓN PARA CAMBIAR DE PESTAÑA            //
// ========================================== //
let currentTab = 'clasificacion';

function switchTab(tab) {
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const targetPanel = document.getElementById(`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
    if (targetPanel) {
        targetPanel.style.display = 'block';
    }
    
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    const subtitles = {
        'clasificacion': 'Clasificación de los grupos',
        'resultados': 'Resultados de los partidos',
        'proximos': 'Próximos partidos',
        'videos': 'Vídeos destacados'
    };
    document.getElementById('pageSubtitle').textContent = subtitles[tab] || '';
    
    currentTab = tab;
    
    if (tab === 'resultados' && !window.resultsLoaded) {
        loadResults();
        window.resultsLoaded = true;
    }
    
    if (tab === 'proximos' && !window.proximosLoaded) {
        loadProximos();
        window.proximosLoaded = true;
    }
}

// ========================================== //
// EJECUTAR AL CARGAR LA PÁGINA              //
// ========================================== //
document.addEventListener('DOMContentLoaded', function() {
    switchTab('clasificacion');
    loadData();
});