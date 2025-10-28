/* ===========================
   VARIABLES GLOBALES
   =========================== */

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const scrollTopBtn = document.getElementById('scroll-top');
const navLinks = document.querySelectorAll('.nav-link');
const heroSection = document.getElementById('home');

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */

window.addEventListener('scroll', () => {
    // Ajouter classe scrolled au scroll
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Afficher/masquer le bouton scroll top
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

/* ===========================
   HAMBURGER MENU MOBILE
   =========================== */

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Fermer le menu en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ===========================
   SMOOTH SCROLL
   =========================== */

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Bouton scroll top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===========================
   DARK MODE TOGGLE
   =========================== */

// Vérifier le thème actuel
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
} else {
    // Par défaut : détecter la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

/* ===========================
   ANIMATIONS AU SCROLL (Intersection Observer)
   =========================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les éléments avec data-aos
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

/* ===========================
   FORMULAIRE DE CONTACT
   =========================== */

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulation d'envoi (à remplacer par votre logique d'envoi)
    setTimeout(() => {
        showFormMessage('success', 'Votre message a été envoyé avec succès ! Merci de me contacter.');
        contactForm.reset();
    }, 1000);
    
    // Pour un vrai envoi, vous pourriez utiliser fetch() pour envoyer à votre backend
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        showFormMessage('success', 'Message envoyé avec succès !');
        contactForm.reset();
    })
    .catch(error => {
        showFormMessage('error', 'Une erreur est survenue. Veuillez réessayer.');
    });
    */
});

function showFormMessage(type, message) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    setTimeout(() => {
        formMessage.classList.remove('success', 'error');
    }, 5000);
}

/* ===========================
   ANIMATION TYPING (Optionnel - pour titre hero)
   =========================== */

// Cette fonction peut être activée pour un effet de frappe
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Pour activer l'effet de frappe :
// const heroTitle = document.querySelector('.hero-title');
// const originalText = heroTitle.textContent;
// typeWriter(heroTitle, originalText, 50);

/* ===========================
   ANIMATION PARTICLES (Optionnel - arrière-plan)
   =========================== */

// Créer des particules flottantes dans le hero (optionnel)
function createParticles() {
    const heroSection = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            opacity: 0.3;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    heroSection.appendChild(particleContainer);
}

// Décommenter pour activer les particules :
// createParticles();

// Ajouter l'animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(style);

/* ===========================
   AJUSTEMENT ACTIF NAV LINK
   =========================== */

// Mettre en évidence le lien de navigation actif selon la section visible
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Ajouter le style pour le lien actif
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

/* ===========================
   EFFET PARALLAX SUBTIL
   =========================== */

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Effet parallax sur les formes flottantes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* ===========================
   INITIALISATION
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio chargé avec succès !');
    
    // Animation initiale du hero
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.5s ease';
            setTimeout(() => el.style.opacity = '1', 100);
        }, index * 200);
    });
});

/* ===========================
   PERFORMANCE : Lazy Loading des images
   =========================== */

// Ajouter lazy loading aux images des projets
const projectImages = document.querySelectorAll('.project-image img');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.addEventListener('load', () => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                });
                observer.unobserve(img);
            }
        });
    });
    
    projectImages.forEach(img => imageObserver.observe(img));
}


