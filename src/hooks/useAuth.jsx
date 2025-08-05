import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/api/authService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const savedUser = localStorage.getItem("learnhub_user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      }
    } catch (err) {
      console.error("Auth initialization error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError("");
      const userData = await authService.login(email, password);
      setUser(userData);
      localStorage.setItem("learnhub_user", JSON.stringify(userData));
      toast.success("Welcome back!");
      return userData;
    } catch (err) {
      const errorMessage = err.message || "Failed to log in";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const signup = async (email, password, name) => {
    try {
      setError("");
      const userData = await authService.signup(email, password, name);
      setUser(userData);
      localStorage.setItem("learnhub_user", JSON.stringify(userData));
      toast.success("Account created successfully!");
      return userData;
    } catch (err) {
      const errorMessage = err.message || "Failed to create account";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("learnhub_user");
    toast.success("Logged out successfully");
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (user.is_admin) return true;
    
    switch (requiredRole) {
      case "free":
        return true;
      case "member":
        return ["member", "master", "both"].includes(user.role);
      case "master":
        return ["master", "both"].includes(user.role);
      case "both":
        return user.role === "both";
      default:
        return false;
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    hasRole,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};