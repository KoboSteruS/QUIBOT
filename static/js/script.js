document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('is-active');
            this.classList.toggle('is-active');
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileMenu = document.querySelector('.header__nav');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav__link, .footer__link, .hero__btn, .pricing-card__button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (nav && nav.classList.contains('is-active')) {
                        nav.classList.remove('is-active');
                        burger.classList.remove('is-active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Service buttons expandable
    const serviceItems = document.querySelectorAll('.service-item');
    
    if (serviceItems.length) {
        serviceItems.forEach(item => {
            const button = item.querySelector('.service-button');
            
            if (button) {
                button.addEventListener('click', function() {
                    const currentItem = this.closest('.service-item');
                    const isActive = currentItem.classList.contains('active');
                    
                    // Если этот элемент уже активен, закрываем его
                    if (isActive) {
                        currentItem.classList.remove('active');
                        this.classList.remove('active');
                        return;
                    }
                    
                    // Закрываем все элементы
                    serviceItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherButton = otherItem.querySelector('.service-button');
                        if (otherButton) {
                            otherButton.classList.remove('active');
                        }
                    });
                    
                    // Активируем текущий элемент
                    currentItem.classList.add('active');
                    this.classList.add('active');
                });
            }
        });
    }
    
    // Review slider functionality
    const reviewCards = document.querySelectorAll('.review-card');
    const prevButton = document.getElementById('review-prev');
    const nextButton = document.getElementById('review-next');
    const dots = document.querySelectorAll('.review-dot');
    
    if (reviewCards.length && prevButton && nextButton && dots.length) {
        let currentIndex = 0;
        const totalReviews = reviewCards.length;
        
        // Initialize slider
        updateReviewSlider();
        
        // Previous button click handler
        prevButton.addEventListener('click', function() {
            if (!this.disabled) {
                currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
                updateReviewSlider();
            }
        });
        
        // Next button click handler
        nextButton.addEventListener('click', function() {
            if (!this.disabled) {
                currentIndex = (currentIndex + 1) % totalReviews;
                updateReviewSlider();
            }
        });
        
        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateReviewSlider();
            });
        });
        
        // Update the review slider based on current index
        function updateReviewSlider() {
            // Show only one review at a time
            reviewCards.forEach((card, index) => {
                card.style.display = index === currentIndex ? 'block' : 'none';
            });
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update navigation buttons state
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === totalReviews - 1;
        }
        
        // Handle window resize
        window.addEventListener('resize', updateReviewSlider);
    }
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.advantage-card, .service-item, .pricing-card, .experience__card, .stages__item');
    
    function checkElements() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkElements);
    checkElements(); // Check on initial load
    
    // Отрисовка линий между иконками и центральным логотипом
    function drawLines() {
        const centerLogo = document.getElementById('center-logo');
        if (!centerLogo) return;
        
        const centerX = centerLogo.offsetLeft + centerLogo.offsetWidth / 2;
        const centerY = centerLogo.offsetTop + centerLogo.offsetHeight / 2;
        
        for (let i = 1; i <= 6; i++) {
            const icon = document.getElementById('icon' + i);
            const line = document.getElementById('line' + i);
            
            if (icon && line) {
                const iconX = icon.offsetLeft + icon.offsetWidth / 2;
                const iconY = icon.offsetTop + icon.offsetHeight / 2;
                
                line.setAttribute('x1', centerX);
                line.setAttribute('y1', centerY);
                line.setAttribute('x2', iconX);
                line.setAttribute('y2', iconY);
                
                // Добавляем класс для плавного появления линии
                setTimeout(() => {
                    line.classList.add('animated');
                }, 300 * i);
            }
        }
    }
    
    // Перерисовка линий при изменении размера окна
    window.addEventListener('resize', drawLines);
    
    // Запускаем отрисовку линий после загрузки страницы
    window.addEventListener('load', drawLines);
    
    // Выполняем первичную отрисовку после загрузки DOM
    setTimeout(drawLines, 500);
}); 