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


    // ========================================
// MULTILANGUAGE SYSTEM FR/EN
// ========================================

(function () {
  // FR (texte exact du HTML) -> EN. Un texte absent d'ici reste en français, sans erreur.
  const EN = {
    // Hero
    "Bonjour,": "Hello,",
    "Je suis": "I'm",
    "Originaire du Bénin, j'ai développé mon intérêt pour l'informatique au Lycée Technique Coulibaly. Après deux stages en maintenance informatique, je poursuis actuellement ma formation en deuxième année de BUT Réseaux & Télécommunications à l'IUT de Béthune.":
      "Originally from Benin, I developed my interest in IT at Lycée Technique Coulibaly. After two IT maintenance internships, I am currently in my second year of the BUT Networks & Telecommunications degree at IUT de Béthune.",
    "Mon CV (PDF)": "My CV (PDF)",
    "Mes Projets": "My Projects",
    "Mon Parcours": "My Journey",

    // CV - colonne gauche
    "Informations de Contact": "Contact Information",
    "Langues": "Languages",
    "Français : Courant": "French: Fluent",
    "Anglais : Intermédiaire": "English: Intermediate",
    "Compétences Techniques": "Technical Skills",
    "Réseaux : VLAN, OSPF, HSRP, STP, EtherChannel": "Networking: VLAN, OSPF, HSRP, STP, EtherChannel",
    "Téléphonie IP (Asterisk)": "IP telephony (Asterisk)",
    "Flask, MySQL & Docker": "Flask, MySQL & Docker",
    "Installation et configuration des systèmes d'exploitation": "Operating system installation and configuration",
    "Création de sites web WordPress": "WordPress website development",
    "Programmation C & Python": "C & Python programming",

    // CV - sections
    "Formation": "Education",
    "Expérience Professionnelle": "Professional Experience",
    "En cours": "In progress",
    "BUT Réseaux & Télécommunications": "BUT Networks & Telecommunications",
    "IUT de Béthune - Université d'Artois, France": "IUT de Béthune - Artois University, France",
    "Parcours <strong>Cybersécurité</strong> - Formation complète en administration réseau, sécurisation des systèmes, développement et supervision d'infrastructures.":
      "<strong>Cybersecurity</strong> track - Comprehensive training in network administration, systems security, development and infrastructure monitoring.",
    "Cybersécurité": "Cybersecurity",
    "Réseaux": "Networks",
    "Systèmes": "Systems",
    "Diplôme du Technicien - Informatique": "IT Technician Diploma",
    "Lycée Technique Coulibaly - Cotonou, Bénin": "Lycée Technique Coulibaly - Cotonou, Benin",
    "Mention <strong>Bien</strong> - Formation technique en informatique avec acquisition de compétences pratiques en maintenance et dépannage":
      "Grade: <strong>Good (Mention Bien)</strong> - Technical IT training with practical skills in maintenance and troubleshooting",
    "Technicien": "Technician",
    "Brevet d'Étude du Premier Cycle": "Junior secondary school certificate (BEPC)",
    "Diplôme national du brevet obtenu avec succès": "National certificate successfully obtained",

    // Expérience
    "Juin - Août 2023": "June - August 2023",
    "Juin - Août 2022": "June - August 2022",
    "Stagiaire Technicien Informatique": "IT Technician Intern",
    "Surface Informatique - Cotonou, Bénin": "Surface Informatique - Cotonou, Benin",
    "DNL Informatique - Cotonou, Bénin": "DNL Informatique - Cotonou, Benin",
    "Stage de 3 mois axé sur la maintenance informatique et l'assistance technique aux utilisateurs": "3-month internship focused on IT maintenance and user technical support",
    "Premier stage professionnel en assistance technique et maintenance informatique": "First professional internship in technical support and IT maintenance",
    "Assistance technique aux utilisateurs": "Technical support for users",
    "Mise à jour des logiciels et pilotes": "Software and driver updates",
    "Sauvegarde et récupération des données": "Data backup and recovery",
    "Diagnostic et résolution de problèmes matériels et logiciels": "Hardware and software troubleshooting",
    "Diagnostic et réparation de problèmes logiciels": "Software problem diagnosis and repair",
    "Maintenance matérielle (ouverture et depannage des ordinateurs)": "Hardware maintenance (opening and repairing computers)",
    "Support technique": "Technical support",
    "Dépannage": "Troubleshooting",
    "Sauvegarde": "Backup",

    // Certifications
    "Février 2025": "February 2025",
    "Certification validant les compétences en configuration et dépannage de réseaux commutés et routés, ainsi qu'en connectivité sans fil et sécurité de base des réseaux.":
      "Certification validating skills in configuring and troubleshooting switched and routed networks, as well as wireless connectivity and basic network security.",
    "Certification portant sur les concepts avancés de Python : modules, programmation orientée objet, gestion des exceptions et manipulation de fichiers.":
      "Certification covering advanced Python concepts: modules, object-oriented programming, exception handling and file manipulation.",
    "Programmation": "Programming",
    "MOOC Cybersécurité - ANSSI": "Cybersecurity MOOC - ANSSI",
    "Agence Nationale de la Sécurité des Systèmes d'Information": "French National Cybersecurity Agency (ANSSI)",
    "Attestation de réussite au cours en ligne de l'ANSSI sur l'hygiène informatique et la cybersécurité": "Certificate of completion of ANSSI's online course on IT hygiene and cybersecurity",
    "Officiel": "Official",
    "Sécurité": "Security",
    "Introduction à la Sécurité Informatique": "Introduction to IT Security",
    "Attestation de réussite au cours Cisco sur les fondamentaux de la sécurité informatique": "Certificate of completion of the Cisco course on IT security fundamentals",
    "Réseau": "Network",
    "Certification sur les bases de la programmation Python et les concepts fondamentaux": "Certification on Python programming basics and core concepts",
    "Voir le certificat": "View certificate",

    // Projets (cartes + modale)
    "GreenBite — E-commerce & Supervision IoT": "GreenBite — E-commerce & IoT Monitoring",
    "Site e-commerce de snacks sains : back-end Flask, base de données MySQL, déploiement Docker et supervision IoT.": "Healthy-snacks e-commerce website: Flask back-end, MySQL database, Docker deployment and IoT monitoring.",
    "Conception d'un site e-commerce de snacks sains avec back-end Flask, base de données MySQL et déploiement conteneurisé via Docker. Supervision de la plateforme via des capteurs IoT.": "Design of a healthy-snacks e-commerce website with a Flask back-end, a MySQL database and containerized deployment with Docker. Platform monitoring through IoT sensors.",
    "Réseau d'Entreprise Sécurisé": "Secure Enterprise Network",
    "Conception et simulation sous Cisco Packet Tracer : VLAN, routage inter-VLAN, Wi-Fi (WLC), HSRP, STP, EtherChannel, DHCP, IPv4/IPv6 et sécurisation des accès.": "Design and simulation in Cisco Packet Tracer: VLAN, inter-VLAN routing, Wi-Fi (WLC), HSRP, STP, EtherChannel, DHCP, IPv4/IPv6 and access security.",
    "Conception et simulation sous Cisco Packet Tracer d'un réseau d'entreprise sécurisé : VLAN, routage inter-VLAN, Wi-Fi (WLC), HSRP, STP, EtherChannel, DHCP, adressage IPv4/IPv6 et sécurisation des accès.": "Design and simulation in Cisco Packet Tracer of a secure enterprise network: VLAN, inter-VLAN routing, Wi-Fi (WLC), HSRP, STP, EtherChannel, DHCP, IPv4/IPv6 addressing and access security.",
    "Infrastructure de Téléphonie IP": "IP Telephony Infrastructure",
    "Déploiement d'une infrastructure de téléphonie IP avec Asterisk : configuration SIP, téléphones IP (Fanvil/Cisco), serveur TFTP, messagerie vocale et validation des communications.": "Deployment of an IP telephony infrastructure with Asterisk: SIP configuration, IP phones (Fanvil/Cisco), TFTP server, voicemail and call validation.",
    "SAE 1.01 — Hygiène Informatique": "SAE 1.01 — IT Hygiene",
    "Formation complète sur les bonnes pratiques en cybersécurité et hygiène informatique, avec obtention de l'attestation ANSSI SecNumacadémie.": "Comprehensive training on cybersecurity and IT hygiene best practices, with the ANSSI SecNumacadémie certificate.",
    "Formation complète sur les bonnes pratiques en cybersécurité et hygiène informatique. Sensibilisation aux risques cyber et obtention de l'attestation ANSSI SecNumacadémie.": "Comprehensive training on cybersecurity and IT hygiene best practices. Cyber risk awareness and ANSSI SecNumacadémie certificate.",
    "SAE 1.03 — Dispositif de Transmission": "SAE 1.03 — Transmission Systems",
    "Étude des dispositifs de transmission de données dans les réseaux : analyse des supports cuivre, fibre et sans fil.": "Study of data transmission systems in networks: analysis of copper, fiber and wireless media.",
    "Découverte et étude approfondie des dispositifs de transmission de données dans les réseaux. Analyse des supports cuivre, fibre et sans fil.": "In-depth study of data transmission systems in networks. Analysis of copper, fiber and wireless media.",
    "Portfolio Web Responsive": "Responsive Web Portfolio",
    "Ce portfolio personnel : design moderne, animations interactives et réseau de nodes en arrière-plan, hébergé sur GitHub Pages.": "This personal portfolio: modern design, interactive animations and a network-nodes background, hosted on GitHub Pages.",
    "Création de ce portfolio personnel avec design moderne, animations interactives et réseau de nodes en arrière-plan. Site responsive hébergé sur GitHub Pages.": "Creation of this personal portfolio with a modern design, interactive animations and a network-nodes background. Responsive site hosted on GitHub Pages.",
    "Voir la preuve sur GitHub": "View proof on GitHub",
    "Voir sur GitHub": "View on GitHub",
    "Programmer": "Program",
    "Connecter": "Connect",
    "Administrer": "Administer",
    "Sécuriser": "Secure",
    "Surveiller": "Monitor",
    "Éléments de compétence mobilisés": "Skill elements involved",
    "en choisissant les solutions et technologies réseaux adaptées": "by choosing suitable network solutions and technologies",
    "en respectant les principes fondamentaux de la sécurité informatique": "by following core IT security principles",
    "en utilisant une approche rigoureuse pour la résolution des dysfonctionnements": "by using a rigorous approach to troubleshooting",
    "en respectant les règles métiers": "by following professional standards",
    "en assurant une veille technologique": "by keeping up with technology watch",

    // Portfolio par compétences (overlays)
    "Portfolio - Projets R&T": "Portfolio - R&T Projects",
    "Retour": "Back",
    "Retour aux AC": "Back to learning outcomes",
    "Cliquez sur un apprentissage critique pour voir votre analyse réflexive": "Click a learning outcome to see my reflective analysis",
    "Ce que j'ai fait": "What I did",
    "Pourquoi je l'ai fait": "Why I did it",
    "Comment je l'ai fait": "How I did it",
    "Mes difficultés": "My difficulties",
    "Ce que j'en ai appris": "What I learned",
    "Ce que je ferais autrement": "What I would do differently",
    "Exemple de trace — projet lié": "Evidence example — related project",
    "Captures / Preuves visuelles": "Screenshots / Visual evidence",

    // Footer / mentions légales
    "Tous droits réservés": "All rights reserved",
    "Mentions Légales": "Legal Notice",
    "Crédits": "Credits",
    "Éditeur du site": "Site publisher",
    "Nom : Ramziatou AFFO TOSSOU": "Name: Ramziatou AFFO TOSSOU",
    "Statut : Étudiante": "Status: Student",
    "Établissement : IUT de Béthune - Université d'Artois": "Institution: IUT de Béthune - Artois University",
    "Hébergement": "Hosting",
    "Ce site est hébergé par GitHub": "This site is hosted by GitHub",
    "États-Unis": "United States",
    "Propriété intellectuelle": "Intellectual property",
    "Données personnelles": "Personal data",
    "L'ensemble du contenu de ce site est la propriété de Ramziatou AFFO TOSSOU, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation expresse est interdite.": "All content on this site is the property of Ramziatou AFFO TOSSOU unless otherwise stated. Any reproduction, distribution or use without express permission is prohibited.",
    "Ce site ne collecte aucune donnée personnelle. Aucun cookie n'est utilisé pour le suivi des visiteurs. Les informations de contact affichées (email, réseaux sociaux) sont publiques et fournies uniquement à des fins de contact professionnel.": "This site does not collect any personal data. No cookies are used to track visitors. The contact information displayed (email, social networks) is public and provided for professional contact purposes only.",
    "Ce site a été conçu pour présenter mon parcours, mes compétences et les projets que j’ai réalisés dans le domaine de l’informatique et des réseaux. Il me permet de mettre en valeur mon évolution, mes réalisations et mon intérêt pour la cybersécurité.": "This site was designed to present my background, skills and the projects I completed in IT and networking. It showcases my progress, achievements and interest in cybersecurity."
  };

  const TIPS = { "Accueil": "Home", "CV": "CV", "Mes Projets": "My Projects", "Portfolio": "Portfolio" };

  const norm = s => s.replace(/\s+/g, ' ').trim();
  const originals = new Map();   // noeud ou élément -> contenu FR d'origine
  let lang = 'fr';

  function toEN(root) {
    // 1) blocs avec data-en="..." (pour tout nouveau contenu que tu ajoutes)
    root.querySelectorAll('[data-en]').forEach(el => {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = el.dataset.en;
      el.setAttribute('data-i18n-done', '');
    });
    // 2) paragraphes qui contiennent du HTML (<strong>)
    root.querySelectorAll('.timeline-description').forEach(el => {
      if (el.hasAttribute('data-i18n-done') || !el.children.length) return;
      const en = EN[norm(el.innerHTML)];
      if (en) { originals.set(el, el.innerHTML); el.innerHTML = en; el.setAttribute('data-i18n-done', ''); }
    });
    // 3) tous les textes simples
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const p = n.parentElement;
      if (!p || p.closest('script,style,canvas,[data-i18n-done]')) return;
      const en = EN[norm(n.nodeValue)];
      if (!en) return;
      if (!originals.has(n)) originals.set(n, n.nodeValue);
      n.nodeValue = n.nodeValue.match(/^\s*/)[0] + en + n.nodeValue.match(/\s*$/)[0];
    });
  }

  function toFR() {
    originals.forEach((orig, node) => {
      if (!node.isConnected) return;
      if (node.nodeType === 1) { node.innerHTML = orig; node.removeAttribute('data-i18n-done'); }
      else node.nodeValue = orig;
    });
    originals.clear();
  }

  function setTips(en) {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      if (!el.dataset.tipFr) el.dataset.tipFr = el.dataset.tooltip;
      el.dataset.tooltip = en ? (TIPS[el.dataset.tipFr] || el.dataset.tipFr) : el.dataset.tipFr;
    });
  }

  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    document.getElementById('currentLang').textContent = l.toUpperCase();
    if (l === 'en') toEN(document.body); else toFR();
    setTips(l === 'en');
    try { localStorage.setItem('lang', l); } catch (e) {}
  }

  // Contenu généré en JS (modale projet, overlays AC) : retraduit à chaque ouverture
  const dyn = ['project-modal', 'sp-ac-overlay', 'sp-reflexive-overlay']
    .map(id => document.getElementById(id)).filter(Boolean);
  const mo = new MutationObserver(() => {
    if (lang !== 'en') return;
    mo.disconnect();
    dyn.forEach(toEN);
    watch();
  });
  function watch() { dyn.forEach(el => mo.observe(el, { childList: true, subtree: true })); }
  watch();

  document.getElementById('langBtn').addEventListener('click', () => setLang(lang === 'fr' ? 'en' : 'fr'));
  try { if (localStorage.getItem('lang') === 'en') setLang('en'); } catch (e) {}
})();
// Données des projets
const projectsData = {
  "sae101": {
    title: "SAE 1.01 — Hygiène Informatique",
    date: "2025 - 2026",
    github: "https://github.com/ramziatouaffotossou/sae101_hygiene_informatique.github.io.git",
    description: "Formation complète sur les bonnes pratiques en cybersécurité et hygiène informatique. Sensibilisation aux risques cyber et obtention de l'attestation ANSSI SecNumacadémie.",
    tags: ["ANSSI", "Cybersecurity", "MOOC"],
    badge: "Sécuriser",
    badgeClass: "badge-securiser-modal",
    ce: [
      { code: "CE1.01", label: "en choisissant les solutions et technologies réseaux adaptées" },
      { code: "CE1.02", label: "en respectant les principes fondamentaux de la sécurité informatique" },
      { code: "CE1.05", label: "en assurant une veille technologique" }
    ]
  },
  "sae103": {
    title: "SAE 1.03 — Dispositif de Transmission",
    date: "2025 - 2026",
    github: "https://github.com/ramziatouaffotossou/sae103_dispositif_de_transmission.github.io.git",
    description: "Découverte et étude approfondie des dispositifs de transmission de données dans les réseaux. Analyse des supports cuivre, fibre et sans fil.",
    tags: ["Transmission", "Signal"],
    badge: "Connecter",
    badgeClass: "badge-connecter-modal",
    ce: [
      { code: "CE1.01", label: "en choisissant les solutions et technologies réseaux adaptées" },
      { code: "CE1.03", label: "en utilisant une approche rigoureuse pour la résolution des dysfonctionnements" },
      { code: "CE1.04", label: "en respectant les règles métiers" }
    ]
  },
  "esgis": {
    title: "Plateforme ESGIS",
    date: "2024 - 2025",
    github: "https://github.com/ramziatouaffotossou/plateform_gestion_bulletin.github.io.git",
    description: "Développement d'une plateforme web de gestion de bulletins scolaires dans le cadre d'un projet scolaire. Création d'interfaces et mise en place d'une base de données.",
    tags: ["Web", "HTML/CSS", "PHP"],
    badge: "Programmer",
    badgeClass: "badge-programmer-modal",
    ce: [
      { code: "CE1.01", label: "en choisissant les solutions et technologies réseaux adaptées" },
      { code: "CE1.03", label: "en utilisant une approche rigoureuse pour la résolution des dysfonctionnements" },
      { code: "CE1.04", label: "en respectant les règles métiers" }
    ]
  },
  "portfolio": {
    title: "Portfolio Web Responsive",
    date: "2025 - 2026",
    github: "https://github.com/ramziatouaffotossou/ramziatouaffotossou.github.io.git",
    description: "Création de ce portfolio personnel avec design moderne, animations interactives et réseau de nodes en arrière-plan. Site responsive hébergé sur GitHub Pages.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    badge: "Programmer",
    badgeClass: "badge-programmer-modal",
    ce: [
      { code: "CE1.01", label: "en choisissant les solutions et technologies réseaux adaptées" },
      { code: "CE1.03", label: "en utilisant une approche rigoureuse pour la résolution des dysfonctionnements" },
      { code: "CE1.04", label: "en respectant les règles métiers" },
      { code: "CE1.05", label: "en assurant une veille technologique" }
    ]
  },
  "greenbite": {
    title: "GreenBite — E-commerce & Supervision IoT",
    date: "2025 - 2026",
    github: "https://github.com/ramziatouaffotossou/greenbite",
    description: "Conception d'un site e-commerce de snacks sains avec back-end Flask, base de données MySQL et déploiement conteneurisé via Docker. Supervision de la plateforme via des capteurs IoT.",
    tags: ["Flask", "MySQL", "Docker", "IoT"],
    badge: "Programmer",
    badgeClass: "badge-programmer-modal",
    ce: [
      { code: "CE1.01", label: "en choisissant les solutions et technologies réseaux adaptées" },
      { code: "CE1.03", label: "en utilisant une approche rigoureuse pour la résolution des dysfonctionnements" },
      { code: "CE1.04", label: "en respectant les règles métiers" }
    ]
  },
  "reseau-entreprise": {
    title: "Réseau d'Entreprise Sécurisé",
    date: "2025 - 2026",
    github: "https://github.com/ramziatouaffotossou/reseau-entreprise-securise",
    description: "Conception et simulation sous Cisco Packet Tracer d'un réseau d'entreprise sécurisé : VLAN, routage inter-VLAN, Wi-Fi (WLC), HSRP, STP, EtherChannel, DHCP, adressage IPv4/IPv6 et sécurisation des accès.",
    tags: ["VLAN", "HSRP", "STP", "EtherChannel", "IPv4/IPv6", "Packet Tracer"],
    badge: "Connecter",
    badgeClass: "badge-connecter-modal",
    ce: [
      { code: "CE1.01", label: "en choisissant les solutions et technologies réseaux adaptées" },
      { code: "CE1.02", label: "en respectant les principes fondamentaux de la sécurité informatique" },
      { code: "CE1.03", label: "en utilisant une approche rigoureuse pour la résolution des dysfonctionnements" }
    ]
  },
  "telephonie-ip": {
    title: "Infrastructure de Téléphonie IP",
    date: "2025 - 2026",
    github: "https://github.com/ramziatouaffotossou/telephonie-ip-asterisk",
    description: "Déploiement d'une infrastructure de téléphonie IP avec Asterisk : configuration SIP, téléphones IP (Fanvil/Cisco), serveur TFTP, messagerie vocale et validation des communications.",
    tags: ["Asterisk", "SIP", "VoIP", "TFTP"],
    badge: "Administrer",
    badgeClass: "badge-administrer-modal",
    ce: [
      { code: "CE1.01", label: "en choisissant les solutions et technologies réseaux adaptées" },
      { code: "CE1.03", label: "en utilisant une approche rigoureuse pour la résolution des dysfonctionnements" },
      { code: "CE1.05", label: "en assurant une veille technologique" }
    ]
  }
};

function openProjectModal(id) {
  const data = projectsData[id];
  if (!data) return;

  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-date').innerHTML = `<i class="bi bi-calendar3"></i> ${data.date}`;
  document.getElementById('modal-github').href = data.github;
  document.getElementById('modal-description').textContent = data.description;

  const badge = document.getElementById('modal-badge');
  badge.textContent = data.badge;
  badge.className = 'project-modal-badge ' + data.badgeClass;

  const tagsEl = document.getElementById('modal-tags');
  tagsEl.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');

  const ceList = document.getElementById('modal-ce-list');
  ceList.innerHTML = data.ce.map(c =>
    `<li><span class="ce-code">${c.code}</span> ${c.label}</li>`
  ).join('');

  document.getElementById('project-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('project-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeProjectModal(e) {
  if (e.target === document.getElementById('project-modal')) closeModal();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

/* ================================================
   SUPPORT PORTFOLIO — données
   ================================================ */
   const spData = {/* ================================================
   REMPLACE le bloc spData dans ton main.js
   Entre : const spData = {
   Et :    let currentCompetence = null;
   ================================================ */

  administrer: {
    label: "Administrer",
    icon: '<i class="bi bi-gear-fill" style="color:#e05065"></i>',
    color: "#c41e3a",
    ac: [
      {
        code: "AC11.01",
        label: "Maîtriser les lois fondamentales de l'électricité afin d'intervenir sur des équipements de réseaux et télécommunications",
        reflexive: {
          fait: "En cours de physique appliquée, j'ai étudié les lois fondamentales de l'électricité (loi d'Ohm, puissance électrique) et leur application aux équipements réseau comme les switchs et routeurs.",
          pourquoi: "Pour pouvoir vérifier l'alimentation d'un équipement avant tout diagnostic de panne et comprendre les contraintes électriques d'une baie réseau.",
          comment: "J'ai réalisé des exercices de calcul de tension, intensité et résistance, en faisant le lien avec les caractéristiques électriques des équipements utilisés en TP réseau.",
          difficultes: "La conversion entre unités (mA, A, V, kΩ) et l'application des formules dans des circuits mixtes séries/parallèles m'ont posé des difficultés au départ.",
          appris: "J'ai compris pourquoi il est important de vérifier l'alimentation d'un équipement avant tout diagnostic de panne, et comment les contraintes électriques influencent l'installation d'une baie.",
          autrement: "Je ferais plus de schémas annotés pour visualiser les circuits avant de réaliser les mesures.",
          projet: { titre: "TP Électricité — Cours R&T S1", desc: "Étude des lois fondamentales de l'électricité appliquées aux équipements réseau : calculs de tension, courant, résistance et puissance." }
        }
      },
      {
        code: "AC11.02",
        label: "Comprendre l'architecture et les fondements des systèmes numériques, les principes du codage de l'information, des communications et de l'Internet",
        reflexive: {
          fait: "J'ai étudié l'architecture des systèmes numériques : codage binaire, fonctionnement des protocoles de communication, et structure d'un réseau local avec ses différents équipements (switch, routeur, poste client).",
          pourquoi: "Comprendre comment l'information circule dans un réseau est indispensable pour administrer et sécuriser une infrastructure.",
          comment: "À travers les cours de R&T et les TP, j'ai mis en pratique ces notions en configurant des équipements réels et en simulant des topologies réseau sur Packet Tracer.",
          difficultes: "La lecture des trames en hexadécimal et l'identification des en-têtes de chaque couche ont demandé beaucoup de pratique.",
          appris: "Comprendre l'architecture m'a aidé à mieux anticiper comment les données circulent dans un réseau et pourquoi certaines configurations sont nécessaires.",
          autrement: "Je commencerais directement par capturer du trafic réel avec Wireshark pour rendre l'apprentissage plus concret.",
          
          projet: { titre: "Logique Combinatoire-Multiplexeur",   desc: "TP R106 - Codage en binaire", lien: null, images: [ { src: "assets/img/traces/logique.png",    }],
   }
        }
      },
      {
        code: "AC11.03",
        label: "Configurer les fonctions de base du réseau local",
        reflexive: {
          fait: "J'ai configuré un switch et un routeur Cisco en mode CLI : attribution d'adresses IP, création de VLANs, configuration des interfaces et mise en place du routage entre sous-réseaux.",
          pourquoi: "C'est la compétence cœur du technicien réseau : sans savoir configurer un réseau local, impossible d'assurer sa disponibilité.",
          comment: "En TP, j'ai utilisé le terminal Cisco IOS pour saisir les commandes de configuration. J'ai d'abord suivi les consignes du TP, puis essayé de reproduire la configuration de façon autonome.",
          difficultes: "J'ai eu du mal à mémoriser la syntaxe des commandes IOS au début, notamment pour naviguer entre les différents modes de configuration.",
          appris: "J'ai appris à structurer une configuration réseau étape par étape et à vérifier chaque paramètre avec des commandes comme show running-config ou show ip interface brief.",
          autrement: "Je documenterais chaque configuration dans un journal de bord avec captures d'écran pour pouvoir rejouer les manipulations.",
          projet: {
  titre: "SAE 1.03 — Dispositif de Transmission",
  lien: "https://github.com/ramziatouaffotossou/sae103_dispositif_de_transmission.github.io.git",
  desc: "Configuration de topologies réseau avec VLANs et routage inter-VLAN dans Packet Tracer.",
  images: [
    { src: "assets/img/traces/lab_reseau.png",  caption: "Topologie du réseau local configuré en TP" },
    { src: "assets/img/traces/ping.png",         caption: "Test de connectivité ping — vérification de la config" }
  ]}
        }
      },
      {
        code: "AC11.04",
        label: "Maîtriser les rôles et les principes fondamentaux des systèmes d'exploitation afin d'interagir avec ceux-ci pour la configuration et l'administration des réseaux et services fournis",
        reflexive: {
          fait: "J'ai installé et configuré un système d'exploitation Linux en TP : création d'utilisateurs, gestion des permissions, et configuration des paramètres réseau depuis le terminal.",
          pourquoi: "La majorité des serveurs réseau fonctionnent sous Linux. Maîtriser le terminal est incontournable pour administrer des services.",
          comment: "J'ai utilisé le terminal Linux pour exécuter des commandes d'administration système (adduser, chmod, ip addr) et l'interface graphique pour la configuration réseau sous Windows.",
          difficultes: "La gestion des droits sous Linux m'a demandé du temps : comprendre la différence entre les droits utilisateur et root, et savoir quand utiliser sudo.",
          appris: "J'ai compris le rôle central de l'OS dans l'administration d'un réseau : c'est par lui que passent toutes les configurations des services et des interfaces réseau.",
          autrement: "J'installerais un serveur Linux en machine virtuelle chez moi dès le début pour pratiquer quotidiennement et pas uniquement en TP.",
          projet: {
  titre: "TP Systèmes Linux — S1",
  lien: null,
  desc: "Installation et configuration d'Ubuntu : gestion des utilisateurs, droits fichiers, configuration réseau.",
   images: [
    { src: "assets/img/traces/ubuntu3.png",  },
    { src: "assets/img/traces/ubuntu4.png",     },
    { src: "assets/img/traces/ubuntu1.jpg",         }
  ]   /* Ajoute une capture de terminal Linux ici si tu en trouves une */
}
        }
      },
      {
        code: "AC11.05",
        label: "Identifier les dysfonctionnements du réseau local et savoir les signaler",
        reflexive: {
          fait: "Lors de TP, j'ai dû diagnostiquer des problèmes de connectivité : absence de ping entre deux machines, mauvaise configuration d'IP, câble mal branché sur le switch.",
          pourquoi: "Savoir identifier et signaler un problème réseau est essentiel pour maintenir la disponibilité des services et collaborer avec une équipe.",
          comment: "J'ai adopté une démarche méthodique : vérification du câblage physique, puis des adresses IP, puis des routes. J'ai utilisé ping, traceroute et les LEDs des équipements.",
          difficultes: "Distinguer une panne de couche 2 (switch) d'une panne de couche 3 (routage) a été difficile sans méthode rigoureuse au départ.",
          appris: "Un diagnostic efficace part toujours du bas de la pile réseau (couche physique) vers le haut. Cette méthode m'a évité de chercher des problèmes logiciels quand c'était un câble défectueux.",
          autrement: "Je mettrais en place une checklist de diagnostic à suivre systématiquement pour ne pas sauter d'étapes sous pression.",
         projet: {
  titre: "TP Diagnostic réseau — R&T S1",
  lien: null,
  desc: "Identification et résolution de pannes réseau simulées : câbles défectueux, mauvaise configuration IP.",
  images: [
    { src: "assets/img/traces/ping.png",       caption: "Test ping — vérification de connectivité" },
    { src: "assets/img/traces/tc^p-syn.png",   caption: "Capture TCP SYN — analyse de trafic réseau" }
  ]
}
        }
      },
      {
       code: "AC11.06",

label: "Installer un poste client, expliquer la procédure mise en place",

reflexive: {

  fait: "Dans le cadre du module R202, j'ai installé et configuré des machines virtuelles Linux et Windows. J'ai réalisé la configuration réseau, la création d'utilisateurs ainsi que certaines tâches d'administration de base sous Linux.",

  pourquoi: "Savoir installer et configurer un poste client est une compétence essentielle en administration système et réseau. Cela permet de préparer des environnements fonctionnels adaptés aux besoins des utilisateurs.",

  comment: "J'ai utilisé des machines virtuelles pour installer les systèmes d'exploitation puis configurer les paramètres réseau (adresse IP, passerelle, DNS). Sous Linux, j'ai également utilisé des commandes d'administration comme ip addr, useradd ou passwd afin de gérer le système.",

  difficultes: "Au début, certaines configurations Linux étaient difficiles à retenir, notamment les commandes réseau et la gestion des droits utilisateurs.",

  appris: "J'ai appris qu'une installation réussie ne se limite pas à installer un système : il faut aussi vérifier la configuration réseau, les utilisateurs et le bon fonctionnement des services.",

  autrement: "Je pourrais améliorer ma méthode en documentant davantage chaque étape de configuration avec des captures d'écran et des procédures détaillées.",

  projet: {

    titre: "R202 — Installation et administration de machines virtuelles",

    lien: null,

    desc: "Installation et configuration de machines virtuelles Linux et Windows avec administration de base et configuration réseau.",

    images: [

      {
        src: "assets/img/traces/linus.jpeg",
        caption: "Machine virtuelle Linux configurée"
      },

      {
        src: "assets/img/traces/win.png",
        caption: "Configuration réseau d'une machine virtuelle Windows"
      }

    ]

  }

}
      }
    ]
  },

  connecter: {
    label: "Connecter",
    icon: '<i class="bi bi-hdd-network-fill" style="color:#e07a3f"></i>',
    color: "#e07a3f",
    ac: [
      {
        code: "AC12.01",
        label: "Mesurer, analyser et commenter les signaux",
        reflexive: {
          fait: "En TP, j'ai utilisé un oscilloscope pour observer et mesurer des signaux électriques : période, fréquence, amplitude et forme d'onde. J'ai également utilisé un multimètre pour des mesures de tension et de continuité.",
          pourquoi: "Lire un signal ne suffit pas : il faut savoir interpréter ce qu'on voit pour détecter une anomalie ou valider le bon fonctionnement d'un équipement de transmission.",
          comment: "J'ai branché les sondes de l'oscilloscope sur le signal à observer, réglé l'échelle temporelle et la sensibilité en tension, puis relevé les valeurs et rédigé une analyse.",
          difficultes: "Le réglage de l'oscilloscope n'était pas intuitif au début : j'avais du mal à stabiliser l'affichage du signal et à choisir la bonne échelle pour que la mesure soit exploitable.",
          appris: "J'ai compris que mesurer un signal demande méthode et rigueur. Une mauvaise échelle fausse complètement l'interprétation du signal.",
          autrement: "Je m'exercerais d'abord sur des signaux simples (signal carré, sinusoïdal) avant de passer à des mesures plus complexes.",
         projet: {
  titre: "TP Mesure de signaux — S1",
  lien: null,
  desc: "Mesure et analyse de signaux électriques avec oscilloscope et multimètre.",
  images: [
    { src: "assets/img/traces/signal.jpeg",        caption: "Échantillonnage d'un signal analogique" }
  ]
}
        }
      },
      {
        code: "AC12.02",
        label: "Caractériser des systèmes de transmissions élémentaires et découvrir la modélisation mathématique de leur fonctionnement",
        reflexive: {
          fait: "J'ai étudié les caractéristiques d'un système de transmission en analysant son spectre avec l'analyseur GSP730 : bande passante, atténuation, rapport signal/bruit. J'ai utilisé les notions de spectre, puissance, décibels et gain vues en R205/R206 pour modéliser mathématiquement le signal mesuré.",
          pourquoi: "Pour comprendre quels paramètres sont pertinents pour assurer une transmission de qualité, et quels appareils utiliser pour les mesurer — problématique directe de la SAE 2.02.",
          comment: "En combinant les ressources théoriques (R205 Signaux et Systèmes, R206 Analyse des signaux) avec les mesures pratiques. J'ai tracé le spectre théorique d'un signal sinusoïdal avant de le comparer à la mesure réelle sur l'analyseur.",
          difficultes: "La modélisation mathématique du spectre (représentation en dBV) était abstraite sans lien avec une mesure concrète. Comprendre la différence entre RBW et VBW et leur impact sur l'affichage du spectre a nécessité des recherches complémentaires sur la documentation Rohde & Schwarz.",
          appris: "J'ai compris que chaque paramètre de l'analyseur (RBW, span, niveau de référence) influence directement la qualité de la mesure. Un mauvais réglage donne un spectre illisible ou trompeur.",
          autrement: "Je commencerais par faire les calculs théoriques (spectre attendu) sur papier avant de toucher l'appareil, pour avoir un point de comparaison immédiat.",  projet: { titre: "SAE 1.03 — Dispositif de Transmission", lien: "https://github.com/ramziatouaffotossou/sae103_dispositif_de_transmission.github.io.git",
  desc: "Caractérisation de systèmes de transmission : atténuation, bande passante, rapport signal/bruit.",
  images: [
     { src: "assets/img/traces/echantillonage3.jpeg",  caption: "Comparaison des fréquences d'échantillonnage" },
    { src: "assets/img/traces/studio_analoge.jpeg",   caption: "Studio analogique — étude d'un système de transmission" },
    { src: "assets/img/traces/diagram_de_gaute.jpeg",  caption: "Analyse du signal en sortie du système de transmission" },
  ]
}
        }
      },
      {
      code: "AC12.03",

label: "Déployer des supports de transmission",

reflexive: {

  fait: "Lors des TP et des cours de réseau, j'ai étudié les différents supports de transmission utilisés en informatique, notamment les câbles RJ45, coaxiaux et la fibre optique. J'ai également appris à identifier les différences entre un câble droit et un câble croisé ainsi que le rôle des différents connecteurs.",

  pourquoi: "Le choix du support de transmission influence directement la qualité, la vitesse et la fiabilité de la communication réseau. Il est donc important de savoir reconnaître les différents types de câbles et leurs usages.",

  comment: "En observant les câbles utilisés en TP, en étudiant les normes de câblage et en analysant les schémas de connexion vus en cours. J'ai aussi utilisé du matériel réseau pour identifier les connecteurs et comprendre leur fonctionnement.",

  difficultes: "Au début, il n'était pas toujours facile de différencier certains types de câbles ou de retenir les usages spécifiques des câbles droits et croisés.",

  appris: "J'ai appris que l'infrastructure physique est une base essentielle du réseau. Une mauvaise connexion ou un mauvais support peut empêcher toute communication entre les équipements.",

  autrement: "Je souhaiterais approfondir davantage la partie pratique en réalisant plus de manipulations de câblage et de tests sur différents supports de transmission.",

  projet: {

    titre: "Étude des supports de transmission",

    lien: null,

    desc: "Identification et étude des différents supports de transmission utilisés en réseau : câble droit, câble croisé, câble coaxial et fibre optique.",

    images: [

      {
        src: "assets/img/traces/cable.jpg",
        caption: "Exemple de câblage RJ45 droit et croise"
      },

    ]

  }

}
      },
      {
          code: "AC12.04",
        label: "Connecter les systèmes de ToIP",
        reflexive: {
          fait: "J'ai configuré un système de téléphonie sur IP (ToIP) avec des téléphones IP Fanvil : enregistrement sur un serveur SIP, configuration des paramètres réseau du téléphone (adresse IP, serveur SIP, identifiant) et test d'appels entre postes.",
          pourquoi: "La ToIP est omniprésente dans les entreprises modernes. Comprendre son fonctionnement est essentiel pour déployer et maintenir des solutions de communication.",
          comment: "J'ai accédé à l'interface web du téléphone Fanvil pour renseigner les paramètres SIP (adresse du serveur, numéro d'extension, mot de passe), puis vérifié l'enregistrement et testé un appel entre deux postes.",
          difficultes: "La configuration du téléphone Fanvil n'était pas évidente au premier abord : naviguer dans les menus de l'interface web et identifier les bons paramètres SIP a demandé de consulter la documentation.",
          appris: "J'ai découvert comment la voix transit sur un réseau IP comme n'importe quelle autre donnée, et compris l'importance de la qualité du réseau (latence, gigue) pour garantir une bonne qualité d'appel.",
          autrement: "Je documenterais la configuration pas à pas avec captures d'écran pour pouvoir reproduire le déploiement rapidement.", projet: {
  titre: "TP ToIP — S1",
  lien: null,
  desc: "Configuration d'un serveur SIP et de softphones pour la téléphonie sur IP.",
  images: [
    { src: "assets/img/traces/fanvil1.png",  caption: "Interface Fanvil — configuration du compte SIP" },
    { src: "assets/img/traces/Fanvil2.png",  caption: "Fanvil — paramètres réseau du téléphone IP" },
    { src: "assets/img/traces/Fanvil3.png",  caption: "Fanvil — enregistrement sur le serveur SIP réussi" },
    { src: "assets/img/traces/Fanvil4.png",  caption: "Fanvil — test d'appel ToIP entre deux postes" }
  ]
}
        }
      },
      {
       code: "AC12.05",
label: "Communiquer avec un tiers (client, collaborateur...) et adapter son discours et sa langue à son interlocuteur",

reflexive: {

  fait: "Lors des SAÉ et des travaux de groupe, j'ai présenté nos projets à l'oral devant les enseignants et expliqué certaines configurations réalisées. Durant les cours de communication, nous avons également effectué des mises en situation professionnelles et des appels à des entreprises.",

  pourquoi: "Dans les métiers du réseau et de l'informatique, il est important de savoir expliquer clairement un problème technique ou une solution, aussi bien à des techniciens qu'à des personnes non spécialisées.",

  comment: "J'ai appris à adapter mon vocabulaire selon l'interlocuteur, à structurer mes explications et à présenter les informations de manière claire pendant les présentations de SAÉ et les échanges en groupe.",

  difficultes: "Au début, j'avais parfois du mal à parler avec assurance à l'oral et à simplifier certains termes techniques sans perdre le sens des explications.",

  appris: "J'ai compris que la communication est une compétence essentielle dans l'informatique. Une bonne explication permet de mieux collaborer et d'éviter les incompréhensions.",

  autrement: "Je pourrais encore améliorer ma prise de parole en pratiquant davantage de présentations orales et de mises en situation professionnelles.",

 projet: {

}  }
      }
    ]
  },

  programmer: {
    label: "Programmer",
    icon: '<i class="bi bi-code-slash" style="color:#f4c430"></i>',
    color: "#f4c430",
    ac: [
      {
        code: "AC13.01",
        label: "Utiliser un système informatique et ses outils",
        reflexive: {
          fait: "J'utilise quotidiennement VS Code, Git/GitHub, le terminal Linux et les outils de développement du navigateur (DevTools) pour développer et maintenir mes projets.",
          pourquoi: "Maîtriser son environnement de travail est la première étape pour être productif en développement et en administration système.",
          comment: "Pratique quotidienne lors du développement du portfolio (SAE 14), commandes Bash fondamentales (ls, cd, mkdir, chmod, grep), scripts simples pour automatiser des tâches.",
          difficultes: "Au début, travailler uniquement en ligne de commande sans interface graphique était déstabilisant. J'ai dû m'habituer à lire attentivement les messages d'erreur.",
          appris: "La ligne de commande est bien plus puissante et rapide qu'une interface graphique pour administrer un système. Cette maîtrise est indispensable en R&T où la plupart des serveurs tournent sans GUI.",
          autrement: "J'apprendrais Git dès le premier jour d'un projet plutôt que de l'introduire en cours de développement.",
          projet: { titre: "Portfolio Web Responsive (SAE 14)", lien: "https://github.com/ramziatouaffotossou/ramziatouaffotossou.github.io.git", desc: "Développement du portfolio avec VS Code, gestion du code source avec Git et déploiement via GitHub Pages." }
        }
      },
      {
        code: "AC13.02",
        label: "Lire, exécuter, corriger et modifier un programme",
        reflexive: {
          fait: "En TP Python, j'ai lu et analysé des scripts existants pour comprendre leur fonctionnement, puis les ai modifiés pour les adapter à de nouveaux besoins et corrigé des bugs.",
          pourquoi: "En entreprise, on travaille rarement sur du code écrit from scratch : savoir lire et modifier du code existant est une compétence clé.",
          comment: "Lecture du code source, utilisation des DevTools pour déboguer, ajout de print() à des endroits stratégiques pour suivre l'exécution et identifier l'origine des erreurs.",
          difficultes: "Comprendre un code que je n'avais pas écrit moi-même était difficile : il fallait lire ligne par ligne et comprendre la logique globale avant de modifier quoi que ce soit.",
          appris: "Savoir lire du code est aussi important que savoir en écrire. Commenter son code et nommer clairement ses variables facilite énormément la maintenance et la collaboration.",
          autrement: "Je commenterais chaque section du code au fur et à mesure de ma lecture pour garder une trace de ma compréhension.",
         projet: { titre: "Python Essentials 1 — Cisco/Python Institute (2024)", lien: "https://ramziatouaffotossou.github.io/docs/PythonEssential1.pdf", desc: "Certification sur les bases de la programmation Python : traduction d'algorithmes en code, variables, boucles, fonctions, structures de données." }
        }
      },
      {
        code: "AC13.03",
        label: "Traduire un algorithme, dans un langage et pour un environnement donné",
        reflexive: {
          fait: "J'ai traduit des algorithmes décrits en pseudo-code en scripts Python fonctionnels : boucles, conditions, fonctions, gestion de listes et de chaînes de caractères.",
          pourquoi: "L'algorithme est la logique ; le langage est l'outil. Savoir passer de l'un à l'autre est fondamental en programmation.",
          comment: "En décomposant l'algorithme étape par étape, en identifiant les structures de contrôle nécessaires (if/else, for, while) et en implémentant progressivement, en testant à chaque étape.",
          difficultes: "La gestion des indices et des boucles imbriquées était source d'erreurs fréquentes. J'ai appris à tester avec des cas simples avant de passer à des données plus complexes.",
          appris: "Un algorithme bien conçu se traduit naturellement en code. Prendre le temps de réfléchir à la logique avant de coder fait gagner du temps sur le débogage.",
          autrement: "Je dessinerais l'organigramme de l'algorithme sur papier avant de coder, pour séparer la réflexion logique de l'implémentation.",
         projet: { titre: "Python Essentials 1 — Cisco/Python Institute (2024)", lien: "https://ramziatouaffotossou.github.io/docs/PythonEssential1.pdf", desc: "Certification sur les bases de la programmation Python : traduction d'algorithmes en code, variables, boucles, fonctions, structures de données." }
        }
      },
      {
        code: "AC13.04",
        label: "Connaître l'architecture et les technologies d'un site Web",
        reflexive: {
          fait: "J'ai conçu et développé ce portfolio (HTML5/CSS3/JS/Bootstrap) dans le cadre de la SAE 14, et une plateforme web avec PHP et MySQL (Plateforme ESGIS).",
          pourquoi: "Les interfaces web sont omniprésentes dans les outils réseau (interfaces d'administration, dashboards). Comprendre leur architecture est utile en R&T.",
          comment: "SAE 14, cours de développement web, documentation MDN, Bootstrap docs. HTML sémantique pour la structure, CSS pour la mise en forme, JS pour l'interactivité.",
          difficultes: "La mise en page responsive était le point le plus difficile : faire en sorte que le site s'affiche correctement sur mobile et sur desktop nécessitait de comprendre les media queries.",
          appris: "J'ai compris la séparation des rôles entre HTML (structure), CSS (présentation) et JS (comportement), et comment un navigateur interprète une page web.",
          autrement: "Je concevrais la structure de la base de données avant de coder le backend pour éviter des restructurations en cours de projet.",
      projet: {
  titre: "Portfolio Web Responsive (SAE 14)",
  lien: "https://github.com/ramziatouaffotossou/ramziatouaffotossou.github.io.git",
  desc: "Conception et développement du portfolio : HTML5, CSS3, JS, Bootstrap 5, hébergé sur GitHub Pages.",
  images: [
    { src: "assets/img/traces/portfolio.png", caption: "Screenshot du portfolio en ligne " }
    /* Ajoute un screenshot de ton portfolio ou de ton GitHub ici */
  ]
}  }
      },
      {

code: "AC13.06",

label: "S'intégrer dans un environnement propice au développement et au travail collaboratif",

reflexive: {

  fait: "Lors de la SAE 1.05, nous avons travaillé en groupe en utilisant GitLab afin de partager et centraliser notre code. J'ai également utilisé GitHub pour publier et versionner mes projets personnels comme mon portfolio et certains projets réalisés en BUT.",

  pourquoi: "Le travail collaboratif est essentiel dans les métiers de l'informatique. Utiliser des outils de versionnement permet à plusieurs personnes de travailler sur un même projet tout en gardant un historique clair des modifications.",

  comment: "J'ai utilisé Git et GitLab pour envoyer, récupérer et mettre à jour du code avec des commandes comme git add, git commit, git push et git pull. GitHub m'a ensuite permis de continuer à versionner mes projets personnels de manière autonome.",

  difficultes: "Au début, comprendre le fonctionnement des branches, des dépôts distants et la gestion des conflits demandait de la rigueur. Il fallait aussi faire attention à bien synchroniser les versions du projet.",

  appris: "J'ai appris qu'un bon travail collaboratif repose autant sur l'organisation que sur la technique. Les outils de versionnement permettent de sécuriser le projet et de mieux travailler en équipe.",

  autrement: "Je pourrais améliorer encore mon organisation en utilisant davantage les branches et en adoptant des conventions plus précises pour les commits et les noms de versions.",

  projet: {

    titre: "Travaux collaboratifs — GitLab & GitHub",

    lien: "<PRIVATE_URL>",

    desc: "Utilisation de GitLab pour les projets collaboratifs de SAE et de GitHub pour le versionnement de mes projets personnels et scolaires.",

    images: [
      {
        src: "assets/img/traces/git.png",
        caption: "Historique des commits sur GitHub"
      },

      {
        src: "assets/img/traces/git2.png",
        caption: "Projet collaboratif versionné avec GitLab"
      }
    ]

  }

}
      }
    ]
  },

securiser: {
  label: "Sécuriser",
  icon: '<i class="bi bi-shield-fill-check" style="color:#7cb342"></i>',
  color: "#7cb342",
  ac: [
    {
      code: "AC14.01",
      label: "Acquérir les principes fondamentaux de la cybersécurité",
      reflexive: null
    },
    {
      code: "AC14.02",
      label: "Appliquer les politiques de sécurité des équipements réseau",
      reflexive: null
    },
    {
      code: "AC14.03",
      label: "Déceler des compromissions dans un système informatique",
      reflexive: null
    },
    {
      code: "AC14.04",
      label: "Respecter les réglementations en vigueur et les bonnes pratiques",
      reflexive: null
    }
  ]
},

  surveiller: {
  label: "Surveiller",
  icon: '<i class="bi bi-eye-fill" style="color:#0099cc"></i>',
  color: "#0099cc",
  ac: [
    {
      code: "AC15.01",
      label: "Mesurer et analyser les performances d'un réseau",
      reflexive: null
    },
    {
      code: "AC15.02",
      label: "Caractériser et analyser le trafic réseau",
      reflexive: null
    },
    {
      code: "AC15.03",
      label: "Maîtriser les outils de supervision réseau",
      reflexive: null
    },
    {
      code: "AC15.04",
      label: "Documenter les réseaux et les activités de surveillance",
      reflexive: null
    }
  ]
}
};
  
  function openCompetence(id) {
    currentCompetence = id;
    const data = spData[id];
    if (!data) return;
  
    document.getElementById('sp-ac-comp-icon').innerHTML = data.icon;
    document.getElementById('sp-ac-comp-name').textContent = data.label;
  
    const list = document.getElementById('sp-ac-list');
    list.innerHTML = data.ac.map((ac, i) => `
      <div class="sp-ac-item" onclick="openReflexive('${id}', ${i})">
        <span class="sp-ac-code" style="background:${data.color}22;color:${data.color};border:1px solid ${data.color}44">${ac.code}</span>
        <span class="sp-ac-label">${ac.label}</span>
        <i class="bi bi-chevron-right sp-ac-chevron"></i>
      </div>
    `).join('');
  
    document.getElementById('sp-ac-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
 function openReflexive(compId, acIndex) {

  const data = spData[compId];
  const ac = data.ac[acIndex];
  const r = ac.reflexive;

  document.getElementById('sp-ref-ac-code').textContent = ac.code;

  document.getElementById('sp-ref-ac-code').style.cssText =
    `background:${data.color}22;color:${data.color};
     border:1px solid ${data.color}44`;

  document.getElementById('sp-ref-ac-label').textContent = ac.label;

  const questions = [
    { icon: 'bi-check2-circle', title: 'Ce que j\'ai fait', text: r.fait },
    { icon: 'bi-question-circle', title: 'Pourquoi je l\'ai fait', text: r.pourquoi },
    { icon: 'bi-tools', title: 'Comment je l\'ai fait', text: r.comment },
    { icon: 'bi-exclamation-triangle', title: 'Mes difficultés', text: r.difficultes },
    { icon: 'bi-lightbulb', title: 'Ce que j\'en ai appris', text: r.appris },
    { icon: 'bi-arrow-repeat', title: 'Ce que je ferais autrement', text: r.autrement },
  ];

  document.getElementById('sp-reflexive-grid').innerHTML =
    questions.map(q => `
      <div class="sp-ref-card">
        <div class="sp-ref-card-icon">
          <i class="bi ${q.icon}"></i>
        </div>
        <h5>${q.title}</h5>
        <p>${q.text}</p>
      </div>
    `).join('');

  // =========================
  // TRACE PROJET
  // =========================

  const trace = r.projet;

  document.getElementById('sp-project-trace').innerHTML = `
    <h5><i class="bi bi-paperclip"></i> Exemple de trace — projet lié</h5>

    <p>
      <strong style="color:var(--text-light)">
        ${trace.titre}
      </strong><br>

      ${trace.desc}

      ${trace.lien
        ? ` — <a href="${trace.lien}" target="_blank">
              <i class="bi bi-github"></i> Voir sur GitHub
            </a>`
        : ''
      }
    </p>

    ${trace.images && trace.images.length > 0 ? `
      <div style="margin-top:14px;">

        <p style="
          font-size:0.78rem;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:0.08em;
          color:var(--accent-color);
          margin-bottom:10px;
        ">
          <i class="bi bi-images"></i>
          Captures / Preuves visuelles
        </p>

        <div style="display:flex;flex-wrap:wrap;gap:10px;">

          ${trace.images.map(img => `

            <a href="${img.src}"
               data-gallery="trace-gallery"
               class="glightbox"
               data-description="${img.caption}">

              <img
                src="${img.src}"
                alt="${img.caption}"

                style="
                  width:120px;
                  height:80px;
                  object-fit:cover;
                  border-radius:8px;
                  border:2px solid rgba(0,102,204,0.3);
                  cursor:zoom-in;
                  transition:transform 0.2s,border-color 0.2s;
                "

                onmouseover="
                  this.style.transform='scale(1.05)';
                  this.style.borderColor='var(--accent-color)'
                "

                onmouseout="
                  this.style.transform='scale(1)';
                  this.style.borderColor='rgba(0,102,204,0.3)'
                "
              />

            </a>

          `).join('')}

        </div>

      </div>
    ` : ''}
  `;

  // Réinitialise GLightbox
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox'
    });
  }

  // Ouvre overlay
  document.getElementById('sp-reflexive-overlay')
    .classList.add('active');
}

  
   
    /* ================================================
   MODIFICATION À FAIRE DANS main.js
   
   Dans la fonction openReflexive(), trouve cette ligne :
   
       document.getElementById('sp-project-trace').innerHTML = `...`;
   
   Et REMPLACE tout le bloc innerHTML par celui ci-dessous.
   ================================================ */

// REMPLACE l'ancien innerHTML de sp-project-trace par :
document.getElementById('sp-project-trace').innerHTML = `
  <h5><i class="bi bi-paperclip"></i> Exemple de trace — projet lié</h5>
  <p>
    <strong style="color:var(--text-light)">${trace.titre}</strong><br>
    ${trace.desc}
    ${trace.lien ? ` — <a href="${trace.lien}" target="_blank"><i class="bi bi-github"></i> Voir sur GitHub</a>` : ''}
  </p>
  ${trace.images && trace.images.length > 0 ? `
  <div style="margin-top:14px;">
    <p style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--accent-color);margin-bottom:10px;">
      <i class="bi bi-images"></i> Captures / Preuves visuelles
    </p>
    <div style="display:flex;flex-wrap:wrap;gap:10px;">
      ${trace.images.map(img => `
        <a href="${img.src}" data-gallery="trace-gallery" class="glightbox" data-description="${img.caption}">
          <img src="${img.src}" alt="${img.caption}"
            style="width:120px;height:80px;object-fit:cover;border-radius:8px;
                   border:2px solid rgba(0,102,204,0.3);cursor:zoom-in;
                   transition:transform 0.2s,border-color 0.2s;"
            onmouseover="this.style.transform='scale(1.05)';this.style.borderColor='var(--accent-color)'"
            onmouseout="this.style.transform='scale(1)';this.style.borderColor='rgba(0,102,204,0.3)'"
          />
        </a>
      `).join('')}
    </div>
  </div>
  ` : ''}
`;

// Réinitialise glightbox pour les nouvelles images
if (typeof GLightbox !== 'undefined') {
  GLightbox({ selector: '.glightbox' });
}


/* ================================================
   MODIFICATION DU spData
   
   Pour CHAQUE AC dans spData, ajoute un champ "images"
   dans l'objet "projet". Exemple :
   
   projet: {
     titre: "SAE 1.03 ...",
     lien: "https://github.com/...",
     desc: "...",
     images: [                          ← AJOUTE CE CHAMP
       { src: "assets/img/traces/ac1103_vlan.png",   caption: "Config VLAN sur switch Cisco" },
       { src: "assets/img/traces/ac1103_ping.png",   caption: "Test de connectivité inter-VLAN" }
     ]
   }
   
   Si tu n'as pas d'image pour un AC, mets juste :
   images: []
   
   ================================================ */


/* ================================================
   LISTE COMPLÈTE DES IMAGES À PRÉPARER CE SOIR
   (1-2 par AC, priorité aux AC avec étoile ⭐)
   ================================================

ADMINISTRER
-----------
⭐ AC11.03 — Config réseau
   → Capture show running-config ou show ip int brief dans Packet Tracer
   → Capture topologie Packet Tracer avec VLANs

⭐ AC11.04 — Systèmes d'exploitation  
   → Capture terminal Linux avec commandes ip addr ou ifconfig
   → Capture résultat de ip a ou ifconfig

⭐ AC11.06 — Poste client
   → Capture paramètres réseau d'un poste (IP, masque, passerelle)
   → Capture ping réussi vers la passerelle

AC11.01 — Électricité
   → Photo d'un multimètre ou schéma de cours scanné

AC11.02 — Architecture systèmes
   → Capture d'une trame Wireshark OU schéma OSI annoté

AC11.05 — Diagnostic
   → Capture d'un ping avec perte de paquets puis réussi

CONNECTER
---------
⭐ AC12.01 — Mesure signaux
   → Photo d'un oscilloscope en TP OU capture d'un signal simulé
   
⭐ AC12.03 — Supports de transmission
   → Photo d'un câble RJ45 serties OU d'une baie de brassage

⭐ AC12.04 — ToIP
   → Capture d'un softphone configuré (Linphone, Zoiper...)
   → Capture d'un appel en cours

AC12.02 — Systèmes transmission
   → Schéma de cours scanné avec formules

AC12.05 — Communication
   → Photo d'une présentation en TP OU extrait d'un compte-rendu

PROGRAMMER
----------
⭐ AC13.01 — Outils informatiques
   → Capture de ton terminal avec des commandes Git

⭐ AC13.04 — Site web
   → Screenshot de ton portfolio en ligne (glightbox sur navigateur)
   → Screenshot du code VS Code

⭐ AC13.06 — Travail collaboratif
   → Screenshot de ton GitHub avec l'historique des commits

AC13.02 — Lire/corriger programme
   → Screenshot d'un script Python dans VS Code

AC13.03 — Traduire algorithme
   → Screenshot du certificat Python Essentials Cisco

AC13.05 — Bases de données
   → Screenshot d'une requête SQL ou du schéma de la BDD ESGIS

================================================
   DOSSIER À CRÉER : assets/img/traces/
   Nomme tes fichiers : ac1103_vlan.png, ac1104_linux.png, etc.
================================================ */
  
  function closeAcOverlay() {
    document.getElementById('sp-ac-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function closeReflexiveOverlay() {
    document.getElementById('sp-reflexive-overlay').classList.remove('active');
  }
  
  function closeAllOverlays() {
    document.getElementById('sp-ac-overlay').classList.remove('active');
    document.getElementById('sp-reflexive-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAllOverlays();
  });
