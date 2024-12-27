// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXyuYE2G5mKdK5waXGW9Hp6ikbZq4xZU4",
  authDomain: "budgetwise-bd45b.firebaseapp.com",
  projectId: "budgetwise-bd45b",
  storageBucket: "budgetwise-bd45b.appspot.com", // Fixed the typo: "firebasestorage.app" -> "appspot.com"
  messagingSenderId: "261302568938",
  appId: "1:261302568938:web:5ac6eaf2f39c45e6821493",
  measurementId: "G-B66PJGD4KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle form submission for account creation
const authForm = document.getElementById("authForm");

if (authForm) {
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      // Validate email and password
      if (!email || !password) {
        throw new Error("Email and password cannot be empty.");
      }

      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully:", userCredential.user);

      // Redirect to the dashboard/home page
      window.location.href = "dashboard.html"; // Update to your actual dashboard page
    } catch (error) {
      // Handle errors
      console.error("Error creating account:", error.message);

      // Display error message to the user
      const errorMessageElement = document.getElementById("errorMessage");
      if (errorMessageElement) {
        errorMessageElement.textContent = error.message;
      } else {
        alert(error.message);
      }
    }
  });
}

// Automatically redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "dashboard.html"; // Redirect logged-in users
  }
});
