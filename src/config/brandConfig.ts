export interface BrandConfig {
  brandName: string;
  tagline: string;
  shortName: string;
  phone: string;
  supportPhoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  currency: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  operatingHours: string;
  medicalDisclaimer: string;
}

export const brandConfig: BrandConfig = {
  brandName: "AZAMGARH MEDICAL & SURGICAL",
  shortName: "Azamgarh Med",
  tagline: "Trusted Healthcare. Delivered Home.",
  phone: "+91 94520 89211",
  supportPhoneFormatted: "+91 94520 89211",
  whatsappNumber: "919452089211", // International format without +
  email: "care@azamgarhmedical.in",
  address: "Civil Lines, Opp. District Hospital Road",
  city: "Azamgarh",
  state: "Uttar Pradesh",
  pincode: "276001",
  country: "India",
  currency: "INR",
  currencySymbol: "₹",
  freeShippingThreshold: 999,
  standardShippingFee: 70,
  expressShippingFee: 149,
  operatingHours: "Monday – Sunday: 8:00 AM – 9:00 PM IST",
  medicalDisclaimer: "Products sold on this website are intended for home healthcare, monitoring, and personal wellness purposes. Product information is not intended to substitute for clinical advice from a registered medical practitioner. Always consult a qualified physician for any health condition or diagnostic evaluation."
};
