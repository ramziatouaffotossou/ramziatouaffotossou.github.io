/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
// ========================================
    // NETWORK ANIMATION BACKGROUND
    // ========================================

    document.getElementById("menuToggle").addEventListener("click", () => {
  document.querySelector(".side-menu").classList.toggle("open");
});
    const canvas = document.getElementById('network-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Network nodes
    const nodes = [];
    const nodeCount = 50; // Nombre de nœuds
    const maxDistance = 150; // Distance max pour connecter les nœuds

    // Create nodes
    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Vitesse très lente
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebond sur les bords
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 102, 204, 0.6)';
        ctx.fill();
      }
    }

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    // Draw connections between close nodes
    function drawConnections() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.strokeStyle = `rgba(0, 168, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Draw connections
      drawConnections();

      requestAnimationFrame(animate);
    }

    animate();

    // ========================================
    // RESTE DU CODE JAVASCRIPT
    // ========================================
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Mobile Navigation Toggle
    const headerToggle = document.querySelector('.header-toggle');
    const header = document.querySelector('.header');
    
    if (headerToggle) {
      headerToggle.addEventListener('click', function() {
        header.classList.toggle('mobile-nav-active');
      });
    }

    // Close mobile nav when clicking on a link
    const navLinks = document.querySelectorAll('.navmenu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (header.classList.contains('mobile-nav-active')) {
          header.classList.remove('mobile-nav-active');
        }
      });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 0;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navmenu a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
          item.classList.add('active');
        }
      });
    });

    // Scroll to top button
    const scrollTop = document.querySelector('#scroll-top');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTop.style.display = 'flex';
      } else {
        scrollTop.style.display = 'none';
      }
    });

    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.portfolio-filters li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
        // Add active class to clicked button
        this.classList.add('filter-active');

        const filterValue = this.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    // Toggle mentions légales et crédits
    document.querySelector('a[href="#mentions-legales"]').addEventListener('click', function(e) {
      e.preventDefault();
      const mentionsDiv = document.getElementById('mentions-legales');
      const creditsDiv = document.getElementById('credits');
      
      if (mentionsDiv.style.display === 'none') {
        mentionsDiv.style.display = 'block';
        creditsDiv.style.display = 'none';
        mentionsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        mentionsDiv.style.display = 'none';
      }
    });

    document.querySelector('a[href="#credits"]').addEventListener('click', function(e) {
      e.preventDefault();
      const mentionsDiv = document.getElementById('mentions-legales');
      const creditsDiv = document.getElementById('credits');
      
      if (creditsDiv.style.display === 'none') {
        creditsDiv.style.display = 'block';
        mentionsDiv.style.display = 'none';
        creditsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        creditsDiv.style.display = 'none';
      }
    });

    // Animate progress bars when visible
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
      progressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (barPosition < screenPosition) {
          const width = bar.getAttribute('aria-valuenow');
          bar.style.width = width + '%';
        }
      });
    };

    window.addEventListener('scroll', animateProgressBars);
    window.addEventListener('load', animateProgressBars);
