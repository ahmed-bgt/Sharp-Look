/**
 * Sharp Look | Premium Barber Lounge at Hyatt Regency Riyadh Olaya
 * Interactive Logic, WhatsApp Booking Generator, Scrollspy, & Lightbox
 */

(function () {
  "use strict";

  // Elements
  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const lightbox = document.getElementById("lightbox-dialog");
  const lightboxImg = document.getElementById("lightbox-target-img");
  const lightboxCaption = document.getElementById("lightbox-caption-text");
  const lightboxClose = document.getElementById("lightbox-close-btn");
  const liveStatusBadge = document.getElementById("live-status-badge");
  const liveStatusText = document.getElementById("live-status-text");

  // Booking Form Elements
  const bookingService = document.getElementById("booking-service");
  const bookingDate = document.getElementById("booking-date");
  const bookingTime = document.getElementById("booking-time");
  const bookingGuests = document.getElementById("booking-guests");
  const btnGenerateBooking = document.getElementById("btn-generate-booking");

  const WHATSAPP_PHONE = "966569092914";

  /* ==========================================================================
     1. Scroll Detection & Header Glassmorphism
     ========================================================================== */
  function handleScroll() {
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     2. Mobile Menu Toggle
     ========================================================================== */
  function openMobileMenu() {
    header.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
    mobileMenu.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    mobileMenu.hidden = true;
    document.body.style.overflow = "";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      const isOpen = header.classList.contains("is-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ==========================================================================
     3. Active Section Scrollspy
     ========================================================================== */
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("is-active");
          } else {
            link.classList.remove("is-active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  /* ==========================================================================
     4. Dynamic Live Hours & Status (Riyadh Timezone UTC+3)
     ========================================================================== */
  function updateLiveStatus() {
    try {
      // Get current time in Riyadh timezone (Asia/Riyadh)
      const now = new Date();
      const riyadhTimeStr = now.toLocaleString("en-US", { timeZone: "Asia/Riyadh" });
      const riyadhDate = new Date(riyadhTimeStr);
      const hours = riyadhDate.getHours();

      // Sharp Look opening hours: 9:00 AM (9) to 11:00 PM (23)
      const isOpen = hours >= 9 && hours < 23;

      if (liveStatusBadge && liveStatusText) {
        if (isOpen) {
          liveStatusBadge.className = "badge badge--emerald";
          liveStatusText.textContent = "Open Today • 9:00 AM – 11:00 PM";
        } else {
          liveStatusBadge.className = "badge";
          liveStatusText.textContent = "Opens at 9:00 AM • Hyatt Regency";
        }
      }
    } catch (e) {
      // Fallback if timezone conversion fails
      if (liveStatusText) {
        liveStatusText.textContent = "Open Daily • 9:00 AM – 11:00 PM";
      }
    }
  }

  updateLiveStatus();

  /* ==========================================================================
     5. Interactive WhatsApp Quick Booking Generator
     ========================================================================== */
  if (btnGenerateBooking) {
    btnGenerateBooking.addEventListener("click", function () {
      const service = bookingService ? bookingService.value : "Haircut & Styling";
      const date = bookingDate ? bookingDate.value : "Today";
      const time = bookingTime ? bookingTime.value : "Preferred Slot";
      const guests = bookingGuests ? bookingGuests.value : "1 Person";

      const messageText = 
        `Hello Sharp Look! I would like to inquire about an appointment at Hyatt Regency Riyadh Olaya:\n\n` +
        `✂️ Service: ${service}\n` +
        `📅 Day: ${date}\n` +
        `⏰ Time Slot: ${time}\n` +
        `👥 Guests: ${guests}\n\n` +
        `Please let me know your availability and details. Thank you!`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  /* ==========================================================================
     6. Services Category Filter
     ========================================================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      const filterValue = btn.getAttribute("data-filter");

      serviceCards.forEach(function (card) {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          setTimeout(function () {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(12px)";
          setTimeout(function () {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });

  /* ==========================================================================
     7. Photo Gallery Lightbox Modal
     ========================================================================== */
  const galleryCards = document.querySelectorAll("[data-lightbox]");

  galleryCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const imgSrc = card.getAttribute("data-lightbox");
      const title = card.getAttribute("data-title") || "Sharp Look Lounge";
      const sub = card.getAttribute("data-sub") || "Hyatt Regency Riyadh Olaya";
      const img = card.querySelector("img");

      if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = img ? img.alt : title;
        if (lightboxCaption) {
          lightboxCaption.textContent = `${title} • ${sub}`;
        }
        lightbox.showModal();
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", function () {
      if (lightbox) lightbox.close();
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        lightbox.close();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileMenu();
      if (lightbox && lightbox.open) {
        lightbox.close();
      }
    }
  });

  /* ==========================================================================
     8. FAQ Accordions
     ========================================================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", function () {
        const isActive = item.classList.contains("is-active");

        // Close other items
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove("is-active");
        });

        if (!isActive) {
          item.classList.add("is-active");
        }
      });
    }
  });

  /* ==========================================================================
     9. Scroll Reveal Animations (Fade In Up)
     ========================================================================== */
  const animatedElements = document.querySelectorAll(".fade-in-up");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    animatedElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================================================
     10. Theme Management (Light / Dark Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle");

  function getSavedTheme() {
    const saved = localStorage.getItem("sharp_look_theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return "dark"; // Default to dark obsidian mode
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("sharp_look_theme", theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
  }

  // Initialize theme on load
  applyTheme(getSavedTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener("click", toggleTheme);
  }
})();

