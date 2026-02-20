document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    // trigger initial reveal manually with slight delay for navbar
    setTimeout(() => {
        document.querySelector('.reveal-nav')?.classList.add('visible');
    }, 100);

    // 3. Magnetic / Tilt effect for Product Card
    const card = document.getElementById('alter-card');
    const glow = document.getElementById('alter-glow');

    if (card && glow) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Move the glow to follow the cursor within the card
            glow.style.left = `${x - 125}px`; // 125 is half the glow width
            glow.style.top = `${y - 125}px`;

            // Calculate tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = (y - centerY) / 20; // Max tilt up/down
            const tiltY = (centerX - x) / 20; // Max tilt left/right

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    // 4. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Set default theme state based on prefers-color-scheme or localStorage
    const savedTheme = localStorage.getItem('theme');

    // Initialize light theme by default since user asked for it specifically for the parent org
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        });
    }

    // 5. Sakura Animation
    const sakuraBtn = document.getElementById('sakura-btn');
    const heroSakuraBtn = document.getElementById('hero-sakura-btn');
    const sakuraContainer = document.getElementById('sakura-container');

    if (sakuraContainer) {
        if (sakuraBtn) {
            sakuraBtn.addEventListener('click', () => {
                createSakuraBurst();
            });
        }
        if (heroSakuraBtn) {
            heroSakuraBtn.addEventListener('click', () => {
                createSakuraBurst();
            });
        }
    }

    function createSakuraBurst() {
        const petalCount = 35; // Number of petals to draw per click

        for (let i = 0; i < petalCount; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.classList.add('sakura-petal');

                // Randomize petal size
                const size = Math.random() * 10 + 8; // 8px to 18px
                petal.style.width = `${size}px`;
                petal.style.height = `${size}px`;

                // Randomize starting position across the top edge and slightly offsides
                const startPos = Math.random() * 120 - 10; // -10% to 110%
                petal.style.left = `${startPos}%`;

                // Randomize animation duration for fall and sway individually
                const fallDuration = Math.random() * 3 + 4; // 4s to 7s
                const swayDuration = Math.random() * 2 + 2; // 2s to 4s
                petal.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;

                // Randomize starting delay to make it smooth
                const delay = Math.random() * 2;
                petal.style.animationDelay = `${delay}s, ${delay}s`;

                sakuraContainer.appendChild(petal);

                // Remove petal after it falls
                setTimeout(() => {
                    petal.remove();
                }, (fallDuration + delay) * 1000);

            }, i * 50); // Stagger petal creation slightly
        }
    }
});
