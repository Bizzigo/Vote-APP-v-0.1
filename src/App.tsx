
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
import { LocationProvider } from "@/providers/LocationProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import React from "react";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import VendorProfile from "./pages/VendorProfile";
import UserProfile from "./pages/UserProfile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import AuthCallback from "./pages/AuthCallback";

// Create a client
const queryClient = new QueryClient();

function TooltipWrapper({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <LocationProvider>
                <TooltipWrapper>
                  <Toaster />
                  <Sonner 
                    position="bottom-center" 
                    toastOptions={{
                      classNames: {
                        toast: "animate-[slide-in-from-bottom_0.2s_ease-out,fade-in_0.2s_ease-out]",
                        title: "font-semibold text-lg",
                        description: "text-sm text-muted-foreground"
                      },
                      duration: 3000
                    }}
                  />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/vendor/:vendorSlug" element={<VendorProfile />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </TooltipWrapper>
              </LocationProvider>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
