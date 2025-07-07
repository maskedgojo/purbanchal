class TestimonialCarousel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`❌ Container with id '${containerId}' not found`);
            return;
        }

        // Default options
        this.options = {
            autoPlayInterval: 4000,
            transitionDuration: 600,
            showIndicators: true,
            showNavigation: true,
            pauseOnHover: true,
            ...options
        };

        // Default testimonials data - only 3 cards
        this.testimonials = options.testimonials || [
            {
                name: "Mr. Govind Khaitan",
                title: "Imperial Group (Director: Mr. Govind Khaitan)",
                text: "We have been associated with Purbanchal Cement Ltd since long time. The brand Surya Gold has been used in many of our projects across Assam, and is in use presently in many residential projects. We have found the quality parameters and services satisfactory.",
                avatar: "https://www.purbanchalcement.com/storage/05-2024/Govind-Khaitan-Imperial-Group.png"
            },
            {
                name: "Mr. Amarchand Kalani",
                title: "Uttarayan Group (Owner: Mr. Amarchand Kalani)",
                text: "The brand Surya Gold cement has been extensively used in almost all the residential projects in Guwahati and other areas. We have been associated with PCL since ten years and have found the quality up to the mark throughout. As a whole it has been a satisfactory experience with the company and looking forward to a long association.",
                avatar: "https://www.purbanchalcement.com/storage/05-2024/A-C-Kalani-Uttarayan-Group-2.png"
            },
            {
                name: "Mr. Manoj Jalan",
                title: "Protech Group (Director: Mr. Manoj Jalan)",
                text: "We are in association with PCL from last 15 years. We are extensively using Surya Gold Cement in almost all of our residential projects in Guwahati and as well in other areas of construction. We have found the quality of cement up to the mark throughout.As a whole it has really been a satisfactory experience with Surya Gold Cement and we are looking forward to a long association.",
                avatar: "https://www.purbanchalcement.com/storage/05-2024/Manoj-Jalan-Protech-Group.png"
            }
        ];

        this.currentIndex = 1; // Start with middle card (index 1)
        this.autoPlayTimer = null;
        this.isInitialized = false;

        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.injectStyles();
        this.render();
        this.setupEventListeners();
        this.updateCarousel();
        
        if (this.options.autoPlayInterval > 0) {
            this.startAutoPlay();
        }
        
        this.isInitialized = true;
    }

    injectStyles() {
        const styleId = 'testimonial-carousel-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .testimonial-carousel-container {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: white;
                /* Uncomment and edit the line below to use a background image */
                /* background: white url('/src/textures/cityscape.png') center/cover; */
                padding: 4rem 2rem;
                border-radius: 20px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            
            .testimonial-section-header {
                text-align: center;
                margin-bottom: 4rem;
            }
            
            .testimonial-section-title {
                font-size: 3rem;
                font-weight: 300;
                color: #2d3748;
                margin-bottom: 1rem;
                letter-spacing: -0.02em;
            }
            
            .testimonial-section-subtitle {
                font-size: 1.1rem;
                color: #718096;
                max-width: 600px;
                margin: 0 auto;
                line-height: 1.6;
            }
            
            .testimonial-carousel-viewport {
                position: relative;
                height: 480px;
                overflow: hidden;
                perspective: 1000px;
            }
            
            .testimonial-carousel-track {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .testimonial-card {
                position: relative;
                width: 550px;
                height: 400px;
                margin: 0 30px;
                background: #f7fafc;
                border: 1px solid #e2e8f0;
                border-radius: 20px;
                padding: 2.5rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                display: flex;
                flex-direction: column;
                flex-shrink: 0;
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .testimonial-card.active {
                transform: scale(1.05);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
                background: white;
                border-color: #cbd5e0;
            }
            
            .testimonial-card.prev,
            .testimonial-card.next {
                transform: scale(0.9);
                opacity: 0.7;
            }
            
            .testimonial-card-header {
                display: flex;
                align-items: flex-start;
                margin-bottom: 2rem;
                gap: 1.25rem;
            }
            
            .testimonial-avatar {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                position: relative;
                overflow: hidden;
                border: 3px solid #e2e8f0;
                flex-shrink: 0;
            }
            
            .testimonial-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .testimonial-avatar-fallback {
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #4a5568, #2d3748);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: white;
                font-size: 1.3rem;
            }
            
            .testimonial-user-info {
                flex: 1;
                min-width: 0;
            }
            
            .testimonial-user-info h3 {
                font-size: 1.25rem;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.5rem;
                line-height: 1.3;
            }
            
            .testimonial-user-title {
                font-size: 1rem;
                color: #718096;
                margin-bottom: 0;
                line-height: 1.4;
                font-weight: 500;
            }
            
            .testimonial-text {
                flex: 1;
                font-size: 1.1rem;
                line-height: 1.7;
                color: #4a5568;
                margin: 0;
                display: flex;
                align-items: flex-start;
            }
            
            .testimonial-quote-icon {
                position: absolute;
                top: 2rem;
                right: 2rem;
                width: 35px;
                height: 35px;
                opacity: 0.1;
                fill: #4a5568;
            }
            
            .testimonial-navigation {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 3rem;
                gap: 1rem;
            }
            
            .testimonial-nav-btn {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #f7fafc;
                border: 1px solid #e2e8f0;
                color: #4a5568;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .testimonial-nav-btn:hover {
                background: #edf2f7;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .testimonial-nav-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .testimonial-indicators {
                display: flex;
                gap: 0.5rem;
            }
            
            .testimonial-indicator {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #cbd5e0;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
                padding: 0;
            }
            
            .testimonial-indicator.active {
                background: #4a5568;
                transform: scale(1.2);
            }
            
            .testimonial-nav-icon {
                width: 20px;
                height: 20px;
                stroke: currentColor;
                stroke-width: 2;
                fill: none;
                stroke-linecap: round;
                stroke-linejoin: round;
            }
            
            @media (max-width: 1200px) {
                .testimonial-card {
                    width: 500px;
                    height: 380px;
                    padding: 2.25rem;
                }
                
                .testimonial-carousel-viewport {
                    height: 460px;
                }
            }
            
            @media (max-width: 1024px) {
                .testimonial-card {
                    width: 450px;
                    height: 360px;
                    padding: 2rem;
                }
                
                .testimonial-carousel-viewport {
                    height: 440px;
                }
            }
            
            @media (max-width: 768px) {
                .testimonial-section-title {
                    font-size: 2rem;
                }
                
                .testimonial-card {
                    width: 380px;
                    height: 340px;
                    padding: 1.75rem;
                    margin: 0 20px;
                }
                
                .testimonial-carousel-viewport {
                    height: 420px;
                }
                
                .testimonial-carousel-container {
                    padding: 2rem 1rem;
                }
                
                .testimonial-avatar {
                    width: 60px;
                    height: 60px;
                }
                
                .testimonial-user-info h3 {
                    font-size: 1.1rem;
                }
                
                .testimonial-user-title {
                    font-size: 0.9rem;
                }
                
                .testimonial-text {
                    font-size: 1rem;
                }
            }
            
            @media (max-width: 480px) {
                .testimonial-card {
                    width: 320px;
                    height: 320px;
                    margin: 0 15px;
                    padding: 1.5rem;
                }
                
                .testimonial-carousel-viewport {
                    height: 400px;
                }
                
                .testimonial-section-header {
                    margin-bottom: 2rem;
                }
                
                .testimonial-card-header {
                    margin-bottom: 1.5rem;
                    gap: 1rem;
                }
                
                .testimonial-avatar {
                    width: 55px;
                    height: 55px;
                }
                
                .testimonial-text {
                    font-size: 0.95rem;
                    line-height: 1.6;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    render() {
        this.container.innerHTML = `
            <div class="testimonial-carousel-container">
                <div class="testimonial-section-header">
                    <h2 class="testimonial-section-title">What people say</h2>
                    <p class="testimonial-section-subtitle">
                        Discover what our satisfied customers have to say about their experiences with our products/services.
                    </p>
                </div>
                
                <div class="testimonial-carousel-viewport">
                    <div class="testimonial-carousel-track">
                        ${this.renderCards()}
                    </div>
                </div>
                
                ${this.options.showNavigation ? this.renderNavigation() : ''}
            </div>
        `;

        this.track = this.container.querySelector('.testimonial-carousel-track');
        this.indicators = this.container.querySelector('.testimonial-indicators');
    }

    renderCards() {
        return this.testimonials.map((testimonial, index) => `
            <div class="testimonial-card" data-index="${index}">
                <svg class="testimonial-quote-icon" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                
                <div class="testimonial-card-header">
                    <div class="testimonial-avatar">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                        <div class="testimonial-avatar-fallback" style="display: none;">
                            ${testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                    </div>
                    <div class="testimonial-user-info">
                        <h3>${testimonial.name}</h3>
                        <div class="testimonial-user-title">${testimonial.title}</div>
                    </div>
                </div>
                
                <p class="testimonial-text">${testimonial.text}</p>
            </div>
        `).join('');
    }

    renderNavigation() {
        return `
            <div class="testimonial-navigation">
                <button class="testimonial-nav-btn" data-action="prev">
                    <svg class="testimonial-nav-icon" viewBox="0 0 24 24">
                        <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                </button>
                
                ${this.options.showIndicators ? this.renderIndicators() : ''}
                
                <button class="testimonial-nav-btn" data-action="next">
                    <svg class="testimonial-nav-icon" viewBox="0 0 24 24">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </button>
            </div>
        `;
    }

    renderIndicators() {
        const indicators = this.testimonials.map((_, index) => `
            <button class="testimonial-indicator ${index === this.currentIndex ? 'active' : ''}" 
                    data-index="${index}"></button>
        `).join('');
        
        return `<div class="testimonial-indicators">${indicators}</div>`;
    }

    setupEventListeners() {
        // Navigation buttons
        if (this.options.showNavigation) {
            const prevBtn = this.container.querySelector('[data-action="prev"]');
            const nextBtn = this.container.querySelector('[data-action="next"]');
            
            prevBtn?.addEventListener('click', () => this.prev());
            nextBtn?.addEventListener('click', () => this.next());
        }

        // Indicators
        if (this.options.showIndicators && this.indicators) {
            this.indicators.addEventListener('click', (e) => {
                if (e.target.classList.contains('testimonial-indicator')) {
                    const index = parseInt(e.target.dataset.index);
                    this.goToSlide(index);
                }
            });
        }

        // Pause on hover
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Handle resize
        window.addEventListener('resize', () => this.updateCarousel());
    }

    updateCarousel() {
        if (!this.track) return;

        const cards = this.track.querySelectorAll('.testimonial-card');
        const containerWidth = this.track.offsetWidth;
        const cardWidth = 610; // 550px + 60px margins
        const centerOffset = (containerWidth - cardWidth) / 2;

        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                card.classList.add('active');
            } else if (index === this.getPrevIndex()) {
                card.classList.add('prev');
            } else if (index === this.getNextIndex()) {
                card.classList.add('next');
            }
        });

        const translateX = centerOffset - (this.currentIndex * cardWidth);
        this.track.style.transform = `translateX(${translateX}px)`;

        // Update indicators
        if (this.indicators) {
            const indicatorElements = this.indicators.querySelectorAll('.testimonial-indicator');
            indicatorElements.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    getPrevIndex() {
        return this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
    }

    getNextIndex() {
        return this.currentIndex === this.testimonials.length - 1 ? 0 : this.currentIndex + 1;
    }

    prev() {
        this.currentIndex = this.getPrevIndex();
        this.updateCarousel();
    }

    next() {
        this.currentIndex = this.getNextIndex();
        this.updateCarousel();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.testimonials.length) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }

    startAutoPlay() {
        if (this.options.autoPlayInterval <= 0) return;
        
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => {
            this.next();
        }, this.options.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    // Public API methods
    destroy() {
        this.stopAutoPlay();
        this.container.innerHTML = '';
        this.isInitialized = false;
    }

    updateTestimonials(newTestimonials) {
        this.testimonials = newTestimonials;
        this.currentIndex = Math.floor(newTestimonials.length / 2); // Center on middle card
        this.render();
        this.setupEventListeners();
        this.updateCarousel();
        if (this.options.autoPlayInterval > 0) {
            this.startAutoPlay();
        }
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    getTotalSlides() {
        return this.testimonials.length;
    }
}

// Usage:
// const carousel = new TestimonialCarousel('your-container-id');

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialCarousel;
}

// Global assignment for browser
if (typeof window !== 'undefined') {
    window.TestimonialCarousel = TestimonialCarousel;
}
