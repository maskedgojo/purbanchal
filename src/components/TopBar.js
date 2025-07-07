class TopBar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        this.initScrollEffect();
    }

    render() {
          this.container.innerHTML = `
<div id="topbar" class="bg-gradient-to-b from-[#1a1d25] via-[#12151c] to-[#0c0f16] text-white text-sm backdrop-blur-sm bg-opacity-90 border-b border-white/10 shadow-[inset_0_-1px_1px_rgba(255,255,255,0.05)] w-full z-50 flex items-center justify-between px-8 lg:px-20 py-2">
  <!-- Left: Logo -->
  <div class="flex items-center space-x-3">
    <img src="/logo.png" alt="Purbanchal Cement Logo" class="h-10 w-auto" />
  </div>

  <!-- Right: Social Icons + Get Quote -->
  <div class="flex items-center space-x-6 mr-5">
    <a href="https://wa.me/yourwhatsapplink" target="_blank" class="hover:text-green-400 transition">
      <i class="fab fa-whatsapp fa-lg"></i>
    </a>
    <a href="https://facebook.com/yourpage" target="_blank" class="hover:text-blue-500 transition">
      <i class="fab fa-facebook-f fa-lg"></i>
    </a>
    <a href="https://linkedin.com/company/yourcompany" target="_blank" class="hover:text-blue-300 transition">
      <i class="fab fa-linkedin-in fa-lg"></i>
    </a>

<a href="#contact" class="group relative inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white font-bold text-xs lg:text-sm rounded-xl transition-all duration-300 shadow-xl border border-orange-400/50 hover:border-orange-300/70 hover:scale-105 hover:shadow-orange-500/30 hover:shadow-2xl overflow-hidden">
  
  <!-- Sliding shine effect -->
  <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
  
  <!-- Button content -->
  <span class="relative z-10">Get Quote</span>
  <svg class="relative z-10 ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
  </svg>
</a>
  </div>
</div>
  `;

    this.initScrollEffect();
  }

  initScrollEffect() {
    const topbar = document.getElementById('topbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        topbar.classList.add('bg-[#1a1a1a]/90', 'backdrop-blur-md', 'shadow-lg');
      } else {
        topbar.classList.remove('bg-[#1a1a1a]/90', 'backdrop-blur-md', 'shadow-lg');
      }
    });
  }
}

window.TopBar = TopBar;
