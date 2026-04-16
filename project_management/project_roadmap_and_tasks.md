# AI Agency – Project Roadmap & Task Breakdown

This document breaks down the active and upcoming phases of the Elevate (Intelligent OD) platform into actionable tasks, detailing exact actions and testing requirements for each step.

---

## **Phase 3: Learning Platform & Firebase Integration (In Progress)**
*Phase Documentation:* Focuses on connecting the static frontend UI with Firebase services (Auth & Firestore) to allow user logins and track individual course progress securely.

### **Task 3.1: Finalize Firebase Configuration & Security**
* **Description:** Ensure the project correctly imports Firebase without exposing private credentials to public repositories.
* **Actions:**
  1. Verify `.gitignore` includes `js/firebaseConfig.js`.
  2. Implement `firebaseConfig.example.js` exactly as a template with placeholder keys.
  3. Ensure `firebaseClient.js` correctly imports the local `firebaseConfig.js`.
* **Testing Requirements:**
  - [x] Running a git status confirms `firebaseConfig.js` is ignored.
  - [x] Opening `login.html` locally loads the script without "Firebase Configuration not found" console errors.
  - [x] **Verified:** Rotated API key (R-005 resolved). Login logic functioning.

### **Task 3.2: User Authentication Loop**
* **Description:** Allow users to sign up and log in via Email/Password or Google, redirecting them to the dashboard upon success.
* **Actions:**
  1. Attach event listeners to the forms in `login.html`.
  2. Make `handleEmailPasswordLogin`, `handleEmailPasswordSignup`, and `handleGoogleLogin` from `firebaseClient.js` trigger on form submission.
  3. Use `observeAuthState` to redirect authenticated users to `dashboard.html`.
  4. Store/fetch user's Full Name in Firestore during signup/login.
* **Testing Requirements:**
  - [x] Successfully sign up a test user email in the UI.
  - [x] Confirm the new user appears in the Firebase Authentication Console.
  - [x] Ensure a logged-in user who navigates to `login.html` is instantly redirected to `dashboard.html`.
  - [x] Full Name persists across sessions.

### **Task 3.3: Link Dashboard to Firestore Progress**
* **Description:** Retrieve the authenticated user's video watch history and course progress to dynamically populate the dashboard.
* **Actions:**
  1. Implement `observeUserProgress` using Firestore's `onSnapshot`.
  2. Dynamically render course cards for in-progress modules.
  3. Support "Empty States" for brand new users.
* **Testing Requirements:**
  - [x] Dashboard displays "Empty State" for new users with no progress data.
  - [x] If progress documents are manually added to Firestore for a specific UID, the dashboard successfully retrieves and displays them in real-time.
### **Task 3.4: AI Agency – Portfolio Rebranding**
* **Description:** Transition the platform from a standalone product into the flagship showcase of a broader AI Agency portfolio.
* **Actions:**
  1. Rebrand documentation headers to "AI Agency".
  2. Implement the new high-resolution `logo-white-transparent.png` across all 6+ pages.
* **Testing Requirements:**
  - [x] All 6 pages show the consistent Agency logo in header and footer.
  - [x] Login/Signup pages reflect the new professional branding.

### **Task 3.5: Mobile Navigation & Unification**
* **Description:** Resolve the "invisible" mobile menu and standardize the navigation structure across all pages.
* **Actions:**
  1. Standardize `nav-container` and `nav-header` IDs across all flagship pages.
  2. Implement high-visibility (Cyan) active states for the mobile toggle ("X").
  3. Boost mobile menu `z-index` to 20,000 to prevent content overlap.
* **Testing Requirements:**
  - [x] Mobile menu is clickable and visible on 400px viewports (R-006 resolved).
  - [x] Hamburger icon turns to a high-contrast "X" when clicked.
  - [x] `navbar.js` is active and functional on all pages.

### **Task 3.6: Professional Mobile Branding Alignment**
* **Description:** Refine site-wide mobile layouts (Home, About, Insights) to a left-aligned, authoritative design system.
* **Actions:**
  1. Standardize all headers (H1-H3) to `text-align: left` on mobile viewports.
  2. Implement consistent `1.5rem` left-padding across all major content containers.
  3. Force-align badges (Black Pills) and founder bios to the left margin.
  4. Fix "Head-Chopping" on team portraits by adjusting height/contain rules on mobile.
* **Testing Requirements:**
  - [x] **Verified:** Mobile Home page 'Meet Kash' section is perfectly left-aligned.
  - [x] **Verified:** Team bios in `about.html` use browser-native chevrons with no redundant arrows.
  - [x] **Verified:** Flagship section bio text is snapped to the left margin.
  - [x] **Verified:** Featured LinkedIn insight card is full-width and has a premium cyan glow.

---

## **Phase 4: Monetization & Refinement (Upcoming)**
*Phase Documentation:* Upgrading the platform into a revenue-generating machine by adding Stripe integration for course gating, dynamic content filtering, and polished aesthetics.

### **Task 4.1: Stripe Course Gating**
* **Description:** Protect premium video courses so they can only be viewed by active subscribers.
* **Actions:**
  1. Implement the Firebase Stripe Extension.
  2. Update `course-details.html` to read Stripe subscription claims via `checkTierAccess()` before playing the full video.
  3. Restrict non-subscribers to a 15-second teaser clip snippet.
* **Testing Requirements:**
  - [ ] A non-subscribed user clicks play: exactly 15 seconds plays, then the video pauses with a "Subscribe to Continue" overlay.
  - [ ] A subscribed user is allowed to watch the entire video without interruption.
  - [ ] Direct linking to the raw unauthenticated video asset via the browser returns a 403 Forbidden.

### **Task 4.2: Dynamic Insights & Categories**
* **Description:** Convert `insights.html` into a fully dynamic blog that renders posts directly from Firestore to allow content scaling.
* **Actions:**
  1. Standardize a `posts` collection in Firestore with fields: title, summary, category, date, content.
  2. Write UI logic in `insights.html` to fetch and render preview cards.
  3. Implement JavaScript filtering logic so users can sort tags (e.g. "Leadership", "Strategy").
* **Testing Requirements:**
  - [ ] Clicking the "Strategy" tag immediately updates the UI to show only Strategy articles.
  - [ ] Fetching 10+ posts renders smoothly without layout-breaking overlap in the Bento grid.

### **Task 4.3: Dark/Light Mode Theme Persistence**
* **Description:** Ensure the user's preferred visual aesthetic (dark or light mode) persists across all pages using local storage.
* **Actions:**
  1. Set up a toggle switch in the `navbar`.
  2. Implement a JavaScript check for `localStorage.getItem('theme')` on `DOMContentLoaded`.
  3. Append a `.dark-theme` class to the `body` tag based on user preference.
* **Testing Requirements:**
  - [ ] Clicking the toggle successfully swaps color CSS variables.
  - [ ] Refreshing the page immediately applies the saved theme without a flash of the wrong color.

### **Task 3.7: Dashboard & Auth UX Refinement (Sprints ELE-10, 11, 12)**
* **Description:** Implement a professional, collapsible sidebar for the authenticated dashboard and refine the white-theme login experience.
* **Actions:**
  1. Build a collapsible Sidebar infrastructure with 280px (expanded) and 80px (collapsed) modes.
  2. Implement split-toggle logic for desktop (Arrow-collapse) and mobile (Hamburger drawer).
  3. Swap to the **Dark Logo Variant** (`logo-transparent.png`) for all light-themed surfaces (Dashboard Navbar, White Login Card).
  4. Migrate the `login.html` to a pure-white background for a modern, airy aesthetic.
* **Testing Requirements:**
  - [x] **Verified:** Dashboard sidebar collapses/expands smoothly without pushing video content below the fold.
  - [x] **Verified:** Mobile navigation uses an off-canvas drawer with no overflow issues.
  - [x] **Verified:** Login branding is crisp and visible (Dark logo on white background).
  - [x] **Verified:** All social login buttons have high contrast (Google/LinkedIn text is visible).

### **Task 3.8: Intelligent OD Brand System & UI Kit (ELE-20)**
* **Description:** Create a complete brand system and UI component library for a premium leadership consultancy.
* **Actions:**
  1. Define strict color palette (Navy, Charcoal, White, Slate, Blue, Gold).
  2. Implement typography scale (Playfair Display / Inter).
  3. Build comprehensive UI showcase in `brand-system.html`.
* **Testing Requirements:**
  - [x] **Verified:** `brand-system.html` renders all components with 100% brand fidelity.
  - [x] **Verified:** CSS variables are centrally managed and scalable.

### **Task 3.9: Dusk Akeneo PIM Strategic Roadmap (ELE-21)**
* **Description:** Build a professional Reveal.js presentation for the Dusk Akeneo PIM implementation.
* **Actions:**
  1. Create a 10-slide, dark-mode presentation.
  2. Implement granular 5-phase breakdown with human-centric strategic insights.
  3. Integrate live Linear governance document links.
* **Testing Requirements:**
  - [x] **Verified:** Presentation reframed for "Dusk" stakeholders with simplified language.
  - [x] **Verified:** KPI slide includes -70% manual work and -40% launch time metrics.

---

## **Dusk Project: Akeneo PIM Implementation (Milestone Planning)**
*Strategy Note:* This project is structured into **5 Linear Milestones** to provide total visibility into delivery progress. Each milestone represents a critical logic gate that must be validated before moving to the next stage.

### **Milestone: Phase 1 – Audit & Discovery**
*   **[1.1] Tech Stack Review ([ELE-23](https://linear.app/elevate-od/issue/ELE-23))**: 
    - *Spec:* Full audit of NetSuite, Shopify, and local spreadsheet master files to expose hidden inconsistencies.
    - *Test:* Confirm 'Price' and 'SKU' match across all audited platforms.
*   **[1.2] Data Health Check**: 
    - *Spec:* Identifying data gaps, broken labels, and missing attributes across the current ecosystem.
    - *Test:* Generate health report showing 100% attribute alignment.
*   **[1.3] Data Flow Mapping**: 
    - *Spec:* Creating the technical blueprint for the final, automated "Golden Record" data flow.
    - *Test:* Architectural sign-off on automated sync logic.

### **Milestone: Phase 2 – Structural Design**
*   **[2.1] Catalog Architecture ([ELE-26](https://linear.app/elevate-od/issue/ELE-26))**: 
    - *Spec:* Defining the attribute families and categories that fit Dusk's 'Luxury for Less' editorial standards.
    - *Test:* Successfully fetch Attribute lists via API sandbox.
*   **[2.2] Team Permissions**: 
    - *Spec:* Designing user access levels: who creates, who reviews, and who publishes the final data.
    - *Test:* Role-based access control (RBAC) validation.
*   **[2.3] Quality Rules**: 
    - *Spec:* Setting the validation rules that guarantee 99% accuracy across every product channel.
    - *Test:* Failed upload test for data missing mandatory attributes.

### **Milestone: Phase 3 – Integration & Automation**
*   **[3.1] NetSuite Integration**: 
    - *Spec:* Setting up the automated, real-time sync between NetSuite (Oracle) and Akeneo PIM.
    - *Test:* Bi-directional sync confirmed for core item master.
*   **[3.2] Shopify Integration ([ELE-30](https://linear.app/elevate-od/issue/ELE-30))**: 
    - *Spec:* Building the 'Publishing' rules for Shopify to ensure product data is live in seconds.
    - *Test:* Run deduplication on a 100-record sample; verify 0 errors remain.
*   **[3.3] End-to-End Testing**: 
    - *Spec:* Rigorous testing of automated flows to prevent data collisions or system overlaps.
    - *Test:* Full lifecycle test (ERP -> PIM -> Shopify) completed in < 60s.

### **Milestone: Phase 4 – Migration & Cleansing**
*   **[4.1] Data Cleansing**: 
    - *Spec:* Mass scrubbing of duplicates and broken characters from the current legacy files.
    - *Test:* 100% clean data import into staging environment.
*   **[4.2] Historical Migration ([ELE-33](https://linear.app/elevate-od/issue/ELE-33))**: 
    - *Spec:* Safe bulk migration into the Akeneo staging environment for final review.
    - *Test:* Verify "New Item" appears in Shopify draft within 60s of creation.
*   **[4.3] Go-Live Validation**: 
    - *Spec:* Ensuring the data in Akeneo exactly matches the requirements of Shopify and ERP.
    - *Test:* Final stakeholder sign-off on product data integrity.

### **Milestone: Phase 5 – Launch & Autonomy**
*   **[5.1] Process Playbooks**: 
    - *Spec:* Visual 'how-to' guides for different departments to ensure total independence.
    - *Test:* Successful completion of task by user relying solely on playbooks.
*   **[5.2] Team Onboarding ([ELE-36](https://linear.app/elevate-od/issue/ELE-36))**: 
    - *Spec:* Hands-on workshops with the actual tools to confirm team readiness.
    - *Test:* Team leads confirmed competent in Akeneo administration.
*   **[5.3] Post-Launch Support**: 
    - *Spec:* On-call support for the first 30 days post-launch to guarantee a smooth transition.
    - *Test:* SLA compliance check for triage and resolution.
