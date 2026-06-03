// Initialize Lucide Icons
lucide.createIcons();

// --- INTERACTIVE BACKGROUND MOUSE TRACKING ---
window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  document.documentElement.style.setProperty('--mouse-x', `${x}px`);
  document.documentElement.style.setProperty('--mouse-y', `${y}px`);
});

// --- 1. HEADER SCROLL EFFECT ---
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- 2. MOBILE MENU TOGGLE ---
const mobileToggle = document.getElementById('menu-toggle-btn');
const headerLogoLink = document.getElementById('header-logo-link');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = mobileToggle.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.setAttribute('data-lucide', 'x');
  } else {
    icon.setAttribute('data-lucide', 'menu');
  }
  lucide.createIcons();
});

// Close menu when clicking link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileToggle.querySelector('i').setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});


// --- 3. DYNAMIC TYPING EFFECT ---
const words = ['Digital Screens', 'Highway Gantries', 'Airport Lounges', 'Premium Mall Pods'];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingContainer = document.getElementById('typing-text');

function type() {
  const currentWord = words[wordIdx];
  
  if (isDeleting) {
    typingContainer.textContent = currentWord.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingContainer.textContent = currentWord.substring(0, charIdx + 1);
    charIdx++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIdx === currentWord.length) {
    typeSpeed = 1500; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    wordIdx = (wordIdx + 1) % words.length;
    typeSpeed = 400; // Pause before typing new word
  }

  setTimeout(type, typeSpeed);
}

// Start typing effect on load
setTimeout(type, 500);


// --- 4. COUNT-UP STATS ANIMATION ---
const statsSection = document.querySelector('.stats');
const statElements = [
  { id: 'stat-screens', target: 200000, suffix: '+', current: 0 },
  { id: 'stat-billboards', target: 100000, suffix: '+', current: 0 },
  { id: 'stat-cities', target: 15, suffix: '', current: 0 },
  { id: 'stat-billing', target: 750, suffix: '+ Cr', current: 0 }
];

let statsAnimated = false;

function animateStats() {
  const rect = statsSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

  if (isVisible && !statsAnimated) {
    statsAnimated = true;
    statElements.forEach(el => {
      const element = document.getElementById(el.id);
      const duration = 1500; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOutQuad = progress * (2 - progress); // Easing curve
        
        el.current = Math.floor(easeOutQuad * el.target);
        element.textContent = el.current.toLocaleString() + el.suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          element.textContent = el.target.toLocaleString() + el.suffix;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);


// --- 5. INTERACTIVE CAMPAIGN PLANNER ---
const budgetSlider = document.getElementById('budget-slider');
const budgetDisplay = document.getElementById('budget-display');
const contactBudget = document.getElementById('contact-budget');

const citySelectors = document.querySelectorAll('#planner-city-selectors .city-btn');
const personaSelectors = document.querySelectorAll('#planner-persona-selectors .persona-card');

const resImpressions = document.getElementById('res-impressions');
const resReach = document.getElementById('res-reach');
const resLift = document.getElementById('res-lift');
const chartProgress = document.getElementById('chart-progress');

// Progress bars & text indicators
const allocPctDooh = document.getElementById('alloc-pct-dooh');
const allocPctAirport = document.getElementById('alloc-pct-airport');
const allocPctTransit = document.getElementById('alloc-pct-transit');
const allocBarDooh = document.getElementById('alloc-bar-dooh');
const allocBarAirport = document.getElementById('alloc-bar-airport');
const allocBarTransit = document.getElementById('alloc-bar-transit');

// Planner configs & rates
const plannerConfig = {
  cities: {
    mumbai: { weight: 1.25, lift: 5 },
    delhi: { weight: 1.2, lift: 4 },
    bangalore: { weight: 1.15, lift: 3 },
    pune: { weight: 1.0, lift: 2 },
    hyderabad: { weight: 1.1, lift: 3 }
  },
  personas: {
    professionals: { 
      impressionsPerRupee: 3.5, 
      reachFactor: 0.16, 
      lift: 65,
      alloc: { dooh: 60, airport: 25, transit: 15 }
    },
    shoppers: { 
      impressionsPerRupee: 4.2, 
      reachFactor: 0.14, 
      lift: 72,
      alloc: { dooh: 50, airport: 15, transit: 35 }
    },
    travelers: { 
      impressionsPerRupee: 2.2, 
      reachFactor: 0.18, 
      lift: 78,
      alloc: { dooh: 25, airport: 65, transit: 10 }
    },
    commuters: { 
      impressionsPerRupee: 5.5, 
      reachFactor: 0.12, 
      lift: 58,
      alloc: { dooh: 30, airport: 10, transit: 60 }
    }
  }
};

// Formatter for Currency
function formatCurrency(val) {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(1)} Cr`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

// Shortener for high numbers
function formatCompact(val) {
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1)}M`;
  } else if (val >= 1000) {
    return `${(val / 1000).toFixed(0)}K`;
  }
  return val;
}

// Calculate and render media plan recommendations
function calculatePlan() {
  const budget = parseInt(budgetSlider.value);
  
  // Format displays
  budgetDisplay.textContent = formatCurrency(budget);
  contactBudget.value = formatCurrency(budget);

  // 1. Calculate active cities weights & lift additions
  let activeCitiesCount = 0;
  let cityWeightSum = 0;
  let cityLiftSum = 0;
  
  citySelectors.forEach(btn => {
    if (btn.classList.contains('active')) {
      const cityKey = btn.dataset.city;
      activeCitiesCount++;
      cityWeightSum += plannerConfig.cities[cityKey].weight;
      cityLiftSum += plannerConfig.cities[cityKey].lift;
    }
  });

  // Default weight if no city selected
  if (activeCitiesCount === 0) {
    cityWeightSum = 0.5;
    cityLiftSum = 1;
  } else {
    cityWeightSum = cityWeightSum / activeCitiesCount;
  }

  // 2. Get active persona weight
  let activePersona = 'professionals';
  personaSelectors.forEach(card => {
    if (card.classList.contains('active')) {
      activePersona = card.dataset.persona;
    }
  });

  const pConfig = plannerConfig.personas[activePersona];

  // 3. Compute core output calculations
  const rawImpressions = budget * pConfig.impressionsPerRupee * cityWeightSum;
  const rawReach = rawImpressions * pConfig.reachFactor;
  
  // Brand recall lift percentage (cap at 98%)
  const computedLift = Math.min(pConfig.lift + cityLiftSum, 98);

  // Update dynamic metrics
  resImpressions.textContent = formatCompact(rawImpressions);
  resReach.textContent = formatCompact(rawReach);
  resLift.textContent = `${computedLift}%`;

  // Update SVG donut chart progress (radius = 55, perimeter = 2 * PI * r = ~345.5)
  const perimeter = 2 * Math.PI * 55;
  const dashOffset = perimeter - (computedLift / 100) * perimeter;
  chartProgress.style.strokeDashoffset = dashOffset;

  // 4. Update Media Mix progress bars
  const finalAlloc = pConfig.alloc;
  allocPctDooh.textContent = `${finalAlloc.dooh}%`;
  allocPctAirport.textContent = `${finalAlloc.airport}%`;
  allocPctTransit.textContent = `${finalAlloc.transit}%`;

  allocBarDooh.style.width = `${finalAlloc.dooh}%`;
  allocBarAirport.style.width = `${finalAlloc.airport}%`;
  allocBarTransit.style.width = `${finalAlloc.transit}%`;
}

// Setup Planner Event Listeners
budgetSlider.addEventListener('input', calculatePlan);

citySelectors.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    calculatePlan();
  });
});

personaSelectors.forEach(card => {
  card.addEventListener('click', () => {
    personaSelectors.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    calculatePlan();
  });
});

// Initial run
calculatePlan();


// --- 6. INTERACTIVE INDIA COVERAGE MAP ---
const mapPins = document.querySelectorAll('.map-pin');
const mapPlaceholder = document.getElementById('map-placeholder-widget');
const mapDetailCard = document.getElementById('map-city-data-widget');

// City data specifications
const mapData = {
  delhi: {
    city: 'Delhi NCR',
    region: 'National Capital Territory',
    screens: '850+',
    reach: '4.2M Weekly',
    dwell: '5.2 Mins',
    lift: '+18% Peak',
    locations: ['Cyber City DLF', 'IGI Airport T3 Arrivals', 'Noida Express Linkways', 'Connaught Place Ringroad']
  },
  mumbai: {
    city: 'Mumbai',
    region: 'Financial Hub',
    screens: '920+',
    reach: '5.6M Weekly',
    dwell: '6.5 Mins',
    lift: '+21% Peak',
    locations: ['Bandra-Worli Sea Link Gantries', 'CSIA Airport T2 departures', 'Western Express Highway LED', 'Lower Parel High-Streets']
  },
  bangalore: {
    city: 'Bangalore',
    region: 'Tech Corridor',
    screens: '580+',
    reach: '3.1M Weekly',
    dwell: '4.8 Mins',
    lift: '+16% Peak',
    locations: ['Outer Ring Road Bulletins', 'Electronic City Flyover Portals', 'Kempegowda Airport Arrivals', 'Indiranagar Hubs']
  },
  pune: {
    city: 'Pune',
    region: 'Industrial & Tech Hub',
    screens: '320+',
    reach: '1.8M Weekly',
    dwell: '3.8 Mins',
    lift: '+12% Peak',
    locations: ['Hinjewadi IT Gates', 'Koregaon Park Junctions', 'Pune-Mumbai Expressway Portals', 'Viman Nagar Lifestyle Malls']
  },
  hyderabad: {
    city: 'Hyderabad',
    region: 'Deccan Tech Hub',
    screens: '410+',
    reach: '2.4M Weekly',
    dwell: '4.2 Mins',
    lift: '+15% Peak',
    locations: ['HITEC City Cyber Towers', 'RGIA Airport Terminals', 'Gachibowli Outer Ringroad', 'Jubilee Hills Hubs']
  }
};

const detailCityName = document.getElementById('detail-city-name');
const detailCityRegion = document.getElementById('detail-city-region');
const detailCityScreens = document.getElementById('detail-city-screens');
const detailCityReach = document.getElementById('detail-city-reach');
const detailCityDwell = document.getElementById('detail-city-dwell');
const detailCityLift = document.getElementById('detail-city-lift');
const detailCityLocations = document.getElementById('detail-city-locations');

function activateMapCity(cityKey) {
  // Update Pin visual statuses
  mapPins.forEach(p => p.classList.remove('active'));
  const activePin = document.querySelector(`.map-pin[data-target-city="${cityKey}"]`);
  if (activePin) activePin.classList.add('active');

  // Load details
  const cData = mapData[cityKey];
  if (cData) {
    mapPlaceholder.style.display = 'none';
    mapDetailCard.classList.add('active');
    
    // Transition variables
    detailCityName.textContent = cData.city;
    detailCityRegion.textContent = cData.region;
    detailCityScreens.textContent = cData.screens;
    detailCityReach.textContent = cData.reach;
    detailCityDwell.textContent = cData.dwell;
    detailCityLift.textContent = cData.lift;

    // Reset list and reload
    detailCityLocations.innerHTML = '';
    cData.locations.forEach(loc => {
      const span = document.createElement('span');
      span.className = 'location-tag';
      span.textContent = loc;
      detailCityLocations.appendChild(span);
    });
  }
}

// Add Map Pin Listeners
mapPins.forEach(pin => {
  pin.addEventListener('click', () => {
    const cityKey = pin.dataset.targetCity;
    activateMapCity(cityKey);
  });
});

// Auto-activate Delhi on load to showcase detail immediately
activateMapCity('delhi');


// --- 7. PORTFOLIO MEDIA GALLERY CAROUSEL ---
const galleryTrack = document.getElementById('gallery-slider-track');
const prevBtn = document.getElementById('gallery-prev-btn');
const nextBtn = document.getElementById('gallery-next-btn');

let currentSlideIdx = 0;

function getSlideWidth() {
  const item = document.querySelector('.gallery-item');
  const margin = 32; // match gap: 2rem = 32px
  return item.getBoundingClientRect().width + margin;
}

function updateSliderPosition() {
  const slideWidth = getSlideWidth();
  galleryTrack.style.transform = `translateX(-${currentSlideIdx * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  const totalItems = document.querySelectorAll('.gallery-item').length;
  // Calculate max slides visible
  let visibleSlides = 3;
  if (window.innerWidth <= 1024) visibleSlides = 2;
  if (window.innerWidth <= 768) visibleSlides = 1;

  if (currentSlideIdx < totalItems - visibleSlides) {
    currentSlideIdx++;
  } else {
    currentSlideIdx = 0; // loop back
  }
  updateSliderPosition();
});

prevBtn.addEventListener('click', () => {
  if (currentSlideIdx > 0) {
    currentSlideIdx--;
  } else {
    const totalItems = document.querySelectorAll('.gallery-item').length;
    let visibleSlides = 3;
    if (window.innerWidth <= 1024) visibleSlides = 2;
    if (window.innerWidth <= 768) visibleSlides = 1;
    currentSlideIdx = totalItems - visibleSlides; // loop to end
  }
  updateSliderPosition();
});

// Reposition on window resize
window.addEventListener('resize', () => {
  currentSlideIdx = 0;
  updateSliderPosition();
});


// --- 8. PROPOSAL BRIEF BUILDER CONTACT FORM ---
const contactForm = document.getElementById('brief-builder-form');
const successAlert = document.getElementById('form-success-alert');
const submitBtn = document.getElementById('contact-submit-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Submitting Proposal to Server...';
  
  const payload = {
    name: document.getElementById('contact-name').value,
    email: document.getElementById('contact-email').value,
    brand: document.getElementById('contact-brand').value,
    budget: document.getElementById('contact-budget').value,
    brief: document.getElementById('contact-brief').value
  };

  fetch('/api/proposal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw new Error(err.message || 'Server error occurred'); });
    }
    return response.json();
  })
  .then(result => {
    if (result.success) {
      submitBtn.style.display = 'none';
      successAlert.style.display = 'block';
      successAlert.innerHTML = `<i data-lucide="check-circle" style="display:inline-block; vertical-align:middle; margin-right:8px; width:20px;"></i> ${result.message}`;
      lucide.createIcons();
      
      // Clear inputs
      document.getElementById('contact-name').value = '';
      document.getElementById('contact-email').value = '';
      document.getElementById('contact-brand').value = '';
      document.getElementById('contact-brief').value = '';
    } else {
      throw new Error(result.message || 'Failed to submit proposal brief.');
    }
  })
  .catch(error => {
    console.error('Error submitting brief:', error);
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Request Complete Proposal <i data-lucide="send"></i>';
    alert('Failed to submit campaign brief: ' + error.message);
  });
});

// --- 9. THEME / APPEARANCE STYLE TOGGLE ---
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
  // Read initial theme preference or default to 'dark'
  const initialTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'radiance' : 'dark';
    
    // Set theme attribute on root html element
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!themeToggleBtn) return;
  const icon = themeToggleBtn.querySelector('i');
  if (icon) {
    if (theme === 'radiance') {
      icon.setAttribute('data-lucide', 'sun'); // sun icon for light radiance mode
    } else {
      icon.setAttribute('data-lucide', 'moon'); // moon icon for cyber grid dark mode
    }
    // Redraw Lucide icons
    lucide.createIcons();
  }
}

