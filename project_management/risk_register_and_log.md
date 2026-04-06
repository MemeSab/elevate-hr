# AI Agency – Risk Register & Issue Log

This document is used to track anything that is not going to plan. Continually update this register as problems surface during development so they can be effectively tracked, prioritized, and mitigated.

---

## 🛑 Active Risks & Issues

| Risk ID | Date Logged | Description & Impact | Severity / Priority | Mitigation Strategy / Next Action | Status | Owner |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **R-001** | `2026-04-04` | **Firebase Configuration Leak:** The real API key was accidentally pushed to the `.example.js` file on GitHub, compromising the backend quota limits. | **High** | Rotated the API Key in the Firebase console. Reset the `.example` file to placeholders and created a locally ignored `.js` file to hold the actual keys. | **Resolved** | Team |
| **R-002** | `2026-04-04` | **Localhost Preview Friction:** Missing `firebaseConfig.js` file prevents `firebaseClient.js` from loading, causing vanilla JS errors that block local testing. | **Medium** | Reset the ignored `firebaseConfig.js` with new keys and restarted the python HTTP server on port 8000. | **Resolved** | UI Dev |
| **R-003** | `TBD` | **Video Content Theft:** Unauthenticated users discovering the direct MP4 URLs inside the DOM Inspector, bypassing the 15-second Stripe Paywall limitation. | **High** | Implement Firebase Storage Security Rules that strictly validate `auth.token.stripeRole == "premium"` before issuing download URLs. | **Blocked** | Backend |
| **R-005** | `2026-04-06` | **Firebase Key Rotation Complete:** Expired/Leaked API key resolved via manual console rotation and authoritative `.gitignore` updates. | **High** | Rotated keys and secured `.gemini/` directory. | **✅ Resolved** | Team |
| **R-004** | `TBD` | **Stripe Extension Complexity:** Synchronizing Firebase claims with Stripe webhook latency could lead to users not getting instant access to courses after payment. | **Medium** | Implement a local UI "optimistic update" animation and utilize Firebase `onSnapshot` to trigger access purely upon the document update. | **Open** | Team |
| **R-006** | `2026-04-05` | **Mobile Menu Failure:** The hamburger menu and overlay links are inconsistent or non-functional on several pages despite logo fixes. | **High** | Layered the menu at 20,000 z-index and standardized the JS listeners. | **✅ Resolved** | UI Dev |
| **R-007** | `2026-04-06` | **Global Branding Invisibility:** Navbar logo appearing invisible on white scrolled headers or sub-page loads (White-on-White). | **High** | Implemented dynamic JS logo swapping and `scrolled-page` body classes to force branding on load. | **✅ Resolved** | UI Dev |



---

## 📋 Instructions for Logging a New Risk
When an obstacle surfaces that disrupts the planned timeline:
1. **Assign** a new sequential `Risk ID` (e.g., R-005).
2. **Detail** the description honestly—focus on *why* this impacts the project timeline or architecture.
3. **Assign** Severity (`Low`, `Medium`, `High`, `Critical`).
4. **Log** the current strategy for fixing it. Update the "Status" to **Resolved** only when the mitigation proves successful and is committed.
