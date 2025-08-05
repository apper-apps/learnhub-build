import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import AuthModal from "@/components/molecules/AuthModal";
import ProgramDropdown from "@/components/molecules/ProgramDropdown";
import DarkModeToggle from "@/components/molecules/DarkModeToggle";
import { cn } from "@/utils/cn";

const TopNavigation = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: "Home" },
    { name: "Program", href: "/program", icon: "BookOpen", hasDropdown: true },
    { name: "Money Insight", href: "/money-insight", icon: "TrendingUp" },
    { name: "Reviews", href: "/reviews", icon: "Star" }
  ];

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 font-bold text-xl gradient-text"
            >
              <ApperIcon name="GraduationCap" size={28} className="text-primary-600" />
              <span>LearnHub Pro</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <button
                      onMouseEnter={() => setShowProgramDropdown(true)}
                      onMouseLeave={() => setShowProgramDropdown(false)}
                      className={cn(
                        "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                        isActive(item.href)
                          ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <ApperIcon name={item.icon} size={18} />
                      <span>{item.name}</span>
                      <ApperIcon name="ChevronDown" size={16} />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                        isActive(item.href)
                          ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <ApperIcon name={item.icon} size={18} />
                      <span>{item.name}</span>
                    </Link>
                  )}
                  
                  {item.hasDropdown && (
                    <div
                      onMouseEnter={() => setShowProgramDropdown(true)}
                      onMouseLeave={() => setShowProgramDropdown(false)}
                    >
                      <ProgramDropdown
                        isOpen={showProgramDropdown}
                        onClose={() => setShowProgramDropdown(false)}
                      />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Profile Link (only when authenticated) */}
              {isAuthenticated && (
                <Link
                  to="/profile"
                  className={cn(
                    "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive("/profile")
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  <ApperIcon name="User" size={18} />
                  <span>Profile</span>
                </Link>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <DarkModeToggle />
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Welcome, {user?.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <ApperIcon name="LogOut" size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                >
                  <ApperIcon name="LogIn" size={16} className="mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <DarkModeToggle />
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ApperIcon name={showMobileMenu ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-3 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setShowMobileMenu(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <ApperIcon name={item.icon} size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {isAuthenticated && (
                <Link
                  to="/profile"
                  onClick={() => setShowMobileMenu(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors",
                    isActive("/profile")
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <ApperIcon name="User" size={20} />
                  <span>Profile</span>
                </Link>
              )}
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="px-3 py-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Welcome, {user?.name}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left"
                    >
                      <ApperIcon name="LogOut" size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors w-full text-left"
                  >
                    <ApperIcon name="LogIn" size={20} />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default TopNavigation;