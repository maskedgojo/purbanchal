class HeroSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isVisible = false;
        this.animationId = null;
        this.observer = null;
        this.render();
        this.setupIntersectionObserver();
        this.initializeModel();
    }

    render() {
        this.container.innerHTML = `
            <section class="hero-container relative">
                <div class="floating-element"></div>
                <div class="floating-element"></div>
                <div class="floating-element"></div>

                <div class="hero-content grid grid-cols-1 lg:grid-cols-2 items-center min-h-[600px] max-w-[1400px] mx-auto px-4 sm:px-6 gap-6 -ml-2.5">

                    <!-- TEXT CONTENT -->
                    <div class="content-section flex-1 px-4 sm:px-6 lg:px-16 pr-4 lg:pr-6  ">
                        
                        <!-- Enhanced Brand Badge -->
                        <div class="company-badge-enhanced inline-flex items-center px-3 py-1.5 bg-black/70 backdrop-blur-md border border-yellow-500/80 rounded-full text-yellow-400 text-xs font-bold uppercase tracking-widest shadow-xl mb-4">
                            PURBANCHAL CEMENT LIMITED
                        </div>

                        <!-- Enhanced Headlines -->
                        <div class="headlines-container space-y-2 mb-4">
                            <h1 class="main-heading-enhanced text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-none tracking-tight">
                                <span class="block text-white heavy-text" style="text-shadow: 3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8);">
                                    BUILDING
                                </span>
                                <span class="block text-yellow-400 duty-text" style="text-shadow: 3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8);">
                                    TOMORROW
                                </span>
                                <span class="block text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-light excellence-text" style="text-shadow: 3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8);">
                                    With Unshakeable Strength
                                </span>
                            </h1>
                            
                            <div class="tagline-3d text-yellow-400 text-base md:text-lg lg:text-xl font-semibold" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.7);">
                                India's Trusted Foundation
                            </div>
                        </div>

                        <p class="description-enhanced text-sm md:text-base lg:text-lg text-gray-400 font-light leading-relaxed mb-6" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.7);">
                            Premium cement engineered for lasting strength and durability — trusted from homes to mega infrastructure.
                        </p>

                        <!-- Enhanced Action Buttons -->
                        <div class="action-buttons-enhanced flex flex-col sm:flex-row gap-3 mt-6">
                            <button class="explore-btn-enhanced group inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl transition-all duration-300 shadow-2xl border border-yellow-400/50 hover:scale-105 glow-effect">
                                <span class="text-xs lg:text-sm">Explore Products</span>
                                <svg class="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                            
                            <button class="demo-btn-enhanced group inline-flex items-center px-5 py-2.5 border-2 border-white/80 bg-black/60 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-md hover:text-yellow-400 shadow-xl hover:scale-105 hover:bg-black/80 hover:border-yellow-400/80">
                                <svg class="mr-2 w-3 h-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"></path>
                                </svg>
                                <span class="text-xs lg:text-sm">Request Demo</span>
                            </button>
                        </div>
                    </div>

                    <!-- 3D MODEL CANVAS + LOADER (Hidden on Mobile) -->
                    <div class="model-container hidden lg:flex justify-end items-center w-full h-[700px] relative pt-10 -mt-28">
                        <div class="loading-indicator absolute z-10" id="hero-loading">
                            <div class="spinner"></div>
                            <div>Loading 3D Model...</div>
                        </div>
                        <canvas id="hero-canvas" class="w-full max-w-[800px] h-full z-0"></canvas>
                    </div>

                </div>
            </section>

            <style>
                /* Enhanced Glow Effects */
                .glow-effect {
                    position: relative;
                    overflow: hidden;
                }
                
                .glow-effect::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s;
                }
                
                .glow-effect:hover::before {
                    left: 100%;
                }
                
                .explore-btn-enhanced:hover {
                    box-shadow: 0 0 40px rgba(255, 193, 7, 0.8), 0 0 60px rgba(255, 193, 7, 0.4);
                }
                
                /* Enhanced Typography Animations */
                .heavy-text {
                    animation: slideInLeft 0.8s ease-out 0.9s both;
                }
                
                .duty-text {
                    animation: slideInRight 0.8s ease-out 1.1s both;
                }
                
                .excellence-text {
                    animation: slideInUp 0.8s ease-out 1.3s both;
                }
                
                .company-badge-enhanced {
                    animation: badgeAppear 0.8s ease-out 0.5s both;
                    transform: scale(0.8);
                }
                
                .description-enhanced {
                    animation: fadeInUp 0.8s ease-out 1.5s both;
                }
                
                .action-buttons-enhanced {
                    animation: fadeInUp 0.8s ease-out 1.7s both;
                }
                
                /* Keyframe Animations */
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes badgeAppear {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Mobile Responsive Styles */
                @media (max-width: 768px) {
                    .content-section {
                        text-align: center;
                        padding: 1rem;
                        margin-top: 0;
                    }
                    
                    .action-buttons-enhanced {
                        justify-content: center;
                    }
                    
                    .main-heading-enhanced {
                        font-size: 2rem;
                    }
                    
                    .description-enhanced {
                        font-size: 0.9rem;
                        margin-bottom: 1.5rem;
                    }
                    
                    .company-badge-enhanced {
                        font-size: 0.6rem;
                        padding: 0.4rem 0.8rem;
                    }
                    
                    .tagline-3d {
                        font-size: 0.9rem;
                    }
                }
                
                /* Enhanced Button Hover States */
                .demo-btn-enhanced:hover {
                    background-color: rgba(0, 0, 0, 0.8);
                    border-color: rgba(255, 193, 7, 0.8);
                    box-shadow: 0 0 30px rgba(255, 193, 7, 0.4);
                }
            </style>
        `;
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                if (!this.isVisible && this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.animationId = null;
                } else if (this.isVisible && !this.animationId && this.scene) {
                    this.animate();
                }
            });
        }, {
            threshold: 0.1
        });

        this.observer.observe(this.container);
    }

    initializeModel() {
        if (window.innerWidth >= 1024) {
            setTimeout(() => {
                this.setup3DModel();
            }, 100);
        }
    }

setup3DModel() {
    const canvas = document.getElementById('hero-canvas');
    const loading = document.getElementById('hero-loading');
    if (!canvas) return;

    // Create renderer, scene, camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance"
    });

    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = false;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8;

    this.camera.position.set(6, 4.5, 9);
    this.camera.lookAt(new THREE.Vector3(0, 3, 0));

    // Setup lights
    this.setupLighting();

    // === Canvas-based Soft Shadow (No Image) ===
    const canvasSize = 128;
    const softShadowCanvas = document.createElement('canvas');
    softShadowCanvas.width = softShadowCanvas.height = canvasSize;
    const ctx = softShadowCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(
        canvasSize / 2, canvasSize / 2, 0,
        canvasSize / 2, canvasSize / 2, canvasSize / 2
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    const shadowTexture = new THREE.CanvasTexture(softShadowCanvas);
    shadowTexture.minFilter = THREE.LinearFilter;
    shadowTexture.magFilter = THREE.LinearFilter;

    const shadowMaterial = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false
    });

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5),
        shadowMaterial
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.1;
    this.scene.add(ground);

    // === Particle Cloud (Dust) ===
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 8;
        positions[i3 + 1] = Math.random() * 5 + 1;
        positions[i3 + 2] = (Math.random() - 0.5) * 8;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.06,
        transparent: true,
        opacity: 0.05,
        depthWrite: false
    });
    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);

    // === Load Main 3D Model ===
    if (typeof THREE.GLTFLoader !== 'undefined') {
        const loader = new THREE.GLTFLoader();
        loader.load(
            './models/construction.glb',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(3.8, 3.8, 3.8);
                this.model.position.set(0, 1.1, 0);
                this.model.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material.envMapIntensity = 0.4;
                        if (child.material.color) {
                            const color = child.material.color;
                            if (color.r > 0.8 && color.g > 0.8 && color.b < 0.5) {
                                color.setHex(0xd4621a);
                            } else if (color.r > 0.6 && color.g < 0.4 && color.b < 0.4) {
                                color.setHex(0xb8541f);
                            } else if (color.r > 0.5 && color.g > 0.3) {
                                color.setHex(0xc55a1a);
                            }
                            color.multiplyScalar(0.85);
                        }
                        if (child.material.roughness !== undefined) {
                            child.material.roughness = Math.min(child.material.roughness + 0.2, 1.0);
                        }
                    }
                });
                this.scene.add(this.model);
                loading.style.display = 'none';
            },
            (progress) => {
                console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.log('Model loading failed:', error);
                loading.style.display = 'none';
            }
        );
    }

    // Animate if visible
    if (this.isVisible) this.animate();

    window.addEventListener('resize', () => this.onResize());
}

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(12, 12, 8);
        this.scene.add(directionalLight);

        const orangeLight = new THREE.PointLight(0xff6b35, 2, 25);
        orangeLight.position.set(-8, 8, 8);
        this.scene.add(orangeLight);

        const orangeLight2 = new THREE.PointLight(0xff8c42, 1.5, 20);
        orangeLight2.position.set(8, 5, -5);
        this.scene.add(orangeLight2);

        const rimLight = new THREE.PointLight(0x4a9eff, 0.8, 18);
        rimLight.position.set(0, -5, -12);
        this.scene.add(rimLight);
    }

    loadModel(loading) {
        if (typeof THREE.GLTFLoader !== 'undefined') {
            const loader = new THREE.GLTFLoader();
            loader.load(
                './models/construction.glb',
                (gltf) => {
                    this.model = gltf.scene;
                    this.model.scale.set(3.8, 3.8, 3.8); // Bigger model
                    this.model.position.set(0, 1.1, 0); // Lower the Y so it sits on ground

                    this.model.traverse((child) => {
                        if (child.isMesh) {
                            if (child.material) {
                                child.material.envMapIntensity = 0.4;
                                if (child.material.color) {
                                    const color = child.material.color;

                                    if (color.r > 0.8 && color.g > 0.8 && color.b < 0.5) {
                                        color.setHex(0xd4621a); // Dark cement orange
                                    } else if (color.r > 0.6 && color.g < 0.4 && color.b < 0.4) {
                                        color.setHex(0xb8541f); // Cement brown
                                    } else if (color.r > 0.5 && color.g > 0.3) {
                                        color.setHex(0xc55a1a); // Darker cement orange
                                    }

                                    color.multiplyScalar(0.85);
                                }

                                if (child.material.roughness !== undefined) {
                                    child.material.roughness = Math.min(child.material.roughness + 0.2, 1.0);
                                }
                            }
                        }
                    });

                    this.scene.add(this.model);
                    loading.style.display = 'none';
                },
                (progress) => {
                    console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
                },
                (error) => {
                    console.log('Model loading failed:', error);
                    loading.style.display = 'none';
                }
            );
        } else {
            loading.style.display = 'none';
        }
    }

    animate() {
        if (!this.isVisible) return;

        this.animationId = requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        if (this.model) {
            this.model.rotation.y += 0.008;
            this.model.position.y = 2.5 + Math.sin(time * 0.3) * 0.2;
        }

        this.renderer.render(this.scene, this.camera);
        if (this.scene && this.scene.children) {
    this.scene.children.forEach(child => {
        if (child instanceof THREE.Points) {
            child.rotation.y += 0.0005;
        }
    });
}

    }

    onResize() {
        const canvas = document.getElementById('hero-canvas');
        const modelContainer = document.querySelector('.model-container');

        if (window.innerWidth < 1024) {
            if (modelContainer) {
                modelContainer.style.display = 'none';
            }
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        } else {
            if (modelContainer) {
                modelContainer.style.display = 'flex';
            }
            if (this.isVisible && !this.animationId && this.scene) {
                this.animate();
            }
        }

        if (canvas && this.camera && this.renderer && window.innerWidth >= 1024) {
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.observer) {
            this.observer.disconnect();
        }

        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.scene) {
            this.scene.clear();
        }

        window.removeEventListener('resize', this.onResize);
    }
}

window.HeroSection = HeroSection;