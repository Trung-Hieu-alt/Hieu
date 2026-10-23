// --- CHUỖI HIỆU ỨNG INTRO ---
function runSequence() {
    const startBtn = document.getElementById('start-btn');
    const timeline = document.getElementById('timeline-container');
    const eventCards = document.querySelectorAll('.event-card');
    const xOverlay = document.getElementById('x-overlay');
    const conclusionBox = document.getElementById('conclusion-box');

    // 1. Ẩn nút bắt đầu
    if (startBtn) startBtn.style.display = 'none';

    // 2. Hiện lưới các ô mốc
    if (timeline) timeline.style.display = 'grid';

    // 3. Hiện từng ô mốc lần lượt với nhịp điệu mượt mà
    let lastDelay = 0;
    eventCards.forEach((card, index) => {
        lastDelay = (index + 1) * 900;
        setTimeout(() => {
            card.classList.add('show');
        }, lastDelay);
    });

    // 4. Khi hiện xong -> Vẽ 2 nét Chữ X đỏ trực tiếp đè lên các ô
    const xDelay = lastDelay + 600;
    setTimeout(() => {
        if (xOverlay) xOverlay.classList.add('show');
        eventCards.forEach(c => c.classList.add('crossed'));
    }, xDelay);

    // 5. Hiện câu chốt kết luận
    const conclusionDelay = xDelay + 1600;
    setTimeout(() => {
        if (conclusionBox) {
            conclusionBox.classList.add('show');
        }
        spawnHearts();
    }, conclusionDelay);

    // 6. Tự động chuyển tiếp sang Video
    setTimeout(() => {
        openVideoStep();
    }, conclusionDelay + 3800);
}

// --- Chuyển sang Video ---
function openVideoStep() {
    const introContent = document.getElementById('intro-content');
    if (introContent) {
        introContent.style.opacity = '0';
        introContent.style.transform = 'scale(0.9)';
        introContent.style.transition = 'all 0.5s ease';
    }
    
    setTimeout(() => {
        if (introContent) introContent.style.display = 'none';
        const videoStep = document.getElementById('video-step');
        if (videoStep) videoStep.style.display = 'flex';
        
        const vid = document.getElementById('rewardVideo');
        if (vid) vid.play().catch(e => console.log("Trình duyệt chặn autoplay, chờ bấm play."));
    }, 500);
}

// --- Mở giao diện chính ---
function openMain() {
    const vid = document.getElementById('rewardVideo');
    if (vid) vid.pause();

    const overlay = document.getElementById('intro-overlay');
    if (overlay) overlay.style.opacity = '0';
    
    setTimeout(() => {
        if (overlay) overlay.style.display = 'none';
        
        const mainContent = document.getElementById('main-content');
        const decor1 = document.getElementById('decor1');
        const decor2 = document.getElementById('decor2');

        if (mainContent) mainContent.style.display = 'block';
        if (decor1) decor1.style.opacity = '1';
        if (decor2) decor2.style.opacity = '1';
        
        spawnHearts(); 
    }, 800);
}

// --- Hiệu ứng trái tim bay lơ lửng ---
function spawnHearts() {
    const emojis = ['💋', '❤️', '💖', '✨', '🌸', '🌹'];
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.position = 'fixed';
        el.style.left = '50vw';
        el.style.top = '50vh';
        el.style.fontSize = (20 + Math.random() * 25) + 'px';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '99999';
        el.style.transition = 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        document.body.appendChild(el);

        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 250; 
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        setTimeout(() => {
            el.style.transform = `translate(${tx}px, ${ty}px) scale(1.4)`;
            el.style.opacity = '0';
        }, 10);
        setTimeout(() => el.remove(), 1500);
    }
}

// --- Đồng hồ đếm ngược ---
const targetDate = new Date(2026, 10, 13, 0, 0, 0).getTime(); // 13/11/2026

function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const updateHTML = (d, h, m, s) => {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(h).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(m).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(s).padStart(2, '0');
    };

    if (diff > 0) {
        updateHTML(
            Math.floor(diff / (1000 * 60 * 60 * 24)),
            Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            Math.floor((diff % (1000 * 60)) / 1000)
        );
    } else {
        const timerStatus = document.getElementById('timer-status');
        if (timerStatus) timerStatus.innerText = "Trung Hiếu & Thu Hà đã bên nhau được 🎉";
        
        const pastDiff = Math.abs(diff);
        updateHTML(
            Math.floor(pastDiff / (1000 * 60 * 60 * 24)),
            Math.floor((pastDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            Math.floor((pastDiff % (1000 * 60 * 60)) / (1000 * 60)),
            Math.floor((pastDiff % (1000 * 60)) / 1000)
        );
    }
}

setInterval(updateTimer, 1000);
updateTimer();