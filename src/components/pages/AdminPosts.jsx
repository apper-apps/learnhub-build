import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const AdminPosts = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Post Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create and manage blog posts, announcements, and community content.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="FileText" size={36} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Content Management Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Blog and content management system will be available here for 
              creating announcements, articles, and community updates.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="PenTool" size={20} className="text-blue-500 mr-3" />
                <span>Rich Content Editor</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="Calendar" size={20} className="text-green-500 mr-3" />
                <span>Publishing Schedule</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="Tag" size={20} className="text-purple-500 mr-3" />
                <span>Category & Tag Management</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="Eye" size={20} className="text-orange-500 mr-3" />
                <span>Analytics & Engagement</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPosts;