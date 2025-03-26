
export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface JobVacancy {
  id: number;
  title: string;
  location: string;
  type: string;
}

export interface ShopItem {
  id: number;
  name: string;
  price: string;
  description: string;
}

export interface PaymentMethods {
  creditCard: boolean;
  bankTransfer: boolean;
  paypal: boolean;
  crypto: boolean;
}

export interface ContactMethods {
  hasPhone: boolean;
  hasWhatsapp: boolean;
  hasTelegram: boolean;
  hasInstagram: boolean;
  hasFacebook: boolean;
  hasWebsite: boolean;
  hasLursoftProfile: boolean;
}

export interface UseVendorDataReturn {
  vendor: import('@/lib/types').Vendor | null;
  loading: boolean;
  notFound: boolean;
  services: string[];
  jobVacancies: JobVacancy[];
  shopItems: ShopItem[];
  reviews: Review[];
  paymentMethods: PaymentMethods;
  contactMethods: ContactMethods;
  averageRating: number;
  registrationNumber: string;
  registrationDate: string;
  reviewCount: number;
  isOnline: boolean;
}
