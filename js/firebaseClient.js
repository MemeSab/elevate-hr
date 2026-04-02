/**
 * Firebase Client Initialization & Architecture Guide
 * Note: You must include the Firebase modular SDK links in your HTML files.
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendSignInLinkToEmail, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// 1. INITIALIZATION
/**
 * SECURITY NOTE: 
 * Firebase API keys are designed to be public-facing. They are not 'secrets' in the traditional sense 
 * because they are required by the browser to connect to your project.
 * 
 * To SECURE your project: 
 * You MUST restrict this key in the Google Cloud Console (APIs & Services > Credentials) 
 * to your specific website domains (e.g., https://memesab.github.io/* and http://localhost/*).
 * This prevents anyone else from using your project quota.
 */
const firebaseConfig = {
    apiKey: "AIzaSyDlzBv-J-BfpNrf_8utpmqEM6kgm2tEwXI",
    authDomain: "elevate-hr-lms.firebaseapp.com",
    projectId: "elevate-hr-lms",
    storageBucket: "elevate-hr-lms.firebasestorage.app",
    messagingSenderId: "199833732949",
    appId: "1:199833732949:web:4cad7128094e697eb8d1dc",
    measurementId: "G-4MT96455D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Make available globally if using module
window.firebaseAuth = auth;
window.firebaseDb = db;

/**
 * Below are the architectural integration functions to connect your Vanilla UI 
 * with the new Firestore NoSQL backend.
 */

// --- AUTHENTICATION --- //

export async function handleEmailPasswordLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error };
    }
}

export async function handleEmailPasswordSignup(email, password, fullName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // You could save fullName to Firestore here
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error };
    }
}

export async function handleGoogleLogin() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return { user: result.user, error: null };
    } catch (error) {
        return { user: null, error };
    }
}

export async function handleLogout() {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        return { error };
    }
}

export function observeAuthState(callback) {
    return onAuthStateChanged(auth, callback);
}

export async function handleMagicLinkLogin(email) {
    const actionCodeSettings = {
        url: 'https://yourwebsite.com/dashboard.html',
        handleCodeInApp: true
    };
    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        return { error: null };
    } catch (error) {
        return { error };
    }
}

// --- LMS: COURSES & PROGRESS (Role-Based Access) --- //

/**
 * Checks if the current user has access to a specific tier (e.g. "Pro" or "Corporate")
 * This queries the 'subscriptions' subcollection created by the official Stripe Firebase Extension.
 */
export async function checkTierAccess(requiredTier) {
    const user = auth.currentUser;
    if (!user) return false;

    // Free tier is public
    if (requiredTier === 'free') return true;

    // Stripe extension stores subscriptions under customers/{uid}/subscriptions
    const subsRef = collection(db, `customers/${user.uid}/subscriptions`);
    const q = query(subsRef, where('status', 'in', ['trialing', 'active']));

    return new Promise((resolve) => {
        onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                resolve(false);
            } else {
                // You would check logic here to see if the requiredTier matches the Stripe product/role
                resolve(true);
            }
        }, (error) => {
            console.error(error);
            resolve(false);
        });
    });
}

/**
 * Updates learning progress with the specific timestamp for a lesson video
 * Pushes to the `progress` subcollection under the specific user.
 */
export async function updateVideoProgress(courseId, lessonId, currentTimeInSeconds, isFinished) {
    const user = auth.currentUser;
    if (!user) return;

    // Store progress under users/{uid}/progress/{courseId_lessonId}
    const progressRef = doc(db, `users/${user.uid}/progress/${courseId}_${lessonId}`);

    try {
        await setDoc(progressRef, {
            courseId: courseId,
            lessonId: lessonId,
            lastViewedTimestamp: currentTimeInSeconds,
            isCompleted: isFinished,
            updatedAt: new Date()
        }, { merge: true }); // Merge true works like upsert
    } catch (error) {
        console.error("Error saving progress:", error);
    }
}

// --- COMMUNITY FORUM (REAL-TIME) --- //

/**
 * Hooks up a real-time listener to a Firestore subcollection so the UI
 * updates immediately when someone replies.
 */
export function setupForumRealtime(threadId, onNewPostCallback) {
    // Posts stored in forum_threads/{threadId}/posts
    const postsRef = collection(db, `forum_threads/${threadId}/posts`);

    // Listen for real-time updates
    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log('New post received!', change.doc.data());
                onNewPostCallback(change.doc.data());
            }
        });
    });

    // Return unsubscribe function so we can stop listening when leaving page
    return unsubscribe;
}

// --- STORAGE BUCKETS --- //

/**
 * Fetches a secure download link for course resources (PDFs, templates).
 * Firebase Storage Rules handle the security part behind the scenes.
 */
export async function getSecureResourceDownload(fileName) {
    const resourceRef = ref(storage, `course-resources/templates/${fileName}`);

    try {
        const url = await getDownloadURL(resourceRef);
        return url;
    } catch (error) {
        console.error("Resource fetch failed", error);
        return null;
    }
}
