import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Header from "./components/Header";
import Consultation from "./pages/Consultation";
import Medicine from "./pages/Medicine";
import Education from "./pages/Education";
import Detox from "./pages/Detox";
import Panchakarma from "./pages/Panchakarma";
import ParticlesBackground from "./components/ParticlesBackground";
import React from 'react';
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <TooltipProvider>
            <ParticlesBackground />
            <div className="relative z-10">
              <Header />
              <main>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Navigate to="/services" replace />} />
                  <Route
                    path="/services"
                    element={
                      <ProtectedRoute>
                        <Services />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/consultation"
                    element={
                      <ProtectedRoute>
                        <Consultation />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/medicine"
                    element={
                      <ProtectedRoute>
                        <Medicine />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/education"
                    element={
                      <ProtectedRoute>
                        <Education />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/detox"
                    element={
                      <ProtectedRoute>
                        <Detox />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/panchakarma"
                    element={
                      <ProtectedRoute>
                        <Panchakarma />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/chat/:category"
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/chat/:category/:subcategory"
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;