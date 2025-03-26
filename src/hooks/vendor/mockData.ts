
import { Review, JobVacancy, ShopItem } from './types';

export const generateMockServices = (vendorKeywords?: string[]): string[] => {
  const defaultServices = [
    'Web Development', 'Mobile Apps', 'Cloud Services', 'Consulting', 
    'UI/UX Design', 'DevOps', 'Data Analytics', 'AI Solutions', 
    'IT Infrastructure', 'Cybersecurity'
  ];
  
  return vendorKeywords && vendorKeywords.length > 0 ? vendorKeywords : defaultServices;
};

export const generateMockJobVacancies = (): JobVacancy[] => {
  return [
    { id: 1, title: 'Frontend Developer', location: 'Remote', type: 'Full-time' },
    { id: 2, title: 'Backend Engineer', location: 'Riga', type: 'Full-time' },
    { id: 3, title: 'UI/UX Designer', location: 'Hybrid', type: 'Part-time' },
  ];
};

export const generateMockShopItems = (): ShopItem[] => {
  return [
    { id: 1, name: 'Premium Support Package', price: '€499', description: 'Priority technical support with 24/7 availability' },
    { id: 2, name: 'Website Audit', price: '€299', description: 'Comprehensive analysis of your website performance and SEO' },
    { id: 3, name: 'Custom Integration', price: '€1299', description: 'Custom API and third-party service integration' },
  ];
};

export const generateMockReviews = (): Review[] => {
  const reviews: Review[] = [
    {
      id: 1,
      author: 'John Doe',
      date: '15 May 2023',
      rating: 4.5,
      comment: 'Great service and professional team. Would recommend for any business looking for quality development work.'
    },
    {
      id: 2,
      author: 'Maria Garcia',
      date: '3 April 2023',
      rating: 5,
      comment: 'Exceeded our expectations in every way. The project was delivered on time and the results are amazing.'
    },
    {
      id: 3,
      author: 'Alex Johnson',
      date: '22 February 2023',
      rating: 3.5,
      comment: 'Good work overall, but communication could have been better at times. The final product met our requirements.'
    },
    {
      id: 4,
      author: 'Sarah Williams',
      date: '10 January 2023',
      rating: 4.8,
      comment: 'Very responsive team that understood our requirements quickly. The solution they delivered was perfect for our needs.'
    },
    {
      id: 5,
      author: 'David Chen',
      date: '29 December 2022',
      rating: 4.2,
      comment: 'Solid work and met all our requirements. Would use their services again for future projects.'
    },
    {
      id: 6,
      author: 'Emma Thompson',
      date: '15 November 2022',
      rating: 5,
      comment: 'Absolutely fantastic service from start to finish. The team went above and beyond to ensure our satisfaction.'
    },
    {
      id: 7,
      author: 'Michael Brown',
      date: '23 October 2022',
      rating: 3.8,
      comment: 'Good technical skills but project timeline was slightly delayed. End product works well for our needs.'
    },
    {
      id: 8,
      author: 'Jessica Lee',
      date: '5 September 2022',
      rating: 4.7,
      comment: 'Very professional team with great attention to detail. They were responsive to all our feedback during development.'
    }
  ];
  
  return reviews.sort((a, b) => {
    const dateA = new Date(a.date.split(' ').reverse().join(' '));
    const dateB = new Date(b.date.split(' ').reverse().join(' '));
    return dateB.getTime() - dateA.getTime();
  });
};

export const generateRandomPaymentMethods = () => {
  return {
    creditCard: Math.random() > 0.4,
    bankTransfer: Math.random() > 0.3,
    paypal: Math.random() > 0.5,
    crypto: Math.random() > 0.7
  };
};

export const generateRandomContactMethods = () => {
  return {
    hasPhone: Math.random() > 0.3,
    hasWhatsapp: Math.random() > 0.4,
    hasTelegram: Math.random() > 0.5,
    hasInstagram: Math.random() > 0.4,
    hasFacebook: Math.random() > 0.3,
    hasWebsite: Math.random() > 0.2,
    hasLursoftProfile: Math.random() > 0.5,
  };
};

export const generateRegistrationData = () => {
  const registrationNumber = `LV${Math.floor(10000000 + Math.random() * 90000000)}`;
  const registrationDate = new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000))
    .toLocaleDateString('en-GB');
  
  return { registrationNumber, registrationDate };
};
