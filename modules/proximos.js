// ========================================== //
// proximos.js - Pestaña Próximos partidos   //
// ========================================== //

async function loadProximos() {
    const proximosContainer = document.getElementById('proximosContainer');
    proximosContainer.innerHTML = `<div class="status">⏳ Cargando próximos partidos...</div>`;
    
    try {
        const data = await fetchAPI('/partidos'); 
        console.log('Partidos recibidos:', data);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        const ahora = new Date();
        
        // Filtrar partidos que NO han terminado Y que la fecha NO haya pasado
        const proximosPartidos = data.matches
            .filter(match => {
                const fechaPartido = new Date(match.utcDate);
                const haPasado = fechaPartido < ahora; // La fecha del partido ya pasó
                
                // Excluir partidos que ya terminaron O que la fecha ya pasó
                const terminado = match.status === 'FINISHED' || 
                                 match.status === 'AWARDED' || 
                                 match.status === 'CANCELLED' ||
                                 match.status === 'POSTPONED';
                
                // Si está terminado o la fecha ya pasó, no lo mostramos
                if (terminado) return false;
                if (haPasado) return false;
                
                return true;
            })
            .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
        
        if (proximosPartidos.length === 0) {
            proximosContainer.innerHTML = `<div class="status">ℹ️ No hay próximos partidos programados.</div>`;
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
    
    const hoy = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    for (const [date, matchesOfDay] of Object.entries(groupedByDate)) {
        const esHoy = date === hoy;
        
        let headerHTML = '';
        if (esHoy) {
            headerHTML = `
                <div class="proximos-date-header-hoy">
                    <span class="proximos-fire">🔥</span>
                    <span class="proximos-date-text">${date}</span>
                    <span class="proximos-badge-hoy">HOY</span>
                </div>
            `;
        } else {
            headerHTML = `<h3 class="proximos-date-header">📅 ${date}</h3>`;
        }
        
        html += headerHTML;
        
        matchesOfDay.forEach(match => {
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const hora = new Date(match.utcDate).toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            const homeNombre = traducirNombre(homeTeam);
            const awayNombre = traducirNombre(awayTeam);
            
            html += `
                <div class="proximo-card">
                    <span class="proximo-team-left">
                        ${homeNombre}
                        ${getFlag(homeTeam)}
                    </span>
                    <span class="proximo-hora">${hora}</span>
                    <span class="proximo-team-right">
                        ${getFlag(awayTeam)}
                        ${awayNombre}
                    </span>
                </div>
            `;
        });
    }
    
    html += `</div>`;
    proximosContainer.innerHTML = html;
}