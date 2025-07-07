class TestimonialCarousel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`❌ Container with id '${containerId}' not found`);
            return;
        }

        // Default options
        this.options = {
            autoPlayInterval: 1000,
            transitionDuration: 1200,
            pauseOnHover: true,
            ...options
        };

        // Use provided testimonials or default ones (now 10 total)
        this.testimonials = options.testimonials || [
            {
                name: "Mr. Govind Khaitan",
                title: "Imperial Group (Director)",
                text: "We have been associated with Purbanchal Cement Ltd since long time. The brand Surya Gold has been used in many of our projects across Assam, and is in use presently in many residential projects. We have found the quality parameters and services satisfactory.",
                avatar: "https://www.purbanchalcement.com/storage/05-2024/Govind-Khaitan-Imperial-Group.png"
            },
            {
                name: "Mr. Amarchand Kalani",
                title: "Uttarayan Group (Owner)",
                text: "The brand Surya Gold cement has been extensively used in almost all the residential projects in Guwahati and other areas. We have been associated with PCL since ten years and have found the quality up to the mark throughout. As a whole it has been a satisfactory experience with the company and looking forward to a long association.",
                avatar: "https://www.purbanchalcement.com/storage/05-2024/A-C-Kalani-Uttarayan-Group-2.png"
            },
            {
                name: "Mr. Manoj Jalan",
                title: "Protech Group (Director)",
                text: "We are in association with PCL from last 15 years. We are extensively using Surya Gold Cement in almost all of our residential projects in Guwahati and as well in other areas of construction. We have found the quality of cement up to the mark throughout.As a whole it has really been a satisfactory experience with Surya Gold Cement and we are looking forward to a long association.",
                avatar: "https://www.purbanchalcement.com/storage/05-2024/Manoj-Jalan-Protech-Group.png"
            },
            {
                name: "Ms. Anjali Sharma",
                title: "Sharma Builders (CEO)",
                text: "Our collaboration with Purbanchal Cement has been exceptional. The quality and consistency of Surya Gold cement have greatly contributed to the success of our projects.",
                avatar: "https://randomuser.me/api/portraits/women/65.jpg"
            },
            {
                name: "Mr. Rajesh Singh",
                title: "Singh Constructions (Founder)",
                text: "Surya Gold cement is our preferred choice for all our construction needs. The durability and strength are unmatched in the market.",
                avatar: "https://randomuser.me/api/portraits/men/43.jpg"
            },
            {
                name: "Mrs. Priya Nair",
                title: "Nair Estates (Managing Director)",
                text: "We have been using Surya Gold cement for several years now and have always been satisfied with the product quality and customer service.",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
                name: "Mr. Suresh Patel",
                title: "Patel Developers (Owner)",
                text: "The strength and reliability of Surya Gold cement have helped us deliver top-notch projects consistently.",
                avatar: "https://randomuser.me/api/portraits/men/55.jpg"
            },
            {
                name: "Ms. Kavita Joshi",
                title: "Joshi Constructions (Director)",
                text: "Surya Gold cement has been a key factor in our project success. The quality is always consistent and reliable.",
                avatar: "https://randomuser.me/api/portraits/women/33.jpg"
            },
            {
                name: "Mr. Amit Desai",
                title: "Desai Builders (CEO)",
                text: "We trust Surya Gold cement for all our construction projects. The product quality and service are excellent.",
                avatar: "https://randomuser.me/api/portraits/men/60.jpg"
            },
            {
                name: "Mrs. Neha Kapoor",
                title: "Kapoor Realty (Owner)",
                text: "Surya Gold cement has been our reliable partner in building quality homes. We highly recommend it.",
                avatar: "https://randomuser.me/api/portraits/women/22.jpg"
            }
        ];

        this.currentIndex = 0;
        this.autoPlayTimer = null;
        this.isInitialized = false;
        this.radius = 120;
        this.centerX = 140;
        this.centerY = 140;

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
        const styleId = 'testimonial-carousel-ten-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .testimonial-carousel-container {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                background: white;
                width: 100%;
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                overflow: hidden;
                border-radius: 20px;
            }

            .testimonial-section-header {
                text-align: center;
                margin-bottom: 1.5rem;
                z-index: 10;
                position: relative;
            }

            .testimonial-section-title {
                font-size: 1.75rem;
                font-weight: 700;
                color: #1a202c;
                margin-bottom: 0.5rem;
                letter-spacing: -0.025em;
            }

            .testimonial-section-subtitle {
                font-size: 0.875rem;
                color: #64748b;
                max-width: 450px;
                margin: 0 auto;
                line-height: 1.4;
                font-weight: 400;
            }

            .testimonial-main-content {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 3rem;
                width: 100%;
                max-width: 1000px;
                min-height: 280px;
                position: relative;
            }

            .testimonial-orbit-container {
                position: relative;
                width: 280px;
                height: 280px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .testimonial-globe-background {
                position: absolute;
                width: 240px;
                height: 240px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, rgba(148, 163, 184, 0.1), rgba(100, 116, 139, 0.05));
                border: 1px solid rgba(226, 232, 240, 0.6);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 0;
                box-shadow: inset 0 0 50px rgba(148, 163, 184, 0.1);
            }

            .testimonial-globe-background::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: 
                    linear-gradient(90deg, transparent 48%, rgba(226, 232, 240, 0.3) 50%, transparent 52%),
                    linear-gradient(0deg, transparent 48%, rgba(226, 232, 240, 0.3) 50%, transparent 52%);
                top: 0;
                left: 0;
            }

            .testimonial-globe-background::after {
                content: '';
                position: absolute;
                width: 80%;
                height: 80%;
                border-radius: 50%;
                background: radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.3), transparent 70%);
                top: 10%;
                left: 10%;
            }

            .testimonial-semicircle-path {
                position: absolute;
                width: 240px;
                height: 240px;
                border: 1px dashed rgba(148, 163, 184, 0.4);
                border-radius: 50%;
                border-bottom: 1px solid transparent;
                border-left: 1px solid transparent;
                border-right: 1px solid transparent;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
            }

            .testimonial-orbit-track {
                position: relative;
                width: 100%;
                height: 100%;
                z-index: 2;
            }

            .testimonial-person-card {
                position: absolute;
                width: 50px;
                height: 50px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                opacity: 0.4;
                filter: blur(1px);
                transform-origin: center center;
                z-index: 3;
                border: none;
                overflow: hidden;
            }

            .testimonial-person-card.active {
                opacity: 1;
                filter: blur(0px);
                transform: scale(1.3);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
                z-index: 10;
                border: none;
                width: 100px;
                height: 60px;
                border-radius: 8px;
                padding: 0.5rem;
                gap: 0.5rem;
                flex-direction: row;
                justify-content: flex-start;
            }

            .testimonial-person-card.near-active {
                opacity: 0.7;
                filter: blur(0.5px);
                z-index: 5;
                transform: scale(1.1);
            }

            .testimonial-person-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;
                background: #f8fafc;
                border: none;
                transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .testimonial-person-card.active .testimonial-person-avatar {
                width: 35px;
                height: 35px;
                border-radius: 5px;
            }

            .testimonial-person-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .testimonial-person-avatar-fallback {
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #6b7280, #4b5563);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: white;
                font-size: 0.65rem;
            }

            .testimonial-person-info {
                flex: 1;
                min-width: 0;
                opacity: 0;
                transform: translateX(-10px);
                transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .testimonial-person-card.active .testimonial-person-info {
                opacity: 1;
                transform: translateX(0);
            }

            .testimonial-person-name {
                font-size: 0.6rem;
                font-weight: 600;
                color: #1a202c;
                margin-bottom: 0.05rem;
                line-height: 1.1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .testimonial-person-title {
                font-size: 0.45rem;
                color: #64748b;
                line-height: 1.1;
                font-weight: 400;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .testimonial-comment-section {
                flex: 1;
                max-width: 500px;
                position: relative;
                padding: 1rem 0;
                margin-left: 1.5rem;
            }

            .testimonial-comment-content {
                opacity: 0;
                transform: translateY(15px);
                transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .testimonial-comment-content.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .testimonial-quote-icon {
                width: 32px;
                height: 32px;
                opacity: 0.1;
                color: #6b7280;
                margin-bottom: 1rem;
            }

            .testimonial-comment-text {
                font-size: 1rem;
                line-height: 1.4;
                color: #1a202c;
                margin-bottom: 1.5rem;
                font-weight: 400;
                font-style: italic;
                letter-spacing: -0.01em;
            }

            .testimonial-comment-author {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .testimonial-comment-author-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                background: #f8fafc;
                border: none;
            }

            .testimonial-comment-author-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .testimonial-comment-author-info h4 {
                font-size: 0.95rem;
                font-weight: 600;
                color: #1a202c;
                margin-bottom: 0.125rem;
                line-height: 1.2;
            }

            .testimonial-comment-author-info p {
                font-size: 0.75rem;
                color: #64748b;
                margin: 0;
                font-weight: 500;
            }

            /* Responsive Design */
            @media (max-width: 1200px) {
                .testimonial-main-content {
                    gap: 2.5rem;
                }

                .testimonial-orbit-container {
                    width: 250px;
                    height: 250px;
                }

                .testimonial-globe-background {
                    width: 210px;
                    height: 210px;
                }

                .testimonial-semicircle-path {
                    width: 210px;
                    height: 210px;
                }

                .testimonial-comment-text {
                    font-size: 0.95rem;
                }
            }

            @media (max-width: 768px) {
                .testimonial-carousel-container {
                    padding: 1rem;
                }

                .testimonial-main-content {
                    flex-direction: column;
                    gap: 1.5rem;
                    min-height: auto;
                }

                .testimonial-orbit-container {
                    width: 220px;
                    height: 220px;
                }

                .testimonial-globe-background {
                    width: 180px;
                    height: 180px;
                }

                .testimonial-semicircle-path {
                    width: 180px;
                    height: 180px;
                }

                .testimonial-person-card {
                    width: 40px;
                    height: 40px;
                }

                .testimonial-person-card.active {
                    width: 85px;
                    height: 50px;
                    padding: 0.35rem;
                    gap: 0.35rem;
                }

                .testimonial-person-card.active .testimonial-person-avatar {
                    width: 30px;
                    height: 30px;
                }

                .testimonial-person-name {
                    font-size: 0.55rem;
                }

                .testimonial-person-title {
                    font-size: 0.4rem;
                }

                .testimonial-comment-section {
                    max-width: 100%;
                    padding: 0.75rem 0;
                    margin-left: 0;
                }

                .testimonial-comment-text {
                    font-size: 0.875rem;
                    line-height: 1.3;
                    margin-bottom: 1.25rem;
                }

                .testimonial-section-title {
                    font-size: 1.5rem;
                }

                .testimonial-comment-author-avatar {
                    width: 35px;
                    height: 35px;
                }

                .testimonial-comment-author-info h4 {
                    font-size: 0.875rem;
                }

                .testimonial-comment-author-info p {
                    font-size: 0.7rem;
                }
            }

            @media (max-width: 480px) {
                .testimonial-orbit-container {
                    width: 200px;
                    height: 200px;
                }

                .testimonial-globe-background {
                    width: 160px;
                    height: 160px;
                }

                .testimonial-semicircle-path {
                    width: 160px;
                    height: 160px;
                }

                .testimonial-person-card {
                    width: 35px;
                    height: 35px;
                }

                .testimonial-person-card.active {
                    width: 75px;
                    height: 45px;
                    padding: 0.25rem;
                    gap: 0.25rem;
                }

                .testimonial-person-card.active .testimonial-person-avatar {
                    width: 25px;
                    height: 25px;
                }

                .testimonial-person-name {
                    font-size: 0.5rem;
                }

                .testimonial-person-title {
                    font-size: 0.35rem;
                }

                .testimonial-comment-text {
                    font-size: 0.8rem;
                    margin-bottom: 1rem;
                }

                .testimonial-quote-icon {
                    width: 24px;
                    height: 24px;
                    margin-bottom: 0.75rem;
                }

                .testimonial-comment-author-info h4 {
                    font-size: 0.8rem;
                }

                .testimonial-comment-author-info p {
                    font-size: 0.65rem;
                }

                .testimonial-section-title {
                    font-size: 1.25rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    render() {
        this.container.innerHTML = `
            <div class="testimonial-carousel-container">
                <div class="testimonial-section-header">
                    <h2 class="testimonial-section-title">What Our Clients Say</h2>
                    <p class="testimonial-section-subtitle">Discover what our satisfied customers have to say about their experiences</p>
                </div>
                
                <div class="testimonial-main-content">
                    <div class="testimonial-orbit-container">
                        <div class="testimonial-globe-background"></div>
                        <div class="testimonial-semicircle-path"></div>
                        <div class="testimonial-orbit-track">
                            ${this.testimonials.map((testimonial, index) => `
                                <div class="testimonial-person-card" data-index="${index}">
                                    <div class="testimonial-person-avatar">
                                        <img src="${testimonial.avatar}" alt="${testimonial.name}" 
                                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                        <div class="testimonial-person-avatar-fallback" style="display: none;">
                                            ${this.getInitials(testimonial.name)}
                                        </div>
                                    </div>
                                    <div class="testimonial-person-info">
                                        <div class="testimonial-person-name">${testimonial.name}</div>
                                        <div class="testimonial-person-title">${testimonial.title}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="testimonial-comment-section">
                        <div class="testimonial-comment-content visible">
                            <svg class="testimonial-quote-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                            
                            <blockquote class="testimonial-comment-text">${this.testimonials[0].text}</blockquote>
                            
                            <div class="testimonial-comment-author">
                                <div class="testimonial-comment-author-avatar">
                                    <img src="${this.testimonials[0].avatar}" alt="${this.testimonials[0].name}">
                                </div>
                                <div class="testimonial-comment-author-info">
                                    <h4>${this.testimonials[0].name}</h4>
                                    <p>${this.testimonials[0].title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getInitials(name) {
        return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2);
    }

    setupEventListeners() {
        // Click on person cards
        const personCards = this.container.querySelectorAll('.testimonial-person-card');
        personCards.forEach((card, index) => {
            card.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause on hover
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => {
                if (this.options.autoPlayInterval > 0) {
                    this.startAutoPlay();
                }
            });
        }

        // Touch/swipe support
        let startY = 0;
        let endY = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });
        
        this.container.addEventListener('touchend', (e) => {
            endY = e.changedTouches[0].clientY;
            const diff = startY - endY;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }

    updateCarousel() {
        const personCards = this.container.querySelectorAll('.testimonial-person-card');
        const commentContent = this.container.querySelector('.testimonial-comment-content');
        const commentText = this.container.querySelector('.testimonial-comment-text');
        const authorAvatar = this.container.querySelector('.testimonial-comment-author-avatar img');
        const authorName = this.container.querySelector('.testimonial-comment-author-info h4');
        const authorTitle = this.container.querySelector('.testimonial-comment-author-info p');
        
        // Position cards in orbital motion with active card exactly in the middle
        personCards.forEach((card, index) => {
            const isActive = index === this.currentIndex;
            const isNearActive = Math.abs(index - this.currentIndex) === 1 || 
                                (this.currentIndex === 0 && index === this.testimonials.length - 1) ||
                                (this.currentIndex === this.testimonials.length - 1 && index === 0);
            
            // Calculate position relative to current active index
            let relativeIndex = index - this.currentIndex;
            if (relativeIndex > this.testimonials.length / 2) {
                relativeIndex -= this.testimonials.length;
            } else if (relativeIndex < -this.testimonials.length / 2) {
                relativeIndex += this.testimonials.length;
            }
            
            // Position active card exactly in the middle (right side of semicircle)
            const middleAngle = 0; // 0 degrees = right side (middle)
            const angleStep = (2 * Math.PI) / this.testimonials.length; // Full circle distribution
            const angle = middleAngle + (relativeIndex * angleStep);
            
            const x = this.centerX + Math.cos(angle) * this.radius;
            const y = this.centerY + Math.sin(angle) * this.radius;
            
            card.style.left = `${x - 25}px`; // Offset by half card width (for non-active)
            card.style.top = `${y - 25}px`;  // Offset by half card height (for non-active)
            
            // Apply focus/blur effects
            card.classList.remove('active', 'near-active');
            if (isActive) {
                card.classList.add('active');
                // Adjust position for larger active card
                card.style.left = `${x - 50}px`; // Offset by half active card width
                card.style.top = `${y - 30}px`;  // Offset by half active card height
            } else if (isNearActive) {
                card.classList.add('near-active');
            }
        });
        
        // Smooth comment transition
        commentContent.classList.remove('visible');
        
        setTimeout(() => {
            const currentTestimonial = this.testimonials[this.currentIndex];
            commentText.textContent = currentTestimonial.text;
            authorAvatar.src = currentTestimonial.avatar;
            authorName.textContent = currentTestimonial.name;
            authorTitle.textContent = currentTestimonial.title;
            
            commentContent.classList.add('visible');
        }, 300);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
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
        this.currentIndex = 0;
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

// Export for module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialCarousel;
}
