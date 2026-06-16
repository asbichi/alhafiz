export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  graduationYear: number;
  category: string;
  description: string;
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  currency: 'NGN' | 'USD' | 'GBP';
  date: string;
  purpose: string;
  message?: string;
  gatewayStatus: 'SUCCESS' | 'PENDING' | 'FAILED';
  reference: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'General' | 'Needs' | 'Milestone';
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  availability: string;
  message?: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
