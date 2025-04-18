// Slider functionality for reviews section
document.addEventListener('DOMContentLoaded', function() {
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewDots = document.querySelectorAll('.review-dot');
    const prevButton = document.querySelector('.review-prev');
    const nextButton = document.querySelector('.review-next');
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

    // Обработчики событий
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

    // Инициализация слайдера
    showSlide(0);
    startAutoplay();

    // Highlight number animation on scroll
    const highlightedNumbers = document.querySelectorAll('.highlighted-number');
    
    if (highlightedNumbers.length > 0) {
        const animateNumber = (element) => {
            const targetNumber = parseInt(element.textContent);
            let currentNumber = 0;
            const duration = 1500; // ms
            const interval = 50; // ms
            const steps = duration / interval;
            const increment = targetNumber / steps;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    element.textContent = targetNumber;
                    clearInterval(counter);
                } else {
                    element.textContent = Math.floor(currentNumber);
                }
            }, interval);
        };
        
        const handleScroll = () => {
            highlightedNumbers.forEach(number => {
                const position = number.getBoundingClientRect();
                if (position.top < window.innerHeight && position.bottom > 0) {
                    if (!number.classList.contains('animated')) {
                        number.classList.add('animated');
                        animateNumber(number);
                    }
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on load
    }

    // Scroll to sections when clicking on nav links
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileMenu = document.querySelector('.header__nav');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}); 