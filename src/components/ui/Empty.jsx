import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "Nothing here yet", 
  message = "This section is empty. Check back later for updates.", 
  icon = "Inbox",
  actionLabel,
  onAction 
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
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center"
        >
          <ApperIcon name={icon} size={32} className="text-gray-500 dark:text-gray-400" />
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
          
          {actionLabel && onAction && (
            <Button
              onClick={onAction}
              variant="primary"
              className="inline-flex items-center"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              {actionLabel}
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Empty;