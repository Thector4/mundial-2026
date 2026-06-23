// ========================================== //
// resultados.js - Pestaña Resultados         //
// ========================================== //

async function loadResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `<div class="status">⏳ Cargando resultados...</div>`;
    
    try {
        const data = await fetchAPI('/partidos'); 
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
        html += `<h3 class="results-date-header">📅 ${date}</h3>`;
        
        matchesOfDay.forEach(match => {
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const homeGoals = match.score.fullTime.home ?? '?';
            const awayGoals = match.score.fullTime.away ?? '?';
            
            const homeNombre = traducirNombre(homeTeam);
            const awayNombre = traducirNombre(awayTeam);
            
            html += `
                <div class="result-card">
                    <span class="result-team-left">
                        ${homeNombre}
                        ${getFlag(homeTeam)}
                    </span>
                    <span class="result-score">${homeGoals} - ${awayGoals}</span>
                    <span class="result-team-right">
                        ${getFlag(awayTeam)}
                        ${awayNombre}
                    </span>
                </div>
            `;
        });
    }
    
    html += `</div>`;
    resultsContainer.innerHTML = html;
}