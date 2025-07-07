class ProductsSection {
  constructor(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return console.error("❌ Products container not found");

    container.innerHTML = `
       <section class="py-20 px-14 sm:px-8 lg:px-24 mr-2 -ml-4 bg-gray-200 font-['Poppins']">
        <<div class="max-w-7xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] product-section-trigger">


          <!-- Section Header -->
          <div class="text-center mb-16">
            <h2 class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">Our Products</h2>
            <div class="w-24 h-1 mx-auto bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mb-4"></div>
            <p class="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Engineered for excellence, built for durability. Discover our premium range of cement products designed for every construction need.
            </p>
          </div>

          <!-- Product Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            ${this.createCard("/public/cement-01.png", "Surya Concretic", "By supplying factory fresh cement to the big construction sites...", 0)}
            ${this.createCard("/public/cement-02.png", "Surya PPC", "PPC or Portland Pozzolana Cement is a kind of blended cement...", 100)}
            ${this.createCard("/public/home-opc.png", "Surya OPC", "Ordinary Portland Cement (OPC) is a product obtained by intimately....", 200)}
            ${this.createCard("/public/truck.png", "Fresh Bulk Cement", "By supplying factory fresh cement to the big construction sites...", 300)}
          </div>

        </div>
      </section>
    `;
    // Trigger scroll-in animation
const section = container.querySelector('.product-section-trigger');
if (section) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(section);
}

  }

 createCard(imageSrc, title, desc, delay) {
    return `
      <div 
        class="group relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform transition duration-500 hover:-translate-y-2"
        data-aos="fade-up" data-aos-delay="${delay}" data-aos-duration="800"
      >
        <!-- Main Content -->
        <div class="flex flex-col items-center justify-center p-6 min-h-[300px] z-10 relative">
<img src="${imageSrc}" alt="${title}" class="w-40 h-52 object-contain mb-4 drop-shadow-md transition-transform duration-500 group-hover:scale-105">
          <h3 class="text-xl font-semibold text-gray-900 text-center">${title}</h3>
        </div>

        <!-- Hover Overlay -->
        <div class="absolute inset-0 flex flex-col justify-center items-center bg-gray-100/60 backdrop-blur-md 
                    opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 
                    transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] px-6 py-6 text-center z-20">
          
          <p class="text-lg text-gray-800 mb-4 leading-relaxed">${desc}</p>
          
          <button class="group/button px-5 py-2 bg-blue-600 text-white rounded-md font-semibold 
               hover:bg-blue-700 transition-colors duration-300 shadow-md shadow-blue-500/30 
               flex items-center gap-2">
  Know More
  <i class="fa-solid fa-arrow-right transition-transform duration-300 transform group-hover/button:translate-x-1"></i>
</button>
        </div>
      </div>
    `;
  }
}

// ✅ Attach to global scope
window.ProductsSection = ProductsSection;
