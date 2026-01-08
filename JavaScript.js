// --- 1. CONFIGURACIÓN DEL FONDO ANIMADO (MATRIX) ---
function iniciarFondoHacker() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Estilo para que el canvas esté fijo al fondo
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-3'; // Detrás de todo
    document.body.appendChild(canvas);

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const letras = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columnas = width / fontSize;
    const gotas = Array(Math.floor(columnas)).fill(1);

    function dibujar() {
        // Fondo semi-transparente para crear el efecto de rastro
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#00ff41"; // Color verde hacker
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

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    setInterval(dibujar, 33);
}

// --- 2. LÓGICA DE CONTENIDO DE PROYECTOS ---
const contentData = {
    'inicio': {
        titulo: 'SISTEMA // PANEL_CONTROL',
        html: `
            <div class="project-node">
                <h2>PROJECTO 1</h2>
                <p class="description-text">Problemas psicológicos y físicos de los videojuegos.</p>
            </div>
            <div class="project-node">
                <h2>PROJECTO 2</h2>
                <p class="description-text">Cómo afecta la música al sistema cognitivo de los adolescentes.</p>
            </div>`
    },
    'proyecto1': {
        titulo: 'DATA_STREAM // PROJECTO_1',
        html: `
            <div class="project-node">
                <p class="description-text">ANÁLISIS: Problemas psicológicos y físicos de los videojuegos.</p>
                <div class="image-grid">
                    <div class="img-placeholder">IMG_DATA_01</div>
                    <div class="img-placeholder">IMG_DATA_02</div>
                    <div class="img-placeholder">IMG_DATA_03</div>
                </div>
            </div>`
    },
    'proyecto2': {
        titulo: 'DATA_STREAM // PROJECTO_2',
        html: `
            <div class="project-node">
                <p class="description-text">ANÁLISIS: Cómo afecta la música al sistema cognitivo de los adolescentes.</p>
                <div class="image-grid">
                    <div class="img-placeholder">IMG_A</div>
                    <div class="img-placeholder">IMG_B</div>
                    <div class="img-placeholder">IMG_C</div>
                </div>
            </div>`
    },
    'conjunto': {
        titulo: 'ARCHIVO // CONJUNTO_PROYECTOS',
        html: `
            <div class="project-node">
                <p class="description-text">VÍNCULO: Conseqüencies de pasar molt temps davant la pantalla (Ciberseguretat).</p>
            </div>`
    }
};

function cargarContenido(id) {
    const container = document.getElementById('project-container');
    const mainTitle = document.getElementById('main-title');
    const data = contentData[id];

    if (data) {
        container.style.opacity = 0;
        setTimeout(() => {
            mainTitle.textContent = data.titulo;
            container.innerHTML = data.html;
            container.style.opacity = 1;
        }, 150);
    }
}

// Inicializar todo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    iniciarFondoHacker();
    cargarContenido('inicio');
});
