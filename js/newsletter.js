/**
 * NEWSLETTER LOGIC - ELE-14
 * Handles capture of premium leads into Firestore.
 */
import { db } from './firebaseClient.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('newsletter-overlay');
    const form = document.getElementById('newsletter-form');
    const closeBtn = document.getElementById('newsletter-close');
    const successRef = document.getElementById('newsletter-success-box');
    const formContainer = document.getElementById('newsletter-form-container');

    // 1. PERSISTENCE CHECK
    if (localStorage.getItem('elevate_newsletter_dismissed')) {
        return; // Already seen or subscribed
    }

    // 2. TRIGGER LOGIC
    let isShown = false;

    const showModal = () => {
        if (isShown || localStorage.getItem('elevate_newsletter_dismissed')) return;
        isShown = true;
        
        // Clear all triggers
        clearTimeout(timer);
        window.removeEventListener('scroll', scrollHandler);
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    // Time-based (5s)
    const timer = setTimeout(showModal, 5000);

    // Scroll-based
    function scrollHandler() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollHeight) * 100;
        
        if (scrollPercent > 50) {
            showModal();
        }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true });

    // 3. CLOSE LOGIC
    closeBtn.addEventListener('click', () => {
        dismissModal();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) dismissModal();
    });

    const dismissModal = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        localStorage.setItem('elevate_newsletter_dismissed', 'true');
        
        // Ensure everything is cleared if user closes it before triggers fire (rare but good practice)
        clearTimeout(timer);
        window.removeEventListener('scroll', scrollHandler);
    };

    // 4. FIRESTORE SUBMISSION
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        const submitBtn = form.querySelector('button');
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Signing up...';

        try {
            await addDoc(collection(db, "leads"), {
                email: email,
                timestamp: serverTimestamp(),
                source: 'Landing Page popup',
                status: 'active'
            });

            // Show Success State
            formContainer.style.display = 'none';
            successRef.classList.add('active');
            
            // Auto-close after 2 seconds
            setTimeout(dismissModal, 2000);
        } catch (error) {
            console.error("Lead Capture Error:", error);
            alert("Error joining. Please try again.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Get Insights';
        }
    });
});
