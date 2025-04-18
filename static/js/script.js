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
    
    // Reviews slider
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewDots = document.querySelectorAll('.review-dot');
    const prevButton = document.querySelector('.review-prev');
    const nextButton = document.querySelector('.review-next');
    
    if (reviewCards.length) {
        let currentIndex = 0;
        let interval;
    
        // Показать слайд
        function showSlide(index) {
            reviewCards.forEach((card, i) => {
                card.classList.remove('active');
                if (i === index) {
                    card.classList.add('active');
                }
            });
    
            reviewDots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
    
            currentIndex = index;
        }
    
        // Перейти к следующему слайду
        function nextSlide() {
            const newIndex = (currentIndex + 1) % reviewCards.length;
            showSlide(newIndex);
        }
    
        // Перейти к предыдущему слайду
        function prevSlide() {
            const newIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
            showSlide(newIndex);
        }
    
        // Запуск автопрокрутки
        function startAutoplay() {
            // Очистка предыдущего интервала для безопасности
            if (interval) {
                clearInterval(interval);
            }
            interval = setInterval(nextSlide, 5000);
        }
    
        // Остановка автопрокрутки
        function stopAutoplay() {
            clearInterval(interval);
        }
    
        // Обработчики событий для слайдера отзывов
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', function() {
                prevSlide();
                stopAutoplay();
                startAutoplay(); // Перезапуск после взаимодействия
            });
            
            nextButton.addEventListener('click', function() {
                nextSlide();
                stopAutoplay();
                startAutoplay(); // Перезапуск после взаимодействия
            });
        }
    
        reviewDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                stopAutoplay();
                startAutoplay(); // Перезапуск после взаимодействия
            });
        });
    
        // Остановка автопрокрутки при наведении мыши
        const reviewSlider = document.querySelector('.review-slider');
        if (reviewSlider) {
            reviewSlider.addEventListener('mouseenter', stopAutoplay);
            reviewSlider.addEventListener('mouseleave', startAutoplay);
        }
    
        // Инициализация слайдера отзывов
        showSlide(0);
        startAutoplay();
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
}); 