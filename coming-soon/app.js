document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Cursor Spotlight Effect (Mouse Coordinate Tracker)
  const glowElement = document.getElementById('mouse-glow');
  document.addEventListener('mousemove', (e) => {
    if (glowElement) {
      const x = e.clientX;
      const y = e.clientY;
      glowElement.style.setProperty('--mouse-x', `${x}px`);
      glowElement.style.setProperty('--mouse-y', `${y}px`);
    }
  });

  // 3. Countdown Timer Logic
  // Set target date: 30 days into the future from current load
  const countdownDuration = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  let targetDate = localStorage.getItem('cs_target_date');
  
  if (!targetDate) {
    targetDate = Date.now() + countdownDuration;
    localStorage.setItem('cs_target_date', targetDate);
  } else {
    targetDate = parseInt(targetDate, 10);
    // If target date has already passed, reset it for 15 days in future
    if (targetDate < Date.now()) {
      targetDate = Date.now() + 15 * 24 * 60 * 60 * 1000;
      localStorage.setItem('cs_target_date', targetDate);
    }
  }

  const daysVal = document.getElementById('days');
  const hoursVal = document.getElementById('hours');
  const minutesVal = document.getElementById('minutes');
  const secondsVal = document.getElementById('seconds');

  function updateCountdown() {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (daysVal) daysVal.innerText = '00';
      if (hoursVal) hoursVal.innerText = '00';
      if (minutesVal) minutesVal.innerText = '00';
      if (secondsVal) secondsVal.innerText = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysVal) daysVal.innerText = days.toString().padStart(2, '0');
    if (hoursVal) hoursVal.innerText = hours.toString().padStart(2, '0');
    if (minutesVal) minutesVal.innerText = minutes.toString().padStart(2, '0');
    if (secondsVal) secondsVal.innerText = seconds.toString().padStart(2, '0');
  }

  // Initial call and run interval
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. Notification Form Submission Mock (Vercel deployment ready)
  const notifyForm = document.getElementById('notify-form');
  const formMsg = document.getElementById('form-msg');

  if (notifyForm && formMsg) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('subscriber-email');
      const email = emailInput.value.trim();
      
      // Standard email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMsg.className = 'form-message error';
        formMsg.innerText = 'Please enter a valid business email address.';
        return;
      }

      // Simulate API submit call with loader
      const submitBtn = notifyForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="btn-icon animate-spin"></i>';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      setTimeout(() => {
        // Success response
        formMsg.className = 'form-message success';
        formMsg.innerHTML = '<i data-lucide="check-circle" style="width:16px; display:inline; vertical-align:middle; margin-right:4px;"></i> Subscribed! We will keep you updated.';
        emailInput.value = '';
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        // Save locally to simulate subscription storage
        let subscribers = JSON.parse(localStorage.getItem('cs_subscribers') || '[]');
        subscribers.push({ email, timestamp: new Date().toISOString() });
        localStorage.setItem('cs_subscribers', JSON.stringify(subscribers));

        // Auto clear message after 5 seconds
        setTimeout(() => {
          formMsg.innerText = '';
          formMsg.className = 'form-message';
        }, 5000);

      }, 1200);
    });
  }
});
