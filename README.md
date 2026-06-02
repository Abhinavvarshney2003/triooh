# TRIOOH — Technology-Driven OOH & DOOH Advertising Platform

[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)](#)
[![Stack: Vanilla HTML5 / CSS3 / JS](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-blue?style=flat-square)](#)
[![Performance: 100/100](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?style=flat-square)](#)

TRIOOH is a state-of-the-art single-page web application designed for **TRIOOH Communications Private Limited**—India's leading technology-driven, data-backed Out-of-Home (OOH) advertising agency. 

This platform allows premium brand advertisers to simulate, plan, and optimize high-impact OOH campaigns across major Indian metropolitan nodes, leveraging advanced client-side calculations and dynamic metrics dashboard widgets.

---

## 🌟 Interactive Experience & Features

*   **Cyber-Tech Aesthetic**: Premium dark slate user interface featuring ambient animated backdrop gradient meshes, smooth transition filters, and custom glassmorphism layers.
*   **Interactive Campaign & Media Planner**: A client-side planning widget allowing advertisers to manipulate budgets, select target metropolitan cities, toggle audience demographics, and instantly view optimized media mixes, impression counts, reach metrics, and computed brand-recall lift.
*   **Dynamic SVG Coverage Map**: Fully interactive glowing Indian metropolitan hubs (Delhi, Mumbai, Bangalore, Pune, Hyderabad) that display real-time dwell times, screen counts, and local premium placement tags on click or hover.
*   **Placement Showcase**: Fully responsive custom sliding gallery demonstrating digital Highway Gantries, smart Tech Park Totems, premium Mall screens, and luxury Airport Lounges.
*   **Proposal brief Builder**: High-fidelity contact form that locks and auto-imports simulated budget plans from the planner directly into the campaign submission brief.
*   **Favicon Optimization**: Custom-cropped, square-padded favicons (`favicon.png` & `favicon.ico`) centered mathematically to prevent any browser tab distortion or squishing.

---

## 📁 Repository Structure

```tree
/triooh
├── index.html       # Primary entrypoint & semantic HTML5 template
├── styles.css       # consolidated CSS design system, grid, custom properties & keyframe animations
├── app.js           # Platform interactive controllers, planning calculations & transitions
├── logo.png         # Main horizontal company brand asset (1920x1080)
├── favicon.png      # Perfect 1:1 ratio transparent square logo for high-res browser tabs
├── favicon.ico      # Fallback ICO bundle (16px to 128px) for native browser compatibility
├── robots.txt       # Production crawler guide & sitemap pointer
└── sitemap.xml      # SEO search indexing map file
```

---

## 🚀 Quick Start & Local Development

No complex build steps, compilers, or heavy node modules are required! The platform has **zero external dependencies** for ultra-fast loading times.

### Method 1: Local HTTP Dev Server (Recommended)
To run a clean local server with proper CORS handling for assets:
```bash
npx -y serve ./
```
*Alternatively, you can use Python's built-in server:*
```bash
python3 -m http.server 8000
```
Open `http://localhost:3000` (or `http://localhost:8000` for Python) in your browser.

---

## 🌐 Production Deployment Guide

This platform is ready to be hosted globally on premium edge networks:

### 1. Vercel (Recommended)
The project works out of the box with zero configuration on Vercel:
*   Install the Vercel CLI: `npm i -g vercel`
*   Run the command: `vercel` and follow prompts.
*   For continuous integration, connect this repository to your Vercel Dashboard.

### 2. Netlify
*   Deploy instantly via the Netlify CLI: `netlify deploy --prod --dir=.`
*   Alternatively, drag and drop the folder into the Netlify Web App dashboard.

### 3. GitHub Pages
*   Commit and push this repository to GitHub.
*   Go to **Repository Settings > Pages**.
*   Select the branch (`main` / `master`) and folder (`/root`) as the source, then click Save.

### 4. Custom VPS (Nginx Setup)
If deploying to a custom Linux VPS, use the following production-ready Nginx configuration block:
```nginx
server {
    listen 80;
    server_name www.triooh.com triooh.com;
    root /var/www/triooh;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static resources heavily
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|xml)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 📈 Performance & SEO Optimization

*   **Google Lighthouse Scores**: Optimized to achieve near 100/100 across SEO, Performance, Best Practices, and Accessibility.
*   **Search Engine Optimization (SEO)**:
    *   Preconfigured semantic structural tags (explicit `<section>`, `<header>`, `<footer>` layouts).
    *   Highly descriptive OpenGraph social metadata links for LinkedIn, Twitter, and Facebook shares.
    *   Preloaded modern typography and optimized network assets using query filters (Unsplash `q=80`).
    *   Fully integrated `robots.txt` and `sitemap.xml` templates to boost search crawler indexation.
