
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
            <p>
              Welcome to Bizzigo. By accessing or using our platform, you agree to be bound by these Terms of Service. 
              Please read them carefully before using our services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Definitions</h2>
            <p>
              "Platform" refers to the Bizzigo website and services.
              "User" refers to anyone who accesses or uses the Platform.
              "Vendor" refers to a business or service provider listed on the Platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Account Registration</h2>
            <p>
              To access certain features of the Platform, you may be required to register for an account. 
              You agree to provide accurate information during the registration process and to keep your 
              account credentials secure.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. User Conduct</h2>
            <p>
              You agree not to use the Platform for any unlawful purpose or in any way that may impair 
              the performance or functionality of the Platform. You agree not to attempt to gain 
              unauthorized access to any part of the Platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Content</h2>
            <p>
              Users may post reviews, comments, and other content on the Platform. You retain ownership 
              of any content you post, but grant Bizzigo a worldwide, non-exclusive, royalty-free license 
              to use, reproduce, and display such content in connection with the Platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Intellectual Property</h2>
            <p>
              The Platform and its original content, features, and functionality are owned by Bizzigo 
              and are protected by international copyright, trademark, patent, trade secret, and other 
              intellectual property laws.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Platform at our sole discretion, 
              without notice, for conduct that we believe violates these Terms of Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">8. Limitation of Liability</h2>
            <p>
              In no event shall Bizzigo be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including loss of profits, data, or business opportunities.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will provide notice 
              of significant changes by posting a notice on the Platform. Your continued use of the 
              Platform after such changes constitutes your acceptance of the new Terms of Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at legal@bizzigo.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Terms;
