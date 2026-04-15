// Get the modal
var modal = document.getElementById("image-modal");

// Get the image and insert it inside the modal
var img = document.getElementById("profile-photo");
var modalImg = document.getElementById("expanded-img");

if(img) {
    img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
        modalImg.classList.remove('welcome-disappear');
        modalImg.classList.add('welcome-appear');
    }
}

// Get the <span> element that closes the modal
var close = document.getElementById("close-modal");

if(close) {
    close.onclick = function() {
        modalImg.classList.remove('welcome-appear');
        modalImg.classList.add('welcome-disappear');
        setTimeout(() => { modal.style.display = "none"; }, 300);
    }
}

// --- Misty Cloud Background Simulation ---
function createClouds() {
    const container = document.createElement('div');
    container.className = 'clouds-container';
    // Use prepend to place it behind main content or just append to body
    // and let z-index handle the stacking
    document.body.appendChild(container);

    const numClouds = Math.floor(Math.random() * 6) + 12; // 12 to 17 clouds

    for (let i = 0; i < numClouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Randomize dimensions and timings
        const size = Math.random() * 200 + 150; // 150px to 350px
        const squish = Math.random() * 0.4 + 0.2; // 0.2 to 0.6 height ratio
        const rot = Math.random() * 360; // 0 to 360 degrees
        const startX = Math.random() * 100 - 10; // -10vw to 90vw
        const startY = Math.random() * 100 - 10; // -10vh to 90vh
        const duration = Math.random() * 30 + 30; // 30s to 60s (faster flow)
        const flickerDur = Math.random() * 2 + 1; // 1s to 3s for fast random visibility changes
        const maxOpacity = Math.random() * 0.25 + 0.15; // 0.15 to 0.40

        cloud.style.setProperty('--size', `${size}px`);
        cloud.style.setProperty('--squish', squish);
        cloud.style.setProperty('--rot', `${rot}deg`);
        cloud.style.setProperty('--start-x', `${startX}vw`);
        cloud.style.setProperty('--start-y', `${startY}vh`);
        cloud.style.setProperty('--duration', `${duration}s`);
        cloud.style.setProperty('--flicker-dur', `${flickerDur}s`);
        cloud.style.setProperty('--max-opacity', maxOpacity);

        // Randomize flow path (larger drifting distance for more flow)
        cloud.style.setProperty('--move-x-1', `${Math.random() * 80 - 40}vw`);
        cloud.style.setProperty('--move-y-1', `${Math.random() * 80 - 40}vh`);
        cloud.style.setProperty('--scale-1', Math.random() * 0.4 + 0.8);

        cloud.style.setProperty('--move-x-2', `${Math.random() * 100 - 50}vw`);
        cloud.style.setProperty('--move-y-2', `${Math.random() * 100 - 50}vh`);
        cloud.style.setProperty('--scale-2', Math.random() * 0.6 + 1.2);

        cloud.style.setProperty('--move-x-3', `${Math.random() * 120 - 60}vw`);
        cloud.style.setProperty('--move-y-3', `${Math.random() * 120 - 60}vh`);
        cloud.style.setProperty('--scale-3', Math.random() * 0.3 + 0.9);

        cloud.style.setProperty('--move-x-4', `${Math.random() * 150 - 75}vw`);
        cloud.style.setProperty('--move-y-4', `${Math.random() * 150 - 75}vh`);

        cloud.style.animationDelay = `-${Math.random() * 40}s`; // start midway in animation

        container.appendChild(cloud);
    }
}

// Initialize clouds and welcome modal on load
document.addEventListener('DOMContentLoaded', () => {
    createClouds();

    // Welcome Alert Logic
    if (!sessionStorage.getItem('welcomeShown')) {
        sessionStorage.setItem('welcomeShown', 'true');
        const overlay = document.getElementById('welcome-overlay');
        const modal = document.getElementById('welcome-modal');
        
        if (overlay && modal) {
            overlay.style.display = 'flex';
            modal.classList.add('welcome-appear');
            
            setTimeout(() => {
                modal.classList.remove('welcome-appear');
                modal.classList.add('welcome-disappear');
                
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300); // Wait for scaleDown animation
            }, 1900); // 1.5s display + 0.4s appear
        }
    }
});

// --- Level and Countdown Logic ---
const birthdayStr = "2003-03-03T00:00:00"; // March 3, 2003
const birthday = new Date(birthdayStr);
const levelEl = document.getElementById("player-level");

const elMo = document.getElementById("cd-mo");
const elD = document.getElementById("cd-d");
const elH = document.getElementById("cd-h");
const elM = document.getElementById("cd-m");
const elS = document.getElementById("cd-s");

function updateLevelAndCountdown() {
    const now = new Date();
    
    // Calculate Age (Level) based on 2003-03-03
    let age = now.getFullYear() - birthday.getFullYear();
    const bdayThisYear = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    if (now.getTime() < bdayThisYear.getTime()) {
        age--;
    }
    if (levelEl) levelEl.textContent = age;

    // Calculate Next Birthday
    let nextBdayYear = now.getFullYear();
    if (now.getTime() >= bdayThisYear.getTime()) {
        nextBdayYear++;
    }
    const nextBirthday = new Date(nextBdayYear, birthday.getMonth(), birthday.getDate());

    // Approximate Months mapping cleanly using iterative month addition
    let mStart = new Date(now);
    let months = 0;
    while (true) {
        let temp = new Date(mStart);
        temp.setMonth(temp.getMonth() + 1);
        if (temp.getTime() <= nextBirthday.getTime()) {
            months++;
            mStart = temp;
        } else {
            break;
        }
    }
    
    let diff = nextBirthday.getTime() - mStart.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    const secs = Math.floor(diff / 1000);

    const pad = n => n.toString().padStart(2, '0');
    
    if(elMo) elMo.textContent = pad(months);
    if(elD) elD.textContent = pad(days);
    if(elH) elH.textContent = pad(hours);
    if(elM) elM.textContent = pad(mins);
    if(elS) elS.textContent = pad(secs);
}

setInterval(updateLevelAndCountdown, 1000);
updateLevelAndCountdown();

// Modal logic for Level Up Countdown
const levelTrigger = document.getElementById("level-trigger");
const countdownModal = document.getElementById("countdown-modal");
const closeCountdown = document.getElementById("close-countdown");
const countdownContent = countdownModal ? countdownModal.querySelector('.modal-content') : null;

if(levelTrigger) {
    levelTrigger.onclick = function() {
        countdownModal.style.display = "flex";
        if(countdownContent) {
            countdownContent.classList.remove('welcome-disappear');
            countdownContent.classList.add('welcome-appear');
        }
    }
}

if(closeCountdown) {
    closeCountdown.onclick = function() {
        if(countdownContent) {
            countdownContent.classList.remove('welcome-appear');
            countdownContent.classList.add('welcome-disappear');
        }
        setTimeout(() => { countdownModal.style.display = "none"; }, 300);
    }
}

// Override global window.onclick to manage all modals dynamically
window.onclick = function(event) {
    // modal is the original image-modal from top of file
    if (typeof modal !== 'undefined' && event.target == modal) {
        if(modalImg) {
            modalImg.classList.remove('welcome-appear');
            modalImg.classList.add('welcome-disappear');
        }
        setTimeout(() => { modal.style.display = "none"; }, 300);
    }
    if (typeof countdownModal !== 'undefined' && event.target == countdownModal) {
        if(countdownContent) {
            countdownContent.classList.remove('welcome-appear');
            countdownContent.classList.add('welcome-disappear');
        }
        setTimeout(() => { countdownModal.style.display = "none"; }, 300);
    }
}

