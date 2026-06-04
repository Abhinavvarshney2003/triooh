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
  { id: 'stat-screens', target: 50, suffix: 'M+', current: 0 },
  { id: 'stat-billboards', target: 125, suffix: '+', current: 0 },
  { id: 'stat-cities', target: 450, suffix: '+', current: 0 },
  { id: 'stat-billing', target: 5000, suffix: '+', current: 0 }
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
    kolkata: { weight: 1.1, lift: 3 }
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


// --- 6. INTERACTIVE DELHI NCR LEAFLET MAP ---
const mapPlaceholder = document.getElementById('map-placeholder-widget');
const mapDetailCard = document.getElementById('map-city-data-widget');

// City data specifications with real geographic coordinates
const mapData = {
  'connaught-place': {
    city: 'Connaught Place',
    region: 'Central Delhi Hub',
    screens: '120+',
    reach: '1.5M Weekly',
    dwell: '5.5 Mins',
    lift: '+18% Peak',
    locations: ['Inner Circle LEDs', 'Outer Ring Road Gantries', 'Palika Bazaar Portals', 'Janpath Digital Bulletins'],
    coords: [28.6304, 77.2177],
    pinClass: 'pin-connaught'
  },
  'igi-airport': {
    city: 'IGI Airport T3',
    region: 'Transit Hub (Indira Gandhi Int\'l Airport)',
    screens: '340+',
    reach: '2.8M Weekly',
    dwell: '8.0 Mins',
    lift: '+22% Peak',
    locations: ['T3 Arrivals Digital Totems', 'T3 Departure Pillar LEDs', 'Baggage Claim Videowalls', 'Duty Free Walkway Displays'],
    coords: [28.5562, 77.1000],
    pinClass: 'pin-igi'
  },
  'cyber-city': {
    city: 'Cyber City NH-8',
    region: 'Gurugram Corporate Corridor',
    screens: '260+',
    reach: '2.1M Weekly',
    dwell: '6.2 Mins',
    lift: '+20% Peak',
    locations: ['Cyber Hub Cyberwalk LEDs', 'DLF Phase II & III Portals', 'NH-8 Toll Gate Gantries', 'Rapid Metro Station Displays'],
    coords: [28.4950, 77.0878],
    pinClass: 'pin-cyber'
  },
  'noida-expressway': {
    city: 'Noida Expressway',
    region: 'East Delhi & Noida Linkways',
    screens: '130+',
    reach: '1.2M Weekly',
    dwell: '4.5 Mins',
    lift: '+15% Peak',
    locations: ['DND Flyway Gantries', 'Sector 18 Market LEDs', 'Film City Linkway Portals', 'Noida Greater Link LEDs'],
    coords: [28.5355, 77.3450],
    pinClass: 'pin-noida'
  }
};

const detailCityName = document.getElementById('detail-city-name');
const detailCityRegion = document.getElementById('detail-city-region');
const detailCityScreens = document.getElementById('detail-city-screens');
const detailCityReach = document.getElementById('detail-city-reach');
const detailCityDwell = document.getElementById('detail-city-dwell');
const detailCityLift = document.getElementById('detail-city-lift');
const detailCityLocations = document.getElementById('detail-city-locations');

// --- Initialize Leaflet Map ---
const delhiCenter = [28.55, 77.18];
const coverageMap = L.map('coverage-map', {
  center: delhiCenter,
  zoom: 11,
  zoomControl: true,
  scrollWheelZoom: false,  // Prevent accidental scroll hijack
  attributionControl: false
});

// Tile layer URLs
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

// Determine initial theme and set matching tile layer
let currentTileLayer = null;

function setMapTiles(theme) {
  const tileUrl = theme === 'radiance' ? LIGHT_TILES : DARK_TILES;
  if (currentTileLayer) {
    coverageMap.removeLayer(currentTileLayer);
  }
  currentTileLayer = L.tileLayer(tileUrl, {
    maxZoom: 18,
    subdomains: 'abcd'
  }).addTo(coverageMap);
}

// Set initial tiles based on current theme
const initTheme = document.documentElement.getAttribute('data-theme') || 'radiance';
setMapTiles(initTheme);

// --- Create Custom Markers ---
const leafletMarkers = {};

function createPinIcon(pinClass) {
  return L.divIcon({
    className: `custom-map-pin`,
    html: `<div class="map-pin ${pinClass}" style="position:relative;">
             <div class="pin-pulse"></div>
             <div class="pin-core"></div>
           </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
}

// Place markers on the map
Object.keys(mapData).forEach(cityKey => {
  const city = mapData[cityKey];
  const marker = L.marker(city.coords, {
    icon: createPinIcon(city.pinClass)
  }).addTo(coverageMap);

  marker.on('click', () => {
    activateMapCity(cityKey);
  });

  leafletMarkers[cityKey] = marker;
});

// --- Activate City Detail Panel ---
function activateMapCity(cityKey) {
  // Remove active class from all marker pin elements
  document.querySelectorAll('.custom-map-pin .map-pin').forEach(p => p.classList.remove('active'));

  // Add active to selected marker
  const selectedMarker = leafletMarkers[cityKey];
  if (selectedMarker) {
    const markerEl = selectedMarker.getElement();
    if (markerEl) {
      const pinDiv = markerEl.querySelector('.map-pin');
      if (pinDiv) pinDiv.classList.add('active');
    }
    // Smooth pan to the clicked location
    coverageMap.panTo(mapData[cityKey].coords, { animate: true, duration: 0.5 });
  }

  // Load details
  const cData = mapData[cityKey];
  if (cData) {
    mapPlaceholder.style.display = 'none';
    mapDetailCard.classList.add('active');

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

// Auto-activate Connaught Place on load
activateMapCity('connaught-place');


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
  const initialTheme = localStorage.getItem('theme') || 'radiance';
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'radiance';
    const newTheme = currentTheme === 'dark' ? 'radiance' : 'dark';
    
    // Set theme attribute on root html element
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Sync Leaflet map tiles with the new theme
    setMapTiles(newTheme);
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


// --- 10. SPA ROUTING & SMOOTH SCROLLING ---
document.addEventListener('DOMContentLoaded', () => {
  // Handle clicking on navigation links
  const navLinks = document.querySelectorAll('a[href^="/"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Allow external links (if any) to behave normally
      if (link.getAttribute('target') === '_blank') return;
      
      e.preventDefault();
      const path = new URL(link.href).pathname; // e.g. "/home"
      const sectionId = path === '/' ? 'home' : path.substring(1); // e.g. "home"
      
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        // Push state to browser history
        window.history.pushState(null, '', path);
        
        // Smooth scroll to section, offset by header height
        const headerOffset = document.getElementById('main-header').offsetHeight || 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navUl = document.querySelector('nav ul');
        if (navUl && navUl.classList.contains('active')) {
          navUl.classList.remove('active');
        }
      } else if (path === '/home') {
        // Fallback for /home if id="home" isn't strictly on the first section
        window.history.pushState(null, '', path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const sectionId = path === '/' ? 'home' : path.substring(1);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = document.getElementById('main-header').offsetHeight || 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else if (path === '/home' || path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Handle direct load (e.g. user hits enter on http://localhost:3000/planner)
  setTimeout(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/home') {
      const sectionId = path.substring(1);
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        const headerOffset = document.getElementById('main-header').offsetHeight || 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }, 300); // small delay to ensure rendering before scroll jump
});
