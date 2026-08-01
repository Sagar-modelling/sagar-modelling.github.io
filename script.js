document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mouse Spotlight Effect
  const spotlight = document.getElementById('spotlight');
  
  // Only apply on non-touch devices where mouse movement makes sense
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    });
  } else {
    // Hide spotlight on mobile/touch devices
    spotlight.style.display = 'none';
  }

  // 2. Intersection Observer for Active Nav Link (Scroll Spy)
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active to current
        const activeId = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

});
