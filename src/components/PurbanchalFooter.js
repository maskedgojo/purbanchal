class PurbanchalFooter {
  constructor(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return console.error("❌ Footer container not found");

    container.innerHTML = `
      <footer class="purbanchal-footer relative text-white pt-16 pb-6 px-6 sm:px-10 lg:px-28 overflow-hidden bg-no-repeat bg-cover bg-center"
              style="background-image: url('//city.jpg')">
        
        <!-- Glassy Dark Overlay -->
<!-- Darker Glassy Overlay (No Blur) -->
<div class="absolute inset-0 bg-gradient-to-br from-[#0a0f1a]/95 via-[#111827]/90 to-[#1e293b]/95 mix-blend-multiply pointer-events-none"></div>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <!-- Brand Section -->
            <div>
              <div class="mb-4">
                <div class="text-2xl font-bold leading-tight">Purbanchal<br>Cement Ltd</div>
              </div>
              <p class="text-sm text-slate-300 italic leading-relaxed mb-4">
                Building the future with quality cement
              </p>
<a href="#quote"
   class="relative inline-block px-5 py-2 rounded-md font-semibold text-sm uppercase tracking-wide text-white 
          bg-gradient-to-br from-orange-500 to-yellow-400 
          transition-all duration-300 group overflow-hidden">
  <span class="absolute inset-0 rounded-md border-2 border-transparent group-hover:border-yellow-400 group-hover:animate-glow-border z-10"></span>
  <span class="relative z-20">Request a Quote</span>
</a>

            </div>

            <!-- Products -->
            <div>
              <h3 class="text-lg font-semibold uppercase tracking-wide border-b-2 border-orange-500 inline-block pb-2 mb-4">Products</h3>
              <ul class="space-y-2 text-sm text-slate-300">
                <li><a href="#opc" class="hover:text-orange-400 transition">Concretec</a></li>
                <li><a href="#ppc" class="hover:text-orange-400 transition">PPC</a></li>
                <li><a href="#slag" class="hover:text-orange-400 transition">OPC</a></li>
                <li><a href="#white" class="hover:text-orange-400 transition">Fresh Bulk Cement</a></li>
              </ul>
            </div>

            <!-- Support -->
            <div>
              <h3 class="text-lg font-semibold uppercase tracking-wide border-b-2 border-orange-500 inline-block pb-2 mb-4">Support</h3>
              <ul class="space-y-2 text-sm text-slate-300">
                <li><a href="#technical" class="hover:text-orange-400 transition">Technical Support</a></li>
                <li><a href="#quality" class="hover:text-orange-400 transition">Quality Assurance</a></li>
                <li><a href="#delivery" class="hover:text-orange-400 transition">Delivery Information</a></li>
                <li><a href="#warranty" class="hover:text-orange-400 transition">Warranty Claims</a></li>
              </ul>
            </div>

            <!-- Connect -->
            <div>
              <h3 class="text-lg font-semibold uppercase tracking-wide border-b-2 border-orange-500 inline-block pb-2 mb-4">Connect</h3>
              <ul class="space-y-4 text-sm text-slate-300">
                <li class="flex items-center gap-3">
                  <i data-lucide="phone" class="w-4 h-4 text-orange-400"></i>
                  <a href="tel:+918801234567" class="hover:text-orange-400 transition">+91 88012 34567</a>
                </li>
                <li class="flex items-center gap-3">
                  <i data-lucide="message-circle" class="w-4 h-4 text-orange-400"></i>
                  <a href="https://wa.me/918801234567" class="hover:text-orange-400 transition">WhatsApp</a>
                </li>
                <li class="flex items-center gap-3">
                  <i data-lucide="mail" class="w-4 h-4 text-orange-400"></i>
                  <a href="mailto:info@purbanchalcement.com" class="hover:text-orange-400 transition">info@purbanchalcement.com</a>
                </li>
              </ul>
              <div class="flex gap-4 mt-6">
                <a href="#facebook" class="w-9 h-9 flex items-center justify-center border border-slate-500 rounded-full hover:bg-orange-500 hover:border-orange-500 hover:text-white transition text-slate-300">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#instagram" class="w-9 h-9 flex items-center justify-center border border-slate-500 rounded-full hover:bg-orange-500 hover:border-orange-500 hover:text-white transition text-slate-300">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#linkedin" class="w-9 h-9 flex items-center justify-center border border-slate-500 rounded-full hover:bg-orange-500 hover:border-orange-500 hover:text-white transition text-slate-300">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom -->
          <div class="border-t border-slate-700 pt-6 text-center text-xs text-slate-400">
            &copy; 2024 Purbanchal Cement Ltd. All rights reserved. | Building Excellence Since 1995
          </div>
        </div>

        <!-- Scroll to Top -->
        <button id="scrollToTop" class="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-400 text-white rounded-full shadow-lg flex items-center justify-center text-xl opacity-0 invisible transition-all duration-300 z-[1000]">
          <i data-lucide="chevron-up"></i>
        </button>
      </footer>
    `;

    lucide.createIcons();

    // Scroll to top logic
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollBtn.classList.remove('opacity-100', 'visible');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

window.PurbanchalFooter = PurbanchalFooter;
