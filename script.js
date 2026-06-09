/* =====================================================
   BLAZON LUXURY SALON
   PREMIUM JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       PRELOADER
       ===================================================== */

  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      preloader.style.transition = "all .8s ease";

      setTimeout(() => {
        preloader.remove();
      }, 900);
    }, 1200);
  });

  /* =====================================================
       STICKY GLASS NAVBAR
       ===================================================== */

  const header = document.querySelector(".header");

  function navbarScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", navbarScroll);

  /* =====================================================
       SCROLL PROGRESS BAR
       ===================================================== */

  const progressBar = document.querySelector(".progress-bar");

  function updateProgressBar() {
    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / documentHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  }

  window.addEventListener("scroll", updateProgressBar);

  /* =====================================================
       MOBILE MENU
       ===================================================== */

  const hamburger = document.querySelector(".hamburger");

  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 110,

        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       COUNTER ANIMATION
       ===================================================== */

  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = parseInt(counter.dataset.target);

        let current = 0;

        const increment = target / 120;

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            counter.innerText = Math.floor(current);

            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        updateCounter();

        counterObserver.unobserve(counter);
      });
    },
    {
      threshold: 0.4,
    },
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  /* =====================================================
       REVEAL ANIMATIONS
       ===================================================== */

  const revealElements = document.querySelectorAll(
    ".reveal,.reveal-left,.reveal-right,.scale-in",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /* =====================================================
       FAQ ACCORDION
       ===================================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      faqItems.forEach((faq) => {
        if (faq !== item) {
          faq.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });

  /* =====================================================
       BACK TO TOP
       ===================================================== */

  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

  const sections = document.querySelectorAll("section[id]");

  const navItems = document.querySelectorAll(".nav-links a");

  function activeNavigation() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      const sectionHeight = section.offsetHeight;

      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activeNavigation);

  /* =====================================================
       SERVICE FILTERING
       ===================================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");

  const serviceCards = document.querySelectorAll(".service-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const filter = button.textContent.trim().toLowerCase();

      serviceCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* =====================================================
       TESTIMONIAL CAROUSEL
       ===================================================== */

  const testimonialCards = document.querySelectorAll(".testimonial-card");

  let currentTestimonial = 0;

  function rotateTestimonials() {
    if (window.innerWidth > 991 || testimonialCards.length < 2) return;

    testimonialCards.forEach((card) => {
      card.style.display = "none";
    });

    testimonialCards[currentTestimonial].style.display = "block";

    currentTestimonial++;

    if (currentTestimonial >= testimonialCards.length) {
      currentTestimonial = 0;
    }
  }

  rotateTestimonials();

  setInterval(rotateTestimonials, 5000);

  /* =====================================================
       GALLERY LIGHTBOX
       ===================================================== */

  const galleryImages = document.querySelectorAll(".gallery-item img");

  const lightbox = document.createElement("div");

  lightbox.id = "lightbox";

  lightbox.innerHTML = `
        <span class="close-lightbox">&times;</span>
        <img src="" alt="">
    `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");

  const closeLightbox = lightbox.querySelector(".close-lightbox");

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      lightbox.classList.add("show");

      lightboxImg.src = image.src;
    });
  });

  closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });

  /* =====================================================
       PARALLAX HERO EFFECT
       ===================================================== */

  const heroImage = document.querySelector(".hero-image img");

  window.addEventListener("scroll", () => {
    const scroll = window.pageYOffset;

    if (heroImage) {
      heroImage.style.transform = `translateY(${scroll * 0.08}px)`;
    }
  });

  /* =====================================================
       FLOATING ELEMENTS
       ===================================================== */

  const floatingButtons = document.querySelectorAll(
    ".floating-call,.floating-instagram,.floating-facebook",
  );

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    floatingButtons.forEach((btn) => {
      btn.style.transform = `translateY(${scroll * 0.01}px)`;
    });
  });

  /* =====================================================
       LAZY IMAGE ENHANCEMENT
       ===================================================== */

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  const lazyObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "100px",
    },
  );

  lazyImages.forEach((img) => {
    lazyObserver.observe(img);
  });

  /* =====================================================
       BUTTON MICRO INTERACTIONS
       ===================================================== */

  const buttons = document.querySelectorAll(
    ".btn-primary,.btn-secondary,.btn-outline,.btn-nav,.social-btn",
  );

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-4px) scale(1.02)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  /* =====================================================
       INTERSECTION OBSERVER
       PREMIUM STAGGER ANIMATION
       ===================================================== */

  const staggerItems = document.querySelectorAll(
    ".service-card,.stat-card,.why-card,.package-card,.testimonial-card,.contact-card",
  );

  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  staggerItems.forEach((item) => {
    staggerObserver.observe(item);
  });

  /* =====================================================
       PERFORMANCE
       ===================================================== */

  let ticking = false;

  function optimizedScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        navbarScroll();
        activeNavigation();

        ticking = false;
      });

      ticking = true;
    }
  }

  window.addEventListener("scroll", optimizedScroll, {
    passive: true,
  });

  /* =====================================================
       HERO TEXT REVEAL
       ===================================================== */

  const heroTitle = document.querySelector(".hero h1");

  const heroText = document.querySelector(".hero p");

  const heroButtons = document.querySelector(".hero-buttons");

  setTimeout(() => {
    if (heroTitle) heroTitle.classList.add("show");
  }, 500);

  setTimeout(() => {
    if (heroText) heroText.classList.add("show");
  }, 800);

  setTimeout(() => {
    if (heroButtons) heroButtons.classList.add("show");
  }, 1100);
});

/* =====================================================
   LIGHTBOX STYLES
   (Injected Automatically)
   ===================================================== */

const lightboxStyles = document.createElement("style");

lightboxStyles.innerHTML = `

#lightbox{

position:fixed;
inset:0;

background:rgba(0,0,0,.92);

display:flex;
align-items:center;
justify-content:center;

z-index:99999;

opacity:0;
visibility:hidden;

transition:.4s;
}

#lightbox.show{

opacity:1;
visibility:visible;
}

#lightbox img{

max-width:90%;
max-height:90%;

border-radius:20px;
}

.close-lightbox{

position:absolute;

top:30px;
right:40px;

font-size:3rem;

color:white;

cursor:pointer;
}

`;

document.head.appendChild(lightboxStyles);

const track = document.querySelector('.testimonial-track');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

const cards = document.querySelectorAll('.testimonial-card');

let index = 0;

function getVisibleCards(){

    if(window.innerWidth <= 768) return 1;

    if(window.innerWidth <= 992) return 2;

    return 3;
}

function updateSlider(){

    const cardWidth =
    cards[0].offsetWidth + 30;

    track.style.transform =
    `translateX(-${index * cardWidth}px)`;
}

nextBtn.addEventListener('click',()=>{

    const visible = getVisibleCards();

    if(index < cards.length - visible){

        index++;

        updateSlider();
    }
});

prevBtn.addEventListener('click',()=>{

    if(index > 0){

        index--;

        updateSlider();
    }
});

window.addEventListener('resize',updateSlider);

/* =====================================================
   END OF BLAZON PREMIUM JS
   ===================================================== */
