// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: false
    });

    // Initialize all components
    initMusicPlayer();
    initTestimonialSlider();
    initCountdown();
    initSurpriseModal();
    initParallaxEffect();
});

// Music Player
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().catch(error => {
                console.log("Audio play failed: ", error);
            });
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Initialize autoplay
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Show the current testimonial
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');

        // Reset autoplay
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Next slide function
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Previous slide function
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });

    // Touch swipe functionality
    const sliderContainer = document.querySelector('.testimonial-container');
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Swipe left
        } else if (touchEndX > touchStartX + 50) {
            prevSlide(); // Swipe right
        }
    }
}

// Countdown Timer
function initCountdown() {
    // Set the countdown to next year's birthday (April 27, 2026)
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), 3, 27); // April is month 3 (0-indexed)
    
    // If this year's birthday has passed, set to next year
    if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const countdownDate = nextBirthday

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the DOM
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
        }
    }

    // Initial call
    updateCountdown();
    
    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Surprise Modal
function initSurpriseModal() {
    const surpriseBtn = document.getElementById('surprise-btn');
    const modal = document.getElementById('surprise-modal');
    const closeBtn = document.querySelector('.close-btn');

    surpriseBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.classList.remove('active');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
        }
    });
}

// Parallax Effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5; // Parallax speed
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}
