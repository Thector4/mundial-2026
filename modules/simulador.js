// ========================================== //
// simulador.js - Simulador de eliminatorias //
// ========================================== //

// ========================================== //
// DEFINICIONES DE CRUCES (SOLO ESTRUCTURA)  //
// ========================================== //

const CRUCES_16AVOS_SIM = [
    { id: 'P73' }, { id: 'P74' }, { id: 'P75' }, { id: 'P77' },
    { id: 'P81' }, { id: 'P82' }, { id: 'P83' }, { id: 'P84' },
    { id: 'P76' }, { id: 'P78' }, { id: 'P79' }, { id: 'P80' },
    { id: 'P85' }, { id: 'P86' }, { id: 'P87' }, { id: 'P88' }
];

const CRUCES_OCTAVOS_SIM = [
    { id: 'P89' }, { id: 'P90' }, { id: 'P93' }, { id: 'P94' },
    { id: 'P91' }, { id: 'P92' }, { id: 'P95' }, { id: 'P96' }
];

const CRUCES_CUARTOS_SIM = [
    { id: 'P97' }, { id: 'P98' }, { id: 'P99' }, { id: 'P100' }
];

const CRUCES_SEMIFINALES_SIM = [
    { id: 'P101' }, { id: 'P102' }
];

const FINAL_SIM = { id: 'P104' };

// ========================================== //
// AVANZAN_SIM - CRUCES CORREGIDOS           //
// ========================================== //

const AVANZAN_SIM = {
    // 16avos → Octavos
    'P73': 'P89',
    'P75': 'P89',
    'P74': 'P90',
    'P77': 'P90',
    'P83': 'P93',
    'P84': 'P93',
    'P81': 'P94',
    'P82': 'P94',
    'P76': 'P91',
    'P78': 'P91',
    'P79': 'P92',
    'P80': 'P92',
    'P86': 'P95',
    'P88': 'P95',
    'P85': 'P96',
    'P87': 'P96',

    // Octavos → Cuartos
    'P89': 'P97',
    'P90': 'P97',
    'P93': 'P98',
    'P94': 'P98',
    'P91': 'P99',
    'P92': 'P99',
    'P95': 'P100',
    'P96': 'P100',

    // Cuartos → Semifinales
    'P97': 'P101',
    'P98': 'P101',
    'P99': 'P102',
    'P100': 'P102',

    // Semifinales → Final
    'P101': 'P104',
    'P102': 'P104'
};

let estadoSimulador = {};

// ========================================== //
// CARGAR DATOS DESDE ELIMINATORIAS          //
// ========================================== //

function cargarDatosDesdeEliminatorias() {
    if (window.estadoPartidosCompartido && Object.keys(window.estadoPartidosCompartido).length > 0) {
        console.log('📋 Cargando datos desde eliminatorias.js...');
        estadoSimulador = JSON.parse(JSON.stringify(window.estadoPartidosCompartido));
        
        // Reiniciar todos los partidos
        Object.keys(estadoSimulador).forEach(id => {
            if (estadoSimulador[id]) {
                estadoSimulador[id].ganador = null;
                estadoSimulador[id].estado = 'no_jugado';
                estadoSimulador[id].marcadorLocal = null;
                estadoSimulador[id].marcadorVisitante = null;
            }
        });
        
        console.log('✅ Datos cargados desde eliminatorias.js');
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

    partido.ganador = ganador;
    partido.estado = 'finalizado';
    partido.marcadorLocal = ganador === 'local' ? 1 : 0;
    partido.marcadorVisitante = ganador === 'visitante' ? 1 : 0;

    // Propagar al siguiente partido usando AVANZAN_SIM
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

function deseleccionarGanador(partidoId) {
    console.log(`🔄 Deseleccionando ganador de ${partidoId}`);
    
    if (!estadoSimulador[partidoId]) return;
    if (!estadoSimulador[partidoId].ganador) return;

    const partido = estadoSimulador[partidoId];
    const local = partido.localReal;
    const visitante = partido.visitanteReal;

    partido.ganador = null;
    partido.estado = 'no_jugado';
    partido.marcadorLocal = null;
    partido.marcadorVisitante = null;

    // Eliminar propagación
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

    // Resetear partidos posteriores
    const ids = ['P97', 'P98', 'P99', 'P100', 'P101', 'P102', 'P104'];
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
// RENDERIZAR SIMULADOR - ORDENADO EN PAREJAS//
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
        const localFlag = getFlag(localNombre);
        const visitanteFlag = getFlag(visitanteNombre);
        
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

    // ========================================== //
    // IZQUIERDA: P73, P74, P75, P77, P81, P82, P83, P84
    // ========================================== //
    
    // ========================================== //
    // DERECHA: P76, P78, P79, P80, P85, P86, P87, P88
    // ========================================== //

    // Parejas para la izquierda
    const parejasIzquierda = [
        ['P73', 'P75'], // → P89
        ['P74', 'P77'], // → P90
        ['P83', 'P84'], // → P93
        ['P81', 'P82']  // → P94
    ];

    // Parejas para la derecha
    const parejasDerecha = [
        ['P76', 'P78'], // → P91
        ['P79', 'P80'], // → P92
        ['P86', 'P88'], // → P95
        ['P85', 'P87']  // → P96
    ];

    let html = `<div class="tree-oficial tree-simulador">`;
    html += `<div class="tree-fila">`;
    
    // Columna 1: 16avos (IZQUIERDA)
    html += `<div class="tree-col">`;
    parejasIzquierda.forEach(pareja => {
        pareja.forEach(id => {
            const p = estadoSimulador[id];
            if (p) html += partidoSimuladorHTML(p);
        });
    });
    html += `</div>`;

    // Columna 2: Octavos (P89, P90, P93, P94)
    html += `<div class="tree-col tree-col-central">`;
    ['P89', 'P90', 'P93', 'P94'].forEach(id => {
        const p = estadoSimulador[id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    // Columna 3: Cuartos (P97, P98)
    html += `<div class="tree-col tree-col-central">`;
    ['P97', 'P98'].forEach(id => {
        const p = estadoSimulador[id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    // Columna 4: Semifinal 1 (P101)
    html += `<div class="tree-col tree-col-central">`;
    const s1 = estadoSimulador['P101'];
    if (s1) html += partidoSimuladorHTML(s1);
    html += `</div>`;

    // Columna 5: Final (P104)
    html += `<div class="tree-col tree-col-final">`;
    const final = estadoSimulador['P104'];
    if (final) html += partidoSimuladorHTML(final, true);
    html += `</div>`;

    // Columna 6: Semifinal 2 (P102)
    html += `<div class="tree-col tree-col-central">`;
    const s2 = estadoSimulador['P102'];
    if (s2) html += partidoSimuladorHTML(s2);
    html += `</div>`;

    // Columna 7: Cuartos (P99, P100)
    html += `<div class="tree-col tree-col-central">`;
    ['P99', 'P100'].forEach(id => {
        const p = estadoSimulador[id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    // Columna 8: Octavos (P91, P92, P95, P96)
    html += `<div class="tree-col tree-col-central">`;
    ['P91', 'P92', 'P95', 'P96'].forEach(id => {
        const p = estadoSimulador[id];
        if (p) html += partidoSimuladorHTML(p);
    });
    html += `</div>`;

    // Columna 9: 16avos (DERECHA)
    html += `<div class="tree-col">`;
    parejasDerecha.forEach(pareja => {
        pareja.forEach(id => {
            const p = estadoSimulador[id];
            if (p) html += partidoSimuladorHTML(p);
        });
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
        if (cargarDatosDesdeEliminatorias()) {
            console.log('✅ Simulador usando equipos de eliminatorias.js');
            renderSimulador();
            return;
        }

        container.innerHTML = `
            <div class="status">
                ⚠️ No hay datos disponibles. 
                <br><br>
                <button class="refresh-btn" onclick="loadSimulador()">🔄 Cargar datos</button>
                <br><br>
                <small style="color:#64748b;">Asegúrate de que la pestaña "16avos de final" se ha cargado al menos una vez.</small>
            </div>
        `;

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