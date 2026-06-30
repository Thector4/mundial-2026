// ========================================== //
// eliminatorias.js - CON MAPEO DE IDs API   //
// ========================================== //

// ========================================== //
// CRUCES DE 16AVOS (oficiales)              //
// ========================================== //

const CRUCES_16AVOS = [
    { id: 'P73', local: 'Sudáfrica', visitante: 'Canadá', fecha: '28 de junio', hora: '21:00' },
    { id: 'P74', local: 'Alemania', visitante: 'Paraguay', fecha: '29 de junio', hora: '22:30' },
    { id: 'P75', local: 'Países Bajos', visitante: 'Marruecos', fecha: '30 de junio', hora: '03:00' },
    { id: 'P77', local: 'Francia', visitante: 'Suecia', fecha: '30 de junio', hora: '23:00' },
    { id: 'P81', local: 'Estados Unidos', visitante: 'Bosnia', fecha: '2 de julio', hora: '02:00' },
    { id: 'P82', local: 'Bélgica', visitante: 'Senegal', fecha: '1 de julio', hora: '22:00' },
    { id: 'P83', local: 'Portugal', visitante: 'Croacia', fecha: '3 de julio', hora: '01:00' },
    { id: 'P84', local: 'España', visitante: 'Austria', fecha: '2 de julio', hora: '21:00' },
    { id: 'P76', local: 'Brasil', visitante: 'Japón', fecha: '29 de junio', hora: '19:00' },
    { id: 'P78', local: 'Costa de Marfil', visitante: 'Noruega', fecha: '30 de junio', hora: '19:00' },
    { id: 'P79', local: 'México', visitante: 'Ecuador', fecha: '1 de julio', hora: '03:00' },
    { id: 'P80', local: 'Inglaterra', visitante: 'RD Congo', fecha: '1 de julio', hora: '18:00' },
    { id: 'P85', local: 'Suiza', visitante: 'Argelia', fecha: '5 de julio', hora: '05:00' },
    { id: 'P86', local: 'Argentina', visitante: 'Cabo Verde', fecha: '4 de julio', hora: '00:00' },
    { id: 'P87', local: 'Colombia', visitante: 'Ghana', fecha: '4 de julio', hora: '03:30' },
    { id: 'P88', local: 'Australia', visitante: 'Egipto', fecha: '3 de julio', hora: '20:00' }
];

// ========================================== //
// OCTAVOS                                    //
// ========================================== //

const CRUCES_OCTAVOS = [
    { id: 'P89', local: 'Canadá', visitante: 'Ganador P75', fecha: '4 de julio', hora: '23:00' },
    { id: 'P90', local: 'Ganador P74', visitante: 'Ganador P77', fecha: '4 de julio', hora: '19:00' },
    { id: 'P91', local: 'Brasil', visitante: 'Ganador P78', fecha: '5 de julio', hora: '22:00' },
    { id: 'P92', local: 'Ganador P79', visitante: 'Ganador P80', fecha: '5 de julio', hora: '02:00' },
    { id: 'P93', local: 'Ganador P83', visitante: 'Ganador P84', fecha: '6 de julio', hora: '21:00' },
    { id: 'P94', local: 'Ganador P81', visitante: 'Ganador P82', fecha: '6 de julio', hora: '02:00' },
    { id: 'P95', local: 'Ganador P86', visitante: 'Ganador P88', fecha: '7 de julio', hora: '22:00' },
    { id: 'P96', local: 'Ganador P85', visitante: 'Ganador P87', fecha: '7 de julio', hora: '18:00' }
];

// ========================================== //
// CUARTOS                                    //
// ========================================== //

const CRUCES_CUARTOS = [
    { id: 'P97', local: 'Ganador P89', visitante: 'Ganador P90', fecha: '9 de julio', hora: '22:00' },
    { id: 'P98', local: 'Ganador P93', visitante: 'Ganador P94', fecha: '10 de julio', hora: '21:00' },
    { id: 'P99', local: 'Ganador P91', visitante: 'Ganador P92', fecha: '11 de julio', hora: '23:00' },
    { id: 'P100', local: 'Ganador P95', visitante: 'Ganador P96', fecha: '11 de julio', hora: '03:00' }
];

// ========================================== //
// SEMIFINALES                                //
// ========================================== //

const CRUCES_SEMIFINALES = [
    { id: 'P101', local: 'Ganador P97', visitante: 'Ganador P98', fecha: '14 de julio', hora: '21:00' },
    { id: 'P102', local: 'Ganador P99', visitante: 'Ganador P100', fecha: '15 de julio', hora: '21:00' }
];

// ========================================== //
// FINAL                                      //
// ========================================== //

const FINAL = {
    id: 'P104',
    local: 'Ganador P101',
    visitante: 'Ganador P102',
    fecha: '19 de julio',
    hora: '21:00'
};

// ========================================== //
// AVANZAN - MAPEO DE CRUCES                 //
// ========================================== //

const AVANZAN = {
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

// ========================================== //
// MAPEO DE IDs DE LA API A IDs DEL ÁRBOL    //
// ========================================== //

const MAP_API_TO_ARBOL = {
    537417: 'P73', // South Africa vs Canada - FINISHED ✓
    537415: 'P74', // Germany vs Paraguay
    537418: 'P75', // Netherlands vs Morocco
    537416: 'P77', // France vs Sweden
    537421: 'P81', // United States vs Bosnia-Herzegovina
    537422: 'P82', // Belgium vs Senegal
    537419: 'P83', // Portugal vs Croatia
    537420: 'P84', // Spain vs Austria
    537423: 'P76', // Brazil vs Japan
    537424: 'P78', // Ivory Coast vs Norway
    537425: 'P79', // Mexico vs Ecuador
    537426: 'P80', // England vs Congo DR
    537429: 'P85', // Switzerland vs Algeria
    537427: 'P86', // Argentina vs Cape Verde Islands
    537430: 'P87', // Colombia vs Ghana
    537428: 'P88'  // Australia vs Egypt
};

// ========================================== //
// MEJORES TERCEROS                          //
// ========================================== //

const MEJORES_TERCEROS = {
    'K': 'RD Congo',
    'F': 'Suecia',
    'L': 'Ghana',
    'E': 'Ecuador',
    'B': 'Bosnia',
    'J': 'Argelia',
    'D': 'Paraguay',
    'I': 'Senegal'
};

let estadoPartidos = null;

// ========================================== //
// GENERAR ESTADO INICIAL                    //
// ========================================== //

function generarEstadoInicial() {
    const todos = [...CRUCES_16AVOS, ...CRUCES_OCTAVOS, ...CRUCES_CUARTOS, ...CRUCES_SEMIFINALES, FINAL];
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
    return estado;
}

// ========================================== //
// ASIGNAR EQUIPOS REALES                    //
// ========================================== //

function asignarEquiposReales(estado, standings) {
    console.log('📊 Asignando equipos reales a 16avos...');

    const asignaciones = {
        'P73': { local: 'Sudáfrica', visitante: 'Canadá' },
        'P74': { local: 'Alemania', visitante: 'Paraguay' },
        'P75': { local: 'Países Bajos', visitante: 'Marruecos' },
        'P77': { local: 'Francia', visitante: 'Suecia' },
        'P81': { local: 'Estados Unidos', visitante: 'Bosnia' },
        'P82': { local: 'Bélgica', visitante: 'Senegal' },
        'P83': { local: 'Portugal', visitante: 'Croacia' },
        'P84': { local: 'España', visitante: 'Austria' },
        'P76': { local: 'Brasil', visitante: 'Japón' },
        'P78': { local: 'Costa de Marfil', visitante: 'Noruega' },
        'P79': { local: 'México', visitante: 'Ecuador' },
        'P80': { local: 'Inglaterra', visitante: 'RD Congo' },
        'P85': { local: 'Suiza', visitante: 'Argelia' },
        'P86': { local: 'Argentina', visitante: 'Cabo Verde' },
        'P87': { local: 'Colombia', visitante: 'Ghana' },
        'P88': { local: 'Australia', visitante: 'Egipto' }
    };

    Object.keys(asignaciones).forEach(id => {
        if (estado[id]) {
            estado[id].localReal = asignaciones[id].local;
            estado[id].visitanteReal = asignaciones[id].visitante;
        }
    });

    const traducciones = {
        'South Africa': 'Sudáfrica',
        'Canada': 'Canadá',
        'Brazil': 'Brasil',
        'Japan': 'Japón',
        'Germany': 'Alemania',
        'Paraguay': 'Paraguay',
        'Netherlands': 'Países Bajos',
        'Morocco': 'Marruecos',
        'Ivory Coast': 'Costa de Marfil',
        'Norway': 'Noruega',
        'France': 'Francia',
        'Sweden': 'Suecia',
        'Mexico': 'México',
        'Ecuador': 'Ecuador',
        'England': 'Inglaterra',
        'Congo DR': 'RD Congo',
        'Belgium': 'Bélgica',
        'Senegal': 'Senegal',
        'United States': 'Estados Unidos',
        'Bosnia-Herzegovina': 'Bosnia',
        'Spain': 'España',
        'Austria': 'Austria',
        'Portugal': 'Portugal',
        'Croatia': 'Croacia',
        'Australia': 'Australia',
        'Egypt': 'Egipto',
        'Argentina': 'Argentina',
        'Cape Verde Islands': 'Cabo Verde',
        'Colombia': 'Colombia',
        'Ghana': 'Ghana',
        'Switzerland': 'Suiza',
        'Algeria': 'Argelia'
    };

    Object.keys(estado).forEach(id => {
        if (estado[id] && id.startsWith('P')) {
            const p = estado[id];
            if (p.localReal && traducciones[p.localReal]) p.localReal = traducciones[p.localReal];
            if (p.visitanteReal && traducciones[p.visitanteReal]) p.visitanteReal = traducciones[p.visitanteReal];
        }
    });

    console.log('✅ Cruces de 16avos asignados');
    return estado;
}

// ========================================== //
// ACTUALIZAR RESULTADOS DESDE API           //
// ========================================== //

function actualizarResultados(estado, matches) {
    console.log('📊 Actualizando resultados desde API...');
    
    let resultadosEncontrados = 0;

    matches.forEach(match => {
        const matchId = match.id;
        const arbolId = MAP_API_TO_ARBOL[matchId];
        
        if (arbolId && estado[arbolId] && match.status === 'FINISHED') {
            const p = estado[arbolId];
            
            p.marcadorLocal = match.score.fullTime.home;
            p.marcadorVisitante = match.score.fullTime.away;
            p.estado = 'finalizado';
            
            if (match.score.fullTime.home > match.score.fullTime.away) {
                p.ganador = 'local';
            } else if (match.score.fullTime.away > match.score.fullTime.home) {
                p.ganador = 'visitante';
            }
            
            resultadosEncontrados++;
            console.log(`✅ ${arbolId}: ${p.localReal} ${p.marcadorLocal}-${p.marcadorVisitante} ${p.visitanteReal}`);
            
            if (p.ganador) {
                const siguienteId = AVANZAN[arbolId];
                if (siguienteId && estado[siguienteId]) {
                    const ganadorNombre = p.ganador === 'local' ? p.localReal : p.visitanteReal;
                    const siguiente = estado[siguienteId];
                    
                    if (siguiente.localReal === `Ganador ${arbolId}` || 
                        siguiente.localReal === `Ganador ${p.id}` ||
                        siguiente.localReal === 'Ganador ' + arbolId) {
                        siguiente.localReal = ganadorNombre;
                        console.log(`   ➡️ Propagando a ${siguienteId}: ${ganadorNombre}`);
                    } else if (siguiente.visitanteReal === `Ganador ${arbolId}` || 
                               siguiente.visitanteReal === `Ganador ${p.id}` ||
                               siguiente.visitanteReal === 'Ganador ' + arbolId) {
                        siguiente.visitanteReal = ganadorNombre;
                        console.log(`   ➡️ Propagando a ${siguienteId}: ${ganadorNombre}`);
                    }
                }
            }
        }
    });

    console.log(`✅ Resultados actualizados: ${resultadosEncontrados} partidos`);
    return estado;
}

// ========================================== //
// RENDERIZAR ÁRBOL - ORDENADO EN PAREJAS    //
// ========================================== //

function renderEliminatoriasTree(estado) {
    const container = document.getElementById('eliminatoriasContainer');
    if (!estado) {
        container.innerHTML = `<div class="status">⚠️ No hay datos para generar el árbol.</div>`;
        return;
    }

    function partidoHTML(partido, esFinal = false) {
        const local = partido.localReal || partido.local || 'POR DEFINIR';
        const visitante = partido.visitanteReal || partido.visitante || 'POR DEFINIR';
        const localNombre = traducirNombre(local);
        const visitanteNombre = traducirNombre(visitante);
        const localFlag = getFlag(localNombre);
        const visitanteFlag = getFlag(visitanteNombre);
        
        const esGanadorLocal = partido.ganador === 'local';
        const esGanadorVisitante = partido.ganador === 'visitante';
        
        let resultado = '';
        if (partido.estado === 'finalizado' && partido.ganador) {
            resultado = `<span class="tree-score">${partido.marcadorLocal} - ${partido.marcadorVisitante}</span>`;
        } else {
            resultado = `<span class="tree-vs">VS</span>`;
        }

        const claseExtra = esFinal ? ' tree-final-partido' : '';
        const estadoClase = partido.estado === 'finalizado' ? 'finalizado' : '';

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
            </div>
        `;
    }

    // ========================================== //
    // IZQUIERDA: P73, P74, P75, P77, P81, P82, P83, P84
    // ========================================== //
    const idsIzquierda = ['P73', 'P74', 'P75', 'P77', 'P81', 'P82', 'P83', 'P84'];
    
    // ========================================== //
    // DERECHA: P76, P78, P79, P80, P85, P86, P87, P88
    // ========================================== //
    const idsDerecha = ['P76', 'P78', 'P79', 'P80', 'P85', 'P86', 'P87', 'P88'];

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

    let html = `<div class="tree-oficial">`;
    html += `<div class="tree-fila">`;
    
    // Columna 1: 16avos (IZQUIERDA)
    html += `<div class="tree-col">`;
    parejasIzquierda.forEach(pareja => {
        pareja.forEach(id => {
            const p = estado[id];
            if (p) html += partidoHTML(p);
        });
    });
    html += `</div>`;

    // Columna 2: Octavos (P89, P90, P93, P94)
    html += `<div class="tree-col tree-col-central">`;
    ['P89', 'P90', 'P93', 'P94'].forEach(id => {
        const p = estado[id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna 3: Cuartos (P97, P98)
    html += `<div class="tree-col tree-col-central">`;
    ['P97', 'P98'].forEach(id => {
        const p = estado[id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna 4: Semifinal 1 (P101)
    html += `<div class="tree-col tree-col-central">`;
    const s1 = estado['P101'];
    if (s1) html += partidoHTML(s1);
    html += `</div>`;

    // Columna 5: Final (P104)
    html += `<div class="tree-col tree-col-final">`;
    const final = estado['P104'];
    if (final) html += partidoHTML(final, true);
    html += `</div>`;

    // Columna 6: Semifinal 2 (P102)
    html += `<div class="tree-col tree-col-central">`;
    const s2 = estado['P102'];
    if (s2) html += partidoHTML(s2);
    html += `</div>`;

    // Columna 7: Cuartos (P99, P100)
    html += `<div class="tree-col tree-col-central">`;
    ['P99', 'P100'].forEach(id => {
        const p = estado[id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna 8: Octavos (P91, P92, P95, P96)
    html += `<div class="tree-col tree-col-central">`;
    ['P91', 'P92', 'P95', 'P96'].forEach(id => {
        const p = estado[id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna 9: 16avos (DERECHA)
    html += `<div class="tree-col">`;
    parejasDerecha.forEach(pareja => {
        pareja.forEach(id => {
            const p = estado[id];
            if (p) html += partidoHTML(p);
        });
    });
    html += `</div>`;

    html += `</div>`;
    html += `</div>`;

    container.innerHTML = html;
}

// ========================================== //
// CARGAR ELIMINATORIAS                      //
// ========================================== //

async function loadEliminatorias() {
    const container = document.getElementById('eliminatoriasContainer');
    container.innerHTML = `<div class="status">⏳ Generando árbol de eliminatorias...</div>`;

    try {
        const data = await fetchAPI('/clasificacion');
        
        if (data.error || !data.standings) {
            throw new Error('No se pudieron obtener los datos de clasificación');
        }

        if (!estadoPartidos) {
            estadoPartidos = generarEstadoInicial();
        }

        estadoPartidos = asignarEquiposReales(estadoPartidos, data.standings);

        try {
            const matchesData = await fetchAPI('/partidos');
            if (matchesData && matchesData.matches) {
                estadoPartidos = actualizarResultados(estadoPartidos, matchesData.matches);
            }
        } catch (e) {
            console.warn('⚠️ No se pudieron cargar los resultados de partidos:', e);
        }

        renderEliminatoriasTree(estadoPartidos);

    } catch (error) {
        console.error('Error al generar eliminatorias:', error);
        container.innerHTML = `
            <div class="status error">
                ❌ Error al generar los enfrentamientos: ${error.message}
                <br><br>
                <button class="refresh-btn" onclick="loadEliminatorias()">🔄 Reintentar</button>
            </div>
        `;
    }
    window.estadoPartidosCompartido = estadoPartidos;
    console.log('📤 Datos de eliminatorias compartidos con el simulador');
}

// ========================================== //
// EXPORTAR FUNCIONES PARA USO GLOBAL        //
// ========================================== //

window.asignarEquiposReales = asignarEquiposReales;
window.generarEstadoInicial = generarEstadoInicial;
window.estadoPartidosCompartido = null;
window.loadEliminatorias = loadEliminatorias;