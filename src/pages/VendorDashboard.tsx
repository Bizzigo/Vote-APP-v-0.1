
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ShoppingBag, MessageSquare, 
  Heart, Settings, LogOut, ChevronDown, Bell, Search,
  Plus, BarChart3, ArrowUpRight, Calendar, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { mockVendors } from '@/lib/mockData';

const VendorDashboard = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const vendor = mockVendors[0]; // Use the first vendor as example

  // Stats data
  const stats = [
    { label: 'Total Views', value: '8,765', change: '+25.5%', positive: true },
    { label: 'Messages', value: '194', change: '+3.1%', positive: true },
    { label: 'Orders', value: '42', change: '-2.7%', positive: false },
    { label: 'Bookmarks', value: '362', change: '+12.6%', positive: true },
  ];

  // Recent messages
  const recentMessages = [
    { id: 1, name: 'John Doe', message: 'I need help with your services...', time: '2h ago', unread: true },
    { id: 2, name: 'Maria Garcia', message: 'Thanks for the quick response!', time: '5h ago', unread: false },
    { id: 3, name: 'Alex Johnson', message: 'When can we schedule a meeting?', time: '1d ago', unread: false },
  ];

  // Recent orders
  const recentOrders = [
    { id: '#ORD-7895', product: 'Premium Support Package', date: 'July 12', status: 'Completed', amount: '€499' },
    { id: '#ORD-7844', product: 'Website Audit', date: 'July 9', status: 'Processing', amount: '€299' },
    { id: '#ORD-7801', product: 'Custom Integration', date: 'July 5', status: 'Pending', amount: '€1299' },
  ];

  // Upcoming appointments
  const appointments = [
    { id: 1, client: 'Maria Roberts', service: 'Consultation', date: 'Today', time: '14:00 - 15:00' },
    { id: 2, client: 'Thomas Wright', service: 'Project Discussion', date: 'Tomorrow', time: '10:30 - 11:30' },
    { id: 3, client: 'Sandra Miller', service: 'Contract Review', date: 'Jul 15', time: '13:00 - 14:00' },
  ];

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-[80]">
        <div className="flex flex-col h-full py-4 overflow-y-auto bg-sidebar border-r border-sidebar-border">
          <div className="px-6 py-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">Vendor Portal</span>
            </Link>
          </div>

          <nav className="flex-1 px-3 mt-6 space-y-1">
            <Link to="/vendor-dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-sidebar-accent text-sidebar-accent-foreground">
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <ShoppingBag className="mr-3 h-5 w-5" />
              Products
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <MessageSquare className="mr-3 h-5 w-5" />
              Messages
              <Badge className="ml-auto">New</Badge>
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <Users className="mr-3 h-5 w-5" />
              Customers
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <Calendar className="mr-3 h-5 w-5" />
              Calendar
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
              <Heart className="mr-3 h-5 w-5" />
              Reviews
            </Link>
            
            <div className="pt-4 mt-4 border-t border-sidebar-border">
              <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <button 
                className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50"
                onClick={() => toast({ title: "Logged out", description: "You have been logged out successfully" })}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </nav>

          <div className="px-4 py-4 mt-auto">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={vendor.logo} alt={vendor.name} />
                <AvatarFallback>{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-sidebar-foreground">{vendor.name}</p>
                <p className="text-xs text-sidebar-foreground/60">Premium Plan</p>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 text-sidebar-foreground/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 w-full">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="text-gray-500 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <LayoutDashboard className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center justify-between">
            <div className="relative flex flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                placeholder="Search..."
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="hidden sm:flex sm:items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={vendor.logo} alt={vendor.name} />
                  <AvatarFallback>{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="ml-3 text-sm font-medium">{vendor.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Listing
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`flex items-center ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.positive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowUpRight className="h-4 w-4 mr-1 transform rotate-90" />}
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Dashboard Sections */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Recent Activity */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="messages">
                  <TabsList className="mb-4">
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="messages" className="space-y-4">
                    {recentMessages.map(message => (
                      <div key={message.id} className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{message.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{message.name}</p>
                            <p className="text-xs text-muted-foreground">{message.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                        </div>
                        {message.unread && <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">New</Badge>}
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="orders">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted/50">
                          <tr>
                            <th scope="col" className="px-4 py-3">Order ID</th>
                            <th scope="col" className="px-4 py-3">Product</th>
                            <th scope="col" className="px-4 py-3">Date</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map(order => (
                            <tr key={order.id} className="border-b">
                              <td className="px-4 py-3 font-medium">{order.id}</td>
                              <td className="px-4 py-3">{order.product}</td>
                              <td className="px-4 py-3">{order.date}</td>
                              <td className="px-4 py-3">
                                <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'Processing' ? 'secondary' : 'outline'}>
                                  {order.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 font-medium">{order.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <span className="text-sm text-muted-foreground">Showing recent 3 entries</span>
                <Button variant="outline" size="sm">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Upcoming Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map(appointment => (
                    <div key={appointment.id} className="flex items-start p-3 rounded-lg border border-border bg-card">
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary">
                        <span className="text-xs font-bold">{appointment.date.substring(0, 3)}</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{appointment.client}</p>
                        <p className="text-xs text-muted-foreground">{appointment.service}</p>
                        <p className="text-xs font-medium mt-1">{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" /> View Calendar
                </Button>
              </CardFooter>
            </Card>

            {/* Performance Chart */}
            <Card className="xl:col-span-3">
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Your store's performance over time</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Weekly</Button>
                  <Button variant="outline" size="sm">Monthly</Button>
                  <Button size="sm">Yearly</Button>
                </div>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-80 w-full flex items-center justify-center bg-muted/30 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
