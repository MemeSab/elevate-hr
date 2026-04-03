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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            // Only remove if it's not a dashboard or fixed-style page
            if (!document.body.classList.contains('dashboard-page')) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 3. Footer Year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
