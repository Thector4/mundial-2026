// ========================================== //
// script.js - Archivo principal              //
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
    if (targetPanel) targetPanel.style.display = 'block';
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (targetBtn) targetBtn.classList.add('active');
    const subtitles = {
        'clasificacion': 'Clasificación de los grupos',
        'resultados': 'Resultados de los partidos',
        'proximos': 'Próximos partidos',
        'eliminatorias': 'Árbol de eliminatorias',
        'simulador': 'Simulador de eliminatorias'
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
    if (tab === 'eliminatorias' && !window.eliminatoriasLoaded) {
        loadEliminatorias();
        window.eliminatoriasLoaded = true;
    }
    if (tab === 'simulador' && !window.simuladorLoaded) {
        loadSimulador();
        window.simuladorLoaded = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    switchTab('clasificacion');
    loadData();
});