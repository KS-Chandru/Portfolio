// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Enhanced Mobile Menu Functionality
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

function toggleMobileMenu() {
  const isActive = hamburger.classList.contains("active");

  if (!isActive) {
    // Opening menu
    hamburger.classList.add("opening");
    setTimeout(() => hamburger.classList.remove("opening"), 600);
  }

  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
}

function closeMobileMenu() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
}

hamburger.addEventListener("click", toggleMobileMenu);

// Close mobile menu when clicking on a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Add a small delay for better UX
    setTimeout(closeMobileMenu, 150);
  });
});

// Close mobile menu on window resize if it's open
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !hamburger.contains(e.target) &&
    !mobileMenu.contains(e.target) &&
    mobileMenu.classList.contains("active")
  ) {
    closeMobileMenu();
  }
});

// Add escape key functionality
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars when skills section is visible
      if (entry.target.id === "skills") {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Animate skill progress bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress-bar");
  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width + "%";
    }, index * 100);
  });
}

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.textContent = "Message Sent! ✓";
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.reset();
    }, 2000);
  }, 1500);
});

// Add smooth hover effects to cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    ".project-card, .education-card, .skill-category"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});
