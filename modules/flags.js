// ========================================== //
// flags.js - Mapa de banderas y traducción  //
// ========================================== //

// ========================================== //
// MAPA DE TRADUCCIÓN (INGLÉS → ESPAÑOL)     //
// ========================================== //

const TRADUCCIONES = {
    // Europa
    'Germany': 'Alemania',
    'Spain': 'España',
    'France': 'Francia',
    'Italy': 'Italia',
    'England': 'Inglaterra',
    'Netherlands': 'Países Bajos',
    'Portugal': 'Portugal',
    'Belgium': 'Bélgica',
    'Switzerland': 'Suiza',
    'Sweden': 'Suecia',
    'Norway': 'Noruega',
    'Denmark': 'Dinamarca',
    'Austria': 'Austria',
    'Poland': 'Polonia',
    'Croatia': 'Croacia',
    'Czechia': 'República Checa',
    'Scotland': 'Escocia',
    'Wales': 'Gales',
    'Turkey': 'Turquía',
    'Greece': 'Grecia',
    'Russia': 'Rusia',
    'Ukraine': 'Ucrania',
    'Ireland': 'Irlanda',
    'Northern Ireland': 'Irlanda del Norte',
    'Iceland': 'Islandia',
    'Finland': 'Finlandia',
    'Hungary': 'Hungría',
    'Romania': 'Rumanía',
    'Bulgaria': 'Bulgaria',
    'Slovakia': 'Eslovaquia',
    'Slovenia': 'Eslovenia',
    'Serbia': 'Serbia',
    'Montenegro': 'Montenegro',
    'Albania': 'Albania',
    'North Macedonia': 'Macedonia del Norte',
    'Bosnia-Herzegovina': 'Bosnia y Herzegovina',
    'Georgia': 'Georgia',
    'Armenia': 'Armenia',
    'Azerbaijan': 'Azerbaiyán',
    'Kazakhstan': 'Kazajistán',
    'Israel': 'Israel',

    // América del Sur
    'Argentina': 'Argentina',
    'Brazil': 'Brasil',
    'Uruguay': 'Uruguay',
    'Colombia': 'Colombia',
    'Chile': 'Chile',
    'Peru': 'Perú',
    'Ecuador': 'Ecuador',
    'Paraguay': 'Paraguay',
    'Bolivia': 'Bolivia',
    'Venezuela': 'Venezuela',

    // América del Norte y Central
    'Mexico': 'México',
    'United States': 'Estados Unidos',
    'Canada': 'Canadá',
    'Costa Rica': 'Costa Rica',
    'Panama': 'Panamá',
    'Honduras': 'Honduras',
    'El Salvador': 'El Salvador',
    'Guatemala': 'Guatemala',
    'Haiti': 'Haití',
    'Jamaica': 'Jamaica',
    'Trinidad and Tobago': 'Trinidad y Tobago',
    'Cuba': 'Cuba',

    // África
    'Nigeria': 'Nigeria',
    'Senegal': 'Senegal',
    'Ghana': 'Ghana',
    'Ivory Coast': 'Costa de Marfil',
    'Cameroon': 'Camerún',
    'Egypt': 'Egipto',
    'Morocco': 'Marruecos',
    'Algeria': 'Argelia',
    'Tunisia': 'Túnez',
    'South Africa': 'Sudáfrica',
    'Congo DR': 'República Democrática del Congo',
    'Cape Verde Islands': 'Cabo Verde',
    'Mali': 'Malí',
    'Burkina Faso': 'Burkina Faso',
    'Guinea': 'Guinea',
    'Zambia': 'Zambia',
    'Angola': 'Angola',
    'Sudan': 'Sudán',

    // Asia y Oceanía
    'Japan': 'Japón',
    'South Korea': 'Corea del Sur',
    'Saudi Arabia': 'Arabia Saudita',
    'Iran': 'Irán',
    'Iraq': 'Irak',
    'Qatar': 'Catar',
    'Uzbekistan': 'Uzbekistán',
    'Jordan': 'Jordania',
    'Australia': 'Australia',
    'New Zealand': 'Nueva Zelanda',
    'China': 'China',
    'India': 'India',
    'Indonesia': 'Indonesia',
    'Malaysia': 'Malasia',
    'Thailand': 'Tailandia',
    'Vietnam': 'Vietnam',
    'Philippines': 'Filipinas',
    'Singapore': 'Singapur',
    'Kuwait': 'Kuwait',
    'Bahrain': 'Baréin',
    'Oman': 'Omán',
    'UAE': 'Emiratos Árabes Unidos',
    'Syria': 'Siria',
    'Lebanon': 'Líbano',
    'Palestine': 'Palestina',
    'Fiji': 'Fiyi',
    'Solomon Islands': 'Islas Salomón',
    'Papua New Guinea': 'Papúa Nueva Guinea',
};

// ========================================== //
// MAPA DE BANDERAS (ESPAÑOL → URL)          //
// ========================================== //

const FLAG_MAP = {
    'Alemania': 'https://flagcdn.com/de.svg',
    'España': 'https://flagcdn.com/es.svg',
    'Francia': 'https://flagcdn.com/fr.svg',
    'Italia': 'https://flagcdn.com/it.svg',
    'Inglaterra': 'https://flagcdn.com/gb-eng.svg',
    'Países Bajos': 'https://flagcdn.com/nl.svg',
    'Portugal': 'https://flagcdn.com/pt.svg',
    'Bélgica': 'https://flagcdn.com/be.svg',
    'Suiza': 'https://flagcdn.com/ch.svg',
    'Suecia': 'https://flagcdn.com/se.svg',
    'Noruega': 'https://flagcdn.com/no.svg',
    'Dinamarca': 'https://flagcdn.com/dk.svg',
    'Austria': 'https://flagcdn.com/at.svg',
    'Polonia': 'https://flagcdn.com/pl.svg',
    'Croacia': 'https://flagcdn.com/hr.svg',
    'República Checa': 'https://flagcdn.com/cz.svg',
    'Escocia': 'https://flagcdn.com/gb-sct.svg',
    'Gales': 'https://flagcdn.com/gb-wls.svg',
    'Turquía': 'https://flagcdn.com/tr.svg',
    'Grecia': 'https://flagcdn.com/gr.svg',
    'Rusia': 'https://flagcdn.com/ru.svg',
    'Ucrania': 'https://flagcdn.com/ua.svg',
    'Irlanda': 'https://flagcdn.com/ie.svg',
    'Islandia': 'https://flagcdn.com/is.svg',
    'Finlandia': 'https://flagcdn.com/fi.svg',
    'Hungría': 'https://flagcdn.com/hu.svg',
    'Rumanía': 'https://flagcdn.com/ro.svg',
    'Bulgaria': 'https://flagcdn.com/bg.svg',
    'Eslovaquia': 'https://flagcdn.com/sk.svg',
    'Eslovenia': 'https://flagcdn.com/si.svg',
    'Serbia': 'https://flagcdn.com/rs.svg',
    'Montenegro': 'https://flagcdn.com/me.svg',
    'Albania': 'https://flagcdn.com/al.svg',
    'Macedonia del Norte': 'https://flagcdn.com/mk.svg',
    'Bosnia y Herzegovina': 'https://flagcdn.com/ba.svg',
    'Georgia': 'https://flagcdn.com/ge.svg',
    'Armenia': 'https://flagcdn.com/am.svg',
    'Azerbaiyán': 'https://flagcdn.com/az.svg',
    'Kazajistán': 'https://flagcdn.com/kz.svg',
    'Israel': 'https://flagcdn.com/il.svg',
    'Argentina': 'https://flagcdn.com/ar.svg',
    'Brasil': 'https://flagcdn.com/br.svg',
    'Uruguay': 'https://flagcdn.com/uy.svg',
    'Colombia': 'https://flagcdn.com/co.svg',
    'Chile': 'https://flagcdn.com/cl.svg',
    'Perú': 'https://flagcdn.com/pe.svg',
    'Ecuador': 'https://flagcdn.com/ec.svg',
    'Paraguay': 'https://flagcdn.com/py.svg',
    'Bolivia': 'https://flagcdn.com/bo.svg',
    'Venezuela': 'https://flagcdn.com/ve.svg',
    'México': 'https://flagcdn.com/mx.svg',
    'Estados Unidos': 'https://flagcdn.com/us.svg',
    'Canadá': 'https://flagcdn.com/ca.svg',
    'Costa Rica': 'https://flagcdn.com/cr.svg',
    'Panamá': 'https://flagcdn.com/pa.svg',
    'Honduras': 'https://flagcdn.com/hn.svg',
    'El Salvador': 'https://flagcdn.com/sv.svg',
    'Guatemala': 'https://flagcdn.com/gt.svg',
    'Haití': 'https://flagcdn.com/ht.svg',
    'Jamaica': 'https://flagcdn.com/jm.svg',
    'Trinidad y Tobago': 'https://flagcdn.com/tt.svg',
    'Cuba': 'https://flagcdn.com/cu.svg',
    'Nigeria': 'https://flagcdn.com/ng.svg',
    'Senegal': 'https://flagcdn.com/sn.svg',
    'Ghana': 'https://flagcdn.com/gh.svg',
    'Costa de Marfil': 'https://flagcdn.com/ci.svg',
    'Camerún': 'https://flagcdn.com/cm.svg',
    'Egipto': 'https://flagcdn.com/eg.svg',
    'Marruecos': 'https://flagcdn.com/ma.svg',
    'Argelia': 'https://flagcdn.com/dz.svg',
    'Túnez': 'https://flagcdn.com/tn.svg',
    'Sudáfrica': 'https://flagcdn.com/za.svg',
    'República Democrática del Congo': 'https://flagcdn.com/cd.svg',
    'RD Congo': 'https://flagcdn.com/cd.svg',
    'Congo DR': 'https://flagcdn.com/cd.svg',
    'Cabo Verde': 'https://flagcdn.com/cv.svg',
    'Malí': 'https://flagcdn.com/ml.svg',
    'Burkina Faso': 'https://flagcdn.com/bf.svg',
    'Guinea': 'https://flagcdn.com/gn.svg',
    'Zambia': 'https://flagcdn.com/zm.svg',
    'Angola': 'https://flagcdn.com/ao.svg',
    'Sudán': 'https://flagcdn.com/sd.svg',
    'Japón': 'https://flagcdn.com/jp.svg',
    'Corea del Sur': 'https://flagcdn.com/kr.svg',
    'Arabia Saudita': 'https://flagcdn.com/sa.svg',
    'Irán': 'https://flagcdn.com/ir.svg',
    'Irak': 'https://flagcdn.com/iq.svg',
    'Catar': 'https://flagcdn.com/qa.svg',
    'Uzbekistán': 'https://flagcdn.com/uz.svg',
    'Jordania': 'https://flagcdn.com/jo.svg',
    'Australia': 'https://flagcdn.com/au.svg',
    'Nueva Zelanda': 'https://flagcdn.com/nz.svg',
    'China': 'https://flagcdn.com/cn.svg',
    'India': 'https://flagcdn.com/in.svg',
    'Indonesia': 'https://flagcdn.com/id.svg',
    'Malasia': 'https://flagcdn.com/my.svg',
    'Tailandia': 'https://flagcdn.com/th.svg',
    'Vietnam': 'https://flagcdn.com/vn.svg',
    'Filipinas': 'https://flagcdn.com/ph.svg',
    'Singapur': 'https://flagcdn.com/sg.svg',
    'Kuwait': 'https://flagcdn.com/kw.svg',
    'Baréin': 'https://flagcdn.com/bh.svg',
    'Omán': 'https://flagcdn.com/om.svg',
    'Emiratos Árabes Unidos': 'https://flagcdn.com/ae.svg',
    'Siria': 'https://flagcdn.com/sy.svg',
    'Líbano': 'https://flagcdn.com/lb.svg',
    'Palestina': 'https://flagcdn.com/ps.svg',
    'Fiyi': 'https://flagcdn.com/fj.svg',
    'Islas Salomón': 'https://flagcdn.com/sb.svg',
    'Papúa Nueva Guinea': 'https://flagcdn.com/pg.svg',
};

// ========================================== //
// FUNCIÓN PARA TRADUCIR NOMBRES              //
// ========================================== //

function traducirNombre(nombre) {
    if (!nombre) return 'POR DEFINIR';
    if (nombre === 'POR DEFINIR') return nombre;
    return TRADUCCIONES[nombre] || nombre;
}

// ========================================== //
// FUNCIÓN PARA OBTENER LA BANDERA            //
// ========================================== //

function getFlag(countryName) {
    if (!countryName) return '';
    if (countryName === 'POR DEFINIR' || countryName.startsWith('W-')) return '';
    if (countryName.includes('Grupo') || countryName.includes('Ganador')) return '';
    
    const nombreTraducido = traducirNombre(countryName);
    
    if (FLAG_MAP[nombreTraducido]) {
        return `<img src="${FLAG_MAP[nombreTraducido]}" alt="${nombreTraducido}" class="team-flag-img" />`;
    }
    
    const lower = nombreTraducido.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const [key, url] of Object.entries(FLAG_MAP)) {
        const keyLower = key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (keyLower === lower || keyLower.includes(lower) || lower.includes(keyLower)) {
            return `<img src="${url}" alt="${key}" class="team-flag-img" />`;
        }
    }
    
    return ''; // Devuelve vacío en lugar de 🏴
}