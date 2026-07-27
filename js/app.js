/**
 * Birthday Story - Main Application
 * Handles page navigation, content population, and interactions
 */

class BirthdayStory {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 5;
        this.music = null;
        this.isMuted = false;
        this.init();
    }

    // ========================================
    // Initialization
    // ========================================
    async init() {
        await waitForDOM();

        // Setup basic elements
        this.setupMusic();
        this.populateContent();
        this.attachEventListeners();
        this.applyTheme();

        // Show first page
        this.goToPage(1);

        // Create background decorations
        AnimationController.createBackgroundDecorations();
    }

    // ========================================
    // Theme Application
    // ========================================
    applyTheme() {
        const root = document.documentElement;
        Object.keys(config.theme).forEach((key) => {
            const cssVarName = this.camelToDash(key);
            root.style.setProperty(`--${cssVarName}`, config.theme[key]);
        });
    }

    camelToDash(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    // ========================================
    // Content Population
    // ========================================
    populateContent() {
        // Page 1 - Opening
        const page1Title = document.querySelector('.typing-text');
        if (page1Title) {
            page1Title.textContent = config.content.openingTitle;
        }

        // Page 2 - Photo & Info
        this.updateElement('.person-name', config.person.name);
        this.updateElement('.birth-date', `Born: ${config.person.dateOfBirth}`);
        this.updateElement('.birthday-message', config.content.page2.message);

        const photo1 = document.querySelector('.page-2 .photo-placeholder img');
        if (photo1) photo1.src = config.content.page2.photo;

        // Page 3 - Split Layout
        this.updateElement('.split-text h2', config.content.page3.title);
        this.updateElement('.split-text p', config.content.page3.message);

        const photo2 = document.querySelector('.page-3 .split-image img');
        if (photo2) photo2.src = config.content.page3.photo;

        // Page 4 - Memory Gallery
        const photo3 = document.querySelector('.page-4 .memory-main img');
        if (photo3) photo3.src = config.content.page4.photo;

        const memoryTexts = document.querySelectorAll('.memory-text');
        memoryTexts.forEach((el, index) => {
            if (config.content.page4.memories[index]) {
                el.textContent = config.content.page4.memories[index];
            }
        });

        // Page 5 - Letter
        const letterText = document.querySelector('.letter-text');
        if (letterText) {
            letterText.innerHTML = this.formatLetterText(config.content.page5.letterContent);
        }
    }

    updateElement(selector, content) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = content;
        }
    }

    formatLetterText(text) {
        // Convert line breaks and paragraphs
        return text
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => `<p>${line}</p>`)
            .join('');
    }

    // ========================================
    // Music Control
    // ========================================
    setupMusic() {
        if (!config.music.enabled) return;

        // Check if using YouTube or regular audio
        if (config.music.type === 'youtube') {
            this.setupYouTubeMusic();
        } else {
            this.setupAudioMusic();
        }
    }

    setupAudioMusic() {
        this.music = document.getElementById('bgMusic');
        if (!this.music) return;

        // Try to autoplay
        if (config.music.autoplay) {
            const playPromise = this.music.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        this.isMuted = false;
                    })
                    .catch(() => {
                        // Autoplay was prevented, show play button
                        this.showPlayButton();
                    });
            }
        }
    }

    setupYouTubeMusic() {
        // Load YouTube API
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.head.appendChild(tag);

        // Set up the global callback
        window.onYouTubeIframeAPIReady = () => {
            this.player = new YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: config.music.youtubeId,
                playerVars: {
                    'autoplay': config.music.autoplay ? 1 : 0,
                    'controls': 0,
                    'showinfo': 0,
                    'iv_load_policy': 3,
                    'modestbranding': 1,
                },
                events: {
                    'onReady': (e) => this.onYouTubePlayerReady(e),
                    'onStateChange': (e) => this.onYouTubeStateChange(e)
                }
            });
        };

        // If API already loaded
        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }
    }

    onYouTubePlayerReady(event) {
        // Mute initially (required for autoplay in many browsers)
        event.target.mute();
        
        if (config.music.autoplay) {
            event.target.playVideo();
        }
        
        this.isMuted = true;
    }

    onYouTubeStateChange(event) {
        // Loop the video when it ends
        if (event.data === YT.PlayerState.ENDED) {
            event.target.seekTo(0);
            event.target.playVideo();
        }
    }

    showPlayButton() {
        const btn = document.querySelector('.music-btn');
        if (btn) {
            btn.textContent = '🔇';
            btn.title = 'Click to play music';
        }
    }

    toggleMusic() {
        // For YouTube
        if (this.player) {
            if (this.isMuted) {
                this.player.unMute();
                this.player.playVideo();
                this.isMuted = false;
            } else {
                this.player.mute();
                this.player.pauseVideo();
                this.isMuted = true;
            }
        } 
        // For regular audio
        else if (this.music) {
            if (this.music.paused) {
                this.music.play().catch(() => {
                    console.log('Autoplay prevented by browser');
                });
                this.isMuted = false;
            } else {
                this.music.pause();
                this.isMuted = true;
            }
        }

        this.updateMusicButton();
    }

    updateMusicButton() {
        const btn = document.querySelector('.music-btn');
        if (btn) {
            btn.textContent = this.isMuted ? '🔇' : '🔊';
            btn.setAttribute('aria-label', this.isMuted ? 'Unmute music' : 'Mute music');
        }
    }

    // ========================================
    // Page Navigation
    // ========================================
    attachEventListeners() {
        // Next buttons
        document.querySelectorAll('.btn-next').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const nextPage = parseInt(btn.dataset.next, 10);
                this.goToPage(nextPage);
                e.preventDefault();
            });
        });

        // Back buttons
        document.querySelectorAll('.btn-back').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const prevPage = parseInt(btn.dataset.back, 10);
                this.goToPage(prevPage);
                e.preventDefault();
            });
        });

        // Music button
        const musicBtn = document.querySelector('.music-btn');
        if (musicBtn) {
            musicBtn.addEventListener('click', () => this.toggleMusic());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                this.goToPage(Math.min(this.currentPage + 1, this.totalPages));
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                this.goToPage(Math.max(this.currentPage - 1, 1));
                e.preventDefault();
            }
        });
    }

    async goToPage(pageNumber) {
        // Validate page number
        if (pageNumber < 1 || pageNumber > this.totalPages) {
            return;
        }

        const fromPage = this.currentPage;
        this.currentPage = pageNumber;

        // Transition pages
        await AnimationController.transitionPage(fromPage, pageNumber);

        // Initialize page-specific animations
        AnimationController.initializePageAnimations(pageNumber);

        // Page-specific logic
        this.handlePageLoad(pageNumber);

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // ========================================
    // Page-Specific Logic
    // ========================================
    handlePageLoad(pageNumber) {
        switch (pageNumber) {
            case 1:
                this.handlePage1();
                break;
            case 2:
                this.handlePage2();
                break;
            case 3:
                this.handlePage3();
                break;
            case 4:
                this.handlePage4();
                break;
            case 5:
                this.handlePage5();
                break;
        }
    }

    handlePage1() {
        // Typing animation for opening title
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const text = typingElement.textContent;
            typingElement.textContent = '';

            AnimationController.typeText(
                typingElement,
                text,
                config.animations.typingSpeed,
                () => {
                    // After typing completes, trigger animations
                    setTimeout(() => {
                        if (config.animations.enableConfetti)
                            AnimationController.createConfetti();
                        if (config.animations.enableFireworks)
                            AnimationController.createFireworks();
                    }, 500);
                }
            );
        }
    }

    handlePage2() {
        // Photo fade-in animation
        const photo = document.querySelector('.page-2 .photo-placeholder');
        if (photo) {
            photo.style.animation = 'slideUp 0.8s ease-out';
        }
    }

    handlePage3() {
        // Image floating animation already in CSS
    }

    handlePage4() {
        // Stagger memory text animations
        const memoryTexts = document.querySelectorAll('.memory-text');
        AnimationController.staggerElements(memoryTexts, 200, 'fadeInScale');
    }

    handlePage5() {
        // Letter appearance animation
        const letterContent = document.querySelector('.letter-text');
        if (letterContent) {
            // Type the letter content
            const paragraphs = letterContent.querySelectorAll('p');
            paragraphs.forEach((p) => {
                const text = p.textContent;
                p.textContent = '';
                AnimationController.typeText(p, text, 30);
            });
        }
    }

    // ========================================
    // Utility Methods
    // ========================================
    getCurrentPage() {
        return this.currentPage;
    }

    getTotalPages() {
        return this.totalPages;
    }
}

// ========================================
// Initialize App When DOM is Ready
// ========================================
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new BirthdayStory();
    });
} else {
    app = new BirthdayStory();
}

/**
 * Accessibility: Announce page changes to screen readers
 */
function announcePageChange(pageNumber) {
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Page ${pageNumber} of 5`;
    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 1000);
}

/**
 * Service Worker Registration for Offline Support
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {
            // Service worker not available, app still works online
        });
    });
}
