document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Theme Toggle Management
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Set default or loaded theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  // 2. Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }
  });

  // 3. Hero Subtitle Rotator
  const rotatorElement = document.getElementById('heroRotator');
  if (rotatorElement) {
    const roles = [
      "Agentic RAG Pipelines",
      "Azure Databricks LLM Serving",
      "Predictive Logic & Optimization",
      "Full-Stack MLOps & MLflow"
    ];
    let roleIndex = 0;

    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      rotatorElement.style.opacity = '0';
      rotatorElement.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        rotatorElement.textContent = roles[roleIndex];
        rotatorElement.style.opacity = '1';
        rotatorElement.style.transform = 'translateY(0)';
      }, 300);
    }, 3000);
  }

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Smooth Scroll Offset adjustment for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 72;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
