import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const Reviews = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Star" size={32} className="text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Student Reviews
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Read what our community of learners has to say about their experience with LearnHub Pro programs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="MessageSquare" size={36} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Reviews Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              We're building a comprehensive review system where students can share their experiences 
              and help others make informed decisions about their learning journey.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="Users" size={20} className="text-blue-500 mr-3" />
                <span>Student Testimonials</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="Star" size={20} className="text-yellow-500 mr-3" />
                <span>Program Ratings</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="TrendingUp" size={20} className="text-green-500 mr-3" />
                <span>Success Stories</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                <ApperIcon name="MessageCircle" size={20} className="text-purple-500 mr-3" />
                <span>Community Feedback</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;