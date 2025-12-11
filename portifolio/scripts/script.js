// Professional portfolio JavaScript
(function() {
    'use strict';
    
    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // Create particle background effect
        createParticleEffect();
        
        // Create magic mouse trail effect
        createMouseTrail();
        
        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Simple validation
                if (name && email && message) {
                    // Show success message with professional notification
                    showNotification(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show validation error
                    showNotification('Please fill in all fields.', 'error');
                }
            });
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Back to top button
        window.addEventListener('scroll', function() {
            const backToTop = document.getElementById('backToTop');
            if (backToTop) {
                if (window.pageYOffset > 300) {
                    backToTop.style.display = 'block';
                } else {
                    backToTop.style.display = 'none';
                }
            }
            
            // Header scroll effect
            const header = document.querySelector('header');
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Cosmic background effect - shift gradient based on scroll
            const scrollPosition = window.pageYOffset;
            const body = document.body;
            const hueShift = (scrollPosition * 0.1) % 360;
            const saturation = 50 + (Math.sin(scrollPosition * 0.01) * 20);
            body.style.background = `linear-gradient(135deg, 
                hsl(${hueShift}, ${saturation}%, 10%), 
                hsl(${(hueShift + 60) % 360}, ${saturation}%, 15%), 
                hsl(${(hueShift + 120) % 360}, ${saturation}%, 20%))`;
            body.style.backgroundAttachment = 'fixed';
        });
        
        // Initialize entrance animations
        initEntranceAnimations();
        
        // Initialize card tilt effects
        initCardTilt();
    });
    
    // Notification system
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Create particle background effect
    function createParticleEffect() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle';
        document.body.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-dot';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 15 + 's';
            
            particleContainer.appendChild(particle);
        }
    }
    
    // Create magic mouse trail effect
    function createMouseTrail() {
        const trails = [];
        const maxTrails = 15;
        
        document.addEventListener('mousemove', (e) => {
            // Create trail element
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);
            
            // Add to trails array
            trails.push(trail);
            
            // Remove oldest trail if we have too many
            if (trails.length > maxTrails) {
                const oldTrail = trails.shift();
                if (oldTrail.parentNode) {
                    oldTrail.parentNode.removeChild(oldTrail);
                }
            }
            
            // Remove trail after animation completes
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
                // Remove from trails array
                const index = trails.indexOf(trail);
                if (index > -1) {
                    trails.splice(index, 1);
                }
            }, 1000);
        });
    }
    
    // Entrance animations for sections
    function initEntranceAnimations() {
        const sections = document.querySelectorAll('section');
        
        // Check which sections are already in view
        checkSections();
        
        // Check on scroll
        window.addEventListener('scroll', checkSections);
        
        function checkSections() {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                // If section is in viewport (with some offset)
                if (sectionTop < windowHeight * 0.75) {
                    section.classList.add('visible');
                    
                    // Staggered animations for skill cards
                    if (section.classList.contains('skills')) {
                        const skillCards = section.querySelectorAll('.skill-card');
                        skillCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, index * 100);
                        });
                    }
                    
                    // Staggered animations for project cards
                    if (section.classList.contains('projects')) {
                        const projectCards = section.querySelectorAll('.project-card');
                        projectCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, index * 150);
                        });
                        
                        // Ensure project section is visible immediately
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }
                }
            });
        }
    }
    
    // Tilt effect for cards
    function initCardTilt() {
        const cards = document.querySelectorAll('.skill-card, .project-card');
        
        cards.forEach(card => {
            const shine = card.querySelector('.card-shine');
            
            // Store original transform
            let originalTransform = '';
            
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                const rotateY = (mouseX - cardCenterX) / 30;
                const rotateX = (cardCenterY - mouseY) / 30;
                
                // Add gravity effect - cards slightly move toward cursor
                const gravityX = (mouseX - cardCenterX) / 100;
                const gravityY = (mouseY - cardCenterY) / 100;
                
                // Move shine effect
                if (shine) {
                    const shineX = ((mouseX - cardRect.left) / cardRect.width) * 100;
                    const shineY = ((mouseY - cardRect.top) / cardRect.height) * 100;
                    shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`;
                    shine.style.opacity = '0.7';
                }
                
                card.style.transform = `translateZ(0) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${gravityX}px, ${gravityY}px, 0)`;
            });
            
            card.addEventListener('mouseenter', () => {
                if (shine) {
                    shine.style.opacity = '0.7';
                }
                // Add slight scale effect on enter
                card.style.transform = 'translateZ(0) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                // Restore original transform or default
                card.style.transform = 'translateZ(0)';
                if (shine) {
                    shine.style.opacity = '0';
                }
            });
        });
    }
})();