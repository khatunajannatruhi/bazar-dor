# 🛒 BazarDor (বাজার দর) — Daily Commodity Market Price Tracker

A modern, responsive, and real-time commodity price tracking web application built to empower consumers with transparent, up-to-date market information across essential daily goods—including rice, lentils, edible oils, vegetables, fish, and meat across major markets in Bangladesh.

---

## 🌟 Project Overview

**BazarDor** bridges the information gap between wholesale agricultural markets and retail consumers. By aggregating real-time price fluctuations, historical trends, and market-specific rate cards, BazarDor enables consumers to make informed shopping decisions and track daily market volatility at a glance.

---

## 🚀 5 Key Features

1. **Live Marquee Price Ticker**
   - An infinite-scrolling ticker bar positioned beneath the main navigation, displaying essential commodity names, units, current prices in BDT, and daily percentage movement indicators (`▲` / `▼` / `—`).

2. **Daily Market Movers Analysis (Sections A & B)**
   - **Top Risers (আজ দাম বেড়েছে ▲):** Automatically computes and highlights the top 6 commodities with the steepest daily price increases.
   - **Top Fallers (আজ দাম কমেছে ▼):** Highlights the top 6 commodities with notable price drops compared to the previous day.

3. **Bengali Numeral Numerical Sorting (Challenge C1)**
   - Custom sorting algorithm that parses localized Bengali numerals into true numeric values. Users can sort all commodities effortlessly by:
     - `Default` (ডিফল্ট)
     - `Price: Low to High` (দাম: কম থেকে বেশি)
     - `Price: High to Low` (দাম: বেশি থেকে কম)

4. **Protected Product Details & Regional Market Breakdown**
   - Authentication-guarded detailed routes (`/product/[slug]`) offering:
     - Comprehensive price summary: Lowest Market Price, Average Market Price, and Highest Market Price.
     - Divisional filtering and granular rates across prominent hubs (Karwan Bazar, Mirpur 1, New Market, Khatunganj, etc.).
     - Historical price comparisons across yesterday, last week, and last month.

5. **Secure Authentication & Profile Update (BetterAuth & Challenge C3)**
   - Powered by **BetterAuth** with MongoDB session persistence.
   - Dual-mode authentication supporting traditional Email/Password credentials as well as direct OAuth via **Google** and **GitHub** (with official vector SVG icons).
   - Dedicated profile management route (`/profile/update`) allowing authenticated users to update their profile name with live client and storage synchronization.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | Full-stack React framework utilizing the modern App Router |
| **TypeScript** | Type safety, maintainability, and clean code architecture |
| **Tailwind CSS v4** | Modern utility-first styling with custom animation keyframes |
| **BetterAuth** | Secure authentication supporting email/password and OAuth providers |
| **MongoDB** | Cloud database adapter for persistent auth storage |
| **Lucide React** | Clean, accessible iconography |
| **React Hot Toast** | Non-intrusive, interactive toast notifications |
| **Hind Siliguri** | Optimized Google font tailored for Bengali typography |

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18.18.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/khatunajannatruhi/bazar-dor.git
   cd bazar-dor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory based on `.env.example`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 API Reference

The application interfaces with standard commodity data endpoints:

- **All Products:** `https://openapi.programming-hero.com/api/bazardor/products`
- **Filter by Category:** `https://openapi.programming-hero.com/api/bazardor/products?category={category}`
- **Single Product Details:** `https://openapi.programming-hero.com/api/bazardor/products/{id}`
- **Categories:** `https://openapi.programming-hero.com/api/bazardor/categories`

---

## 📬 Submission Details

- **GitHub Repository Link:** [https://github.com/khatunajannatruhi/bazar-dor.git](https://github.com/khatunajannatruhi/bazar-dor.git)
- **Live Deployment Link:** *(Add your deployed production URL here)*
