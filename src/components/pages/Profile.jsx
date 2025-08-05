import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="User" size={36} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Please sign in to view your profile and track your learning progress.
            </p>
            <Button asChild>
              <Link to="/">
                <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                Back to Home
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const getRoleVariant = (role) => {
    switch (role) {
      case "free": return "default";
      case "member": return "primary";
      case "master": return "secondary";
      case "both": return "both";
      default: return "default";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "free": return "Unlock";
      case "member": return "User";
      case "master": return "Crown";
      case "both": return "Users";
      default: return "Lock";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            My Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your account settings and track your learning progress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {user?.name || "User"}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {user?.email}
                </p>
                
                <div className="flex justify-center mb-6">
                  <Badge variant={getRoleVariant(user?.role)}>
                    <ApperIcon name={getRoleIcon(user?.role)} size={12} className="mr-1" />
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Member
                  </Badge>
                  
                  {user?.is_admin && (
                    <Badge variant="danger" className="ml-2">
                      <ApperIcon name="Shield" size={12} className="mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
                
                <Button variant="outline" className="w-full">
                  <ApperIcon name="Edit2" size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <ApperIcon name="BookOpen" size={24} className="mr-3 text-primary-600" />
                  Learning Progress
                </h3>
                
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="TrendingUp" size={24} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Start Your Journey
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Enroll in programs to track your learning progress here.
                  </p>
                  <Button asChild>
                    <Link to="/program">
                      <ApperIcon name="BookOpen" size={16} className="mr-2" />
                      Browse Programs
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Account Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <ApperIcon name="Settings" size={24} className="mr-3 text-secondary-600" />
                  Account Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <ApperIcon name="Bell" size={20} className="text-gray-600 dark:text-gray-400 mr-3" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          Email Notifications
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive updates about new programs and features
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <ApperIcon name="Lock" size={20} className="text-gray-600 dark:text-gray-400 mr-3" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          Privacy Settings
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Control your privacy and data preferences
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <ApperIcon name="Key" size={20} className="text-gray-600 dark:text-gray-400 mr-3" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          Change Password
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Update your account security
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Membership Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <ApperIcon name="Crown" size={24} className="mr-3 text-accent-600" />
                  Membership
                </h3>
                
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <Badge variant={getRoleVariant(user?.role)} className="text-lg px-4 py-2">
                      <ApperIcon name={getRoleIcon(user?.role)} size={16} className="mr-2" />
                      {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Plan
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {user?.role === "free" 
                      ? "Upgrade to access premium programs and features"
                      : "You have access to premium content and features"
                    }
                  </p>
                  
                  {user?.role === "free" ? (
                    <Button className="w-full max-w-xs">
                      <ApperIcon name="ArrowUp" size={16} className="mr-2" />
                      Upgrade Membership
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full max-w-xs">
                      <ApperIcon name="Settings" size={16} className="mr-2" />
                      Manage Plan
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;