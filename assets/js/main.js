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
   const spData = {
    administrer: {
      label: "Administrer",
      icon: '<i class="bi bi-gear-fill" style="color:#e05065"></i>',
      codeClass: "sp-administrer",
      color: "#c41e3a",
      ac: [
        {
          code: "AC11.01",
          label: "Maîtriser les lois fondamentales de l'électricité afin d'intervenir sur des équipements de réseaux et télécommunications",
          reflexive: {
            fait: "J'ai étudié les lois d'Ohm et de Kirchhoff en TP, mesuré des tensions et courants sur des montages simples avec un multimètre.",
            pourquoi: "Pour pouvoir diagnostiquer des pannes matérielles sur des équipements réseau et comprendre les besoins en alimentation.",
            comment: "Via les TP du cours R101, utilisation d'un multimètre et d'une platine de test, appui sur les cours théoriques d'électricité.",
            difficultes: "La conversion entre unités (mA, A, V, kΩ) et l'application des formules dans des circuits mixtes séries/parallèles m'ont posé des difficultés.",
            appris: "J'ai compris comment calculer la consommation d'un switch ou d'un routeur PoE, et l'importance des protections électriques dans les baies réseau.",
            autrement: "Je ferais plus de schémas annotés pour visualiser les circuits avant de mesurer.",
            projet: { titre: "TP Électricité - R101", lien: null, desc: "Montage et mesure de circuits résistifs en série et parallèle, relevé de courbes tension/courant." }
          }
        },
        {
          code: "AC11.02",
          label: "Comprendre l'architecture et les fondements des systèmes numériques, les principes du codage de l'information, des communications et de l'Internet",
          reflexive: {
            fait: "J'ai étudié les modèles OSI et TCP/IP, analysé des trames avec Wireshark et compris les mécanismes d'encapsulation des données.",
            pourquoi: "Comprendre comment l'information circule dans un réseau est indispensable pour administrer et sécuriser une infrastructure.",
            comment: "Cours R102, TP Wireshark pour capturer et décoder des paquets HTTP, DNS, ICMP. Documentation RFC et supports de cours.",
            difficultes: "La lecture des trames en hexadécimal et l'identification des en-têtes de chaque couche ont demandé beaucoup de pratique.",
            appris: "J'ai acquis une vision claire du chemin qu'emprunte un paquet, ce qui m'aide maintenant à diagnostiquer les problèmes réseau couche par couche.",
            autrement: "Je commencerais directement par capturer du trafic réel plutôt que des exemples théoriques, pour rendre l'apprentissage plus concret.",
            projet: { titre: "TP Wireshark - R102", lien: null, desc: "Capture et analyse de trames réseau : identification des protocoles, lecture des en-têtes IPv4, TCP, DNS." }
          }
        },
        {
          code: "AC11.03",
          label: "Configurer les fonctions de base du réseau local",
          reflexive: {
            fait: "J'ai configuré des switchs et routeurs Cisco en CLI : adresses IP, VLAN, routage statique, protocole DHCP.",
            pourquoi: "C'est la compétence cœur du technicien réseau : sans savoir configurer un réseau local, impossible d'assurer sa disponibilité.",
            comment: "Packet Tracer pour les simulations, puis équipements réels en TP. Appui sur la documentation Cisco et les supports du cours R103.",
            difficultes: "Le routage inter-VLAN et la compréhension des interfaces virtuelles (SVI) ont été complexes. J'ai dû recommencer plusieurs fois.",
            appris: "Je maîtrise maintenant les commandes de base de l'IOS Cisco et la logique de segmentation réseau par VLAN.",
            autrement: "Je documenterais chaque configuration dans un journal de bord avec captures d'écran pour pouvoir rejouer les manipulations.",
            projet: { titre: "SAE 1.03 — Dispositif de Transmission", lien: "https://github.com/ramziatouaffotossou/sae103_dispositif_de_transmission.github.io.git", desc: "Configuration de topologies réseau avec VLAN et routage inter-VLAN dans Packet Tracer." }
          }
        },
        {
          code: "AC11.04",
          label: "Maîtriser les rôles et les principes fondamentaux des systèmes d'exploitation afin d'interagir avec ceux-ci pour la configuration et l'administration des réseaux et services fournis",
          reflexive: {
            fait: "J'ai utilisé Linux (Ubuntu) en ligne de commande : gestion des fichiers, droits utilisateurs, configuration réseau via ifconfig/ip, services systemd.",
            pourquoi: "La majorité des serveurs réseau fonctionnent sous Linux. Maîtriser le terminal est incontournable pour administrer des services.",
            comment: "TP systèmes du S1, tutoriels en ligne, pratique personnelle sur machine virtuelle VirtualBox.",
            difficultes: "La gestion des droits (chmod, chown) et la compréhension des processus en arrière-plan (daemon) ont été les points les plus difficiles.",
            appris: "Je me sens à l'aise dans un terminal Linux pour des tâches d'administration basiques et je comprends le rôle des principaux services réseau.",
            autrement: "J'installerais un serveur Linux chez moi dès le début pour pratiquer quotidiennement et pas uniquement en TP.",
            projet: { titre: "TP Systèmes Linux - S1", lien: null, desc: "Installation et configuration d'Ubuntu Server, gestion des utilisateurs et des services réseau de base." }
          }
        },
        {
          code: "AC11.05",
          label: "Identifier les dysfonctionnements du réseau local et savoir les signaler",
          reflexive: {
            fait: "J'ai pratiqué le diagnostic réseau avec ping, traceroute, nslookup et Wireshark pour localiser des pannes simulées en TP.",
            pourquoi: "Savoir identifier et signaler un problème réseau est essentiel pour maintenir la disponibilité des services et collaborer avec une équipe.",
            comment: "Scénarios de panne en TP, méthodologie de diagnostic couche par couche (OSI), rédaction de rapports d'incident.",
            difficultes: "Distinguer une panne de couche 2 (switch) d'une panne de couche 3 (routage) a été difficile sans méthode rigoureuse au départ.",
            appris: "J'ai intégré une méthode de diagnostic systématique : vérifier physique → liaison → réseau → transport, ce qui accélère la résolution.",
            autrement: "Je mettrais en place un système de tickets fictifs pour s'entraîner à la rédaction formelle d'incidents dès le début.",
            projet: { titre: "TP Diagnostic réseau - R103", lien: null, desc: "Identification et résolution de pannes réseau simulées : câbles défectueux, mauvaise configuration IP, boucle de commutation." }
          }
        },
        {
          code: "AC11.06",
          label: "Installer un poste client, expliquer la procédure mise en place",
          reflexive: {
            fait: "J'ai installé et configuré des postes Windows et Linux : partitionnement, installation OS, configuration réseau, installation de logiciels métier.",
            pourquoi: "L'installation de postes clients fait partie du quotidien d'un technicien. Savoir expliquer la procédure est essentiel pour la documentation et la transmission.",
            comment: "Stages de maintenance informatique (Surface Informatique et DNL Informatique, Cotonou) + TP de l'IUT.",
            difficultes: "Documenter clairement chaque étape pour qu'un autre technicien puisse reproduire la procédure sans aide a été plus difficile que l'installation elle-même.",
            appris: "J'ai compris l'importance de la documentation technique : une procédure bien rédigée fait gagner beaucoup de temps lors d'interventions futures.",
            autrement: "Je prendrais des captures d'écran systématiquement à chaque étape dès le début de l'installation.",
            projet: { titre: "Stage — Surface Informatique (Cotonou, 2023)", lien: null, desc: "Installation et configuration de postes clients Windows lors du stage de 3 mois : partitionnement, installation OS, configuration réseau, mise à jour des pilotes." }
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
          label: "Maîtriser les technologies filaires des réseaux locaux",
          reflexive: {
            fait: "J'ai réalisé des câblages RJ45 (T568A/T568B), mesuré des câbles avec un testeur, et étudié les caractéristiques des catégories Cat5e, Cat6.",
            pourquoi: "Le câblage structuré est la base physique de tout réseau. Un câble mal réalisé peut provoquer des pannes intermittentes difficiles à diagnostiquer.",
            comment: "TP de câblage en S1, utilisation d'une pince à sertir, d'un testeur de câble et d'un guide de câblage structuré.",
            difficultes: "Respecter l'ordre des fils dans le connecteur RJ45 sans se tromper a demandé plusieurs essais avant d'être fluide.",
            appris: "Je sais réaliser un câble droit et croisé, et comprends pourquoi le choix de la catégorie impacte la bande passante et la distance maximale.",
            autrement: "Je m'entraînerais sur plus de câbles avant le TP noté pour gagner en vitesse et en précision.",
            projet: { titre: "SAE 1.03 — Dispositif de Transmission", lien: "https://github.com/ramziatouaffotossou/sae103_dispositif_de_transmission.github.io.git", desc: "Étude comparative des supports de transmission filaires et réalisation de câblages structurés." }
          }
        },
        {
          code: "AC12.02",
          label: "Maîtriser les technologies des réseaux locaux sans fil",
          reflexive: {
            fait: "J'ai étudié les standards WiFi (802.11 a/b/g/n/ac), configuré un point d'accès en mode infrastructure et analysé les canaux WiFi avec un scanner.",
            pourquoi: "Le sans-fil est omniprésent dans les entreprises. Comprendre ses mécanismes permet de déployer et sécuriser des réseaux WiFi.",
            comment: "Cours R112, TP de configuration d'un AP Cisco, utilisation de l'outil inSSIDer pour l'analyse de spectre WiFi.",
            difficultes: "La gestion des interférences et le choix des canaux non-chevauchants (1, 6, 11 en 2.4GHz) n'était pas intuitif au départ.",
            appris: "Je comprends les compromis entre portée, débit et sécurité selon le standard WiFi choisi et l'environnement de déploiement.",
            autrement: "Je ferais une cartographie de couverture radio (heatmap) dans le bâtiment de l'IUT pour rendre l'apprentissage plus concret.",
            projet: { titre: "TP Réseaux sans fil - R112", lien: null, desc: "Configuration d'un access point, analyse du spectre WiFi 2.4/5GHz, optimisation du plan de canaux." }
          }
        },
        {
          code: "AC12.03",
          label: "Mettre en place un réseau local",
          reflexive: {
            fait: "J'ai conçu et déployé des topologies réseau complètes en TP : plan d'adressage, câblage, configuration des équipements, tests de connectivité.",
            pourquoi: "Mettre en place un réseau de bout en bout intègre toutes les compétences de connexion : c'est l'application concrète des apprentissages théoriques.",
            comment: "Projets en binôme en TP, utilisation de Packet Tracer pour la conception puis équipements réels pour le déploiement.",
            difficultes: "La gestion du plan d'adressage pour éviter les conflits IP et assurer une organisation logique a nécessité plusieurs itérations.",
            appris: "J'ai appris à planifier avant d'agir : un bon plan d'adressage documenté évite la majorité des problèmes de configuration.",
            autrement: "Je rédigerais un document de conception (plan réseau, tableau d'adressage) avant de toucher au moindre équipement.",
            projet: { titre: "SAE 1.03 — Dispositif de Transmission", lien: "https://github.com/ramziatouaffotossou/sae103_dispositif_de_transmission.github.io.git", desc: "Déploiement complet d'un réseau local : câblage, plan d'adressage, configuration des équipements actifs et tests." }
          }
        },
        {
          code: "AC12.04",
          label: "Maîtriser les technologies de transmission sur longue distance",
          reflexive: {
            fait: "J'ai étudié les technologies WAN : ADSL, fibre optique, MPLS, et compris les mécanismes d'accès opérateur (PPPoE, NAT).",
            pourquoi: "Connecter un réseau local à Internet ou à un site distant passe par des technologies WAN qu'un technicien réseau doit connaître.",
            comment: "Cours théoriques R113, documentation des opérateurs télécoms, cas pratiques d'analyse de liaisons WAN.",
            difficultes: "Comprendre les mécanismes d'encapsulation PPPoE et la différence entre adresse IP publique et privée dans un contexte NAT m'a pris du temps.",
            appris: "J'ai compris le rôle des FAI, les débits réels vs théoriques et pourquoi la fibre est supérieure à l'ADSL pour les entreprises.",
            autrement: "Je ferais une visite d'un nœud de raccordement optique (NRO) pour visualiser concrètement l'infrastructure opérateur.",
            projet: { titre: "TP WAN - R113", lien: null, desc: "Étude comparative des technologies d'accès WAN et configuration d'une liaison NAT/PAT sur routeur Cisco." }
          }
        },
        {
          code: "AC12.05",
          label: "Communiquer avec un client ou un utilisateur",
          reflexive: {
            fait: "Lors de mes stages, j'ai assisté des utilisateurs en expliquant les interventions effectuées, rédigé des comptes-rendus d'intervention.",
            pourquoi: "Le technicien réseau n'est pas uniquement un expert technique : savoir communiquer clairement avec des non-techniciens est indispensable.",
            comment: "Pratique lors des stages (Surface Informatique et DNL Informatique), reformulation des problèmes techniques en langage accessible.",
            difficultes: "Adapter mon niveau de langage selon l'interlocuteur (technicien ou utilisateur novice) sans être condescendant a demandé de la pratique.",
            appris: "La communication est aussi importante que la technique : un utilisateur rassuré et informé fait confiance au technicien et facilite son travail.",
            autrement: "Je pratiquerais des jeux de rôle client/technicien en cours pour m'entraîner à expliquer des concepts techniques simplement.",
            projet: { titre: "Stage — DNL Informatique (Cotonou, 2022)", lien: null, desc: "Assistance technique aux utilisateurs lors du stage : explication des interventions, rédaction de comptes-rendus." }
          }
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
            fait: "J'utilise quotidiennement VS Code, Git/GitHub, le terminal Linux et les outils de développement du navigateur (DevTools).",
            pourquoi: "Maîtriser son environnement de travail est la première étape pour être productif en développement.",
            comment: "Pratique quotidienne lors du développement du portfolio, tutoriels Git, documentation officielle des outils.",
            difficultes: "La gestion des conflits Git lors de merges et la compréhension du modèle de branches ont été les points les plus complexes.",
            appris: "Je maîtrise maintenant les commandes Git essentielles et suis à l'aise dans un environnement de développement professionnel.",
            autrement: "J'apprendrais Git dès le premier jour d'un projet plutôt que de l'introduire en cours de développement.",
            projet: { titre: "Portfolio Web Responsive", lien: "https://github.com/ramziatouaffotossou/ramziatouaffotossou.github.io.git", desc: "Développement du portfolio avec VS Code, gestion du code source avec Git et déploiement via GitHub Pages." }
          }
        },
        {
          code: "AC13.02",
          label: "Lire, comprendre, exécuter, corriger et modifier un programme",
          reflexive: {
            fait: "J'ai lu et modifié du code JavaScript existant (template SnapFolio) pour l'adapter à mes besoins, en corrigeant des bugs d'affichage.",
            pourquoi: "En entreprise, on travaille rarement sur du code écrit from scratch : savoir lire et modifier du code existant est une compétence clé.",
            comment: "Lecture du code source du template, utilisation des DevTools pour déboguer, recherches sur MDN et Stack Overflow.",
            difficultes: "Comprendre le code JavaScript d'animation canvas sans en être l'auteur a été complexe, notamment les closures et le requestAnimationFrame.",
            appris: "J'ai développé ma capacité à lire du code inconnu méthodiquement : identifier les fonctions, tracer l'exécution, isoler les bugs.",
            autrement: "Je commenterais chaque section du code au fur et à mesure de ma lecture pour garder une trace de ma compréhension.",
            projet: { titre: "Portfolio Web — Animation canvas", lien: "https://github.com/ramziatouaffotossou/ramziatouaffotossou.github.io.git", desc: "Compréhension et adaptation du code d'animation réseau (canvas HTML5) du template SnapFolio." }
          }
        },
        {
          code: "AC13.03",
          label: "Traduire un algorithme dans un langage et pour un environnement donné",
          reflexive: {
            fait: "J'ai implémenté des algorithmes de tri et de recherche en Python (certification Python Essentials 1) et en C lors des cours de programmation.",
            pourquoi: "L'algorithme est la logique ; le langage est l'outil. Savoir passer de l'un à l'autre est fondamental en programmation.",
            comment: "Cours de programmation S1, exercices Cisco Python Essentials, pratique sur Python.org et IDE Thonny.",
            difficultes: "La gestion de la mémoire en C (pointeurs, allocation dynamique) a été très difficile à appréhender comparé à Python.",
            appris: "J'ai compris que l'algorithme prime sur le langage : une fois la logique claire, l'implémentation dans n'importe quel langage devient plus accessible.",
            autrement: "Je dessinerais l'organigramme de l'algorithme sur papier avant de coder, pour séparer la réflexion logique de l'implémentation.",
            projet: { titre: "Python Essentials 1 — Cisco/Python Institute (2024)", lien: null, desc: "Certification sur les bases de la programmation Python : variables, boucles, fonctions, structures de données." }
          }
        },
        {
          code: "AC13.04",
          label: "Connaître l'architecture et les technologies d'un site Web",
          reflexive: {
            fait: "J'ai conçu et développé ce portfolio (HTML5/CSS3/JS/Bootstrap) et une plateforme web avec PHP et base de données MySQL (Plateforme ESGIS).",
            pourquoi: "Les interfaces web sont omniprésentes dans les outils réseau (interfaces d'administration, dashboards). Comprendre leur architecture est utile.",
            comment: "SAE 14, cours de développement web, documentation MDN, Bootstrap docs, tutoriels YouTube.",
            difficultes: "La communication entre PHP et MySQL (requêtes préparées, gestion des erreurs SQL) et la sécurité des formulaires (injections SQL) ont été difficiles.",
            appris: "Je comprends maintenant le modèle client-serveur, le rôle du backend et du frontend, et les enjeux de sécurité basiques d'une application web.",
            autrement: "Je concevrais la structure de la base de données (MCD/MLD) avant de coder le backend pour éviter des restructurations en cours de projet.",
            projet: { titre: "Plateforme ESGIS — Gestion de bulletins", lien: "https://github.com/ramziatouaffotossou/plateform_gestion_bulletin.github.io.git", desc: "Application web complète : frontend HTML/CSS, backend PHP, base de données MySQL pour la gestion des notes scolaires." }
          }
        },
        {
          code: "AC13.05",
          label: "Utiliser les frameworks et bibliothèques",
          reflexive: {
            fait: "J'ai utilisé Bootstrap 5 pour la mise en page responsive, AOS pour les animations, et Font Awesome/Bootstrap Icons pour les icônes.",
            pourquoi: "Les frameworks accélèrent le développement et garantissent un résultat professionnel et maintenu. C'est la pratique standard en entreprise.",
            comment: "Documentation officielle de Bootstrap, exemples de la communauté, intégration dans le projet portfolio (SAE 14).",
            difficultes: "Surcharger les styles par défaut de Bootstrap sans casser le responsive a demandé de comprendre la spécificité CSS et le système de grille.",
            appris: "J'ai appris à utiliser la documentation officielle efficacement et à distinguer ce que je dois coder moi-même de ce que le framework fournit.",
            autrement: "Je lirais la documentation en entier avant de commencer à utiliser un framework pour avoir une vue d'ensemble de ses capacités.",
            projet: { titre: "Portfolio Web Responsive (SAE 14)", lien: "https://github.com/ramziatouaffotossou/ramziatouaffotossou.github.io.git", desc: "Intégration et personnalisation de Bootstrap 5, AOS, Bootstrap Icons dans le portfolio personnel." }
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
          reflexive: {
            fait: "J'ai suivi le MOOC SecNumacadémie de l'ANSSI (SAE 1.01) couvrant la sécurité des mots de passe, le chiffrement, la gestion des risques et les incidents.",
            pourquoi: "La cybersécurité est mon parcours de spécialisation : maîtriser ses fondamentaux est la base de toute intervention sécurisée.",
            comment: "Plateforme SecNumacadémie en autonomie, quiz de validation, lecture des fiches pratiques ANSSI.",
            difficultes: "Les mécanismes de cryptographie asymétrique (PKI, certificats X.509) ont nécessité plusieurs relectures et recherches complémentaires.",
            appris: "J'ai pris conscience que la sécurité est autant organisationnelle et humaine que technique. Le facteur humain reste le maillon le plus faible.",
            autrement: "J'aurais cherché des vidéos explicatives sur la cryptographie en parallèle du MOOC pour consolider la compréhension théorique.",
            projet: { titre: "SAE 1.01 — Hygiène Informatique (ANSSI)", lien: "https://github.com/ramziatouaffotossou/sae101_hygiene_informatique.github.io.git", desc: "Obtention de l'attestation ANSSI SecNumacadémie : modules sécurité des systèmes, données personnelles, incidents et cryptographie." }
          }
        },
        {
          code: "AC14.02",
          label: "Appliquer les politiques de sécurité des équipements réseau",
          reflexive: {
            fait: "J'ai configuré des ACL (Access Control Lists) sur des routeurs Cisco pour filtrer le trafic, et activé des mécanismes de sécurité sur les switchs (port security).",
            pourquoi: "Sans politiques de sécurité sur les équipements, tout réseau est vulnérable. C'est la traduction concrète des principes de sécurité en configurations.",
            comment: "TP de sécurisation réseau, Packet Tracer pour les ACL, documentation Cisco sur la sécurité des switches.",
            difficultes: "La logique des ACL (standard vs étendue, numérotation, ordre des règles) et l'effet du deny implicite final ont été difficiles à intégrer.",
            appris: "J'ai compris que la sécurité réseau demande une approche systématique : identifier les flux légitimes, bloquer tout le reste (principe du moindre privilège).",
            autrement: "Je modéliserais d'abord la matrice des flux autorisés sur papier avant de configurer les ACL.",
            projet: { titre: "TP Sécurité réseau - Cisco ACL", lien: null, desc: "Configuration d'ACL étendues et standard sur routeur Cisco pour filtrer le trafic selon la politique de sécurité définie." }
          }
        },
        {
          code: "AC14.03",
          label: "Déceler des compromissions dans un système informatique",
          reflexive: {
            fait: "J'ai analysé des logs système Linux et des captures Wireshark pour identifier des comportements anormaux (scans de ports, connexions suspectes).",
            pourquoi: "Détecter une compromission rapidement limite l'impact d'une attaque. C'est une compétence clé en cybersécurité défensive.",
            comment: "TP d'analyse de logs, outils : grep, awk, Wireshark, introduction à l'analyse forensique.",
            difficultes: "Distinguer un trafic anormal d'un trafic légitime inhabituel dans des logs volumineux a été chronophage sans outils d'automatisation.",
            appris: "J'ai compris l'importance des outils SIEM et de la centralisation des logs pour détecter des compromissions à grande échelle.",
            autrement: "Je mettrais en place un lab personnel avec des outils open source (ELK Stack, Snort) pour pratiquer l'analyse en dehors des cours.",
            projet: { titre: "TP Analyse de logs & Wireshark", lien: null, desc: "Analyse de captures réseau et logs système pour identifier des indicateurs de compromission (scan Nmap, brute force SSH)." }
          }
        },
        {
          code: "AC14.04",
          label: "Respecter les réglementations en vigueur et les bonnes pratiques",
          reflexive: {
            fait: "J'ai étudié le RGPD, les obligations ANSSI pour les opérateurs d'importance vitale (OIV), et appliqué les recommandations de sécurité dans mes projets.",
            pourquoi: "Un technicien réseau opère dans un cadre légal et réglementaire. Ignorer les règles expose l'entreprise et l'individu à des sanctions.",
            comment: "Cours de droit du numérique, guide RGPD de la CNIL, recommandations ANSSI publiées en ligne.",
            difficultes: "Comprendre les obligations spécifiques selon le secteur d'activité (santé, finance, défense) et la notion de responsabilité du sous-traitant.",
            appris: "J'ai compris que la conformité n'est pas un frein mais une garantie : elle protège autant les utilisateurs que l'organisation.",
            autrement: "Je créerais une grille de conformité pour chaque projet afin de vérifier systématiquement le respect des règles applicables.",
            projet: { titre: "SAE 1.01 — Hygiène Informatique (ANSSI)", lien: "https://github.com/ramziatouaffotossou/sae101_hygiene_informatique.github.io.git", desc: "Application des recommandations ANSSI sur la gestion des mots de passe, mises à jour et données personnelles dans le cadre du MOOC SecNumacadémie." }
          }
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
          reflexive: {
            fait: "J'ai utilisé des outils de mesure (iperf, ping, traceroute) pour évaluer la bande passante, la latence et la gigue d'une liaison réseau.",
            pourquoi: "Surveiller les performances permet de détecter une dégradation avant qu'elle impacte les utilisateurs et d'anticiper les besoins en capacité.",
            comment: "TP de supervision réseau, outils iperf3 et Wireshark, interprétation des métriques réseau clés.",
            difficultes: "Interpréter les résultats iperf (bande passante TCP vs UDP, jitter) et comprendre pourquoi les performances mesurées diffèrent du débit théorique.",
            appris: "J'ai compris que les performances réseau dépendent de nombreux facteurs (charge, protocole, distance) et qu'une mesure isolée ne suffit pas.",
            autrement: "Je mettrais en place des mesures régulières (benchmarks) pour avoir une baseline et détecter les dérives dans le temps.",
            projet: { titre: "TP Supervision réseau - S1", lien: null, desc: "Mesure des performances d'une liaison réseau avec iperf3 : bande passante, latence, gigue en charge normale et dégradée." }
          }
        },
        {
          code: "AC15.02",
          label: "Caractériser et analyser le trafic réseau",
          reflexive: {
            fait: "J'ai capturé et analysé du trafic réseau avec Wireshark : identification des protocoles, reconstruction de flux TCP, détection d'anomalies.",
            pourquoi: "Analyser le trafic permet de comprendre ce qui circule sur le réseau, d'identifier des goulets d'étranglement et des comportements suspects.",
            comment: "TP Wireshark, filtres de capture et d'affichage, analyse de sessions HTTP/DNS/ICMP.",
            difficultes: "La quantité de trames lors d'une capture longue est difficile à analyser manuellement. Apprendre à filtrer efficacement a pris du temps.",
            appris: "Je suis capable de filtrer le trafic Wireshark pour isoler rapidement les flux pertinents et identifier des anomalies protocolaires.",
            autrement: "J'apprendrais les filtres Wireshark avancés (BPF) dès le début plutôt que de parcourir manuellement des milliers de trames.",
            projet: { titre: "TP Wireshark — Analyse de trafic", lien: null, desc: "Capture et analyse de trafic réseau : identification de protocoles, reconstruction de sessions, détection d'anomalies de comportement." }
          }
        },
        {
          code: "AC15.03",
          label: "Maîtriser les outils de supervision réseau",
          reflexive: {
            fait: "J'ai découvert des outils de supervision comme Nagios et PRTG : installation, configuration des hôtes surveillés, création d'alertes.",
            pourquoi: "La supervision proactive permet de détecter des pannes avant les utilisateurs et de garantir les SLA. C'est un outil du quotidien des équipes réseau.",
            comment: "Introduction théorique en cours, TP de configuration Nagios sur VM Linux, documentation officielle.",
            difficultes: "La configuration des plugins Nagios et la compréhension du modèle hôtes/services/contacts a été complexe au premier abord.",
            appris: "J'ai compris l'architecture d'un outil de supervision et l'importance des seuils d'alerte (warning/critical) bien calibrés.",
            autrement: "Je déploierais un outil de supervision moderne (Zabbix, Grafana+Prometheus) pour comparer les approches et comprendre l'évolution du domaine.",
            projet: { titre: "TP Supervision Nagios - S1", lien: null, desc: "Déploiement et configuration de Nagios Core sur Ubuntu : surveillance des équipements réseau, alertes email, tableaux de bord." }
          }
        },
        {
          code: "AC15.04",
          label: "Documenter les réseaux et les activités de surveillance",
          reflexive: {
            fait: "J'ai rédigé des schémas réseau (Packet Tracer, draw.io), des tableaux d'adressage et des rapports d'incidents lors des TP et de mes stages.",
            pourquoi: "Un réseau non documenté est un réseau non maintenable. La documentation est la mémoire collective d'une équipe réseau.",
            comment: "Pratique lors des TP, outils draw.io et Packet Tracer pour les schémas, rédaction de rapports structurés.",
            difficultes: "Maintenir la documentation à jour quand la configuration évolue est difficile : j'ai souvent eu des schémas désynchronisés de la réalité.",
            appris: "J'ai appris qu'une bonne documentation doit être simple, visuelle et maintenue en temps réel — pas en fin de projet.",
            autrement: "J'adopterais une approche 'documentation as code' : versionner les schémas réseau avec Git pour tracer les évolutions.",
            projet: { titre: "Portfolio — Documentation des projets", lien: "https://github.com/ramziatouaffotossou/ramziatouaffotossou.github.io.git", desc: "Rédaction de descriptions techniques pour chaque projet du portfolio : objectifs, méthodes, outils, résultats." }
          }
        }
      ]
    }
  };
  
  let currentCompetence = null;
  
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
    document.getElementById('sp-ref-ac-code').style.cssText = `background:${data.color}22;color:${data.color};border:1px solid ${data.color}44`;
    document.getElementById('sp-ref-ac-label').textContent = ac.label;
  
    const questions = [
      { icon: 'bi-check2-circle',        title: 'Ce que j\'ai fait',                  text: r.fait },
      { icon: 'bi-question-circle',      title: 'Pourquoi je l\'ai fait',             text: r.pourquoi },
      { icon: 'bi-tools',                title: 'Comment je l\'ai fait',              text: r.comment },
      { icon: 'bi-exclamation-triangle', title: 'Mes difficultés',                    text: r.difficultes },
      { icon: 'bi-lightbulb',            title: 'Ce que j\'en ai appris',             text: r.appris },
      { icon: 'bi-arrow-repeat',         title: 'Ce que je ferais autrement',         text: r.autrement },
    ];
  
    document.getElementById('sp-reflexive-grid').innerHTML = questions.map(q => `
      <div class="sp-ref-card">
        <div class="sp-ref-card-icon"><i class="bi ${q.icon}"></i></div>
        <h5>${q.title}</h5>
        <p>${q.text}</p>
      </div>
    `).join('');
  
    const trace = r.projet;
    document.getElementById('sp-project-trace').innerHTML = `
      <h5><i class="bi bi-paperclip"></i> Exemple de trace — projet lié</h5>
      <p>
        <strong style="color:var(--text-light)">${trace.titre}</strong><br>
        ${trace.desc}
        ${trace.lien ? ` — <a href="${trace.lien}" target="_blank"><i class="bi bi-github"></i> Voir sur GitHub</a>` : ''}
      </p>
    `;
  
    document.getElementById('sp-reflexive-overlay').classList.add('active');
  }
  
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