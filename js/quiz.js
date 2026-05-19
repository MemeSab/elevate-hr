/**
 * quiz.js - Interactive Logic for Kash Haroon Reflection Quiz
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const screens = [
        'screen-start',
        'screen-q1',
        'screen-q2',
        'screen-q3',
        'screen-q4',
        'screen-q5',
        'screen-q6',
        'screen-capture',
        'screen-loading',
        'screen-results'
    ];
    
    let currentScreenIndex = 0;
    
    // Outcome tracking
    const scores = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };
    
    const outcomesData = {
        1: {
            headline: "You’re growing into leadership while still making sense of what leadership means for you.",
            body: "The early years of leadership often feel far more uncertain than people admit. You do not need to perform certainty to begin leading well.",
            primaryCTA: "Book a Free Chemistry Call",
            primaryLink: "mailto:admin@intelligentod.co.uk",
            secondaryCTA: "Learn More About Leadership Coaching",
            secondaryLink: "services.html"
        },
        2: {
            headline: "You’re carrying leadership responsibility in a system that feels emotionally and operationally demanding.",
            body: "The challenge may not be your capability. It may be the weight and complexity you are trying to hold alone.",
            primaryCTA: "Book a Free Chemistry Call",
            primaryLink: "mailto:admin@intelligentod.co.uk",
            secondaryCTA: "Explore Services",
            secondaryLink: "services.html"
        },
        3: {
            headline: "The challenge appears bigger than one individual leader.",
            body: "Your organisation may not need more information. It may need the conditions, practices and leadership behaviours that allow people to work differently together.",
            primaryCTA: "Book a Free Chemistry Call",
            primaryLink: "mailto:admin@intelligentod.co.uk",
            secondaryCTA: "Explore Organisational Development Support",
            secondaryLink: "services.html"
        },
        4: {
            headline: "You’re looking for practical tools you can apply immediately.",
            body: "The right framework can save hours of reinvention and bring clarity to complex work.",
            primaryCTA: "Browse the Library",
            primaryLink: "templates.html",
            secondaryCTA: "Explore AI-Augmented OD Tools",
            secondaryLink: "templates.html"
        }
    };
    
    // Initial Setup
    updateProgressBar();
    
    // Hide header if in iframe
    if (window.self !== window.top) {
        const header = document.querySelector('.quiz-header');
        if(header) header.style.display = 'none';
    }
    
    // Bind option buttons
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Visual feedback
            const siblings = this.parentElement.querySelectorAll('.option-btn');
            siblings.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            
            // Record score
            const outcomeData = this.getAttribute('data-outcome');
            if(outcomeData) {
                const outcomes = outcomeData.split(',');
                outcomes.forEach(out => {
                    const id = out.trim();
                    if (scores[id] !== undefined) {
                        scores[id]++;
                    }
                });
            }
            
            // Wait slightly for visual feedback, then move to next screen
            setTimeout(() => {
                nextScreen();
            }, 400);
        });
    });
    
    // Global functions for inline handlers
    window.startQuiz = function() {
        nextScreen();
    };
    
    window.skipAndCapture = function() {
        nextScreen();
    };
    
    window.submitTextAndCapture = function() {
        const text = document.getElementById('hardest-input').value;
        // In a real app, send this to backend/analytics
        console.log("User's hardest challenge:", text);
        nextScreen();
    };
    
    window.showResults = function() {
        const email = document.getElementById('email-input').value;
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // In a real app, send email + scores to backend/CRM
        console.log("Captured Email:", email);
        console.log("Final Scores:", scores);
        
        // Transition to Loading Screen
        transitionTo('screen-loading');
        
        // Simulate synthesis time
        setTimeout(() => {
            calculateAndDisplayResult();
            transitionTo('screen-results');
        }, 2500);
    };
    
    // Navigation Logic
    function nextScreen() {
        if (currentScreenIndex < screens.length - 1) {
            const currentId = screens[currentScreenIndex];
            const nextId = screens[currentScreenIndex + 1];
            transitionBetween(currentId, nextId);
            currentScreenIndex++;
            updateProgressBar();
        }
    }
    
    function transitionBetween(outId, inId) {
        const outElem = document.getElementById(outId);
        const inElem = document.getElementById(inId);
        
        if(outElem) {
            outElem.classList.remove('active');
            outElem.classList.add('fade-out');
            setTimeout(() => {
                outElem.classList.remove('fade-out');
            }, 600); // match CSS transition duration
        }
        
        if(inElem) {
            // small delay so out animation has time to start
            setTimeout(() => {
                inElem.classList.add('active');
            }, 300);
        }
    }
    
    function transitionTo(inId) {
        // Hide all screens
        screens.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.classList.contains('active')) {
                el.classList.remove('active');
                el.classList.add('fade-out');
                setTimeout(() => el.classList.remove('fade-out'), 600);
            }
        });
        
        setTimeout(() => {
            document.getElementById(inId).classList.add('active');
        }, 300);
    }
    
    function updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        // Total steps = start (0) + 6 questions = 7. Capture, loading, results don't advance the bar the same way
        const totalQuestionSteps = 6;
        
        if (currentScreenIndex === 0) {
            progressBar.style.width = '0%';
        } else if (currentScreenIndex <= totalQuestionSteps) {
            const progress = (currentScreenIndex / totalQuestionSteps) * 100;
            progressBar.style.width = `${progress}%`;
        } else if (currentScreenIndex > totalQuestionSteps) {
            progressBar.style.width = '100%';
        }
    }
    
    function calculateAndDisplayResult() {
        // Find highest score
        let maxScore = -1;
        let winningOutcome = 1;
        
        for (let i = 1; i <= 4; i++) {
            if (scores[i] > maxScore) {
                maxScore = scores[i];
                winningOutcome = i;
            }
        }
        
        // For tie-breakers, it simply takes the first one (lower index).
        // This naturally prioritizes Coaching/Individual support over org if tied.
        
        const data = outcomesData[winningOutcome];
        
        // Populate Result UI
        document.getElementById('result-headline').innerText = data.headline;
        document.getElementById('result-body').innerText = data.body;
        
        const primaryBtn = document.getElementById('primary-cta');
        primaryBtn.innerText = data.primaryCTA;
        primaryBtn.href = data.primaryLink;
        primaryBtn.target = data.primaryLink.startsWith('mailto:') ? '_self' : '_parent';
        
        const secondaryBtn = document.getElementById('secondary-cta');
        secondaryBtn.innerText = data.secondaryCTA;
        secondaryBtn.href = data.secondaryLink;
        secondaryBtn.target = '_parent';
    }
});
