import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children, 
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20",
    glass: "bg-white/10 dark:bg-gray-800/20 backdrop-blur-md border border-white/20 dark:border-gray-700/30",
    elevated: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-900/10 dark:shadow-gray-900/30"
  };
  
  return (
    <div
      className={cn(
        "rounded-lg p-6 transition-all duration-200",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;