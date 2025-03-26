
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <Card className="max-w-4xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
            <p>
              At Bizzigo, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide when using our platform, 
              including but not limited to:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Personal identifying information (name, email address, phone number)</li>
              <li>Business information if you're a vendor</li>
              <li>Location data when you enable location services</li>
              <li>User-generated content such as reviews and comments</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
            <p>
              We may use the information we collect from you for various purposes, including:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>To provide and maintain our platform</li>
              <li>To personalize your experience</li>
              <li>To improve our platform</li>
              <li>To communicate with you</li>
              <li>To process transactions</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and 
              store certain information. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Third-Party Services</h2>
            <p>
              Our platform may contain links to third-party websites or services that are not owned 
              or controlled by Bizzigo. We have no control over and assume no responsibility for the 
              content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security 
              of your personal information. However, no method of transmission over the Internet or 
              electronic storage is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, 
              such as the right to access, correct, or delete your data. To exercise these rights, 
              please contact us using the information provided below.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@bizzigo.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Privacy;
