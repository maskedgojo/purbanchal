/* Tailwind CSS and FontAwesome must already be loaded on the page */
class MainNavigation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.render();           // inject markup
    this.initScrollEffect(); 
        this.setupMegaMenuInteractivity();// hide / reveal on scroll
    /* Hover reveal handled by CSS utilities */
  }

  render() {
    this.container.innerHTML = /*html*/`
<nav id="mainnav"
     class="transition-all duration-300 ease-in-out transform
            bg-gradient-to-b from-[#12151c] via-[#0c0f16] to-[#0a0d12]
            backdrop-blur-sm bg-opacity-90 text-white
            border-b border-white/10 shadow-[inset_0_-1px_1px_rgba(255,255,255,0.05)]">
  <div class="max-w-7xl mx-auto px-8 lg:px-20 flex justify-between items-center h-16">
    <ul class="flex gap-12 text-sm font-semibold uppercase tracking-wide">

      <!-- PROFILE -->
      <li class="group relative">
        <a href="#" class="flex items-center gap-1 hover:text-yellow-400 transition">
          Profile <i class="fa-solid fa-chevron-down text-[10px]"></i>
        </a>
        <div class="absolute inset-x-1 top-full mt-5 w-screen
                    translate-y-4 opacity-0 invisible
                    group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-out
                    bg-[#0c0f16] shadow-2xl border-t-4 border-yellow-500 z-50"
             style="left:52%;transform:translateX(-9.5%);">

         <div class="absolute top-full left-0 right-0 z-50">
  <div class="max-w-7xl mx-auto">
    <div class="overflow-hidden">
      <div class="px-6 md:px-12 xl:px-20 bg-[#0f1419]/95 backdrop-blur-md shadow-2xl border-t border-yellow-500/20">
        <div class="grid grid-cols-1 lg:grid-cols-12 w-full min-h-0">

          <!-- LEFT: Categories -->
          <div class="lg:col-span-3 border-r border-gray-700/50 min-w-0">
            <div class="p-4">
              <h3 class="text-sm font-bold text-yellow-400 mb-4 border-b border-yellow-700/30 pb-2 uppercase tracking-wider">
                Categories
              </h3>
              <div class="space-y-1">
                <!-- Company Profile -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full bg-yellow-500/8 shadow-[0_0_15px_rgba(255,193,7,0.08)]"
                     data-category="company-profile"
                     style="transform: translateX(2px);">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0  bg-gray-700 text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round"
                           class="lucide lucide-package w-4 h-4">
                        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                        <path d="M12 22V12"></path>
                        <polyline points="3.29 7 12 12 20.71 7"></polyline>
                        <path d="m7.5 4.27 9 5.15"></path>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-yellow-400">Company Profile</div>
                    </div>
                  </div>
                </div>

                <!-- Leadership -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8 hover:shadow-[0_0_15px_rgba(255,193,7,0.08)]"
     data-category="leadership"
     style="transform: none;">
  <div class="flex items-center space-x-3 px-3 py-2.5">
    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-zap w-4 h-4">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
      </svg>
    </div>
    <div class="flex-1 min-w-0">
      <div class="font-semibold text-sm text-gray-200">Leadership</div>
    </div>
  </div>
</div>

              </div>
            </div>
          </div>

          <!-- MIDDLE: Products -->
          <div class="lg:col-span-6 border-r border-gray-700/50 min-w-0">
            <div class="p-4">
              <h3 class="text-sm font-bold text-yellow-400 mb-4 border-b border-yellow-700/30 pb-2 uppercase tracking-wider">
                All Products
              </h3>
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-1" id="mega-menu-product-list">
                <!-- JS will inject products here -->
              </div>
            </div>
          </div>

          <!-- RIGHT: Image + Text -->
          <div class="lg:col-span-3 bg-gradient-to-br from-[#0f1419] to-[#1a2233] min-w-0">
            <div class="p-4">
              <div class="p-4 h-full flex flex-col">
                <div class="relative mb-3 overflow-hidden rounded">
                  <img id="mega-menu-image" class="w-full h-52 object-cover"
                       src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=240&fit=crop&crop=center"
                       alt="Complete Equipment Range" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 id="mega-menu-title" class="font-bold text-base text-yellow-400 mb-2">Complete Equipment Range</h4>
                  <p id="mega-menu-description" class="text-gray-300 mb-3 leading-relaxed text-xs">
                    Comprehensive solutions for construction, mining, and infrastructure projects with 80+ years of engineering excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- end grid -->
      </div>
    </div>
  </div>
</div>

        </div>
      </li>

      <!-- PRODUCT (PICTURE GRID) -->
    <li class="group relative">
  <a href="#" class="flex items-center gap-1 hover:text-yellow-400 transition">
    Product <i class="fa-solid fa-chevron-down text-[10px]"></i>
  </a>

  <div class="absolute inset-x-0 top-full mt-5 w-screen
              translate-y-4 opacity-0 invisible
              group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible
              transition-all duration-300 ease-out
              bg-[#0c0f16] shadow-2xl border-t-4 border-yellow-500 z-50"
       style="transform:translateX(-16%);">

    <div class="max-w-7xl mx-auto px-8 lg:px-20 py-10">
      <!-- grid is now 4 columns -->
      <div class="grid grid-cols-4 gap-10 text-sm text-slate-200">

        <!-- ===== card 1 ===== -->
        <a href="#" class="block group">
          <img src="/public/cement-01.png" alt="Ordinary Portland Cement"
               class="w-full h-32 object-contain bg-[#12151c] rounded-md mb-3
                      transition-transform duration-300 group-hover:scale-105">
          <h5 class="text-yellow-400 font-semibold uppercase tracking-wide">
            Concretec
          </h5>
          <p class="text-xs text-slate-400 leading-snug mt-1">
            Surya Concretec: Ultra-durable cement for foundations and structural strength.
          </p>
        </a>

        <!-- ===== card 2 ===== -->
        <a href="#" class="block group">
          <img src="/public/cement-02.png" alt="Portland Pozzolana Cement"
               class="w-full h-32 object-contain bg-[#12151c] rounded-md mb-3
                      transition-transform duration-300 group-hover:scale-105">
          <h5 class="text-yellow-400 font-semibold uppercase tracking-wide">
            PPC
          </h5>
          <p class="text-xs text-slate-400 leading-snug mt-1">
            Blended PPC cement for dense, durable, and reactive concrete.
          </p>
        </a>

        <!-- ===== card 3 ===== -->
        <a href="#" class="block group">
          <img src="/public/home-opc.png" alt="Composite Cement"
               class="w-full h-32 object-contain bg-[#12151c] rounded-md mb-3
                      transition-transform duration-300 group-hover:scale-105">
          <h5 class="text-yellow-400 font-semibold uppercase tracking-wide">
            OPC
          </h5>
          <p class="text-xs text-slate-400 leading-snug mt-1">
            Precision-engineered OPC using premium limestone.
          </p>
        </a>

        <!-- ===== card 4 ===== -->
        <a href="#" class="block group">
          <img src="/public/truck.png" alt="Sulphate Resistant Cement"
               class="w-full h-32 object-contain bg-[#12151c] rounded-md mb-3
                      transition-transform duration-300 group-hover:scale-105">
          <h5 class="text-yellow-400 font-semibold uppercase tracking-wide">
            Fresh Bulk Cement
          </h5>
          <p class="text-xs text-slate-400 leading-snug mt-1">
           Cement Supply in 16,000 kg Environment-Friendly Bulkers
          </p>
        </a>

      </div>
    </div>
  </div>
</li>


      <!-- MANUFACTURING -->
      <li class="group relative">
        <a href="#" class="flex items-center gap-1 hover:text-yellow-400 transition">
          Manufacturing <i class="fa-solid fa-chevron-down text-[10px]"></i>
        </a>
        <div class="absolute inset-x-1 top-full mt-5 w-screen
                    translate-y-4 opacity-0 invisible
                    group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-out
                    bg-[#0c0f16] shadow-2xl border-t-4 border-yellow-500 z-50"
             style="left:52%;transform:translateX(-32.5%);">

        <div class="absolute top-full left-0 right-0 z-50">
  <div class="max-w-7xl mx-auto">
    <div class="overflow-hidden">
      <div class="px-6 md:px-12 xl:px-20 bg-[#0f1419]/95 backdrop-blur-md shadow-2xl border-t border-yellow-500/20">
        <div class="grid grid-cols-1 lg:grid-cols-12 w-full min-h-0">

          <!-- LEFT: Categories -->
          <div class="lg:col-span-3 border-r border-gray-700/50 min-w-0">
            <div class="p-4">
              <h3 class="text-sm font-bold text-yellow-400 mb-4 border-b border-yellow-700/30 pb-2 uppercase tracking-wider">Categories</h3>
              <div class="space-y-1">
                <div class="cursor-pointer transition-all duration-200 rounded w-full bg-yellow-500/8 shadow-[0_0_15px_rgba(255,193,7,0.08)]" data-category="clinker-manufacturing" style="transform: translateX(2px);">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0  bg-gray-700 text-yellow-400">🏭</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-yellow-400">Clinker Manufacturing</div>
                    </div>
                  </div>
                </div>
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8" data-category="cement-grinding">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">⚙️</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">Cement Grinding</div>
                    </div>
                  </div>
                </div>
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8" data-category="process-flow">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">🔄</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">Process Flow</div>
                    </div>
                  </div>
                </div>
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8" data-category="quality-control">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">🧪</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">Quality Control</div>
                    </div>
                  </div>
                </div>
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8" data-category="logistics">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">🚛</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">Logistics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE: Dynamic content list -->
          <div class="lg:col-span-6 border-r border-gray-700/50 min-w-0">
            <div class="p-4">
              <h3 class="text-sm font-bold text-yellow-400 mb-4 border-b border-yellow-700/30 pb-2 uppercase tracking-wider">Key Features</h3>
              <div id="mega-menu-product-list" class="grid grid-cols-1 gap-2">
                <!-- Injected points -->
              </div>
            </div>
          </div>

          <!-- RIGHT: Dynamic Image + Description -->
          <div class="lg:col-span-3 bg-gradient-to-br from-[#0f1419] to-[#1a2233] min-w-0">
            <div class="p-4">
              <div class="p-4 h-full flex flex-col">
                <div class="relative mb-3 overflow-hidden rounded">
                  <img id="mega-menu-image" class="w-full h-32 object-cover" src="" alt="Preview">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 id="mega-menu-title" class="font-bold text-base text-yellow-400 mb-2">—</h4>
                  <p id="mega-menu-description" class="text-gray-300 mb-3 leading-relaxed text-xs">—</p>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- grid -->
      </div>
    </div>
  </div>
</div>


        </div>
      </li>

      <li><a href="#" class="hover:text-yellow-400 transition">Sustainability</a></li>

      <!-- CUSTOMER CARE -->
      <li class="group relative">
        <a href="#" class="flex items-center gap-1 hover:text-yellow-400 transition">
          Customer Care <i class="fa-solid fa-chevron-down text-[10px]"></i>
        </a>
         <div class="absolute inset-x-1 top-full mt-5 w-screen
                    translate-y-4 opacity-0 invisible
                    group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-out
                    bg-[#0c0f16] shadow-2xl border-t-4 border-yellow-500 z-50"
             style="left:52%;transform:translateX(-60%);">

         <div class="absolute top-full left-0 right-0 z-50">
  <div class="max-w-7xl mx-auto">
    <div class="overflow-hidden" style="opacity: 1; transform: none;">
      <div class="px-6 md:px-12 xl:px-20 bg-[#0f1419]/95 backdrop-blur-md shadow-2xl border-t border-yellow-500/20">
        <div class="grid grid-cols-1 lg:grid-cols-12 w-full min-h-0">

          <!-- 🟨 Left: Categories -->
          <div class="lg:col-span-3 border-r border-gray-700/50 min-w-0">
            <div class="p-4">
              <h3 class="text-sm font-bold text-yellow-400 mb-4 border-b border-yellow-700/30 pb-2 uppercase tracking-wider">
                Categories
              </h3>
              <div class="space-y-1">
                <!-- Technical Services Cell -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full bg-yellow-500/8 shadow-[0_0_15px_rgba(255,193,7,0.08)]"
                     data-category="technical-services"
                     style="transform: translateX(2px);">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0  bg-gray-700 text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round"
                           class="lucide lucide-package w-4 h-4" aria-hidden="true">
                        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                        <path d="M12 22V12"></path>
                        <polyline points="3.29 7 12 12 20.71 7"></polyline>
                        <path d="m7.5 4.27 9 5.15"></path>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-yellow-400">Technical Services Cell</div>
                    </div>
                  </div>
                  <div class="hidden injected-data" id="category-technical-services"></div>
                </div>

                <!-- RMG -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8 hover:shadow-[0_0_15px_rgba(255,193,7,0.08)]"
                     data-category="rmg"
                     style="transform: none;">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round"
                           class="lucide lucide-zap w-4 h-4" aria-hidden="true">
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">RMG</div>
                    </div>
                  </div>
                  <div class="hidden injected-data" id="category-rmg"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 🟧 Middle: Products -->
          <div class="lg:col-span-6 border-r border-gray-700/50 min-w-0">
            <div class="p-4">
              <h3 class="text-sm font-bold text-yellow-400 mb-4 border-b border-yellow-700/30 pb-2 uppercase tracking-wider">
                All Products
              </h3>
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-1" id="mega-menu-product-list">
                <!-- JS will inject product list here -->
              </div>
            </div>
          </div>

          <!-- 🟦 Right: Image + Text -->
          <div class="lg:col-span-3 bg-gradient-to-br from-[#0f1419] to-[#1a2233] min-w-0">
            <div class="p-4">
              <div class="p-4 h-full flex flex-col">
                <div class="relative mb-3 overflow-hidden rounded">
                  <img id="mega-menu-image" class="w-full h-32 object-cover"
                       src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=240&fit=crop&crop=center"
                       alt="Complete Equipment Range" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 id="mega-menu-title" class="font-bold text-base text-yellow-400 mb-2">Complete Equipment Range</h4>
                  <p id="mega-menu-description" class="text-gray-300 mb-3 leading-relaxed text-xs">
                    Comprehensive solutions for construction, mining, and infrastructure projects with 80+ years of engineering excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- grid end -->
      </div>
    </div>
  </div>
</div>

        </div>
      </li>

      <!-- MEDIA -->
      <li class="group relative">
        <a href="#" class="flex items-center gap-1 hover:text-yellow-400 transition">
          Media <i class="fa-solid fa-chevron-down text-[10px]"></i>
        </a>
         <div class="absolute inset-x-1 top-full mt-5 w-screen
                    translate-y-4 opacity-0 invisible
                    group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-out
                    bg-[#0c0f16] shadow-2xl border-t-4 border-yellow-500 z-50"
             style="left:52%;transform:translateX(-72%);">

       <div class="absolute top-full left-0 right-0 z-50">
  <div class="max-w-7xl mx-auto">
    <div class="overflow-hidden">
      <div class="px-6 md:px-12 xl:px-20 bg-[#0f1419]/95 backdrop-blur-md shadow-2xl border-t border-yellow-500/20">
        <div class="grid grid-cols-1 lg:grid-cols-12 w-full min-h-0">

          <!-- LEFT: Categories -->
          <div class="lg:col-span-3 border-r border-gray-700/50 min-w-0">
            <div class="p-4">
              <h3 class="text-sm font-bold text-yellow-400 mb-4 border-b border-yellow-700/30 pb-2 uppercase tracking-wider">
                Categories</h3>
              <div class="space-y-1">

                <!-- Press Release -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full bg-yellow-500/8 shadow-[0_0_15px_rgba(255,193,7,0.08)]"
                     data-category="press-release"
                     style="transform: translateX(2px);">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0  bg-gray-700 text-yellow-400">
                      📰
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-yellow-400">Press Release</div>
                    </div>
                  </div>
                </div>

                <!-- Print Ads -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8 hover:shadow-[0_0_15px_rgba(255,193,7,0.08)]"
                     data-category="print-ads">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">📰</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">Print Ads</div>
                    </div>
                  </div>
                </div>

                <!-- TVC -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8 hover:shadow-[0_0_15px_rgba(255,193,7,0.08)]"
                     data-category="tvc">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">📺</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">TVC</div>
                    </div>
                  </div>
                </div>

                <!-- Outdoor -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8 hover:shadow-[0_0_15px_rgba(255,193,7,0.08)]"
                     data-category="outdoor">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">🏙️</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">Outdoor</div>
                    </div>
                  </div>
                </div>

                <!-- Inshop -->
                <div class="cursor-pointer transition-all duration-200 rounded w-full hover:bg-yellow-500/8 hover:shadow-[0_0_15px_rgba(255,193,7,0.08)]"
                     data-category="inshop">
                  <div class="flex items-center space-x-3 px-3 py-2.5">
                    <div class="p-1.5 rounded flex-shrink-0 bg-gray-700 text-yellow-400">🏪</div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-sm text-gray-200">Inshop</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- MIDDLE: Products -->
          <div class="lg:col-span-6 border-r border-gray-700/50 min-w-0">
            <div class="p-4">
              <h3 class="text-sm font-bold text-yellow-400 mb-4 border-b border-yellow-700/30 pb-2 uppercase tracking-wider">
                All Media</h3>
              <div id="mega-menu-product-list" class="grid grid-cols-2 lg:grid-cols-3 gap-1">
                <!-- JS Injected Products -->
              </div>
            </div>
          </div>

          <!-- RIGHT: Image + Description -->
          <div class="lg:col-span-3 bg-gradient-to-br from-[#0f1419] to-[#1a2233] min-w-0">
            <div class="p-4">
              <div class="p-4 h-full flex flex-col">
                <div class="relative mb-3 overflow-hidden rounded">
                  <img id="mega-menu-image"
                       class="w-full h-32 object-cover"
                       src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=240&fit=crop&crop=center"
                       alt="Complete Equipment Range">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 id="mega-menu-title" class="font-bold text-base text-yellow-400 mb-2">Complete Equipment Range</h4>
                  <p id="mega-menu-description" class="text-gray-300 mb-3 leading-relaxed text-xs">
                    Comprehensive solutions for construction, mining, and infrastructure projects with 80+ years of engineering excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- end grid -->
      </div>
    </div>
  </div>
</div>

        </div>
      </li>

      <li><a href="#" class="hover:text-yellow-400 transition">Join Us</a></li>
      <li><a href="#" class="hover:text-yellow-400 transition">Contact</a></li>
    </ul>
  </div>
</nav>
    `;


  }
setupMegaMenuInteractivity() {
  const categoryData = {
    'company-profile': {
      points: [
        'Integrated manufacturing unit located at Sonapur, Kamrup (Assam).',
        'ISO 9001:2008 & 14000:2004 certified for quality and environment.',
        'Creators of Surya Gold and Surya Concretec — trusted regional brands.'
      ],
      image: '/public/about.jpg',
      title: 'Company Profile',
      description: 'Driving infrastructure growth in the North East with certified quality and trusted brands.'
    },
    'leadership': {
      points: [
        'Led by visionary industrialists fostering national growth.',
        'Focused on building future leaders through scale and excellence.',
        'Committed to affordable quality cement and regional empowerment.'
      ],
      image: '/public/Vedant.jpg',
      title: 'Vedant Agarwal',
      description: 'Director'
    },
    'technical-services': {
      points: [
        'Dedicated team of 10+ qualified civil engineers across Assam.',
        'On-site support with Rebound Hammers and testing equipment.',
        'Guidance for RCC slab casting and economical cement usage.'
      ],
      image: '/public/WhatsApp-Image-2024-04-16-at-19.00.28.jpeg',
      title: 'Technical Services Range',
      description: 'On-site engineering support and testing for efficient, quality construction.'
    },
    'rmg': {
      points: [
        'Dedicated “Nirman Mitra” team active across rural blocks.',
        'Census-backed outreach to underserved construction zones.',
        'Support to masons, IHBs, and contractors with technical collaboration.'
      ],
      image: '/public/WhatsApp-Image-2024-08-29-at-17.04.08-1.jpeg',
      title: 'Ready-Mix Group',
      description: 'Empowering rural construction through local partnerships and ready-mix solutions.'
    },
    'press-release': {
      points: [
        'Announcing major corporate launches and partnerships.',
        'Highlighting CSR efforts and sustainability initiatives.',
        'Sharing milestones and strategic decisions with the public.'
      ],
      image: '/public/PRESS.jpg',
      title: 'Press Releases',
      description: 'Company news that shapes perception and builds transparency.'
    },
    'print-ads': {
      points: [
        'Iconic campaigns in newspapers and industry magazines.',
        'Brochures that reflect our values and technical strength.',
        'Consistent brand messaging across traditional media.'
      ],
      image: '/public/ADS.jpeg',
      title: 'Print Media Campaigns',
      description: 'Carrying trust through the printed word across decades.'
    },
    'tvc': {
      points: [
        'Emotionally resonant campaigns for national audiences.',
        'Localized messaging for regional outreach.',
        'Testimonial stories that build authentic brand connection.'
      ],
      image: '/public/truck.png',
      title: 'TV Commercials',
      description: 'Visual storytelling that bridges brand and audience across screens.'
    },
    'outdoor': {
      points: [
        'Strategic billboard placements in high-traffic zones.',
        'Hoardings that dominate urban and rural skylines.',
        'Branded presence in transit spaces like bus stops and highways.'
      ],
      image: '/public/OUTDOOR.jpg',
      title: 'Outdoor Advertising',
      description: 'Maximum impact with real-world brand visibility across regions.'
    },
    'inshop': {
      points: [
        'Point-of-sale branding to influence last-mile decisions.',
        'Retail standees and dealer boards for in-store storytelling.',
        'Immersive setups that elevate the shopper’s brand experience.'
      ],
      image: '/public/cement-02.png',
      title: 'Inshop Branding',
      description: 'Creating memorable retail moments through sharp in-store visuals.'
    },
    'clinker-manufacturing': {
      points: [
        'High-temperature rotary kilns convert raw mix into clinker efficiently.',
        'Preheater towers enhance thermal exchange, saving fuel and emissions.',
        'Rapid cooling preserves mineralogy, improving cement quality.'
      ],
      image: '/public/CLINKER.jpg',
      title: 'Clinker Manufacturing',
      description: 'Core thermal process that transforms raw materials into cement clinker.'
    },
    'cement-grinding': {
      points: [
        'Ball mills crush clinker into fine powder for optimal consistency.',
        'Vertical roller mills ensure energy-efficient grinding.',
        'Separators classify fine particles for improved quality.'
      ],
      image: '/public/grinding-process.jpg',
      title: 'Cement Grinding',
      description: 'Refining clinker into high-grade cement powder with precision machinery.'
    },
    'process-flow': {
      points: [
        'Raw materials are carefully handled and pre-processed.',
        'Clinker moves seamlessly through automated systems.',
        'Final product is packed for bulk or retail distribution.'
      ],
      image: '/public/PROCESS.jpg',
      title: 'Process Flow',
      description: 'End-to-end visibility into cement’s journey from raw input to packaged output.'
    },
    'quality-control': {
      points: [
        'X-ray analyzers assess raw mix and product chemistry.',
        'Sample prep labs ensure consistency and compliance.',
        'Strength testing verifies load-bearing capacity.'
      ],
      image: '/public/cement-01.png',
      title: 'Quality Control',
      description: 'Laboratory-backed quality checks across every stage of production.'
    },
    'logistics': {
      points: [
        'Bulk loaders ensure fast and safe dispatch of cement.',
        'Dispatch silos streamline real-time order fulfillment.',
        'Fleet management tools optimize delivery routes.'
      ],
      image: '/public/WhatsApp-Image-2024-04-16-at-19.00.28.jpeg',
      title: 'Logistics',
      description: 'Streamlined transport and dispatch systems for bulk delivery.'
    }
  };

  const categoryElements = this.container.querySelectorAll('[data-category]');

  categoryElements.forEach(categoryEl => {
    categoryEl.addEventListener('mouseenter', () => {
      const key = categoryEl.getAttribute('data-category');
      const data = categoryData[key];
      if (!data) return;

      const menuContainer = categoryEl.closest('.grid');
      if (!menuContainer) return;

      const productListEl = menuContainer.querySelector('#mega-menu-product-list');
      const imageEl = menuContainer.querySelector('#mega-menu-image');
      const titleEl = menuContainer.querySelector('#mega-menu-title');
      const descriptionEl = menuContainer.querySelector('#mega-menu-description');

      if (!productListEl || !imageEl || !titleEl || !descriptionEl) return;

      // ✅ Remove hover styles from all category items in this menu only
      const allInSameGrid = menuContainer.querySelectorAll('[data-category]');
      allInSameGrid.forEach(el => {
        el.classList.remove('bg-yellow-500/8', 'shadow-[0_0_15px_rgba(255,193,7,0.08)]');
        const label = el.querySelector('div.font-semibold');
        if (label) {
          label.classList.remove('text-yellow-400');
          label.classList.add('text-gray-200');
        }
      });

      // ✅ Add active hover style to this one
      categoryEl.classList.add('bg-yellow-500/8', 'shadow-[0_0_15px_rgba(255,193,7,0.08)]');
      const activeLabel = categoryEl.querySelector('div.font-semibold');
      if (activeLabel) {
        activeLabel.classList.remove('text-gray-200');
        activeLabel.classList.add('text-yellow-400');
      }

      // ✅ Inject center content
      if (data.products) {
        productListEl.innerHTML = data.products.map(product => `
          <a href="#" class="group px-3 py-2 rounded transition-all duration-200 w-full min-w-0 hover:bg-yellow-500/8">
            <div class="flex items-center justify-between min-w-0">
              <span class="text-gray-200 group-hover:text-yellow-400 font-medium text-sm truncate flex-1">${product}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-chevron-right w-3 h-3 text-yellow-600 group-hover:text-yellow-400 ml-2">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>
          </a>
        `).join('');
      } else if (data.points) {
        productListEl.innerHTML = `
          <div class="col-span-2 lg:col-span-3">
            <div class="space-y-2 text-sm text-gray-300 leading-relaxed">
              ${data.points.map(p => `
                <p class="relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-yellow-400">${p}</p>
              `).join('')}
            </div>
          </div>
        `;
      }

      imageEl.src = data.image;
      imageEl.alt = data.title;
      titleEl.textContent = data.title;
      descriptionEl.textContent = data.description;
    });
  });

  // ✅ Auto-trigger first category per menu group
  const allGrids = this.container.querySelectorAll('.grid.grid-cols-1.lg\\:grid-cols-12');
  allGrids.forEach(grid => {
    const firstCategory = grid.querySelector('[data-category]');
    if (firstCategory) {
      firstCategory.dispatchEvent(new Event('mouseenter'));
    }
  });
}





  /* NAV BAR SHOW / HIDE ON SCROLL */
  initScrollEffect() {
    const nav = document.getElementById('mainnav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 100) {
        nav.classList.add('-translate-y-full');   // hide
      } else {
        nav.classList.remove('-translate-y-full'); // show
        if (current > 50) {
          nav.classList.add('bg-[#12151c]/95', 'backdrop-blur-md', 'shadow-lg');
        } else {
          nav.classList.remove('bg-[#12151c]/95', 'backdrop-blur-md', 'shadow-lg');
        }
      }
      lastScrollY = current;
    });
  }
}

window.MainNavigation = MainNavigation;
