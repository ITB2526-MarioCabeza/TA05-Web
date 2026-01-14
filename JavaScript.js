// --- 1. CONFIGURACIÓN BÁSICA ---
let currentMatrixColor = '#00ff41';

// Base de datos de los 10 Sub-Proyectos (Dentro de Project Set)
// Base de datos de los 10 Sub-Proyectos (Dentro de Project Set)
// CORREGIDO: Ahora usan TUS archivos locales (.jpg)
const subProjectsDB = [
    // Usamos tus fotos reales para los primeros:
    {
        id: 0,
        title: '01_AI_CORE',
        desc: 'Deep learning algorithms for predictive user behavior analysis.',
        img: '01_AI.jpeg'  // <--- Tu foto real
    },
    {
        id: 1,
        title: '02_CYBER_WALL',
        desc: 'Next-gen firewall architecture against quantum decryption attacks.',
        img: '02_Cyber.jpg' // <--- Tu foto real
    },
    {
        id: 2,
        title: '03_IOT_GRID',
        desc: 'Smart home automation using decentralized sensor networks.',
        img: '03_IOT.jpg'  // <--- Tu foto real
    },
    {
        id: 3,
        title: '04_BIG_DATA',
        desc: 'Processing 5TB/s of raw data to find hidden market patterns.',
        img: '04_BigData.jpg' // <--- Tu foto real
    },

    // --- Para el resto (del 5 al 10), repito tus fotos para que no salgan rotas ---
    // (Cuando tengas fotos nuevas, cambia el nombre aquí)
    { id: 4, title: '05_ROBO_TECH', desc: 'Autonomous robotic arms assembly.', img: '05_Robotics.jpg' },
    { id: 5, title: '06_CLOUD_SYNC', desc: 'Serverless architecture zero latency.', img: '06_Server.jpg' },
    { id: 6, title: '07_CRYPTO_V', desc: 'Blockchain ledger for secure voting.', img: '07_Crypto.jpg' },
    { id: 7, title: '08_VIRTUAL_R', desc: 'Immersive VR interface topology.', img: '08_VR.jpg' },
    { id: 8, title: '09_NET_WORK', desc: 'Advanced VPN tunneling protocols.', img: '09_VPN.jpg' },
    { id: 9, title: '10_BIO_HACK', desc: 'Biometric iris scanning integration.', img: '10_Biometric.jpg' }
];

// Colores principales de las secciones del menú lateral
const sectionColors = {
    'inicio': '#00ff41',
    'proyecto1': '#ff0000',
    'proyecto2': '#ffff00',
    'conjunto': '#00f2ff', // Azul Cian para Project Set
    'contacto': '#ff9900'
};

// --- 2. MATRIX RAIN ---
function iniciarFondoHacker() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed'; canvas.style.top = '0'; canvas.style.left = '0'; canvas.style.zIndex = '-3';
    document.body.appendChild(canvas);

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const letras = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columnas = width / fontSize;
    const gotas = Array(Math.floor(columnas)).fill(1);

    function dibujar() {
        // 1. IMPORTANTE: Ponemos la opacidad al máximo para pintar el fondo negro semitransparente
        // (Esto es lo que borra las letras viejas y crea el rastro)
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, width, height);

        // 2. AHORA SÍ: Bajamos la intensidad para las letras nuevas
        // Valor 0.2 = Muy apagado (ideal para leer encima)
        // Valor 1.0 = Totalmente brillante (como lo tenías antes)
        ctx.globalAlpha = 0.2;

        ctx.fillStyle = currentMatrixColor;
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < gotas.length; i++) {
            const texto = letras.charAt(Math.floor(Math.random() * letras.length));
            ctx.fillText(texto, i * fontSize, gotas[i] * fontSize);

            if (gotas[i] * fontSize > height && Math.random() > 0.975) {
                gotas[i] = 0;
            }
            gotas[i]++;
        }
    }
    window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
    setInterval(dibujar, 33);
}

// --- 3. CONTENIDO PRINCIPAL ---
// Función para generar el grid de 10 proyectos automáticamente
function generarGridProyectos() {
    let html = '<p class="description-text">SELECT A SUB-SYSTEM TO INITIALIZE:</p><div class="projects-grid">';

    subProjectsDB.forEach((item, index) => {
        // Cada div tiene un onclick que llama a verSubProyecto con su número
        html += `
            <div class="grid-item" onclick="verSubProyecto(${index})">
                <h3>[ ${item.title} ]</h3>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

const contentData = {
    'inicio': {
        titulo: 'SYSTEM // CONTROL_PANEL',
        html: `
            <div class="project-node">
                <h2>PROJECT 1</h2>
                <p class="description-text">Psychological and physical issues related to video games.</p>
            </div>
            <div class="project-node">
                <h2>PROJECT 2</h2>
                <p class="description-text">How music affects the cognitive system of adolescents.</p>
            </div>`
    },
    'proyecto1': {
        titulo: 'DATA_STREAM // PROJECT_1',
        html: `
            <div class="project-node">
                <p class="description-text">SYSTEM ANALYSIS: A comprehensive study on the impact of extended interactive screen time.</p>
                <div class="image-grid">
                   <img src="Proyect1.jpg" class="hacker-img" alt="P1 A">
                   <img src="Proyect01.jpg" class="hacker-img" alt="P1 B">
                </div>
            </div>`
    },
    'proyecto2': {
        titulo: 'DATA_STREAM // PROJECT_2',
        html: `
            <div class="project-node">
                <p class="description-text">SYSTEM ANALYSIS: Investigation into auditory stimuli processing.</p>
                <div class="image-grid">
                   <img src="Proyect2.jpg" class="hacker-img" alt="P2 A">
                   <img src="Proyect02.jpg" class="hacker-img" alt="P2 B">
                </div>
            </div>`
    },
    // AQUÍ ESTÁ EL CAMBIO: 'conjunto' ya no tiene HTML fijo, lo generamos dinámicamente
    'conjunto': {
        titulo: 'ARCHIVE // PROJECT_SET_INDEX',
        html: '' // Se rellena con la función
    },
    'contacto': {
        titulo: 'COMM_LINK // UPLINK',
        html: `
            <div class="project-node">
                <p class="description-text">SECURE CHANNEL OPEN.</p>
                <form class="hacker-form" onsubmit="procesarFormularioReal(event)">
                    <div class="input-group"><input type="text" name="nombre" class="hacker-input" placeholder="> NAME" required></div>
                    <div class="input-group"><input type="email" name="email" class="hacker-input" placeholder="> EMAIL" required></div>
                    <div class="input-group"><textarea name="mensaje" class="hacker-input" rows="4" placeholder="> MESSAGE..." required></textarea></div>
                    <button type="submit" class="btn-transmit">[ SEND ]</button>
                </form>
                <div id="status-msg"></div>
            </div>`
    }
};

// --- 4. FUNCIONES DE NAVEGACIÓN ---

function cargarContenido(id) {
    const container = document.getElementById('project-container');
    const mainTitle = document.getElementById('main-title');
    let data = contentData[id];
    const newColor = sectionColors[id] || '#00ff41';

    // Si entramos en 'conjunto', generamos el HTML del grid en ese momento
    if (id === 'conjunto') {
        data.html = generarGridProyectos();
    }

    if (data) {
        currentMatrixColor = newColor;
        document.documentElement.style.setProperty('--neon-green', newColor);

        container.style.opacity = 0;
        container.style.transform = "translateY(10px)";
        setTimeout(() => {
            mainTitle.textContent = data.titulo;
            container.innerHTML = data.html;
            container.style.opacity = 1;
            container.style.transform = "translateY(0)";
        }, 200);
    }
}

// NUEVA FUNCIÓN: Para ver el detalle de uno de los 10 proyectos
function verSubProyecto(index) {
    const item = subProjectsDB[index];
    const container = document.getElementById('project-container');
    const mainTitle = document.getElementById('main-title');

    // Efecto de transición
    container.style.opacity = 0;

    setTimeout(() => {
        // Cambiamos el título
        mainTitle.textContent = `ARCHIVE // ${item.title}`;

        // Inyectamos el HTML del detalle (Botón volver + Texto + Foto)
        container.innerHTML = `
            <div class="project-node">
                <a href="#" onclick="cargarContenido('conjunto')" class="btn-back">< BACK TO LIST</a>

                <h2 style="margin-top: 20px; color: white;">${item.title}</h2>
                <p class="description-text">${item.desc}</p>

                <div class="image-grid">
                    <img src="${item.img}" class="hacker-img" alt="${item.title}">
                </div>
            </div>
        `;
        container.style.opacity = 1;
    }, 200);
}

// --- 5. LÓGICA DE ENVÍO Y TEXTO ---
function procesarFormularioReal(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const status = document.getElementById('status-msg');

    btn.disabled = true; btn.innerText = "ENCRYPTING..."; status.innerText = "> PACKETS SENT..."; status.style.color = currentMatrixColor;

    fetch("https://formspree.io/f/mgoovvry", { method: "POST", body: new FormData(form), headers: {'Accept': 'application/json'} })
    .then(r => {
        if(r.ok) {
            status.innerText = "> SENT OK."; status.style.color = "#00ff41"; btn.innerText = "[ SENT ]"; form.reset();
            setTimeout(() => { btn.disabled = false; btn.innerText = "[ SEND ]"; status.innerText = ""; }, 3000);
        } else { status.innerText = "ERROR."; }
    }).catch(e => status.innerText = "NETWORK ERROR.");
}

// Efecto letras en menú
const letters = "ABCDEF0123456789";
document.querySelectorAll('nav ul li a').forEach(link => {
    link.dataset.original = link.innerText;
    link.onmouseover = event => {
        let it = 0;
        const iv = setInterval(() => {
            event.target.innerText = event.target.innerText.split("").map((l, i) => {
                if (i < it) return event.target.dataset.original[i];
                return letters[Math.floor(Math.random() * 16)];
            }).join("");
            if (it >= event.target.dataset.original.length) clearInterval(iv);
            it += 1/3;
        }, 30);
        link.onmouseleave = () => { clearInterval(iv); event.target.innerText = event.target.dataset.original; };
    };
});

document.addEventListener('DOMContentLoaded', () => { iniciarFondoHacker(); cargarContenido('inicio'); });