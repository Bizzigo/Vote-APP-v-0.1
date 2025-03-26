
import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Search, Package, Activity, Globe, BarChart3, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-[#0F172A] text-white">
        <Sidebar variant="inset" className="bg-[#0F172A] border-r border-[#1E293B]">
          <SidebarContent>
            <div className="p-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                  </svg>
                </div>
                <span className="text-lg font-medium bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Bizzigo</span>
              </Link>
            </div>

            <div className="mt-6">
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 text-gray-400 text-xs uppercase tracking-wider">Navigation</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-gray-400 hover:text-white">
                      <Link to="/">
                        <Home className="mr-2" />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-gray-400 hover:text-white">
                      <Link to="/search">
                        <Search className="mr-2" />
                        <span>Search</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-gray-400 hover:text-white">
                      <Link to="/vendors">
                        <Package className="mr-2" />
                        <span>Vendors</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 text-gray-400 text-xs uppercase tracking-wider">Analytics</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-gray-400 hover:text-white">
                      <Link to="/activity">
                        <Activity className="mr-2" />
                        <span>Activity</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-gray-400 hover:text-white">
                      <Link to="/domains">
                        <Globe className="mr-2" />
                        <span>Domains</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-gray-400 hover:text-white">
                      <Link to="/usage">
                        <BarChart3 className="mr-2" />
                        <span>Usage</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-gray-400 hover:text-white">
                      <Link to="/settings">
                        <Settings className="mr-2" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 w-full mx-auto">
            {children}
          </main>
          <footer className="py-6 border-t border-[#1E293B] mt-16">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <p className="text-sm text-gray-400 text-center">
                  © {new Date().getFullYear()} Bizzigo Pro SIA • All rights reserved
                </p>
                <Link to="/privacy" className="text-sm text-indigo-400 hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
