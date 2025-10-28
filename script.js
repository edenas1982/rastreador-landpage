// Funcionalidades JavaScript para a landing page AutoMob

document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });

    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.step, .benefit, .testimonial, .faq-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Efeito parallax suave no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    });

    // Contador animado para o preço (opcional)
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Ativar contador quando a seção de oferta estiver visível
    const offerSection = document.querySelector('.oferta');
    if (offerSection) {
        const offerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const priceElement = document.querySelector('.amount');
                    if (priceElement && !priceElement.classList.contains('animated')) {
                        priceElement.classList.add('animated');
                        animateCounter(priceElement, 0, 600, 2000);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        offerObserver.observe(offerSection);
    }

    // Efeito de hover nos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Validação e tracking de cliques nos CTAs
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aqui você pode adicionar tracking do Google Analytics ou Facebook Pixel
            console.log('WhatsApp CTA clicked:', this.href);
            
            // Exemplo de tracking (substitua pelos seus códigos reais):
            // gtag('event', 'click', {
            //     event_category: 'CTA',
            //     event_label: 'WhatsApp Button'
            // });
        });
    });

    // Lazy loading para imagens (se houver)
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Adicionar classe de scroll ao header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Efeito de typing no título principal (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Ativar efeito de typing no hero (descomente se quiser usar)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }

    // Adicionar efeito de partículas no background (opcional)
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0, 170, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Adicionar CSS para animação de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .header {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Ativar partículas (descomente se quiser usar)
    // createParticles();

    // Adicionar efeito de brilho nos ícones
    const icons = document.querySelectorAll('.step-icon, .benefit-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 170, 255, 0.6)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Console log para debug
    console.log('AutoMob Landing Page carregada com sucesso!');
    console.log('Desenvolvido para rastreadorautomob.com.br');
});

// Função para abrir WhatsApp com mensagem personalizada
function openWhatsApp(message = '') {
    const phoneNumber = '5511999999999'; // Substitua pelo número real
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
}

// Função para tracking de eventos (exemplo)
function trackEvent(category, action, label) {
    // Implementar tracking do Google Analytics ou Facebook Pixel
    console.log('Event tracked:', { category, action, label });
    
    // Exemplo para Google Analytics 4:
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
}

// Exportar funções para uso global
window.openWhatsApp = openWhatsApp;
window.trackEvent = trackEvent;
