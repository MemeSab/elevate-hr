# Intelligent OD – Master Project Context

This is the authoritative knowledge beacon for the Intelligent OD (Elevate) platform. It provides a high-fidelity snapshot of the project's identity, technical architecture, and branding standards to ensure continuity in future AI-assisted engineering sessions.

---

## 🏗️ Technical Architecture
*   **Core Stack**: HTML5, Vanilla CSS, Vanilla JavaScript.
*   **Backend Ecosystem**: Firebase (Authentication, Cloud Firestore, Firebase Storage).
*   **Monetization Engine**: Stripe (Checkout Extension & Payments).
*   **Development Server**: Python HTTP Server (Localhost:8000).
*   **Environment Strategy**: Local-First development with strict `.js` config key management (ignored by Git tracking).

---

## 🎨 Branding & Visual Standards
*   **Primary Hero Logo**: `images/logo-white-transparent.png` (used on dark hero sections).
*   **Sticky / Sub-Page Logo**: `images/logo.png` (High-contrast Black-Box "OD" variant, used on white headers).
*   **Vibrant Nav Pop**: Sky Blue (`#38BDF8`) – This is the specific hub for both active indicators (Home) and the high-contrast "Log In / Register" link on dark hero backgrounds.
*   **Typography**: `Inter` and `Outfit` fonts for an authoritative, modern SaaS aesthetic.

---

## ⚙️ Layout & Navigation Logic
*   **Dynamic Sticky Transition**: Managed by `js/navbar.js`. It programmatically swaps the logo `src` from white to black-box the moment the user scrolls 50px+.
*   **Sub-Page Force Branding**: Pages like `about.html`, `services.html`, `courses.html`, and `insights.html` use the `scrolled-page` body class. This forces the white sticky header and black-box logo on page-load to avoid render visibility delay.
*   **Mobile Experience**: Standardized left-alignment and high-index (z=20,000) layering for navigation menus to ensure high-fidelity interactions on all devices.

---

## 📈 Status & Roadmap (as of 2026-04-06)
*   **Project Health**: 🟢 **HEALTHY**
*   **Last Milestone Shipped**: Phase 3 Global Branding & Authentication Sync (ELE-13).
*   **Current Risk Management**: 
    *   **R-007 (Resolved)**: Branding invisibility on scroll/load fixed via JS logic.
    *   **R-003 (Open)**: Video content security (Video Teaser limits vs full MP4 access).
    *   **R-004 (Open)**: Stripe webhook latency / Optimistic UI updates.

---

*Verified and persistent. Safe for progression.*
