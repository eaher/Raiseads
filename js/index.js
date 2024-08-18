document.addEventListener('DOMContentLoaded', function () {
    const loadingImage = document.getElementById('loading-image');
    
    // Función para realizar el latido
    function heartbeat() {
        loadingImage.style.opacity = 1;
        loadingImage.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            loadingImage.style.transform = 'scale(1)';
        }, 500);
    }

    // Ejecutar la animación de latido inmediatamente
    heartbeat();

    // Repetir la animación de latido cada 1 segundo
    const heartbeatInterval = setInterval(heartbeat, 1000);

    // Ocultar la pantalla de carga después de 3 segundos
    setTimeout(function () {
        clearInterval(heartbeatInterval); // Detener la animación de latido
        document.getElementById('loading-screen').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 1000); // Espera a que la transición de opacidad termine
    }, 3500); // 3 segundos para asegurar que el latido sea visible
});

let lastScrollTop = 0;
let timer;
//Efecto en navbar
window.addEventListener('scroll', function () {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;
    
    if (currentScroll <= 0) {
        document.getElementById('navbar').style.top = '0';
        clearTimeout(timer); // Detenemos el temporizador si el usuario está en la parte superior
    } else if (currentScroll < lastScrollTop) {
        // Usuario está desplazándose hacia arriba
        document.getElementById('navbar').style.top = '0';
        clearTimeout(timer); // Detenemos el temporizador y reiniciamos
        timer = setTimeout(() => {
            document.getElementById('navbar').style.top = '-100px';
        }, 2000); // Muestra el menú por 2 segundos después de desplazar hacia arriba
    } else {
        // Usuario está desplazándose hacia abajo
        document.getElementById('navbar').style.top = '-100px';
        clearTimeout(timer); // Detenemos el temporizador si el usuario está desplazándose hacia abajo
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

//Contadores y clientes
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    
    const runCounter = (counter) => {
        counter.innerText = '0'; // Resetea el contador a 0 antes de empezar

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            let increment;

            // Aumenta la velocidad del contador para ventas
            if (counter.classList.contains('ventas-counter')) {
                increment = target / 10; // Controla la velocidad de este contador específico
            } else {
                increment = target / 200; // Velocidad estándar para otros contadores
            }
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 20); // Ajusta la frecuencia de actualización
            } else {
                counter.innerText = `+${target.toLocaleString()}`;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Ajusta el threshold según tus necesidades
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
});
