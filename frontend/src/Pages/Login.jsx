import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Play, Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import the hook

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const authenticateWithBackend = async (credential) => {
    setIsLoading(true);
    try {
      const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;

      const { data } = await axios.post(BACKEND_URL, {
        idToken: credential,
      });

      if (data.success) {
        // USE CONTEXT HERE
        login(data.user, data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Backend Auth Error:", err);
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please try again."
      );
      setIsLoading(false);
    }
  };

  // ... (The rest of your UI JSX remains exactly the same) ...
  return (
    // ... same UI code ...
    // Just ensure you keep the UI code from before,
    // I am omitting it here to save space, but DO NOT DELETE IT.
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* ... paste your previous UI here ... */}
      {/* Ensure GoogleLogin calls authenticateWithBackend */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          authenticateWithBackend(credentialResponse.credential);
        }}
        // ...
      />
      {/* ... */}
    </div>
  );
};

export default Login;
