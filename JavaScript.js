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
                <p class="description-text">ANALYSIS: Psychological and physical issues related to video games.</p>
                <div class="image-grid">
                    <div class="img-placeholder">IMG_DATA_01</div>
                    <div class="img-placeholder">IMG_DATA_02</div>
                    <div class="img-placeholder">IMG_DATA_03</div>
                </div>
            </div>`
    },
    'proyecto2': {
        titulo: 'DATA_STREAM // PROJECT_2',
        html: `
            <div class="project-node">
                <p class="description-text">ANALYSIS: How music affects the cognitive system of adolescents.</p>
                <div class="image-grid">
                    <div class="img-placeholder">IMG_A</div>
                    <div class="img-placeholder">IMG_B</div>
                    <div class="img-placeholder">IMG_C</div>
                </div>
            </div>`
    },
    'conjunto': {
        titulo: 'ARCHIVE // PROJECT_SET',
        html: `
            <div class="project-node">
                <p class="description-text">LINK: Consequences of long screen-time exposure (Cybersecurity).</p>
            </div>`
    }
};

function cargarContenido(id) {
    const container = document.getElementById('project-container');
    const mainTitle = document.getElementById('main-title');
    const data = contentData[id];

    if (data) {
        // 1. Efecto de salida: Desvanecer y bajar un poco
        container.style.opacity = 0;
        container.style.transform = "translateY(10px)";

        setTimeout(() => {
            // 2. Cambiar contenido
            mainTitle.textContent = data.titulo;
            container.innerHTML = data.html;

            // 3. Efecto de entrada: Aparecer y subir a su sitio
            container.style.opacity = 1;
            container.style.transform = "translateY(0)";

            // 4. Actualizar el estado del menú lateral
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active-link'));
            const activeLink = document.querySelector(`a[onclick="cargarContenido('${id}')"]`);
            if (activeLink) activeLink.classList.add('active-link');

        }, 200);
    }
}

// Objeto con la configuración de colores por sección
const sectionColors = {
    'inicio': '#00aaff',    // Azul
    'proyecto1': '#ff0000',  // Rojo
    'proyecto2': '#ffcc00',  // Amarillo
    'conjunto': '#00ff41'    // Verde (por defecto)
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%@&";

document.querySelectorAll('nav ul li a').forEach(link => {
    const originalText = link.innerText;
    let interval = null;

    link.onmouseover = event => {
        let iteration = 0;
        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 40)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);
    };

    link.onmouseleave = () => {
        clearInterval(interval);
        link.innerText = originalText;
    };
});

// Variable global para que el Matrix sepa qué color usar
let currentMatrixColor = '#00ff41';

function cargarContenido(id) {
    const container = document.getElementById('project-container');
    const mainTitle = document.getElementById('main-title');
    const data = contentData[id];
    const newColor = sectionColors[id] || '#00ff41';

    if (data) {
        // 1. Cambiar el color de la interfaz (Variables CSS)
        document.documentElement.style.setProperty('--main-color', newColor);
        currentMatrixColor = newColor; // Actualizamos el color para el fondo Matrix

        // 2. Efecto visual de transición
        container.style.opacity = 0;

        setTimeout(() => {
            mainTitle.textContent = data.titulo;
            container.innerHTML = data.html;
            container.style.opacity = 1;

            // Efecto de escritura que añadimos antes
            const desc = container.querySelector('.description-text');
            if (desc) escribirTexto(desc, desc.textContent);
        }, 200);
    }
}

// MODIFICACIÓN EN EL DIBUJO DE MATRIX
// En tu función dibujar(), cambia la línea del color por esta:
function dibujar() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = currentMatrixColor; // <--- Ahora usa la variable dinámica
    ctx.font = fontSize + "px monospace";
    // ... resto del código de dibujo ...
}

// Inicializar todo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    iniciarFondoHacker();
    cargarContenido('inicio');
});
