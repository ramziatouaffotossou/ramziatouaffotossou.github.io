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

const translations = {
  fr: {
    // Hero Section
    greeting: "Bonjour,",
    iAm: "Je suis",
    role: "Future Experte en Cybersécurité",
    desc: "Originaire du Bénin, j'ai développé mon intérêt pour l'informatique au Lycée Technique Coulibaly. Après deux stages en maintenance informatique, je suis actuellement en première année de BUT Réseaux et Télécommunications, parcours cybersécurité, à l'IUT de Béthune.\n\nMon objectif professionnel est de devenir experte en sécurité des systèmes d'information et de contribuer à la protection des infrastructures numériques dans un environnement en constante évolution.",
    myProjects: "Mes Projets",
    myCV: "Mon CV",
    
    // Menu tooltips
    home: "Accueil",
    cv: "CV",
    portfolio: "Portfolio",
    
    // Section Titles
    cvTitle: "Curriculum Vitae",
    portfolioTitle: "Portfolio - Projets R&T",
    
    // CV Sidebar
    contactInfo: "Informations de Contact",
    languages: "Langues",
    technicalSkills: "Compétences Techniques",
    
    // Languages
    frenchNative: "Français : Courant",
    englishInter: "Anglais : Intermédiaire",
    
    // Technical Skills
    networkAdmin: "Administration réseau (Débutant)",
    packetTracer: "Packet Tracer",
    osConfig: "Installation et configuration des SE",
    wordpress: "Création de sites web WordPress",
    htmlCss: "HTML & CSS",
    programming: "Programmmation Langage C & Python",

 
    
    // CV Sections
    education: "Formation",
    experience: "Expérience Professionnelle",
    certifications: "Certifications",
    
    // Education
    inProgress: "En cours",
    butTitle: "BUT Réseaux & Télécommunications",
    butDesc: "Parcours <strong>Cybersécurité</strong> - Formation complète en administration réseau, sécurisation des systèmes, développement et supervision d'infrastructures.",
    tags1: "Cybersécurité",
    tags2: "Réseaux",
    tags3: "Systèmes",
    tags4: "Cisco",
    technicianTitle: "Diplôme du Technicien - Informatique",
    technicianDesc: "Mention <strong>Bien</strong> - Formation technique en informatique avec acquisition de compétences pratiques en maintenance et dépannage",
    tags01: "Technicien",
    tags02: "Maintenance",
   
    bepcTitle: "BEPC",
    bepcDesc: "Diplôme national du brevet obtenu avec succès",
    
    // Experience
    internTitle: "Stagiaire Technicien Informatique",
    stage2023Desc: "Stage de 3 mois axé sur la maintenance informatique et l'assistance technique aux utilisateurs",
    stage2022Desc: "Premier stage professionnel en assistance technique et maintenance informatique",
    
    // Experience tasks
    task1: "Assistance technique aux utilisateurs",
    task2: "Mise à jour des logiciels et pilotes",
    task3: "Installation et configuration des systèmes d'exploitation",
    task4: "Sauvegarde et récupération des données",
    task5: "Diagnostic et résolution de problèmes matériels et logiciels",
    task6: "Diagnostic et réparation de problèmes logiciels",
    task7: "Maintenance matérielle (ouverture et depannage des ordinateurs)",

    tags001: "Support technique",
    tags002: "Windows",
    tags003: "Dépannage",
    tags004: "Sauvegarde",
    

    task01: "Diagnostic et réparation de problèmes logiciels",
    task02: "Maintenance matérielle (ouverture et depannage des ordinateurs)",
    task03: "Assistance technique aux utilisateurs",
    task04: "Installation et configuration des systèmes d'exploitation",
    task05: "Mise à jour des logiciels et pilotes",
    task06: "Sauvegarde et récupération des données",

    tags0001: "Maintenance",
    tags0002: "Hardware",
    tags0003: "Support",
    tags0004: "Dépannage",
    
    // Certifications
    anssiTitle: "MOOC Cybersécurité - ANSSI",
    anssiDesc: "Attestation de réussite au cours en ligne de l'ANSSI sur l'hygiène informatique et la cybersécurité",
    ciscoTitle: "Introduction à la Sécurité Informatique",
    ciscoDesc: "Attestation de réussite au cours Cisco sur les fondamentaux de la sécurité informatique",
    pythonTitle: "Python Essentials 1",
    pythonDesc: "Certification sur les bases de la programmation Python et les concepts fondamentaux",
     tag1: "ANSSI",
    tag2: "Officiel",
    tag2: "Sécurité",
    tag01: "Cisco",
    tag02: "Sécurité",
    tag03: "Réseaux",

    // Portfolio
    allProjects: "Tous",
    administer: "Administrer",
    connect: "Connecter",
    program: "Programmer",
    secure: "Sécuriser",
    monitor: "Surveiller",
    
    // Projects
    sae101Title: "SAE 1.01 - Hygiène Informatique",
    sae101Desc: "Formation complète sur les bonnes pratiques en cybersécurité et hygiène informatique. Sensibilisation aux risques cyber et obtention de l'attestation ANSSI.",
    sae103Title: "SAE 1.03 - Dispositif de Transmission",
    sae103Desc: "Découverte et étude approfondie des dispositifs de transmission de données dans les réseaux..",
    portfolioWebTitle: "Portfolio Web Responsive",
    portfolioWebDesc: "Création de ce portfolio personnel avec design moderne, animations interactives et réseau de nodes en arrière-plan. Site responsive hébergé sur GitHub.",
    
 

      
  // Mentions Légales
  legalNoticeTitle: "Mentions Légales",
  siteEditor: "Éditeur du site",
  editorText: "Nom : Ramziatou AFFO TOSSOU<br>Statut : Étudiante<br>Email : at.ramziatou@gmail.com<br>Établissement : IUT de Béthune - Université d'Artois<br>Adresse : 1230 Rue de l'Université, 62400 Béthune, France",
  hosting: "Hébergement",
  hostingText: "Ce site est hébergé par GitHub<br>GitHub, Inc.<br>88 Colin P Kelly Jr St<br>San Francisco, CA 94107<br>États-Unis<br>Site web : <a href='https://pages.github.com' target='_blank' style='color: var(--primary-color);'>https://pages.github.com</a>",
  intellectualProperty: "Propriété intellectuelle",
  intellectualText: "L'ensemble du contenu de ce site est la propriété de Ramziatou AFFO TOSSOU, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation expresse est interdite.",
  personalData: "Données personnelles",
  personalDataText: "Ce site ne collecte aucune donnée personnelle. Aucun cookie n'est utilisé pour le suivi des visiteurs. Les informations de contact affichées (email, réseaux sociaux) sont publiques et fournies uniquement à des fins de contact professionnel.",
  description: "Description",
  descriptionText: "Ce site a été conçu pour présenter mon parcours, mes compétences et les projets que j'ai réalisés dans le domaine de l'informatique et des réseaux. Il me permet de mettre en valeur mon évolution, mes réalisations et mon intérêt pour la cybersécurité.",
  
  // Crédits
  creditsTitle: "Crédits",
  template: "Template",
  templateText: "Template de base : <a href='https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/' target='_blank' style='color: var(--primary-color);'>SnapFolio</a> par <a href='https://bootstrapmade.com/' target='_blank' style='color: var(--primary-color);'>BootstrapMade.com</a><br>Licence : <a href='https://bootstrapmade.com/license/' target='_blank' style='color: var(--primary-color);'>BootstrapMade License</a><br>Adaptation et personnalisation : Ramziatou AFFO TOSSOU",
  frameworks: "Frameworks et bibliothèques",
  frameworksText: "• <a href='https://getbootstrap.com/' target='_blank' style='color: var(--primary-color);'>Bootstrap 5.3.2</a> - Framework CSS<br>• <a href='https://icons.getbootstrap.com/' target='_blank' style='color: var(--primary-color);'>Bootstrap Icons</a> - Icônes<br>• <a href='https://michalsnik.github.io/aos/' target='_blank' style='color: var(--primary-color);'>AOS (Animate On Scroll)</a> - Animations<br>• <a href='https://fonts.google.com/' target='_blank' style='color: var(--primary-color);'>Google Fonts</a> - Typographies (Roboto, Ubuntu, Nunito)",
  devTools: "Outils de développement",
  devToolsText: "• Éditeur de code : Visual Studio Code<br>• Gestion de versions : Git & GitHub<br>• Hébergement : GitHub Pages<br>• Validation W3C : <a href='https://validator.w3.org/' target='_blank' style='color: var(--primary-color);'>W3C Markup Validation Service</a>",
  acknowledgments: "Remerciements",
  acknowledgementsText: "Je tiens à remercier ChatGPT pour son accompagnement et ses conseils tout au long de la réalisation de ce projet. Merci également à Claude IA et aux nombreuses vidéos YouTube qui m'ont permis de comprendre et d'appliquer certaines techniques. Enfin, je remercie BootstrapMade pour le template SnapFolio et la qualité des outils qu'ils mettent à disposition, ainsi que toutes les ressources open source utilisées pour ce projet.",
  designedBy: "Conçu par Ramziatou AFFO TOSSOU",
  templateBy: "Template par",

     // Footer
    allRights: "Tous droits réservés",
    legalNotice: "Mentions Légales",
    credits: "Crédits",

    


},

  
  en: {
    // Hero Section
    greeting: "Hello,",
    iAm: "I am",
    role: "Futur Cybersecurity Expert",
    desc: "Originally from Benin, I developed my interest in IT at Lycée Technique Coulibaly. After two internships in computer maintenance, I am currently in my first year of BUT Networks and Telecommunications, cybersecurity track, at IUT of Béthune.\n\nMy professional goal is to become an expert in information systems security and contribute to the protection of digital infrastructures in a constantly evolving environment.",
    myProjects: "My Projects",
    myCV: "My Resume",
    
    // Menu tooltips
    home: "Home",
    cv: "Resume",
    portfolio: "Portfolio",
    
    // Section Titles
    cvTitle: "Curriculum Vitae",
    portfolioTitle: "Portfolio - R&T Projects",
    
    // CV Sidebar
    contactInfo: "Contact Information",
    languages: "Languages",
    technicalSkills: "Technical Skills",
    
    // Languages
    frenchNative: "French: Native",
    englishInter: "English: Intermediate",
    
    // Technical Skills
    networkAdmin: "Network Administration (Beginner)",
    packetTracer: "Packet Tracer",
    osConfig: "OS Installation & Configuration",
    wordpress: "WordPress Website Development",
    htmlCss: "HTML & CSS",
    programming: "C & Python Programming",
    
    // CV Sections
    education: "Education",
    experience: "Professional Experience",
    certifications: "Certifications",
    
    // Education
    inProgress: "In Progress",
    butTitle: "BUT Networks & Telecommunications",
    butDesc: "<strong>Cybersecurity</strong> track - Comprehensive training in network administration, systems security, development and infrastructure supervision.",
    
    technicianTitle: "IT Technician Diploma",
    technicianDesc: "Grade: <strong>Good</strong> - Technical IT training with practical skills in maintenance and troubleshooting",
    tags1: "Cybersecurity",
    tags2: "Networks",
    tags3: "Systems",
    tags4: "Cisco",
    tags01: "Technician",
    tags02: "Maintenance",
    bepcTitle: "BEPC",
    bepcDesc: "National diploma obtained successfully",
    
    // Experience
    internTitle: "IT Technician Intern",
    stage2023Desc: "3-month internship focused on IT maintenance and user technical support",
    stage2022Desc: "First professional internship in technical support and computer maintenance",
    
    // Experience tasks
    task1: "Technical user support",
    task2: "Software and driver updates",
    task3: "Operating system installation and configuration",
    task4: "Data backup and recovery",
    task5: "Hardware and software troubleshooting",
    task6: "Software problem diagnosis and repair",
    task7: "Hardware maintenance (computer opening and troubleshooting)",
    tags001: "Technical Support",
    tags002: "Windows",
    tags003: "Troubleshooting",
    tags004: "Backup",
    task01: "Diagnosing and repairing software problems",
    task02: "Hardware maintenance (opening and repairing computers)",
    task03: "Technical support for users",
    task04: "Installation and configuration of operating systems",
    task05: "Updating software and drivers",
    task06: "Data backup and recover",
    tags0001: "Maintenance",
    tags0002: "Hardware,",
    tags0003: "Support",
    tags0004: "Troubleshooting",
    

    // Certifications
    anssiTitle: "Cybersecurity MOOC - ANSSI",
    anssiDesc: "Certificate of completion for ANSSI's online course on IT hygiene and cybersecurity",
    ciscoTitle: "Introduction to IT Security",
    ciscoDesc: "Certificate of completion for Cisco course on IT security fundamentals",
    pythonTitle: "Python Essentials 1",
    pythonDesc: "Certification on Python programming basics and fundamental concepts",
   
    tag1: "ANSSI",
    tag2: "Official",
    tag2: "Security",
    tag01: "Cisco,",
    tag02: "Security",
    tag03: "Networks",

    // Portfolio
    allProjects: "All",
    administer: "Administer",
    connect: "Connect",
    program: "Program",
    secure: "Secure",
    monitor: "Monitor",
    
    // Projects
    sae101Title: "SAE 1.01 - IT Hygiene",
    sae101Desc: "Comprehensive training on cybersecurity and IT hygiene best practices. Cyber risk awareness and ANSSI certification obtained.",
    sae103Title: "SAE 1.03 - Transmission Devices",
    sae103Desc: "Discovery and in-depth study of data transmission devices in networks.",
    portfolioWebTitle: "Responsive Web Portfolio",
    portfolioWebDesc: "Creation of this personal portfolio with modern design, interactive animations and network nodes background. Responsive site hosted on GitHub.",
    
    // Footer
    allRights: "All Rights Reserved",
    legalNotice: "Legal Notice",
    credits: "Credits",

     // Legal Notice
  legalNoticeTitle: "Legal Notice",
  siteEditor: "Site Editor",
  editorText: "Name: Ramziatou AFFO TOSSOU<br>Status: Student<br>Email: at.ramziatou@gmail.com<br>Institution: IUT de Béthune - Université d'Artois<br>Address: 1230 Rue de l'Université, 62400 Béthune, France",
  hosting: "Hosting",
  hostingText: "This site is hosted by GitHub<br>GitHub, Inc.<br>88 Colin P Kelly Jr St<br>San Francisco, CA 94107<br>United States<br>Website: <a href='https://pages.github.com' target='_blank' style='color: var(--primary-color);'>https://pages.github.com</a>",
  intellectualProperty: "Intellectual Property",
  intellectualText: "All content on this site is the property of Ramziatou AFFO TOSSOU, unless otherwise stated. Any reproduction, distribution or use without express authorization is prohibited.",
  personalData: "Personal Data",
  personalDataText: "This site does not collect any personal data. No cookies are used to track visitors. The contact information displayed (email, social networks) is public and provided solely for professional contact purposes.",
  description: "Description",
  descriptionText: "This site was designed to present my background, skills and projects I have completed in the field of IT and networks. It allows me to showcase my evolution, achievements and interest in cybersecurity.",
  
// Credits
    creditsTitle: "Credits",
    template: "Template",
    templateText: "Base template: <a href='https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/' target='_blank' style='color: var(--primary-color);'>SnapFolio</a> by <a href='https://bootstrapmade.com/' target='_blank' style='color: var(--primary-color);'>BootstrapMade.com</a><br>License: <a href='https://bootstrapmade.com/license/' target='_blank' style='color: var(--primary-color);'>BootstrapMade License</a><br>Adaptation and customization: Ramziatou AFFO TOSSOU",
    frameworks: "Frameworks and Libraries",
    frameworksText: "• <a href='https://getbootstrap.com/' target='_blank' style='color: var(--primary-color);'>Bootstrap 5.3.2</a> - CSS Framework<br>• <a href='https://icons.getbootstrap.com/' target='_blank' style='color: var(--primary-color);'>Bootstrap Icons</a> - Icons<br>• <a href='https://michalsnik.github.io/aos/' target='_blank' style='color: var(--primary-color);'>AOS (Animate On Scroll)</a> - Animations<br>• <a href='https://fonts.google.com/' target='_blank' style='color: var(--primary-color);'>Google Fonts</a> - Typography (Roboto, Ubuntu, Nunito)",
    devTools: "Development Tools",
    devToolsText: "• Code editor: Visual Studio Code<br>• Version control: Git & GitHub<br>• Hosting: GitHub Pages<br>• W3C Validation: <a href='https://validator.w3.org/' target='_blank' style='color: var(--primary-color);'>W3C Markup Validation Service</a>",
    acknowledgments: "Acknowledgments",
    acknowledgementsText: "I would like to thank ChatGPT for its support and advice throughout this project. Thanks also to Claude AI and the many YouTube videos that helped me understand and apply certain techniques. Finally, I thank BootstrapMade for the SnapFolio template and the quality of the tools they provide, as well as all the open source resources used for this project.",
    designedBy: "Designed by Ramziatou AFFO TOSSOU",
    templateBy: "Template by",
    
    // Footer
    allRights: "All Rights Reserved",
    legalNotice: "Legal Notice",
    credits: "Credits"
  }
};

let currentLang = 'fr';

function switchLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  const t = translations[currentLang];
  
  document.getElementById('currentLang').textContent = currentLang.toUpperCase();
  
  // Hero Section
  
   document.querySelector('.hero h1 .greeting').textContent = t.greeting;
  document.querySelector('.hero h1 .accent-text').textContent = t.iAm;
  document.querySelector('.hero .lead').innerHTML = `${t.role}`;

  document.querySelector('.hero .description').textContent = t.desc;

  document.querySelectorAll('.btn-primary')[0].innerHTML = `<i class="bi bi-folder2-open"></i> &nbsp; ${t.myProjects}`;
  document.querySelectorAll('.btn-outline')[0].innerHTML = `<i class="bi bi-file-earmark-text"></i> &nbsp; ${t.myCV}`;
  
  // Menu tooltips
  document.querySelectorAll('.side-menu a')[0].setAttribute('data-tooltip', t.home);
  document.querySelectorAll('.side-menu a')[1].setAttribute('data-tooltip', t.cv);
  document.querySelectorAll('.side-menu a')[2].setAttribute('data-tooltip', t.portfolio);
  
  // Section Titles
  document.querySelector('#resume .section-title h2').textContent = t.cvTitle;
  document.querySelector('#portfolio .section-title h2').textContent = t.portfolioTitle;
  
  // Sidebar CV
  document.querySelectorAll('.resume-side h3')[0].textContent = t.contactInfo;
  document.querySelectorAll('.resume-side h3')[1].textContent = t.languages;
  document.querySelectorAll('.resume-side h3')[2].textContent = t.technicalSkills;
  
  // Languages
  document.querySelectorAll('.contact-info li')[4].innerHTML = `<i class="bi bi-check-circle"></i> ${t.frenchNative}`;
  document.querySelectorAll('.contact-info li')[5].innerHTML = `<i class="bi bi-check-circle"></i> ${t.englishInter}`;
  
  // Technical Skills
  const skills = document.querySelectorAll('.resume-side .contact-info')[2].querySelectorAll('li');
  skills[0].innerHTML = `<i class="bi bi-shield-check"></i>${t.networkAdmin}`;
  skills[1].innerHTML = `<i class="bi bi-tools"></i>${t.packetTracer}`;
  skills[2].innerHTML = `<i class="bi bi-pc-display"></i>${t.osConfig}`;
  skills[3].innerHTML = `<i class="bi bi-wordpress"></i>${t.wordpress}`;
  skills[4].innerHTML = `<i class="bi bi-code-slash"></i>${t.htmlCss}`;
  skills[5].innerHTML = `<i class="bi bi-code-slash"></i>${t.programming}`;
  
  // Timeline Sections
  document.querySelectorAll('.resume-section h3')[0].innerHTML = `<i class="bi bi-mortarboard me-2"></i>${t.education}`;
  document.querySelectorAll('.resume-section h3')[1].innerHTML = `<i class="bi bi-briefcase me-2"></i>${t.experience}`;
  document.querySelectorAll('.resume-section h3')[2].innerHTML = `<i class="bi bi-award me-2"></i>${t.certifications}`;
  

  // Education
  document.querySelectorAll('.timeline-date')[0].textContent = t.inProgress;
  document.querySelectorAll('.timeline-title')[0].textContent = t.butTitle;
  document.querySelectorAll('.timeline-description')[0].innerHTML = t.butDesc;
  document.querySelectorAll('.timeline-tags span')[0].textContent = t.tags1;
  document.querySelectorAll('.timeline-tags span')[1].textContent = t.tags2;
  document.querySelectorAll('.timeline-tags span')[2].textContent = t.tags3;
  document.querySelectorAll('.timeline-tags span')[3].textContent = t.tags4;
  


  document.querySelectorAll('.timeline-title')[1].textContent = t.technicianTitle;
  document.querySelectorAll('.timeline-description')[1].innerHTML = t.technicianDesc;
  document.querySelectorAll('.timeline-tags span')[4].textContent = t.tags01;
  document.querySelectorAll('.timeline-tags span')[5].textContent = t.tags02;

  
  document.querySelectorAll('.timeline-title')[2].textContent = t.bepcTitle;
  document.querySelectorAll('.timeline-description')[2].textContent = t.bepcDesc;
  
  // Experience
  document.querySelectorAll('.timeline-title')[3].textContent = t.internTitle;
  document.querySelectorAll('.timeline-description')[3].textContent = t.stage2023Desc;
  document.querySelectorAll('.timeline-list li')[0].textContent = t.task1;
  document.querySelectorAll('.timeline-list li')[1].textContent = t.task2;
  document.querySelectorAll('.timeline-list li')[2].textContent = t.task3;
  document.querySelectorAll('.timeline-list li')[3].textContent = t.task4;
  document.querySelectorAll('.timeline-list li')[4].textContent = t.task5;
  document.querySelectorAll('.timeline-tags span')[6].textContent = t.tags001;
  document.querySelectorAll('.timeline-tags span')[7].textContent = t.tags002;
  document.querySelectorAll('.timeline-tags span')[8].textContent = t.tags003;
  document.querySelectorAll('.timeline-tags span')[9].textContent = t.tags004;
  
  
  document.querySelectorAll('.timeline-title')[4].textContent = t.internTitle;
  document.querySelectorAll('.timeline-description')[4].textContent = t.stage2022Desc;
  document.querySelectorAll('.timeline-list li')[5].textContent = t.task01;
  document.querySelectorAll('.timeline-list li')[6].textContent = t.task02;
  document.querySelectorAll('.timeline-list li')[7].textContent = t.task03;
  document.querySelectorAll('.timeline-list li')[8].textContent = t.task04;
  document.querySelectorAll('.timeline-list li')[9].textContent = t.task05;
  document.querySelectorAll('.timeline-list li')[10].textContent = t.task06;
  document.querySelectorAll('.timeline-tags span')[10].textContent = t.tags0001;
  document.querySelectorAll('.timeline-tags span')[11].textContent = t.tags0002;
  document.querySelectorAll('.timeline-tags span')[12].textContent = t.tags0003;
  document.querySelectorAll('.timeline-tags span')[13].textContent = t.tags0004;
  
  // Certifications
  document.querySelectorAll('.timeline-title')[5].textContent = t.anssiTitle;
  document.querySelectorAll('.timeline-description')[5].textContent = t.anssiDesc;
  
  document.querySelectorAll('.timeline-title')[6].textContent = t.ciscoTitle;
  document.querySelectorAll('.timeline-description')[6].textContent = t.ciscoDesc;
  document.querySelectorAll('.timeline-tags span')[14].textContent = t.tag1;
  document.querySelectorAll('.timeline-tags span')[15].textContent = t.tag2;
  document.querySelectorAll('.timeline-tags span')[16].textContent = t.tag3;
  document.querySelectorAll('.timeline-tags span')[17].textContent = t.tag01;
  document.querySelectorAll('.timeline-tags span')[18].textContent = t.tag02;
  document.querySelectorAll('.timeline-tags span')[19].textContent = t.tag03;

  document.querySelectorAll('.timeline-title')[7].textContent = t.pythonTitle;
  document.querySelectorAll('.timeline-description')[7].textContent = t.pythonDesc;
  
  // Portfolio Filters
  document.querySelectorAll('.portfolio-filters li')[0].innerHTML = `<i class="bi bi-grid-3x3-gap"></i> ${t.allProjects}`;
  document.querySelectorAll('.portfolio-filters li')[1].innerHTML = `<i class="bi bi-gear"></i> ${t.administer}`;
  document.querySelectorAll('.portfolio-filters li')[2].innerHTML = `<i class="bi bi-hdd-network"></i> ${t.connect}`;
  document.querySelectorAll('.portfolio-filters li')[3].innerHTML = `<i class="bi bi-code-slash"></i> ${t.program}`;
  document.querySelectorAll('.portfolio-filters li')[4].innerHTML = `<i class="bi bi-shield-check"></i> ${t.secure}`;
  document.querySelectorAll('.portfolio-filters li')[5].innerHTML = `<i class="bi bi-eye"></i> ${t.monitor}`;
  
  // Projects
  const projTitleEl = (id) => document.querySelector(`[data-project="${id}"] .portfolio-card-title`);
  const projDescEl = (id) => document.querySelector(`[data-project="${id}"] .portfolio-card-description`);

  if (projTitleEl('sae101')) projTitleEl('sae101').textContent = t.sae101Title;
  if (projDescEl('sae101')) projDescEl('sae101').textContent = t.sae101Desc;

  if (projTitleEl('sae103')) projTitleEl('sae103').textContent = t.sae103Title;
  if (projDescEl('sae103')) projDescEl('sae103').textContent = t.sae103Desc;

  if (projTitleEl('portfolio')) projTitleEl('portfolio').textContent = t.portfolioWebTitle;
  if (projDescEl('portfolio')) projDescEl('portfolio').textContent = t.portfolioWebDesc;
  

  
  // Competence Badges
  const badges = document.querySelectorAll('.portfolio-competence-badge');
  badges.forEach(badge => {
    if (badge.classList.contains('badge-securiser')) {
      badge.innerHTML = `<i class="bi bi-shield-check"></i> ${t.secure}`;
    } else if (badge.classList.contains('badge-connecter')) {
      badge.innerHTML = `<i class="bi bi-hdd-network"></i> ${t.connect}`;
    } else if (badge.classList.contains('badge-programmer')) {
      badge.innerHTML = `<i class="bi bi-code-slash"></i> ${t.program}`;
    }
  });

  // Mentions Légales
  const mentionsLegales = document.getElementById('mentions-legales');
  if (mentionsLegales) {
    const mentionsH3 = mentionsLegales.querySelectorAll('h3')[0];
    const mentionsH4 = mentionsLegales.querySelectorAll('h4');
    const mentionsP = mentionsLegales.querySelectorAll('p');
    
    if (mentionsH3) mentionsH3.textContent = t.legalNoticeTitle;
    if (mentionsH4[0]) mentionsH4[0].textContent = t.siteEditor;
    if (mentionsP[0]) mentionsP[0].innerHTML = t.editorText;
    if (mentionsH4[1]) mentionsH4[1].textContent = t.hosting;
    if (mentionsP[1]) mentionsP[1].innerHTML = t.hostingText;
    if (mentionsH4[2]) mentionsH4[2].textContent = t.intellectualProperty;
    if (mentionsP[2]) mentionsP[2].textContent = t.intellectualText;
    if (mentionsH4[3]) mentionsH4[3].textContent = t.personalData;
    if (mentionsP[3]) mentionsP[3].textContent = t.personalDataText;
    if (mentionsH4[4]) mentionsH4[4].textContent = t.description;
    if (mentionsP[4]) mentionsP[4].textContent = t.descriptionText;
  }
  
  // Crédits
  const credits = document.getElementById('credits');
  if (credits) {
    const creditsH3 = credits.querySelectorAll('h3')[0];
    const creditsH4 = credits.querySelectorAll('h4');
    const creditsP = credits.querySelectorAll('p');
    
    if (creditsH3) creditsH3.textContent = t.creditsTitle;
    if (creditsH4[0]) creditsH4[0].textContent = t.template;
    if (creditsP[0]) creditsP[0].innerHTML = t.templateText;
    if (creditsH4[1]) creditsH4[1].textContent = t.frameworks;
    if (creditsP[1]) creditsP[1].innerHTML = t.frameworksText;
    if (creditsH4[2]) creditsH4[2].textContent = t.devTools;
    if (creditsP[2]) creditsP[2].innerHTML = t.devToolsText;
    if (creditsH4[3]) creditsH4[3].textContent = t.acknowledgments;
    if (creditsP[3]) creditsP[3].textContent = t.acknowledgementsText;
  }
  
//Footer
const footerAllRights = document.querySelector('footer p');
if (footerAllRights) {
  footerAllRights.innerHTML = `&copy; <strong><span>Ramziatou AFFO TOSSOU</span></strong>. ${t.allRights}`;
}

const footerLinks = document.querySelectorAll('footer .credits a');
if (footerLinks[0]) footerLinks[0].textContent = t.legalNotice;
if (footerLinks[1]) footerLinks[1].textContent = t.credits;

}
  

// Event listener
document.getElementById('langBtn').addEventListener('click', switchLanguage);




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
