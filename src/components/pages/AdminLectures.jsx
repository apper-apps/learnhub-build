import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const AdminLectures = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Lecture Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage individual lectures, videos, and learning materials within programs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Play" size={36} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Lecture Admin Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Detailed lecture management tools will be available here for 
              organizing and managing individual learning materials.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="Video" size={20} className="text-red-500 mr-3" />
                <span>Video Content Management</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="FileText" size={20} className="text-blue-500 mr-3" />
                <span>Document & Resource Upload</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="Clock" size={20} className="text-green-500 mr-3" />
                <span>Schedule & Timeline Control</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="Users" size={20} className="text-purple-500 mr-3" />
                <span>Student Progress Tracking</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLectures;