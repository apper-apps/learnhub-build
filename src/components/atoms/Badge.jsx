import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    primary: "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300",
    secondary: "bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300",
    accent: "bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300",
    success: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    both: "bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-purple-700 dark:text-purple-300"
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;