/**
 * Ink & Echo Tattoo Collective - Main JavaScript
 * Handles FAQ accordion, gallery filtering, and animations
 */

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faq => {
      faq.classList.remove('active');
      const faqAnswer = faq.querySelector('.faq-answer');
      if (faqAnswer) {
        faqAnswer.style.maxHeight = null;
      }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Gallery Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-masonry-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active filter button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    
    // Filter gallery items
    galleryItems.forEach(item => {
      const styles = item.dataset.style || '';
      const artist = item.dataset.artist || '';
      
      if (filter === 'all') {
        item.style.display = 'block';
      } else if (styles.includes(filter) || artist.includes(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Fade-in Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      // Optionally unobserve after animation
      // fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => {
  fadeObserver.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Adjust for fixed banner
        const headerOffset = 60;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Add CSS animation class for fade-in
const style = document.createElement('style');
style.textContent = `
  .animate-fade-in {
    animation: fadeIn 0.6s ease forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Respect prefers-reduced-motion
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (mediaQuery.matches) {
  fadeElements.forEach(el => {
    el.classList.add('animate-fade-in');
  });
}

// Mobile menu toggle (if needed for future expansion)
const mobileMenuToggle = document.querySelector('[data-mobile-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
  });
}

// Gallery item hover effects enhancement
if (window.innerWidth > 768) {
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.03) translateY(-8px)';
      item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.zIndex = '';
    });
  });
}
