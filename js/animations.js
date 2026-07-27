/**
 * Animation Utilities
 * Helper functions for creating animations
 */

const AnimationController = {
    // ========================================
    // Confetti Animation
    // ========================================
    createConfetti() {
        const container = document.querySelector('.confetti-container');
        if (!container) return;

        const confettiCount = 50;
        const colors = ['#FFB6D9', '#E75480', '#FFCBA4', '#FFE5F0', '#FF69B4'];

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 0.5;
            const xDist = (Math.random() - 0.5) * 600;

            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                animation: confettiFall ${duration}s linear ${delay}s forwards;
                --tx: ${xDist}px;
            `;

            container.appendChild(confetti);
        }

        // Add confetti keyframes if not exists
        if (!document.querySelector('style[data-confetti]')) {
            const style = document.createElement('style');
            style.setAttribute('data-confetti', 'true');
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translate(-50%, -50%) rotateZ(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50% + var(--tx)), 500px) rotateZ(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Clean up after animation
        setTimeout(() => {
            container.querySelectorAll('div').forEach(el => el.remove());
        }, 4500);
    },

    // ========================================
    // Fireworks Animation
    // ========================================
    createFireworks() {
        const container = document.querySelector('.fireworks-container');
        if (!container) return;

        const fireworksCount = 5;
        for (let i = 0; i < fireworksCount; i++) {
            setTimeout(() => this._burstFirework(container), i * 400);
        }
    },

    _burstFirework(container) {
        const particleCount = 30;
        const colors = ['#FF69B4', '#FFB6D9', '#E75480', '#FFD700'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 5 + Math.random() * 3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 6 + 2;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                --angle: ${angle};
                --velocity: ${velocity};
                animation: fireworkBurst 1.5s ease-out forwards;
            `;

            container.appendChild(particle);
        }

        if (!document.querySelector('style[data-fireworks]')) {
            const style = document.createElement('style');
            style.setAttribute('data-fireworks', 'true');
            style.textContent = `
                @keyframes fireworkBurst {
                    0% {
                        transform: translate(-50%, -50%);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(
                            calc(-50% + cos(var(--angle)) * var(--velocity) * 100px),
                            calc(-50% + sin(var(--angle)) * var(--velocity) * 100px)
                        );
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            container.querySelectorAll('div').forEach(el => el.remove());
        }, 2000);
    },

    // ========================================
    // Floating Hearts
    // ========================================
    createFloatingHearts(container, count = 20) {
        if (!container) container = document.querySelector('.floating-hearts-container');
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;

            heart.textContent = '❤️';
            heart.style.cssText = `
                position: absolute;
                font-size: ${20 + Math.random() * 20}px;
                left: ${left}%;
                bottom: -50px;
                pointer-events: none;
                animation: floatingHeart ${duration}s ease-in ${delay}s forwards;
                opacity: 0;
            `;

            container.appendChild(heart);
        }

        if (!document.querySelector('style[data-hearts]')) {
            const style = document.createElement('style');
            style.setAttribute('data-hearts', 'true');
            style.textContent = `
                @keyframes floatingHeart {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) scale(0.5);
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // ========================================
    // Butterflies
    // ========================================
    createButterflies(container, count = 5) {
        if (!container) container = document.querySelector('.floating-butterflies');
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const butterfly = document.createElement('div');
            const left = Math.random() * 100;
            const delay = Math.random() * 5;

            butterfly.innerHTML = '🦋';
            butterfly.style.cssText = `
                position: absolute;
                font-size: 2rem;
                left: ${left}%;
                top: -50px;
                pointer-events: none;
                animation: butterflyFloat 8s ease-in-out ${delay}s infinite;
            `;

            container.appendChild(butterfly);
        }

        if (!document.querySelector('style[data-butterflies]')) {
            const style = document.createElement('style');
            style.setAttribute('data-butterflies', 'true');
            style.textContent = `
                @keyframes butterflyFloat {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    25% { transform: translateY(100px) translateX(50px); }
                    50% { transform: translateY(200px) translateX(-30px); }
                    75% { transform: translateY(300px) translateX(40px); }
                    100% { transform: translateY(100vh) translateX(0); }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // ========================================
    // Floating Flowers
    // ========================================
    createFloatingFlowers(container, count = 3) {
        if (!container) container = document.querySelector('.floating-flowers');
        if (!container) return;

        const flowers = ['🌸', '🌺', '🌼', '🌻'];

        for (let i = 0; i < count; i++) {
            const flower = document.createElement('div');
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const flowerEmoji = flowers[Math.floor(Math.random() * flowers.length)];

            flower.innerHTML = flowerEmoji;
            flower.style.cssText = `
                position: absolute;
                font-size: ${1.5 + Math.random()}rem;
                left: ${left}%;
                bottom: -50px;
                pointer-events: none;
                opacity: 0.6;
                animation: floatingFlower 6s ease-in ${delay}s forwards;
            `;

            container.appendChild(flower);
        }

        if (!document.querySelector('style[data-flowers]')) {
            const style = document.createElement('style');
            style.setAttribute('data-flowers', 'true');
            style.textContent = `
                @keyframes floatingFlower {
                    0% {
                        opacity: 0;
                        transform: translateY(0) rotate(0deg);
                    }
                    10% {
                        opacity: 0.6;
                    }
                    90% {
                        opacity: 0.6;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-120vh) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // ========================================
    // Night Sky Elements
    // ========================================
    createNightSky() {
        const starsContainer = document.querySelector('.stars');
        const firefliesContainer = document.querySelector('.fireflies');
        if (!starsContainer || !firefliesContainer) return;

        // Create stars
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 2 + 1;
            const opacity = Math.random() * 0.7 + 0.3;
            const duration = 3 + Math.random() * 2;

            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${opacity};
                animation: twinkle ${duration}s ease-in-out infinite;
            `;

            starsContainer.appendChild(star);
        }

        // Create fireflies
        for (let i = 0; i < 10; i++) {
            const firefly = document.createElement('div');
            const delay = Math.random() * 5;
            const duration = 4 + Math.random() * 2;

            firefly.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #FFD700;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 10px #FFD700;
                animation: fireflyGlow ${duration}s ease-in-out ${delay}s infinite;
                pointer-events: none;
            `;

            firefliesContainer.appendChild(firefly);
        }

        if (!document.querySelector('style[data-nightsky]')) {
            const style = document.createElement('style');
            style.setAttribute('data-nightsky', 'true');
            style.textContent = `
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
                @keyframes fireflyGlow {
                    0%, 100% { opacity: 0.3; box-shadow: 0 0 5px #FFD700; }
                    50% { opacity: 1; box-shadow: 0 0 20px #FFD700; }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // ========================================
    // Typing Effect
    // ========================================
    typeText(element, text, speed = 150, callback) {
        if (!element) return;

        let index = 0;
        element.textContent = '';

        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
                if (callback) callback();
            }
        }, speed);
    },

    // ========================================
    // Page Transition
    // ========================================
    transitionPage(fromPage, toPage) {
        return new Promise((resolve) => {
            const from = document.querySelector(`[data-page="${fromPage}"]`);
            const to = document.querySelector(`[data-page="${toPage}"]`);

            if (from) {
                from.classList.remove('active');
            }

            // Small delay for smooth transition
            setTimeout(() => {
                if (to) {
                    to.classList.add('active');
                }
                resolve();
            }, 50);
        });
    },

    // ========================================
    // Stagger Animation
    // ========================================
    staggerElements(elements, delayUnit = 100, animation = 'fadeInScale') {
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * delayUnit}ms`;
            el.style.animation = `${animation} 0.6s ease-out forwards`;
        });
    },

    // ========================================
    // Scroll Trigger Animation
    // ========================================
    observeElementsOnScroll() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('.memory-text').forEach((el) => {
            observer.observe(el);
        });
    },

    // ========================================
    // Floating Decorations Background
    // ========================================
    createBackgroundDecorations() {
        const decorations = document.querySelector('.floating-decorations');
        if (!decorations) return;

        const items = ['❤️', '✨', '⭐', '🎈', '🦋', '🌸'];
        const count = 15;

        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = items[Math.floor(Math.random() * items.length)];
            decorations.appendChild(element);
        }
    },

    // ========================================
    // Initialize All Animations for Current Page
    // ========================================
    initializePageAnimations(pageNumber) {
        switch (pageNumber) {
            case 1:
                if (config.animations.enableConfetti) this.createConfetti();
                if (config.animations.enableFireworks) this.createFireworks();
                if (config.animations.enableFloatingHearts) {
                    this.createFloatingHearts(null, 30);
                }
                break;
            case 2:
                this.createBackgroundDecorations();
                break;
            case 3:
                this.createButterflies(null, 5);
                break;
            case 4:
                this.observeElementsOnScroll();
                this.createFloatingFlowers(null, 4);
                break;
            case 5:
                this.createNightSky();
                this.createFloatingHearts(document.querySelector('.floating-hearts-final'), 15);
                break;
        }
    },
};

/**
 * Wait for DOM to be ready
 */
function waitForDOM() {
    return new Promise((resolve) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    });
}
