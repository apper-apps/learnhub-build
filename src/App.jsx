import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import Layout from "@/components/organisms/Layout";

// Pages
import Home from "@/components/pages/Home";
import ProgramLanding from "@/components/pages/ProgramLanding";
import ProgramDetail from "@/components/pages/ProgramDetail";
import MoneyInsight from "@/components/pages/MoneyInsight";
import Reviews from "@/components/pages/Reviews";
import Profile from "@/components/pages/Profile";
import AdminUsers from "@/components/pages/AdminUsers";
import AdminPrograms from "@/components/pages/AdminPrograms";
import AdminLectures from "@/components/pages/AdminLectures";
import AdminPosts from "@/components/pages/AdminPosts";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/program" element={<ProgramLanding />} />
                <Route path="/program/:slug" element={<ProgramDetail />} />
                <Route path="/money-insight" element={<MoneyInsight />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/programs" element={<AdminPrograms />} />
                <Route path="/admin/lectures" element={<AdminLectures />} />
                <Route path="/admin/posts" element={<AdminPosts />} />
              </Routes>
            </Layout>
            
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{ zIndex: 9999 }}
              toastClassName="animate-fade-in"
            />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;