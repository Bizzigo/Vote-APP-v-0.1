
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useLocation } from 'react-router-dom';
import CategorySidebar from './CategorySidebar';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Activity, BarChart3, Globe, Home, Package, Search, Settings } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <Sidebar variant="inset" className="bg-sidebar border-r border-sidebar-border">
          <SidebarContent>
            <div className="p-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-primary">Bizzigo</span>
              </Link>
            </div>

            <div className="mt-6">
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Navigation</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={location.pathname === '/' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'}>
                      <Link to="/">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={location.pathname === '/search' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'}>
                      <Link to="/search">
                        <Search className="mr-2 h-4 w-4" />
                        <span>Search</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={location.pathname === '/vendors' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'}>
                      <Link to="/vendors">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Vendors</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              
              {/* Categories Section */}
              <CategorySidebar />
              
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Analytics</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={location.pathname === '/activity' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'}>
                      <Link to="/activity">
                        <Activity className="mr-2 h-4 w-4" />
                        <span>Activity</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={location.pathname === '/domains' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'}>
                      <Link to="/domains">
                        <Globe className="mr-2 h-4 w-4" />
                        <span>Domains</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={location.pathname === '/usage' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'}>
                      <Link to="/usage">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Usage</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className={location.pathname === '/settings' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'}>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
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
          <main className="flex-1 w-full">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
              {!isHomePage && <Breadcrumbs />}
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
