import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { 
    getAuth,
    setPersistence,                 
    browserLocalPersistence,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    EmailAuthProvider,
    linkWithCredential
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyD3jRmRT9sc_OryTu5DrAGKTTweU1lV5s4",
    authDomain: "my2dgame-7bad3.firebaseapp.com",
    projectId: "my2dgame-7bad3",
    storageBucket: "my2dgame-7bad3.firebasestorage.app",
    messagingSenderId: "237803647368",
    appId: "1:237803647368:web:f17db52c43699ccec6ca3d",
    measurementId: "G-RPX0V9QT6M"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Auth state persistence has been set to local.");
    })
    .catch((error) => {
        console.error("Error setting auth persistence:", error);
    });


const loginForm = document.getElementById("loginForm");
const loginErrorSection = document.getElementById("login-error-section");
const loginErrorMessage = document.getElementById("login-error-message");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (loginErrorSection) loginErrorSection.style.display = 'none'; // ซ่อน error ก่อนเสมอ

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const currentUser = auth.currentUser;

        if (currentUser && currentUser.isAnonymous) {
            const credential = EmailAuthProvider.credential(email, password);
            linkWithCredential(currentUser, credential)
                .then((usercred) => {
                    window.location.href = "dashboard.html";
                })
                .catch((error) => {
                     if (error.code === 'auth/invalid-login-credentials' || error.code === 'auth/user-not-found') {
                        if (loginErrorSection && loginErrorMessage) {
                            loginErrorMessage.textContent = "Oops! Incorrect email or password. Please try again or create a new account.";
                            loginErrorSection.style.display = 'block';
                        }
                    } else {
                        alert("Linking failed: " + error.message);
                    }
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    window.location.href = "dashboard.html";
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-login-credentials' || error.code === 'auth/user-not-found') {
                         if (loginErrorSection && loginErrorMessage) {
                            loginErrorMessage.textContent = "Oops! Incorrect email or password. Please try again or create a new account.";
                            loginErrorSection.style.display = 'block';
                        }
                    } else {
                        alert("Login failed: " + error.message);
                    }
                });
        }
    });
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // 1. เช็คก่อนว่ารหัสผ่าน 2 ช่องตรงกันมั้ย
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return; // หยุดทำงานถ้าไม่ตรง
        }

        // 2. เรียกใช้ฟังก์ชันสร้าง User ของ Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // สมัครสำเร็จ Firebase จะล็อกอินให้เลย
                const user = userCredential.user;
                console.log("User created and signed in:", user);
                alert("Sign up successful! Welcome!");
                
                // ย้ายไปหน้า dashboard เหมือนตอนล็อกอิน
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                // ถ้ามี Error เช่น อีเมลซ้ำ หรือรหัสผ่านสั้นไป
                console.error("Sign up failed:", error);
                alert("Sign up failed: " + error.message);
            });
    });
}

// โค้ดที่ถูกต้อง
onAuthStateChanged(auth, (user) => {
    const onPublicPage = !!(document.getElementById('loginForm') || document.getElementById('signupForm'));

    if (user) {
        if (onPublicPage) {
            window.location.href = "dashboard.html";
        }
        
        const protectedContent = document.getElementById("protectedContent");
        if (protectedContent) {
            protectedContent.style.display = "block";
        }

    } else { 
        if (!onPublicPage) { 
            window.location.href = "login.html";
        }
    }
});

window.logout = function() {
    signOut(auth)
        .then(() => {
            alert("Logged out successfully.");
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert("Logout failed: " + error.message);
        });
};