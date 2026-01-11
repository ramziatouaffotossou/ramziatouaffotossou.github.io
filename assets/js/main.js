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
    esgisTi: "Plateforme ESGIS",
    esgisDesc: "Développement d'une plateforme web dans le cadre d'un projet scolaire. Création d'interfaces et mise en place d'une base de donnée.",
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
    esgisTitle: "ESGIS Platform",
    esgisDesc: "Development of a web platform as part of a school project. Interface creation and database implementation.",
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
  document.querySelectorAll('.portfolio-card-title')[0].textContent = t.sae101Title;
  document.querySelectorAll('.portfolio-card-description')[0].textContent = t.sae101Desc;
  
  document.querySelectorAll('.portfolio-card-title')[1].textContent = t.sae103Title;
  document.querySelectorAll('.portfolio-card-description')[1].textContent = t.sae103Desc;
  
  document.querySelectorAll('.portfolio-card-title')[2].textContent = t.esgisTitle;
  document.querySelectorAll('.portfolio-card-description')[2].textContent = t.esgisDesc;
  
  document.querySelectorAll('.portfolio-card-title')[3].textContent = t.portfolioWebTitle;
  document.querySelectorAll('.portfolio-card-description')[3].textContent = t.portfolioWebDesc;
  

  
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