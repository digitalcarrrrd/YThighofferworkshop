export interface RegistrationFormData {
  fullName: string;
  whatsappNumber: string;
  email: string;
  paymentMethod: 'Bank Transfer' | 'EasyPaisa' | 'JazzCash';
  transactionId: string;
  paymentScreenshot: string; // Base64 representation in client-side or filename
  paymentScreenshotFile?: File; // optional client-only representation
  consent: boolean;
  batchDate: string; // YYYY-MM-DD
  batchDisplayDate: string; // E.g., "Tuesday, 21 July 2026"
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  deviceCategory?: string;
  timestamp?: string;
}

export interface CapacityData {
  capacity: number;
  reserved: number;
  remaining: number;
}

export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
}
