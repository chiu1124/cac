
// Loading screen management
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.add('hide');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000);
});

// Ripple effect for buttons
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = this.querySelector('.ripple');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = 'none';
        ripple.offsetHeight; // Trigger reflow
        ripple.style.animation = 'ripple-effect 0.6s linear';
    });
});

// Update date and time
function updateDateTime() {
    const now = new Date();
    
    // Update date
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('vi-VN', dateOptions);
    document.getElementById('currentDate').textContent = dateString;
    
    // Update time
    const timeString = now.toLocaleTimeString('vi-VN', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Update date and time every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Get user IP and location
async function getUserInfo() {
    try {
        // Get IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        document.getElementById('userIP').textContent = ipData.ip;
        
        // Get location based on IP
        const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const locationData = await locationResponse.json();
        
        if (locationData.city && locationData.country_name) {
            document.getElementById('userCity').textContent = 
                `${locationData.city}, ${locationData.country_name}`;
        } else {
            document.getElementById('userCity').textContent = 'Không xác định';
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        document.getElementById('userIP').textContent = 'Không thể tải';
        document.getElementById('userCity').textContent = 'Không thể tải';
    }
}

// Load user info
getUserInfo();

// Add floating animation to social buttons
function addFloatingAnimation() {
    const buttons = document.querySelectorAll('.social-btn');
    buttons.forEach((button, index) => {
        setInterval(() => {
            const randomX = Math.random() * 10 - 5; // -5 to 5
            const randomY = Math.random() * 10 - 5; // -5 to 5
            button.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            
            setTimeout(() => {
                button.style.transform = button.style.transform.replace(
                    /translate\([^)]*\)/g, ''
                );
            }, 1000);
        }, 3000 + index * 500);
    });
}

// Start floating animation after page load
setTimeout(addFloatingAnimation, 3000);

// Add smooth scrolling for better UX
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

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const buttons = document.querySelectorAll('.social-btn');
    const focusedElement = document.activeElement;
    const currentIndex = Array.from(buttons).indexOf(focusedElement);
    
    if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
        buttons[currentIndex + 1].focus();
        e.preventDefault();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        buttons[currentIndex - 1].focus();
        e.preventDefault();
    } else if (e.key === 'Enter' && currentIndex !== -1) {
        buttons[currentIndex].click();
        e.preventDefault();
    }
});

// Make buttons focusable
document.querySelectorAll('.social-btn').forEach(button => {
    button.setAttribute('tabindex', '0');
});
