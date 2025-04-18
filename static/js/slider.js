document.addEventListener('DOMContentLoaded', function() {
    // Initialize the review slider
    initReviewSlider();
});

function initReviewSlider() {
    const slider = document.querySelector('.review-slider');
    if (!slider) return;

    const cards = slider.querySelector('.review-cards');
    const cardElements = slider.querySelectorAll('.review-card');
    const dotsContainer = slider.querySelector('.review-dots');
    const prevBtn = slider.querySelector('.review-prev');
    const nextBtn = slider.querySelector('.review-next');
    
    // Configuration
    const cardsPerView = getCardsPerView();
    const totalSlides = Math.ceil(cardElements.length / cardsPerView);
    let currentSlide = 0;
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('review-dot');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    // Set initial state
    updateSlider();
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Handle responsive changes
    window.addEventListener('resize', function() {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            location.reload(); // Simple solution - reload page on breakpoint change
        }
    });
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function updateSlider() {
        // Update cards visibility
        const offset = currentSlide * cardsPerView;
        cardElements.forEach((card, index) => {
            if (index >= offset && index < offset + cardsPerView) {
                card.classList.add('visible');
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.review-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update buttons
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    function getCardsPerView() {
        // Responsive design - return different values based on screen width
        const width = window.innerWidth;
        if (width < 576) return 1;       // Mobile
        if (width < 992) return 2;       // Tablet
        return 3;                        // Desktop
    }
} 