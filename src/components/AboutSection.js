console.log("=== LOADING ABOUTSECTION.JS ===");

class AboutSection {
    constructor(containerId) {
        console.log("=== ABOUTSECTION CONSTRUCTOR ===");
        console.log("Container ID:", containerId);
        
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            console.error("❌ Container element not found:", containerId);
            return;
        }
        
        // Three.js objects
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.controls = null;
        this.animationId = null;
        
        // Initialize
        this.render();
        this.initializeModel();
    }

render() {
    console.log("=== RENDERING ABOUT SECTION HTML ===");
this.container.innerHTML = `
<section class="about-container relative bg-[url('/public/bg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat py-10 md:py-16">
    
    <!-- Glassy dark overlay -->
<div class="absolute inset-0 bg-gradient-to-b from-[#111111]/90 via-[#2a2a2a]/85 to-[#302519]/60 backdrop-blur-sm z-0"></div>

    <!-- Content container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 fade-in-up opacity-0 translate-y-8 transition-all duration-1000 ease-out">


      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <!-- 3D MODEL SECTION -->
        <div class="order-2 lg:order-1">
<div class="model-container hidden lg:flex justify-end items-center w-full h-[500px] relative">
                        <div class="loading-indicator absolute z-10" id="hero-loading">
                            <div class="spinner"></div>
                        </div>
                        <canvas id="about-canvas" class="w-full max-w-[800px] h-full z-0 -mt-4"></canvas>
                    </div>

          <!-- Mobile fallback -->
          <div class="block md:hidden h-64 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
            <div class="text-center text-gray-600">
              <div class="text-lg font-semibold mb-2">3D Model</div>
              <div class="text-sm">Available on desktop</div>
            </div>
          </div>
        </div>

        <!-- TEXT CONTENT -->
        <div class="order-1 lg:order-2 space-y-4 text-white mr-20">
  <div class="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full text-xs font-semibold">
    <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
    ABOUT PURBANCHAL CEMENT
  </div>

  <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
    Modern Manufacturing for a
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">Stronger Tomorrow</span>
  </h1>

  <div class="space-y-3 text-[13px] md:text-[15px] leading-relaxed text-white/80">
    <p>
      <strong class="text-white">Cementing bonds with our customers...</strong>
      Purbanchal Cement Limited is one of the most coveted Group of Companies in Eastern India,
      having an Integrated Cement Manufacturing Unit at Sonapur, Kamrup (Assam).
    </p>
    <p>
      We deliver the best quality Cement contributing to the growth and development of infrastructure
      in India, individuals, commercial and others with their consistent quality and services.
    </p>
    <p>
      Our state-of-the-art manufacturing facility ensures every bag of cement meets the highest standards of strength, durability, and reliability that our customers trust.
    </p>
  </div>

  <div class="grid grid-cols-2 gap-3 pt-4">
    <div class="text-center p-3 bg-gradient-to-br from-orange-50/80 to-orange-100/90 rounded-xl border border-orange-200/50 shadow">
      <div class="text-xl font-bold text-orange-600 mb-1">25+</div>
      <div class="text-gray-700 text-xs font-medium">Years Experience</div>
    </div>
    <div class="text-center p-3 bg-gradient-to-br from-blue-50/80 to-blue-100/90 rounded-xl border border-blue-200/50 shadow">
      <div class="text-xl font-bold text-blue-600 mb-1">100%</div>
      <div class="text-gray-700 text-xs font-medium">Quality Assured</div>
    </div>
  </div>

  <div id="error-container" class="mt-2"></div>
</div>

      </div>
    </div>
  </section>
`;

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

const target = this.container.querySelector('.fade-in-up');
if (target) observer.observe(target);


    console.log("✅ About section HTML rendered successfully");
}


    initializeModel() {
        console.log("=== INITIALIZING 3D MODEL ===");
        // Only initialize 3D model on desktop
        if (window.innerWidth >= 768) {
            setTimeout(() => {
                this.setup3DModel();
            }, 100);
        } else {
            console.log("📱 Mobile view detected, skipping 3D model initialization");
        }
    }

setup3DModel() {
    console.log("=== SETTING UP 3D MODEL ===");

    const canvas = document.getElementById('about-canvas');
    const loading = document.getElementById('about-loading');

    if (!canvas) {
        console.error('❌ Canvas not found!');
        return;
    }

    console.log('✅ Canvas found:', canvas.clientWidth, 'x', canvas.clientHeight);

    if (typeof THREE === 'undefined') {
        console.error('❌ Three.js not loaded!');
        this.showError("Three.js library not loaded");
        return;
    }

    console.log('✅ Three.js available, version:', THREE.REVISION);

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = null;
    console.log('✅ Scene created');

    // Camera setup - Isometric side view
    this.camera = new THREE.PerspectiveCamera(
        45, 
        canvas.clientWidth / canvas.clientHeight, 
        0.1, 
        1000
    );
    this.camera.position.set(8, 2.5, 8); // isometric side angle
    this.camera.lookAt(0, 2.5, 0)
    console.log('✅ Camera positioned at:', this.camera.position);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: true 
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3; // ⬅️ Slight contrast boost
    console.log('✅ Renderer configured');

    // Lighting
    this.setupLighting();

    // Controls
    this.setupControls();

    // Load model
    this.loadModel(loading);

    // Animation loop
    this.animate();

    // Responsive
    window.addEventListener('resize', () => this.onResize());
}


setupLighting() {
    console.log("=== SETTING UP LIGHTING ===");

    // 🌫️ Ambient light — softer, warm tint
    const ambientLight = new THREE.AmbientLight(0xfff5e5, 0.35); // Light peachy tint
    this.scene.add(ambientLight);
    console.log('✅ Soft ambient light added');

    // 🌤️ Key light — simulates sun from the camera angle
    const keyLight = new THREE.DirectionalLight(0xffe0b2, 1.0); // Slight warm sunlight
    keyLight.position.set(8, 8, 8); // From behind/above camera
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 100;
    this.scene.add(keyLight);
    console.log('✅ Warm key light added');

    // 🌥️ Fill light — cool hue from the side to balance shadows
    const fillLight = new THREE.DirectionalLight(0xaad8ff, 0.4); // Cool fill for balance
    fillLight.position.set(-5, 4, 5); // Opposite side of key light
    this.scene.add(fillLight);

    // 💡 Rim light — soft blue tone from behind
    const rimLight = new THREE.PointLight(0x99ccff, 0.3, 30);
    rimLight.position.set(0, 5, -6); // From behind the model
    this.scene.add(rimLight);
    console.log('✅ Fill and rim lights added');
}

    setupControls() {
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.enableZoom = false;
            this.controls.enablePan = false;
            this.controls.maxPolarAngle = Math.PI / 2;
            this.controls.minDistance = 6;
            this.controls.maxDistance = 25;
            this.controls.autoRotate = true;
            this.controls.autoRotateSpeed = 0.8;
            console.log('✅ OrbitControls added');
        } else {
            console.warn('⚠️ OrbitControls not available');
        }
    }

    loadModel(loading) {
        console.log("=== LOADING SITE.GLB MODEL ===");
        
        // Check if GLTFLoader is available
        if (typeof THREE.GLTFLoader === 'undefined') {
            console.error('❌ GLTFLoader not available');
            this.showError("GLTFLoader not loaded");
            return;
        }
        
        const loader = new THREE.GLTFLoader();
        console.log('✅ GLTFLoader created');
        
        // Try multiple possible paths for site.glb
        const modelPaths = [
            './site.glb',
            './models/site.glb',
            'site.glb',
            'models/site.glb',
            './assets/site.glb',
            'assets/site.glb'
        ];
        
        console.log('🔄 Attempting to load site.glb from paths:', modelPaths);
        
        this.tryLoadModel(loader, modelPaths, 0, loading);
    }

    tryLoadModel(loader, paths, index, loading) {
        if (index >= paths.length) {
            console.error('❌ All model paths failed for site.glb');
            this.showError("Could not load site.glb model. Please check the file path.");
            if (loading) loading.style.display = 'none';
            return;
        }
        
        const currentPath = paths[index];
        console.log(`🔄 Trying to load site.glb ${index + 1}/${paths.length}:`, currentPath);
        
        loader.load(
            currentPath,
            (gltf) => {
                console.log("=== SITE.GLB MODEL LOADED SUCCESSFULLY ===");
                console.log("✅ GLTF object:", gltf);
                
                this.model = gltf.scene;
                
                // Calculate bounding box for proper scaling and positioning
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                
                console.log('📏 Model bounding box:', box);
                console.log('📍 Model center:', center);
                console.log('📐 Model size:', size);
                
                // Center the model
                this.model.position.sub(center);
                this.model.position.x -= 5; 
                this.model.position.z -= 50; 

                
                // Scale the model bigger for better visibility
                const maxDim = Math.max(size.x, size.y, size.z);
const targetSize = 12; // scale up slightly more
const scale = targetSize / maxDim;
this.model.scale.setScalar(scale);
                
                console.log('🔧 Applied scale:', scale);
                
                // Enable shadows and enhance materials
                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        // Enhance materials
                        if (child.material) {
                            child.material.envMapIntensity = 0.7;
                            child.material.needsUpdate = true;
                        }
                    }
                });
                
                // Add model to scene
                this.scene.add(this.model);
                console.log('✅ site.glb model added to scene');
                const ground = new THREE.PlaneGeometry(50, 50);
const groundMat = new THREE.ShadowMaterial({ opacity: 0.25 });
const groundMesh = new THREE.Mesh(ground, groundMat);
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.position.y = -1; // Lower if needed
groundMesh.receiveShadow = true;
this.scene.add(groundMesh);
console.log('✅ Ground plane added to receive shadows');
                
                // Update camera and controls to focus on model
                this.camera.lookAt(0,0,0);
                if (this.controls) {
                    this.controls.target.copy(this.model.position);
                    this.controls.update();
                }
                
                // Hide loading indicator
                if (loading) {
                    loading.style.display = 'none';
                }
                
                console.log('✅ Model setup complete');
            },
            (progress) => {
                if (progress.total > 0) {
                    const percent = (progress.loaded / progress.total) * 100;
                    console.log(`🔄 Loading progress: ${percent.toFixed(1)}%`);
                }
            },
            (error) => {
                console.warn(`⚠️ Failed to load site.glb from ${currentPath}:`, error.message);
                // Try next path
                this.tryLoadModel(loader, paths, index + 1, loading);
            }
        );
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        console.log('🔄 Handling resize event');
        
        // Check if we should show/hide 3D model based on screen size
        if (window.innerWidth < 768 && this.renderer) {
            // Mobile view - destroy 3D model
            this.destroy();
            return;
        } else if (window.innerWidth >= 768 && !this.renderer) {
            // Desktop view - reinitialize 3D model
            this.initializeModel();
            return;
        }
        
        const canvas = document.getElementById('about-canvas');
        if (canvas && this.camera && this.renderer) {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            
            console.log('✅ Resize handled, new size:', width, 'x', height);
        }
    }

    showError(message) {
        console.error("❌ Showing error:", message);
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.innerHTML = `
                <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                        </svg>
                        <span class="font-medium">Error:</span>
                        <span class="ml-1">${message}</span>
                    </div>
                </div>
            `;
        }
    }

    destroy() {
        console.log("=== DESTROYING ABOUTSECTION ===");
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
            console.log('✅ Animation cancelled');
        }
        
        if (this.controls) {
            this.controls.dispose();
            this.controls = null;
            console.log('✅ Controls disposed');
        }
        
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer = null;
            console.log('✅ Renderer disposed');
        }
        
        if (this.scene) {
            this.scene.clear();
            this.scene = null;
            console.log('✅ Scene cleared');
        }
        
        this.model = null;
        this.camera = null;
        
        // Remove event listeners
        window.removeEventListener('resize', this.onResize);
        console.log('✅ Event listeners removed');
        
        console.log("✅ AboutSection destroyed successfully");
    }
}

// Make globally available
window.AboutSection = AboutSection;
console.log("=== ABOUTSECTION.JS LOADED AND AVAILABLE GLOBALLY ===");
