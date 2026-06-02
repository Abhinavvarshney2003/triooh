# TRIOOH — Technology-Driven OOH & DOOH Backend Web Platform

[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)](#)
[![Stack: Node.js / Express.js](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express.js-green?style=flat-square)](#)
[![Database: campaigns.json](https://img.shields.io/badge/Database-JSON%20File-orange?style=flat-square)](#)

TRIOOH is a state-of-the-art server-side web application powered by **Node.js** and **Express.js**, custom-built for **TRIOOH Communications Private Limited**—India's leading technology-driven, data-backed Out-of-Home (OOH) advertising agency. 

This platform allows premium brand advertisers to simulate, plan, and optimize high-impact OOH campaigns across major Indian metropolitan nodes, leveraging dynamic backend calculators and persistent campaign brief submissions.

---

## 🌟 Interactive Experience & Backend Features

*   **Node.js / Express Server**: Unified CommonJS backend server supporting static resource pipelines, JSON payload parser middleware, and REST API routing.
*   **Active Campaigns API Endpoint (`POST /api/proposal`)**: Standardized endpoint receiving advertiser details, validating them server-side, and saving records synchronously.
*   **Lightweight Persistence (`campaigns.json`)**: Persistent JSON database storing campaign proposals with unique IDs and automated ISO entry timestamps.
*   **Cyber-Tech Aesthetic**: Premium dark slate user interface featuring ambient animated backdrop gradient meshes, smooth transition filters, and custom glassmorphism layers.
*   **Interactive Campaign & Media Planner**: A client-side planning widget allowing advertisers to manipulate budgets, select target metropolitan cities, toggle audience demographics, and instantly view optimized media mixes, impression counts, reach metrics, and computed brand-recall lift.
*   **Dynamic SVG Coverage Map**: Fully interactive glowing Indian metropolitan hubs (Delhi, Mumbai, Bangalore, Pune, Hyderabad) that display real-time dwell times, screen counts, and local premium placement tags on click or hover.
*   **Placement Showcase**: Fully responsive custom sliding gallery demonstrating digital Highway Gantries, smart Tech Park Totems, premium Mall screens, and luxury Airport Lounges.

---

## 📁 Repository Structure

```tree
/triooh
├── public/                 # All public-facing static assets served by Nginx or Express
│   ├── index.html          # Semantic HTML5 template
│   ├── styles.css          # consolidate CSS design system & animations
│   ├── app.js              # Interactive controllers & live API fetch calls
│   ├── logo.png            # Main company brand asset
│   ├── favicon.png         # High-resolution tab favicon PNG
│   ├── favicon.ico         # Backward-compatible favicon ICO
│   ├── robots.txt          # Crawler instructions
│   └── sitemap.xml         # Crawler index map sitemap
├── server.js               # Node.js Express server entrypoint & REST router
├── package.json            # Node project configuration & dependency list
├── package-lock.json       # Strict NPM locked package tree
├── campaigns.json          # Persistent JSON database storing campaign proposals
├── .gitignore              # Production-grade Git ignore filters
└── README.md               # Production-grade developer guidelines
```

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
Open your terminal inside the `/triooh` project directory and install the necessary package dependencies:
```bash
npm install
```

### 2. Start the Node.js Server
Spin up the local backend server:
```bash
npm start
```
*   The console will output: `🚀 TRIOOH Express Backend launched successfully!`
*   Open your browser to: **[http://localhost:3000](http://localhost:3000)** to explore!

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
