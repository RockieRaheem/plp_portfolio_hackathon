// =====================
// SPACE PORTFOLIO - ENHANCED NAVIGATION
// =====================

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const navToggle = document.getElementById("nav-toggle");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list a");

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.checked = false;
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navToggle.checked) {
      navToggle.checked = false;
    }
  });

  // Handle close button click (the X button in mobile menu)
  navList.addEventListener("click", (e) => {
    if (e.target === navList || e.target.matches("::after")) {
      navToggle.checked = false;
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update active link
        updateActiveLink(this);
      }
    });
  });

  // Update active link function
  function updateActiveLink(activeLink) {
    navLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Add scrolled class when scrolling down
    if (currentScrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active link based on scroll position
    updateActiveNavOnScroll();

    lastScrollY = currentScrollY;
  });

  // Update active navigation based on scroll position
  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section, header[id]");
    const navbarHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingNavLink = document.querySelector(
        `.nav-list a[href="#${sectionId}"]`
      );

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("active");
        }
      }
    });
  }

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // Close mobile menu with Escape key
    if (e.key === "Escape" && navToggle.checked) {
      navToggle.checked = false;
    }

    // Handle Enter/Space on hamburger menu
    if (
      (e.key === "Enter" || e.key === " ") &&
      e.target.classList.contains("navbar-hamburger")
    ) {
      e.preventDefault();
      navToggle.checked = !navToggle.checked;
    }
  });

  // Prevent body scroll when mobile menu is open
  navToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Initialize active link on page load
  const currentHash = window.location.hash || "#home";
  const currentActiveLink = document.querySelector(
    `.nav-list a[href="${currentHash}"]`
  );
  if (currentActiveLink) {
    updateActiveLink(currentActiveLink);
  }
});

// =====================
// PERFORMANCE OPTIMIZATIONS
// =====================

// Throttle scroll events for better performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Additional scroll optimizations can go here
  }, 16)
); // ~60fps
