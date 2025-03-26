
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Cookies = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Cookie Policy</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
            <p>
              This Cookie Policy explains how Bizzigo uses cookies and similar technologies to recognize 
              you when you visit our platform. It explains what these technologies are and why we use them, 
              as well as your rights to control our use of them.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit 
              a website. Cookies are widely used by website owners to make their websites work, or to work 
              more efficiently, as well as to provide reporting information.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. Types of Cookies We Use</h2>
            <p>
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li><strong>Essential Cookies:</strong> These cookies are required for the basic functioning of our platform.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow us to remember choices you make and provide enhanced features.</li>
              <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our platform.</li>
              <li><strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites to display relevant advertisements.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. How We Use Cookies</h2>
            <p>
              We use cookies for various purposes, including:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>To enable certain functions of the platform</li>
              <li>To provide analytics</li>
              <li>To store your preferences</li>
              <li>To enable advertisement delivery, including behavioral advertising</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage 
              statistics of the platform and to deliver advertisements on and through the platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Your Choices Regarding Cookies</h2>
            <p>
              If you prefer to avoid the use of cookies on the platform, you can disable cookies 
              in your browser settings. You can also delete cookies that have already been set. However, 
              disabling cookies may affect the functionality of our platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">7. Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by 
              posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at cookies@bizzigo.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Cookies;
