// Contact Form Enhancement Script
document.addEventListener("DOMContentLoaded", function () {
  // Character counter for message textarea
  const messageTextarea = document.getElementById("message");
  const characterCount = document.querySelector(".character-count .count");

  if (messageTextarea && characterCount) {
    messageTextarea.addEventListener("input", function () {
      const currentLength = this.value.length;
      characterCount.textContent = currentLength;

      // Add warning class if approaching limit
      const countElement = characterCount.parentElement;
      if (currentLength > 450) {
        countElement.style.color = "#ff6b6b";
      } else if (currentLength > 400) {
        countElement.style.color = "#ffa726";
      } else {
        countElement.style.color = "#7aa98b";
      }
    });
  }

  // Form submission with loading state
  const contactForm = document.querySelector(".contact-form");
  const submitBtn = document.querySelector(".contact-btn.primary");

  if (contactForm && submitBtn) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add loading state
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(function () {
        // Reset form
        contactForm.reset();
        characterCount.textContent = "0";

        // Remove loading state
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        // Show success message (you can customize this)
        showSuccessMessage();
      }, 2000);
    });
  }

  // Form reset functionality
  const resetBtn = document.querySelector(".contact-btn.secondary");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (characterCount) {
        characterCount.textContent = "0";
        characterCount.parentElement.style.color = "#7aa98b";
      }
    });
  }

  // Add smooth animations for contact methods
  const contactMethods = document.querySelectorAll(".contact-method");
  contactMethods.forEach((method, index) => {
    method.style.animationDelay = `${index * 0.1}s`;
    method.classList.add("animate-in");
  });

  // Add click-to-copy functionality for contact info
  const contactValues = document.querySelectorAll(".method-value");
  contactValues.forEach((value) => {
    value.addEventListener("click", function () {
      const text = this.textContent;
      navigator.clipboard.writeText(text).then(function () {
        showCopySuccess(value);
      });
    });

    // Add cursor pointer style
    value.style.cursor = "pointer";
    value.title = "Click to copy";
  });
});

function showSuccessMessage() {
  // Create success notification
  const notification = document.createElement("div");
  notification.className = "success-notification";
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <span class="notification-text">Message sent successfully! I'll get back to you soon.</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #2ecc40, #00b894);
        color: #101820;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(46, 204, 64, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(function () {
    notification.style.animation = "slideOutRight 0.3s ease-in forwards";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function showCopySuccess(element) {
  const originalText = element.textContent;
  element.textContent = "✓ Copied!";
  element.style.color = "#2ecc40";

  setTimeout(function () {
    element.textContent = originalText;
    element.style.color = "#e0f2e9";
  }, 1500);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);
