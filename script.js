document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL CONTADOR REGRESIVO ---
    // Fecha exacta de su 10º mes de aniversario.
    const anniversaryDate = new Date("August 5, 2025 00:00:00").getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = anniversaryDate - now;

        // Si la cuenta regresiva termina, muestra un mensaje especial
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "<div class='time-box' style='width:100%; font-size: 1.2rem; padding: 30px 10px;'>¡Felices 10 Meses, mi amor! Te amo.</div>";
            return;
        }

        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mostrar en la página
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

    }, 1000);

    // --- LÓGICA DE LAS 10 RAZONES ---
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('show');
        });
    });

    // --- LÓGICA PARA ANIMACIÓN DE CORAZONES DE FONDO ---
    const heartsContainer = document.querySelector('.hearts-container');
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }
    setInterval(createHeart, 500);

});

// --- LÓGICA PARA EL REPRODUCTOR DE MÚSICA PERSONALIZADO ---
// Se añade un listener adicional para asegurar que se ejecute después del primero.
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('local-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');

    // Comprobación para evitar errores si los elementos no existen
    if (!audio || !playPauseBtn) return;

    // Función para Play/Pausa
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Función para formatear el tiempo (ej: 125 segundos -> "2:05")
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Actualizar la barra de progreso y los tiempos
    function updateProgress() {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percentage}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
    
    // Poner la duración total cuando la canción se cargue
    audio.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(audio.duration);
    });
    
    // Mover la canción al hacer clic en la barra de progreso
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    audio.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('click', setProgress);
    
    // Reiniciar el botón de play cuando la canción termine
    audio.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });
});