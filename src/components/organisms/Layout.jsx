import React from "react";
import TopNavigation from "@/components/organisms/TopNavigation";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TopNavigation />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;