// Slider functionality for reviews section
document.addEventListener('DOMContentLoaded', function() {
    // Reviews slider functionality
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewContainer = document.querySelector('.review-cards');
    const prevBtn = document.querySelector('.review-prev');
    const nextBtn = document.querySelector('.review-next');
    const dotsContainer = document.querySelector('.review-dots');
    
    if (reviewCards.length && reviewContainer && prevBtn && nextBtn && dotsContainer) {
        let currentIndex = 0;
        let cardWidth;
        let visibleCards;
        
        // Create dots based on number of slides
        function createDots() {
            dotsContainer.innerHTML = '';
            
            const totalDots = Math.ceil(reviewCards.length / visibleCards);
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('span');
                dot.classList.add('review-dot');
                if (i === 0) dot.classList.add('active');
                dot.dataset.index = i;
                
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                
                dotsContainer.appendChild(dot);
            }
        }
        
        // Update active dot
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.review-dot');
            dots.forEach((dot, index) => {
                if (parseInt(dot.dataset.index) === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            const translateX = -currentIndex * (cardWidth * visibleCards);
            reviewContainer.style.transform = `translateX(${translateX}px)`;
            updateDots();
            updateButtons();
        }
        
        // Update buttons state
        function updateButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === Math.ceil(reviewCards.length / visibleCards) - 1;
        }
        
        // Calculate layout
        function calculateLayout() {
            const containerWidth = reviewContainer.parentElement.clientWidth;
            
            if (window.innerWidth > 992) {
                visibleCards = 3;
            } else if (window.innerWidth > 768) {
                visibleCards = 2;
            } else {
                visibleCards = 1;
            }
            
            cardWidth = containerWidth / visibleCards;
            
            // Reset to first slide when resizing
            currentIndex = 0;
            reviewContainer.style.transform = 'translateX(0)';
            
            // Update dots based on new layout
            createDots();
            updateButtons();
        }
        
        // Initialize slider
        calculateLayout();
        
        // Event listeners
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < Math.ceil(reviewCards.length / visibleCards) - 1) {
                goToSlide(currentIndex + 1);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', calculateLayout);
    }
    
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