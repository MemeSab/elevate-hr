/**
 * Global Navbar Logic
 * Handles mobile menu toggle and scroll effects.
 */
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const yearSpan = document.getElementById('year');

    // 1. Mobile Menu Toggle
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 2. Scroll Effect (for pages where navbar isn't permanently scrolled)
    const navLogo = document.getElementById('nav-logo');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (navLogo) navLogo.src = 'images/logo.png';
        } else {
            // Only remove if it's not a dashboard or fixed-style page
            if (!document.body.classList.contains('dashboard-page') && 
                !document.body.classList.contains('scrolled-page') &&
                !document.body.classList.contains('auth-page')) {
                navbar.classList.remove('scrolled');
                if (navLogo) navLogo.src = 'images/logo-white-transparent.png';
            }
        }
    });

    // Check on load in case page is already scrolled or needs fixed navbar
    if (window.scrollY > 50 || 
        document.body.classList.contains('dashboard-page') || 
        document.body.classList.contains('scrolled-page') ||
        document.body.classList.contains('auth-page')) {
        navbar.classList.add('scrolled');
        if (navLogo) navLogo.src = 'images/logo.png';
    }

    // 3. Footer Year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
