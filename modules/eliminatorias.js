// ========================================== //
// eliminatorias.js - CON NOMBRES EN INGLÉS  //
// ========================================== //

// ========================================== //
// DATOS OFICIALES DE LOS CRUCES             //
// ========================================== //

// 16avos de final (mitad izquierda - E1 a E8)
const CRUCES_16AVOS_IZQ = [
    { id: 'E1', local: '2º Group A', visitante: '2º Group B', fecha: '28 de junio', hora: '21:00' },
    { id: 'E2', local: '1º Group C', visitante: '2º Group F', fecha: '29 de junio', hora: '19:00' },
    { id: 'E3', local: '1º Group E', visitante: '3º Group A/B/C/D/F', fecha: '29 de junio', hora: '22:30' },
    { id: 'E4', local: '1º Group F', visitante: '2º Group C', fecha: '30 de junio', hora: '03:00' },
    { id: 'E5', local: '1º Group A', visitante: '3º Group C/E/F/H/I', fecha: '1 de julio', hora: '03:00' },
    { id: 'E6', local: '1º Group L', visitante: '3º Group E/H/I/J/K', fecha: '1 de julio', hora: '18:00' },
    { id: 'E7', local: '1º Group G', visitante: '3º Group A/E/H/I/J', fecha: '1 de julio', hora: '22:00' },
    { id: 'E8', local: '2º Group K', visitante: '2º Group L', fecha: '2 de julio', hora: '01:00' }
];

// 16avos de final (mitad derecha - E9 a E16)
const CRUCES_16AVOS_DER = [
    { id: 'E9', local: '2º Group E', visitante: '2º Group I', fecha: '30 de junio', hora: '19:00' },
    { id: 'E10', local: '1º Group I', visitante: '3º Group C/D/F/G/H', fecha: '30 de junio', hora: '23:00' },
    { id: 'E11', local: '1º Group D', visitante: '3º Group B/E/F/I/J', fecha: '2 de julio', hora: '02:00' },
    { id: 'E12', local: '1º Group B', visitante: '3º Group E/F/G/I/J', fecha: '2 de julio', hora: '05:00' },
    { id: 'E13', local: '1º Group H', visitante: '2º Group J', fecha: '2 de julio', hora: '21:00' },
    { id: 'E14', local: '1º Group J', visitante: '2º Group H', fecha: '3 de julio', hora: '00:00' },
    { id: 'E15', local: '1º Group K', visitante: '3º Group D/E/I/J/L', fecha: '3 de julio', hora: '03:30' },
    { id: 'E16', local: '2º Group D', visitante: '2º Group G', fecha: '3 de julio', hora: '20:00' }
];

// Octavos de final (A a H)
const CRUCES_OCTAVOS = [
    { id: 'A', local: 'Ganador E1', visitante: 'Ganador E3', fecha: '4 de julio', hora: '19:00' },
    { id: 'B', local: 'Ganador E2', visitante: 'Ganador E4', fecha: '4 de julio', hora: '23:00' },
    { id: 'C', local: 'Ganador E5', visitante: 'Ganador E6', fecha: '5 de julio', hora: '22:00' },
    { id: 'D', local: 'Ganador E7', visitante: 'Ganador E8', fecha: '6 de julio', hora: '02:00' },
    { id: 'E', local: 'Ganador E9', visitante: 'Ganador E10', fecha: '6 de julio', hora: '21:00' },
    { id: 'F', local: 'Ganador E11', visitante: 'Ganador E12', fecha: '7 de julio', hora: '02:00' },
    { id: 'G', local: 'Ganador E13', visitante: 'Ganador E14', fecha: '7 de julio', hora: '18:00' },
    { id: 'H', local: 'Ganador E15', visitante: 'Ganador E16', fecha: '7 de julio', hora: '22:00' }
];

// Cuartos de final (I a L)
const CRUCES_CUARTOS = [
    { id: 'I', local: 'Ganador A', visitante: 'Ganador B', fecha: '9 de julio', hora: '22:00' },
    { id: 'J', local: 'Ganador C', visitante: 'Ganador D', fecha: '10 de julio', hora: '21:00' },
    { id: 'K', local: 'Ganador E', visitante: 'Ganador F', fecha: '11 de julio', hora: '23:00' },
    { id: 'L', local: 'Ganador G', visitante: 'Ganador H', fecha: '11 de julio', hora: '03:00' }
];

// Semifinales (M y N)
const CRUCES_SEMIFINALES = [
    { id: 'M', local: 'Ganador I', visitante: 'Ganador J', fecha: '14 de julio', hora: '21:00' },
    { id: 'N', local: 'Ganador K', visitante: 'Ganador L', fecha: '15 de julio', hora: '21:00' }
];

// Final
const FINAL = {
    id: 'FINAL',
    local: 'Ganador M',
    visitante: 'Ganador N',
    fecha: '19 de julio',
    hora: '21:00'
};

// ========================================== //
// MAPA DE RELACIONES (quién avanza a qué)   //
// ========================================== //

const AVANZAN = {
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

// ========================================== //
// GENERAR EL ESTADO INICIAL                 //
// ========================================== //

function generarEstadoInicial() {
    const todos = [...CRUCES_16AVOS_IZQ, ...CRUCES_16AVOS_DER, ...CRUCES_OCTAVOS, ...CRUCES_CUARTOS, ...CRUCES_SEMIFINALES, FINAL];
    
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
// ASIGNAR EQUIPOS REALES A 16AVOS           //
// ========================================== //

function asignarEquiposReales(estado, standings) {
    // --- 1. Extraer clasificados por grupo (usando nombres en inglés) ---
    const primeros = {};
    const segundos = {};
    const terceros = [];

    standings.forEach(standing => {
        // La API devuelve el nombre del grupo en inglés: "Group A", "Group B", etc.
        const groupName = standing.group || 'Group';
        const table = standing.table || [];
        const sorted = [...table].sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return (b.goalDifference || 0) - (a.goalDifference || 0);
        });

        console.log('📊 Procesando grupo:', groupName);

        if (sorted.length >= 1) {
            primeros[groupName] = sorted[0];
        }
        if (sorted.length >= 2) {
            segundos[groupName] = sorted[1];
        }
        if (sorted.length >= 3) {
            terceros.push({ ...sorted[2], group: groupName });
        }
    });

    // --- 2. Ordenar terceros ---
    const mejoresTerceros = terceros
        .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            return (b.goalDifference || 0) - (a.goalDifference || 0);
        })
        .slice(0, 8);

    const tercerosMap = {};
    mejoresTerceros.forEach((t) => {
        tercerosMap[t.group] = t;
    });

    function getTeamName(entry) {
        return entry?.team?.name || 'POR DEFINIR';
    }

    function getMejorTerceroDe(gruposPosibles) {
        for (const grupo of gruposPosibles) {
            if (tercerosMap[grupo]) {
                return getTeamName(tercerosMap[grupo]);
            }
        }
        return 'POR DEFINIR';
    }

    // --- 3. Asignar equipos a cada cruce ---
    // Los nombres de los grupos están en inglés porque la API los devuelve así

    // E1: 2º Grupo A vs 2º Grupo B
    estado['E1'].localReal = getTeamName(segundos['Group A']);
    estado['E1'].visitanteReal = getTeamName(segundos['Group B']);

    // E2: 1º Grupo C vs 2º Grupo F
    estado['E2'].localReal = getTeamName(primeros['Group C']);
    estado['E2'].visitanteReal = getTeamName(segundos['Group F']);

    // E3: 1º Grupo E vs 3º Grupo A/B/C/D/F
    estado['E3'].localReal = getTeamName(primeros['Group E']);
    estado['E3'].visitanteReal = getMejorTerceroDe(['Group A', 'Group B', 'Group C', 'Group D', 'Group F']);

    // E4: 1º Grupo F vs 2º Grupo C
    estado['E4'].localReal = getTeamName(primeros['Group F']);
    estado['E4'].visitanteReal = getTeamName(segundos['Group C']);

    // E5: 1º Grupo A vs 3º Grupo C/E/F/H/I
    estado['E5'].localReal = getTeamName(primeros['Group A']);
    estado['E5'].visitanteReal = getMejorTerceroDe(['Group C', 'Group E', 'Group F', 'Group H', 'Group I']);

    // E6: 1º Grupo L vs 3º Grupo E/H/I/J/K
    estado['E6'].localReal = getTeamName(primeros['Group L']);
    estado['E6'].visitanteReal = getMejorTerceroDe(['Group E', 'Group H', 'Group I', 'Group J', 'Group K']);

    // E7: 1º Grupo G vs 3º Grupo A/E/H/I/J
    estado['E7'].localReal = getTeamName(primeros['Group G']);
    estado['E7'].visitanteReal = getMejorTerceroDe(['Group A', 'Group E', 'Group H', 'Group I', 'Group J']);

    // E8: 2º Grupo K vs 2º Grupo L
    estado['E8'].localReal = getTeamName(segundos['Group K']);
    estado['E8'].visitanteReal = getTeamName(segundos['Group L']);

    // E9: 2º Grupo E vs 2º Grupo I
    estado['E9'].localReal = getTeamName(segundos['Group E']);
    estado['E9'].visitanteReal = getTeamName(segundos['Group I']);

    // E10: 1º Grupo I vs 3º Grupo C/D/F/G/H
    estado['E10'].localReal = getTeamName(primeros['Group I']);
    estado['E10'].visitanteReal = getMejorTerceroDe(['Group C', 'Group D', 'Group F', 'Group G', 'Group H']);

    // E11: 1º Grupo D vs 3º Grupo B/E/F/I/J
    estado['E11'].localReal = getTeamName(primeros['Group D']);
    estado['E11'].visitanteReal = getMejorTerceroDe(['Group B', 'Group E', 'Group F', 'Group I', 'Group J']);

    // E12: 1º Grupo B vs 3º Grupo E/F/G/I/J
    estado['E12'].localReal = getTeamName(primeros['Group B']);
    estado['E12'].visitanteReal = getMejorTerceroDe(['Group E', 'Group F', 'Group G', 'Group I', 'Group J']);

    // E13: 1º Grupo H vs 2º Grupo J
    estado['E13'].localReal = getTeamName(primeros['Group H']);
    estado['E13'].visitanteReal = getTeamName(segundos['Group J']);

    // E14: 1º Grupo J vs 2º Grupo H
    estado['E14'].localReal = getTeamName(primeros['Group J']);
    estado['E14'].visitanteReal = getTeamName(segundos['Group H']);

    // E15: 1º Grupo K vs 3º Grupo D/E/I/J/L
    estado['E15'].localReal = getTeamName(primeros['Group K']);
    estado['E15'].visitanteReal = getMejorTerceroDe(['Group D', 'Group E', 'Group I', 'Group J', 'Group L']);

    // E16: 2º Grupo D vs 2º Grupo G
    estado['E16'].localReal = getTeamName(segundos['Group D']);
    estado['E16'].visitanteReal = getTeamName(segundos['Group G']);

    return estado;
}

// ========================================== //
// FUNCIÓN PARA PINTAR EL ÁRBOL              //
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
        // TRADUCIR LOS NOMBRES DE LOS EQUIPOS AL ESPAÑOL
        const localNombre = traducirNombre(local);
        const visitanteNombre = traducirNombre(visitante);
        const localFlag = getFlag(local);
        const visitanteFlag = getFlag(visitante);
        
        const esGanadorLocal = partido.ganador === 'local';
        const esGanadorVisitante = partido.ganador === 'visitante';
        
        let resultado = '';
        if (partido.estado === 'finalizado' || partido.estado === 'en_curso') {
            resultado = `<span class="tree-score">${partido.marcadorLocal ?? '?'} - ${partido.marcadorVisitante ?? '?'}</span>`;
        } else {
            resultado = `<span class="tree-vs">VS</span>`;
        }

        const claseExtra = esFinal ? ' tree-final-partido' : '';
        const estadoClase = partido.estado === 'finalizado' ? 'finalizado' : (partido.estado === 'en_curso' ? 'en-curso' : '');

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

    // --- CONSTRUIR EL ÁRBOL ---
    let html = `<div class="tree-oficial">`;

    // --- FILA 1: 16avos (E1-E8 a la izquierda, E9-E16 a la derecha) ---
    html += `<div class="tree-fila">`;
    
    // Columna izquierda (E1-E8)
    html += `<div class="tree-col">`;
    CRUCES_16AVOS_IZQ.forEach(c => {
        const p = estado[c.id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna central - Octavos (A-D)
    html += `<div class="tree-col tree-col-central">`;
    CRUCES_OCTAVOS.slice(0, 4).forEach(c => {
        const p = estado[c.id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna central - Cuartos (I-J)
    html += `<div class="tree-col tree-col-central">`;
    CRUCES_CUARTOS.slice(0, 2).forEach(c => {
        const p = estado[c.id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna central - Semifinal (M)
    html += `<div class="tree-col tree-col-central">`;
    const m = estado['M'];
    if (m) html += partidoHTML(m);
    html += `</div>`;

    // Columna central - FINAL
    html += `<div class="tree-col tree-col-final">`;
    const final = estado['FINAL'];
    if (final) html += partidoHTML(final, true);
    html += `</div>`;

    // Columna central - Semifinal (N)
    html += `<div class="tree-col tree-col-central">`;
    const n = estado['N'];
    if (n) html += partidoHTML(n);
    html += `</div>`;

    // Columna central - Cuartos (K-L)
    html += `<div class="tree-col tree-col-central">`;
    CRUCES_CUARTOS.slice(2, 4).forEach(c => {
        const p = estado[c.id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna central - Octavos (E-H)
    html += `<div class="tree-col tree-col-central">`;
    CRUCES_OCTAVOS.slice(4, 8).forEach(c => {
        const p = estado[c.id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    // Columna derecha (E9-E16)
    html += `<div class="tree-col">`;
    CRUCES_16AVOS_DER.forEach(c => {
        const p = estado[c.id];
        if (p) html += partidoHTML(p);
    });
    html += `</div>`;

    html += `</div>`; // fin tree-fila

    html += `</div>`; // fin tree-oficial

    container.innerHTML = html;
}

// ========================================== //
// FUNCIÓN PARA CARGAR ELIMINATORIAS          //
// ========================================== //

let estadoPartidos = null;

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

        // Asignar equipos reales a los 16avos
        estadoPartidos = asignarEquiposReales(estadoPartidos, data.standings);

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
}

// ========================================== //
// COMPARTIR DATOS CON EL SIMULADOR          //
// ========================================== //

window.asignarEquiposReales = asignarEquiposReales;
window.generarEstadoInicial = generarEstadoInicial;
window.estadoPartidosCompartido = null;