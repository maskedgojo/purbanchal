class WhyChooseUsSection {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return console.error("❌ WhyChooseUs container not found");

    this.render();
    this.animateOnScroll();
  }

  render() {
    this.container.innerHTML = `
      <section class="relative bg-[url('/why.jpg')] bg-cover bg-center bg-no-repeat py-24 px-6 sm:px-8 lg:px-24 mr-2 ml-0.5 text-white overflow-hidden">
        <!-- Gradient Glass Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90 backdrop-blur-sm z-0"></div>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto -ml-4">
          <!-- Section Header -->
          <div class="text-center mb-16 opacity-0" id="why-heading">
            <h2 class="text-4xl lg:text-5xl font-extrabold tracking-tight font-['Inter']">Why Choose Us?</h2>
            <div class="w-20 h-1 mx-auto mt-4 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"></div>
            <p class="mt-6 text-lg text-slate-300 max-w-3xl mx-auto font-['Inter']">
              We deliver the best quality Cement contributing to the growth and development of infrastructure in India,
              individuals, commercial and others with their consistent quality and services.
            </p>
          </div>

          <!-- Feature Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 font-['IBM Plex Sans'] mt-16" id="why-cards-top">
            ${this.card('badge-check', 'Quality Products', 'Surya Cement produces high-quality cement that meets or exceeds industry standards.')}
            ${this.card('indian-rupee', 'Competitive Pricing', 'Surya Cement offers competitive prices on all cement and concrete products.')}
            ${this.card('award', 'Experience', 'Surya Cement has 20+ years of experience and a reputation for producing efficient and quality products.')}
          </div>

          <div class="flex flex-col md:flex-row justify-center gap-8 mt-12 font-['IBM Plex Sans']" id="why-cards-bottom">
            ${this.card('sparkles', 'Innovation', 'We continuously invest and research new technologies to improve quality and efficacy.')}
            ${this.card('headphones', 'Strong Customer Service', 'Our dedicated team is available to assist customers with their needs.')}
          </div>
        </div>
      </section>
    `;

    // Wait for DOM update before rendering icons
    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 100);
  }

  card(icon, title, desc) {
    return `
      <div class="group bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm 
                  hover:shadow-orange-500/30 hover:ring-1 hover:ring-orange-400 hover:scale-[1.02] 
                  transition-all duration-500 ease-in-out opacity-0">
        <div class="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-orange-600 to-yellow-500 text-white">
          <i data-lucide="${icon}" class="w-6 h-6"></i>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">${title}</h3>
        <p class="text-sm text-slate-300 leading-relaxed">${desc}</p>
      </div>
    `;
  }

animateOnScroll() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return console.warn("GSAP or ScrollTrigger not found.");
  }

  // Animate header
  gsap.fromTo("#why-heading", 
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#why-heading",
        start: "top 85%",
      }
    }
  );

  // Create a timeline for cards
  const cardsTop = gsap.utils.toArray("#why-cards-top .group");
  const cardsBottom = gsap.utils.toArray("#why-cards-bottom .group");

  // Function to animate a group of cards with delay
  const animateCards = (cards) => {
    gsap.set(cards, { y: 40, scale: 0.9, opacity: 0 });

    gsap.to(cards, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      stagger: 0.15,
      scrollTrigger: {
        trigger: cards[0],
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  };

  animateCards(cardsTop);
  animateCards(cardsBottom);
}

}

// ✅ Attach to global scope
window.WhyChooseUsSection = WhyChooseUsSection;
