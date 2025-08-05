import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import ApperIcon from "@/components/ApperIcon";

const DarkModeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDark ? (
          <ApperIcon name="Sun" size={20} />
        ) : (
          <ApperIcon name="Moon" size={20} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;