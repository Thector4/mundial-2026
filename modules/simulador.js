// ========================================== //
// simulador.js - Simulador de eliminatorias //
// ========================================== //

// ========================================== //
// DEFINICIONES DE CRUCES                     //
// ========================================== //

const CRUCES_16AVOS_IZQ_SIM = [
    { id: 'E1', local: '2º Group A', visitante: '2º Group B', fecha: '28 de junio', hora: '21:00' },
    { id: 'E2', local: '1º Group C', visitante: '2º Group F', fecha: '29 de junio', hora: '19:00' },
    { id: 'E3', local: '1º Group E', visitante: '3º Group A/B/C/D/F', fecha: '29 de junio', hora: '22:30' },
    { id: 'E4', local: '1º Group F', visitante: '2º Group C', fecha: '30 de junio', hora: '03:00' },
    { id: 'E5', local: '1º Group A', visitante: '3º Group C/E/F/H/I', fecha: '1 de julio', hora: '03:00' },
    { id: 'E6', local: '1º Group L', visitante: '3º Group E/H/I/J/K', fecha: '1 de julio', hora: '18:00' },
    { id: 'E7', local: '1º Group G', visitante: '3º Group A/E/H/I/J', fecha: '1 de julio', hora: '22:00' },
    { id: 'E8', local: '2º Group K', visitante: '2º Group L', fecha: '2 de julio', hora: '01:00' }
];

const CRUCES_16AVOS_DER_SIM = [
    { id: 'E9', local: '2º Group E', visitante: '2º Group I', fecha: '30 de junio', hora: '19:00' },
    { id: 'E10', local: '1º Group I', visitante: '3º Group C/D/F/G/H', fecha: '30 de junio', hora: '23:00' },
    { id: 'E11', local: '1º Group D', visitante: '3º Group B/E/F/I/J', fecha: '2 de julio', hora: '02:00' },
    { id: 'E12', local: '1º Group B', visitante: '3º Group E/F/G/I/J', fecha: '2 de julio', hora: '05:00' },
    { id: 'E13', local: '1º Group H', visitante: '2º Group J', fecha: '2 de julio', hora: '21:00' },
    { id: 'E14', local: '1º Group J', visitante: '2º Group H', fecha: '3 de julio', hora: '00:00' },
    { id: 'E15', local: '1º Group K', visitante: '3º Group D/E/I/J/L', fecha: '3 de julio', hora: '03:30' },
    { id: 'E16', local: '2º Group D', visitante: '2º Group G', fecha: '3 de julio', hora: '20:00' }
];

const CRUCES_OCTAVOS_SIM = [
    { id: 'A', local: 'Ganador E1', visitante: 'Ganador E3', fecha: '4 de julio', hora: '19:00' },
    { id: 'B', local: 'Ganador E2', visitante: 'Ganador E4', fecha: '4 de julio', hora: '23:00' },
    { id: 'C', local: 'Ganador E5', visitante: 'Ganador E6', fecha: '5 de julio', hora: '22:00' },
    { id: 'D', local: 'Ganador E7', visitante: 'Ganador E8', fecha: '6 de julio', hora: '02:00' },
    { id: 'E', local: 'Ganador E9', visitante: 'Ganador E10', fecha: '6 de julio', hora: '21:00' },
    { id: 'F', local: 'Ganador E11', visitante: 'Ganador E12', fecha: '7 de julio', hora: '02:00' },
    { id: 'G', local: 'Ganador E13', visitante: 'Ganador E14', fecha: '7 de julio', hora: '18:00' },
    { id: 'H', local: 'Ganador E15', visitante: 'Ganador E16', fecha: '7 de julio', hora: '22:00' }
];

const CRUCES_CUARTOS_SIM = [
    { id: 'I', local: 'Ganador A', visitante: 'Ganador B', fecha: '9 de julio', hora: '22:00' },
    { id: 'J', local: 'Ganador C', visitante: 'Ganador D', fecha: '10 de julio', hora: '21:00' },
    { id: 'K', local: 'Ganador E', visitante: 'Ganador F', fecha: '11 de julio', hora: '23:00' },
    { id: 'L', local: 'Ganador G', visitante: 'Ganador H', fecha: '11 de julio', hora: '03:00' }
];

const CRUCES_SEMIFINALES_SIM = [
    { id: 'M', local: 'Ganador I', visitante: 'Ganador J', fecha: '14 de julio', hora: '21:00' },
    { id: 'N', local: 'Ganador K', visitante: 'Ganador L', fecha: '15 de julio', hora: '21:00' }
];

const FINAL_SIM = {
    id: 'FINAL',
    local: 'Ganador M',
    visitante: 'Ganador N',
    fecha: '19 de julio',
    hora: '21:00'
};

const AVANZAN_SIM = {
    'E1': 'A', 'E3': 'A',
    'E2': 'B', 'E4': 'B',
    'E5': 'C', 'E6': 'C',
    'E7': 'D', 'E8': 'D',
    'E9': 'E', 'E10': 'E',
    'E11': 'F', 'E12': 'F',
    'E13': 'G', 'E14': 'G',
    'E15': 'H', 'E16': 'H',
    'A': 'I', 'B': 'I',
    'C': 'J', 'D': 'J',
    'E': 'K', 'F': 'K',
    'G': 'L', 'H': 'L',
    'I': 'M', 'J': 'M',
    'K': 'N', 'L': 'N',
    'M': 'FINAL', 'N': 'FINAL'
};

let estadoSimulador = {};

// ========================================== //
// COPIAR ESTADO DE ELIMINATORIAS            //
// ========================================== //

function cargarEstadoDeEliminatorias() {
    if (window.estadoPartidosCompartido && Object.keys(window.estadoPartidosCompartido).length > 0) {
        console.log('📋 Copiando equipos desde eliminatorias.js...');
        estadoSimulador = JSON.parse(JSON.stringify(window.estadoPartidosCompartido));
        
        // REINICIAR COMPLETAMENTE TODOS LOS PARTIDOS
        Object.keys(estadoSimulador).forEach(id => {
            if (estadoSimulador[id]) {
                estadoSimulador[id].ganador = null;
                estadoSimulador[id].estado = 'no_jugado';
                estadoSimulador[id].marcadorLocal = null;
                estadoSimulador[id].marcadorVisitante = null;
                // Asegurar que los nombres reales son los que vienen de eliminatorias
                // pero sin los "Ganador" si es necesario
                if (estadoSimulador[id].localReal && estadoSimulador[id].localReal.includes('Ganador')) {
                    estadoSimulador[id].localReal = estadoSimulador[id].local;
                }
                if (estadoSimulador[id].visitanteReal && estadoSimulador[id].visitanteReal.includes('Ganador')) {
                    estadoSimulador[id].visitanteReal = estadoSimulador[id].visitante;
                }
            }
        });
        return true;
    }
    return false;
}

// ========================================== //
// SELECCIONAR GANADOR                       //
// ========================================== //

function seleccionarGanador(partidoId, ganador) {
    console.log(`🏆 Seleccionando ganador de ${partidoId}: ${ganador}`);
    
    if (!estadoSimulador[partidoId]) return;
    if (estadoSimulador[partidoId].ganador === ganador) return;

    const partido = estadoSimulador[partidoId];
    const local = partido.localReal || partido.local;
    const visitante = partido.visitanteReal || partido.visitante;

    if (local === 'POR DEFINIR' || visitante === 'POR DEFINIR') return;
    if (local.includes('Ganador') || visitante.includes('Ganador')) return;

    // Asignar ganador con marcador 1-0 o 0-1
    partido.ganador = ganador;
    partido.estado = 'finalizado';
    partido.marcadorLocal = ganador === 'local' ? 1 : 0;
    partido.marcadorVisitante = ganador === 'visitante' ? 1 : 0;

    // Propagar al siguiente partido
    const siguienteId = AVANZAN_SIM[partidoId];
    if (siguienteId && estadoSimulador[siguienteId]) {
        const siguiente = estadoSimulador[siguienteId];
        const ganadorNombre = ganador === 'local' ? local : visitante;
        
        if (siguiente.localReal === `Ganador ${partidoId}` || 
            siguiente.localReal === `Ganador ${partido.id}` ||
            siguiente.localReal === 'Ganador ' + partidoId) {
            siguiente.localReal = ganadorNombre;
            siguiente.estado = 'no_jugado';
            siguiente.marcadorLocal = null;
            siguiente.marcadorVisitante = null;
            siguiente.ganador = null;
        } else if (siguiente.visitanteReal === `Ganador ${partidoId}` || 
                   siguiente.visitanteReal === `Ganador ${partido.id}` ||
                   siguiente.visitanteReal === 'Ganador ' + partidoId) {
            siguiente.visitanteReal = ganadorNombre;
            siguiente.estado = 'no_jugado';
            siguiente.marcadorLocal = null;
            siguiente.marcadorVisitante = null;
            siguiente.ganador = null;
        }
    }

    renderSimulador();
}

// ========================================== //
// DESELECCIONAR GANADOR                     //
// ========================================== //

function deseleccionarGanador(partidoId) {
    console.log(`🔄 Deseleccionando ganador de ${partidoId}`);
    
    if (!estadoSimulador[partidoId]) return;
    if (!estadoSimulador[partidoId].ganador) return;

    const partido = estadoSimulador[partidoId];
    const local = partido.localReal;
    const visitante = partido.visitanteReal;

    // Reiniciar el partido
    partido.ganador = null;
    partido.estado = 'no_jugado';
    partido.marcadorLocal = null;
    partido.marcadorVisitante = null;

    // Buscar y limpiar el partido siguiente
    const siguienteId = AVANZAN_SIM[partidoId];
    if (siguienteId && estadoSimulador[siguienteId]) {
        const siguiente = estadoSimulador[siguienteId];
        if (siguiente.localReal === local || siguiente.localReal === visitante) {
            siguiente.localReal = siguiente.local;
            siguiente.estado = 'no_jugado';
            siguiente.ganador = null;
            siguiente.marcadorLocal = null;
            siguiente.marcadorVisitante = null;
        }
        if (siguiente.visitanteReal === local || siguiente.visitanteReal === visitante) {
            siguiente.visitanteReal = siguiente.visitante;
            siguiente.estado = 'no_jugado';
            siguiente.ganador = null;
            siguiente.marcadorLocal = null;
            siguiente.marcadorVisitante = null;
        }
    }

    // Limpiar todos los partidos dependientes
    const ids = ['I', 'J', 'K', 'L', 'M', 'N', 'FINAL'];
    ids.forEach(id => {
        if (estadoSimulador[id]) {
            const p = estadoSimulador[id];
            if (p.localReal && p.localReal.includes('Ganador')) {
                p.localReal = p.local;
                p.estado = 'no_jugado';
                p.ganador = null;
                p.marcadorLocal = null;
                p.marcadorVisitante = null;
            }
            if (p.visitanteReal && p.visitanteReal.includes('Ganador')) {
                p.visitanteReal = p.visitante;
                p.estado = 'no_jugado';
                p.ganador = null;
                p.marcadorLocal = null;
                p.marcadorVisitante = null;
            }
        }
    });

    renderSimulador();
}

// ========================================== //
// RENDERIZAR SIMULADOR                      //
// ========================================== //

function renderSimulador() {
    const container = document.getElementById('simuladorContainer');
    if (!container) {
        console.error('❌ No se encontró el contenedor #simuladorContainer');
        return;
    }
    
    if (!estadoSimulador || Object.keys(estadoSimulador).length === 0) {
        container.innerHTML = `<div class="status">⚠️ No hay datos para el simulador.</div>`;
        return;
    }

    function partidoSimuladorHTML(partido, esFinal = false) {
        const local = partido.localReal || partido.local || 'POR DEFINIR';
        const visitante = partido.visitanteReal || partido.visitante || 'POR DEFINIR';
        const localNombre = traducirNombre(local);
        const visitanteNombre = traducirNombre(visitante);
        const localFlag = getFlag(local);
        const visitanteFlag = getFlag(visitante);
        
        const esGanadorLocal = partido.ganador === 'local';
        const esGanadorVisitante = partido.ganador === 'visitante';
        const estaFinalizado = partido.estado === 'finalizado';
        const estaPorDefinir = local === 'POR DEFINIR' || visitante === 'POR DEFINIR' ||
                               local.includes('Ganador') || visitante.includes('Ganador');
        const tieneGanador = partido.ganador !== null;

        let resultado = '';
        if (estaFinalizado && tieneGanador) {
            resultado = `<span class="tree-score">${partido.marcadorLocal} - ${partido.marcadorVisitante}</span>`;
        } else if (estaPorDefinir) {
            resultado = `<span class="tree-vs">⏳</span>`;
        } else {
            resultado = `<span class="tree-vs">VS</span>`;
        }

        // Mostrar botones en TODOS los partidos que tengan dos equipos definidos
        const sePuedeSeleccionar = !estaPorDefinir && !tieneGanador;

        let selectorHTML = '';
        if (sePuedeSeleccionar) {
            selectorHTML = `
                <div class="simulador-selector">
                    <button class="sim-btn sim-btn-local" onclick="seleccionarGanador('${partido.id}', 'local')">
                        🏆 ${localNombre}
                    </button>
                    <button class="sim-btn sim-btn-visitante" onclick="seleccionarGanador('${partido.id}', 'visitante')">
                        🏆 ${visitanteNombre}
                    </button>
                </div>
            `;
        } else if (tieneGanador) {
            const ganadorNombre = esGanadorLocal ? localNombre : visitanteNombre;
            selectorHTML = `
                <div class="simulador-ganador">
                    ✅ ${ganadorNombre}
                    <button class="sim-btn sim-btn-reset" onclick="deseleccionarGanador('${partido.id}')">✖</button>
                </div>
            `;
        }

        const claseExtra = esFinal ? ' tree-final-partido' : '';
        const estadoClase = estaFinalizado ? 'finalizado' : '';

        return `
            <div class="tree-partido ${estadoClase}${claseExtra}" data-id="${partido.id}">
                <div class="tree-equipo ${esGanadorLocal ? 'ganador' : ''}">
                    ${localFlag} ${localNombre}
                </div>
                ${resultado}
                <div class="tree-equipo ${esGanadorVisitante ? 'ganador' : ''}">
                    ${visitanteFlag} ${visitanteNombre}
                </div>
                <div class="tree-info">${partido.hora} - ${partido.fecha}</div>
                ${selectorHTML}
            </div>
        `;
    }

    let html = `<div class="tree-oficial tree-simulador">`;
    html += `<div class="tree-fila">`;
    
    html += `<div class="tree-col">`;
    CRUCES_16AVOS_IZQ_SIM.forEach(c => {
        const p = estadoSimulador[c.id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    html += `<div class="tree-col tree-col-central">`;
    CRUCES_OCTAVOS_SIM.slice(0, 4).forEach(c => {
        const p = estadoSimulador[c.id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    html += `<div class="tree-col tree-col-central">`;
    CRUCES_CUARTOS_SIM.slice(0, 2).forEach(c => {
        const p = estadoSimulador[c.id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    html += `<div class="tree-col tree-col-central">`;
    const m = estadoSimulador['M'];
    if (m) html += partidoSimuladorHTML(m);
    html += `</div>`;

    html += `<div class="tree-col tree-col-final">`;
    const final = estadoSimulador['FINAL'];
    if (final) html += partidoSimuladorHTML(final, true);
    html += `</div>`;

    html += `<div class="tree-col tree-col-central">`;
    const n = estadoSimulador['N'];
    if (n) html += partidoSimuladorHTML(n);
    html += `</div>`;

    html += `<div class="tree-col tree-col-central">`;
    CRUCES_CUARTOS_SIM.slice(2, 4).forEach(c => {
        const p = estadoSimulador[c.id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    html += `<div class="tree-col tree-col-central">`;
    CRUCES_OCTAVOS_SIM.slice(4, 8).forEach(c => {
        const p = estadoSimulador[c.id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    html += `<div class="tree-col">`;
    CRUCES_16AVOS_DER_SIM.forEach(c => {
        const p = estadoSimulador[c.id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    html += `</div>`;
    html += `</div>`;
    container.innerHTML = html;
}

// ========================================== //
// CARGAR SIMULADOR                          //
// ========================================== //

async function loadSimulador() {
    const container = document.getElementById('simuladorContainer');
    if (!container) {
        console.error('❌ No se encontró el contenedor #simuladorContainer');
        return;
    }
    
    container.innerHTML = `<div class="status">⏳ Cargando simulador...</div>`;

    try {
        if (cargarEstadoDeEliminatorias()) {
            console.log('✅ Simulador usando equipos de eliminatorias.js');
            renderSimulador();
            return;
        }

        const data = await fetchAPI('/clasificacion');
        
        if (data.error || !data.standings) {
            throw new Error('No se pudieron obtener los datos de clasificación');
        }

        const todos = [...CRUCES_16AVOS_IZQ_SIM, ...CRUCES_16AVOS_DER_SIM, ...CRUCES_OCTAVOS_SIM, ...CRUCES_CUARTOS_SIM, ...CRUCES_SEMIFINALES_SIM, FINAL_SIM];
        const estado = {};
        todos.forEach(p => {
            estado[p.id] = {
                ...p,
                localReal: p.local,
                visitanteReal: p.visitante,
                marcadorLocal: null,
                marcadorVisitante: null,
                estado: 'no_jugado',
                ganador: null
            };
        });

        if (typeof window.asignarEquiposReales === 'function') {
            estadoSimulador = window.asignarEquiposReales(estado, data.standings);
        } else {
            estadoSimulador = estado;
        }
        
        renderSimulador();

    } catch (error) {
        console.error('❌ Error al cargar simulador:', error);
        container.innerHTML = `
            <div class="status error">
                ❌ Error al cargar el simulador: ${error.message}
                <br><br>
                <button class="refresh-btn" onclick="loadSimulador()">🔄 Reintentar</button>
            </div>
        `;
    }
}

window.seleccionarGanador = seleccionarGanador;
window.deseleccionarGanador = deseleccionarGanador;