import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading this content.", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px] p-6"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="AlertCircle" size={32} className="text-red-600 dark:text-red-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {message}
          </p>
          
          {showRetry && onRetry && (
            <Button
              onClick={onRetry}
              variant="primary"
              className="inline-flex items-center"
            >
              <ApperIcon name="RefreshCw" size={16} className="mr-2" />
              Try Again
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Error;