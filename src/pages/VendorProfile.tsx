
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { mockVendors, placeholderImage } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import VendorInfoBadges from '@/components/vendor/VendorInfoBadges';
import VendorPaymentMethods from '@/components/vendor/VendorPaymentMethods';
import VendorContactMethods from '@/components/vendor/VendorContactMethods';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock data for demo purposes
  const [services] = useState<string[]>([
    'Web Development', 'Mobile Apps', 'Cloud Services', 'Consulting', 
    'UI/UX Design', 'DevOps', 'Data Analytics', 'AI Solutions', 
    'IT Infrastructure', 'Cybersecurity'
  ]);
  
  const [jobVacancies] = useState([
    { id: 1, title: 'Frontend Developer', location: 'Remote', type: 'Full-time' },
    { id: 2, title: 'Backend Engineer', location: 'Riga', type: 'Full-time' },
    { id: 3, title: 'UI/UX Designer', location: 'Hybrid', type: 'Part-time' },
  ]);
  
  const [shopItems] = useState([
    { id: 1, name: 'Premium Support Package', price: '€499', description: 'Priority technical support with 24/7 availability' },
    { id: 2, name: 'Website Audit', price: '€299', description: 'Comprehensive analysis of your website performance and SEO' },
    { id: 3, name: 'Custom Integration', price: '€1299', description: 'Custom API and third-party service integration' },
  ]);
  
  // For demo purposes - determine if vendor has certain payment methods
  const paymentMethods = React.useMemo(() => {
    return {
      creditCard: Math.random() > 0.4,
      bankTransfer: Math.random() > 0.3,
      paypal: Math.random() > 0.5,
      crypto: Math.random() > 0.7
    };
  }, [id]);
  
  // Mock data for contact methods
  const contactMethods = React.useMemo(() => {
    return {
      hasPhone: Math.random() > 0.3,
      hasWhatsapp: Math.random() > 0.4,
      hasTelegram: Math.random() > 0.5,
      hasInstagram: Math.random() > 0.4,
      hasFacebook: Math.random() > 0.3,
      hasWebsite: Math.random() > 0.2,
      hasLursoftProfile: Math.random() > 0.5,
    };
  }, [id]);
  
  // Load vendor data
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const foundVendor = mockVendors.find(v => v.id === id);
      setVendor(foundVendor || null);
      setLoading(false);
    }
  }, [id]);
  
  // Generate random registration number and date for demo
  const registrationNumber = React.useMemo(() => 
    `LV${Math.floor(10000000 + Math.random() * 90000000)}`, []);
  const registrationDate = React.useMemo(() => 
    new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000))
      .toLocaleDateString('en-GB'), []);
  
  // Calculate review stats for demo
  const reviewCount = React.useMemo(() => Math.floor(Math.random() * 500) + 50, []);
  const isOnline = React.useMemo(() => Math.random() > 0.5, []);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-xl">Loading vendor profile...</p>
        </div>
      </Layout>
    );
  }
  
  if (!vendor) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
          <p className="text-xl">Vendor not found</p>
          <Link to="/" className="text-blue-600 hover:underline flex items-center gap-2">
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          <span>Back to vendors</span>
        </Link>
        
        {/* Vendor header */}
        <div className="w-full bg-card animate-scale-in border border-border/40 shadow-sm p-6 rounded-md mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Vendor logo */}
            <Avatar className="h-32 w-32 rounded-md">
              <AvatarImage 
                src={vendor.logo || placeholderImage} 
                alt={vendor.name} 
                className="object-cover"
              />
              <AvatarFallback className="rounded-md bg-secondary text-2xl">{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            {/* Vendor info */}
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold">{vendor.name}</h1>
              
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="outline" className="rounded-sm px-2 py-0.5 bg-secondary/50">
                  Reg. Nr: {registrationNumber}
                </Badge>
                <Badge variant="outline" className="rounded-sm px-2 py-0.5 bg-secondary/50">
                  Since: {registrationDate}
                </Badge>
              </div>
              
              <div className="mt-1">
                <VendorInfoBadges
                  city={vendor.city}
                  category={vendor.category}
                  rating={vendor.rating}
                  reviewCount={reviewCount}
                  hasLursoftProfile={contactMethods.hasLursoftProfile}
                  jobVacancies={jobVacancies.length}
                  hasShop={shopItems.length > 0}
                  isOnline={isOnline}
                  distance={null}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact methods and payment methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Contact Methods</h3>
              <VendorContactMethods
                vendorId={vendor.id}
                hasPhone={contactMethods.hasPhone}
                hasWhatsapp={contactMethods.hasWhatsapp}
                hasTelegram={contactMethods.hasTelegram}
                hasInstagram={contactMethods.hasInstagram}
                hasFacebook={contactMethods.hasFacebook}
                hasWebsite={contactMethods.hasWebsite}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
              <VendorPaymentMethods paymentMethods={paymentMethods} />
            </CardContent>
          </Card>
        </div>
        
        {/* Description */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">About {vendor.name}</h3>
            <p className="text-muted-foreground">
              {vendor.description || 
                `${vendor.name} is a leading provider in the ${vendor.category} sector, 
                based in ${vendor.city}. With years of experience and a dedication to quality, 
                we provide exceptional services to our clients. Our team of experts is committed 
                to delivering innovative solutions that meet the unique needs of each customer.`}
            </p>
          </CardContent>
        </Card>
        
        {/* Services keywords cloud */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Services & Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <Badge 
                  key={index} 
                  className="rounded-sm px-2 py-0.5 bg-secondary"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for services, job offers, shop */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="services">
              <TabsList className="mb-4">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="jobs">Job Offers ({jobVacancies.length})</TabsTrigger>
                <TabsTrigger value="shop">Shop ({shopItems.length})</TabsTrigger>
              </TabsList>
              
              {/* Services Tab */}
              <TabsContent value="services" className="space-y-4">
                <h3 className="text-lg font-medium">Our Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium">{service}</h4>
                        <p className="text-sm text-muted-foreground">
                          Professional {service.toLowerCase()} services tailored to your business needs.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-4">
                <h3 className="text-lg font-medium">Current Openings</h3>
                {jobVacancies.length > 0 ? (
                  <div className="space-y-4">
                    {jobVacancies.map(job => (
                      <Card key={job.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{job.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {job.location} · {job.type}
                              </p>
                            </div>
                            <Badge className="rounded-sm">Apply</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No job openings available at the moment.</p>
                )}
              </TabsContent>
              
              {/* Shop Tab */}
              <TabsContent value="shop" className="space-y-4">
                <h3 className="text-lg font-medium">Products & Services</h3>
                {shopItems.length > 0 ? (
                  <div className="space-y-4">
                    {shopItems.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="font-medium">{item.price}</span>
                              <Badge className="rounded-sm">Buy Now</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No products available in the shop.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VendorProfile;
