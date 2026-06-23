// ========================================== //
// clasificacion.js - Pestaña Clasificación  //
// ========================================== //

function renderGroups(data) {
    const container = document.getElementById('groupsContainer');
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
                    <div class="group-name" style="width:100%; text-align:center;">${groupName}</div>
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
            
            const nombreTraducido = traducirNombre(team.name);
            
            html += `
                <tr>
                    <td class="${posClass}">${position}</td>
                    <td class="team-name">
                        ${getFlag(team.name)}
                        ${nombreTraducido || 'Sin nombre'}
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

function showError(message) {
    const container = document.getElementById('groupsContainer');
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

async function loadData() {
    const container = document.getElementById('groupsContainer');
    container.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">⏳ Cargando clasificaciones...</div>
        </div>
    `;
    
    try {
        const data = await fetchAPI('/clasificacion');
        console.log('Clasificación recibida:', data);
        
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
        showError(error.message || 'Error desconocido al cargar los datos.');
    }
}