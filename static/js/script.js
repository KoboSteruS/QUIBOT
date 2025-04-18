document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('is-active');
            burger.classList.toggle('is-active');
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav__link, .footer__link, .hero__btn, .pricing-card__btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (nav.classList.contains('is-active')) {
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
    const servicesList = document.querySelector('.services__list');
    const servicesContainer = document.querySelector('.services__container');
    
    if (serviceItems.length && servicesList && servicesContainer) {
        serviceItems.forEach(item => {
            const button = item.querySelector('.service-button');
            
            if (button) {
                button.addEventListener('click', function() {
                    const currentItem = this.closest('.service-item');
                    const isActive = currentItem.classList.contains('active');
                    
                    // Если этот элемент уже активен, закрываем его
                    if (isActive) {
                        currentItem.classList.remove('active');
                        return;
                    }
                    
                    // Закрываем все элементы
                    serviceItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Активируем текущий элемент
                    currentItem.classList.add('active');
                });
            }
        });
    }
    
    // Reviews slider
    const reviewsTrack = document.querySelector('.reviews__track');
    const reviewsDotsContainer = document.querySelector('.reviews__dots');
    const reviewsPrevBtn = document.querySelector('.reviews__btn--prev');
    const reviewsNextBtn = document.querySelector('.reviews__btn--next');
    
    if (reviewsTrack) {
        // Fetch reviews from API
        fetch('/static/data/reviews.json')
            .then(response => response.json())
            .then(reviews => {
                // Create review cards
                reviews.forEach((review, index) => {
                    const reviewCard = document.createElement('div');
                    reviewCard.className = 'review-card';
                    
                    // Generate stars based on rating
                    let starsHTML = '';
                    for (let i = 0; i < review.rating; i++) {
                        starsHTML += '<span class="review-card__star">★</span>';
                    }
                    
                    reviewCard.innerHTML = `
                        <div class="review-card__header">
                            <div class="review-card__info">
                                <div class="review-card__name">${review.name}</div>
                                <div class="review-card__position">${review.position}</div>
                                <div class="review-card__company">${review.company}</div>
                            </div>
                            <div class="review-card__rating">
                                ${starsHTML}
                            </div>
                        </div>
                        <div class="review-card__text">${review.text}</div>
                        <div class="review-card__date">${review.date}</div>
                    `;
                    
                    reviewsTrack.appendChild(reviewCard);
                    
                    // Create dots
                    if (reviewsDotsContainer) {
                        const dot = document.createElement('span');
                        dot.className = index === 0 ? 'reviews__dot is-active' : 'reviews__dot';
                        dot.dataset.index = index;
                        reviewsDotsContainer.appendChild(dot);
                        
                        dot.addEventListener('click', function() {
                            currentSlide = parseInt(this.dataset.index);
                            updateSlider();
                        });
                    }
                });
                
                // Set up slider
                const reviewCards = document.querySelectorAll('.review-card');
                const dots = document.querySelectorAll('.reviews__dot');
                let currentSlide = 0;
                const sliderContainer = reviewsTrack.parentElement;
                
                // Функция установки ширины карточек
                function setCardWidths() {
                    const containerWidth = sliderContainer.clientWidth;
                    reviewCards.forEach(card => {
                        card.style.width = `${containerWidth}px`;
                    });
                    // Обновляем общую ширину дорожки
                    reviewsTrack.style.width = `${containerWidth * reviewCards.length}px`;
                }
                
                // Вызываем функцию установки ширины сразу
                setCardWidths();
                
                // Update slider position
                function updateSlider() {
                    const containerWidth = sliderContainer.clientWidth;
                    reviewsTrack.style.transform = `translateX(-${currentSlide * containerWidth}px)`;
                    
                    dots.forEach((dot, index) => {
                        if (index === currentSlide) {
                            dot.classList.add('is-active');
                        } else {
                            dot.classList.remove('is-active');
                        }
                    });
                }
                
                // Add navigation functionality
                if (reviewsPrevBtn) {
                    reviewsPrevBtn.addEventListener('click', function() {
                        currentSlide = (currentSlide > 0) ? currentSlide - 1 : reviewCards.length - 1;
                        updateSlider();
                    });
                }
                
                if (reviewsNextBtn) {
                    reviewsNextBtn.addEventListener('click', function() {
                        currentSlide = (currentSlide < reviewCards.length - 1) ? currentSlide + 1 : 0;
                        updateSlider();
                    });
                }
                
                // Autoplay
                let slideInterval = setInterval(function() {
                    currentSlide = (currentSlide < reviewCards.length - 1) ? currentSlide + 1 : 0;
                    updateSlider();
                }, 5000);
                
                // Pause autoplay on hover
                reviewsTrack.addEventListener('mouseenter', function() {
                    clearInterval(slideInterval);
                });
                
                reviewsTrack.addEventListener('mouseleave', function() {
                    slideInterval = setInterval(function() {
                        currentSlide = (currentSlide < reviewCards.length - 1) ? currentSlide + 1 : 0;
                        updateSlider();
                    }, 5000);
                });
                
                // Update on window resize
                window.addEventListener('resize', function() {
                    setCardWidths();
                    updateSlider();
                });
                
                // Initial call
                updateSlider();
            })
            .catch(error => console.error('Error loading reviews:', error));
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const orderServiceForm = document.getElementById('orderServiceForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would normally send data to server
            console.log('Contact form data:', formObject);
            
            // Show success message
            alert('Спасибо за ваше обращение! Мы свяжемся с вами в ближайшее время.');
            
            // Reset form
            this.reset();
        });
    }
    
    if (orderServiceForm) {
        orderServiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would normally send data to server
            console.log('Order service form data:', formObject);
            
            // Show success message
            alert('Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для уточнения деталей.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Services section expansion
    const serviceExpandButtons = document.querySelectorAll('.service-card__more');
    
    if (serviceExpandButtons.length) {
        serviceExpandButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const serviceId = this.closest('.service-card').dataset.service;
                window.location.href = `/service/${serviceId}`;
            });
        });
    }
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.advantage-card, .service-card, .pricing-card, .experience__card, .stages__item');
    
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