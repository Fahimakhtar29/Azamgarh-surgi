export interface BrandInfo {
  id: string;
  name: string;
  country: string;
  tagline: string;
  popularCategory: string;
}

export const BRANDS: BrandInfo[] = [
  { id: 'dr-morepen', name: 'Dr. Morepen', country: 'India', tagline: 'Everyday Health Solutions', popularCategory: 'Glucometers & BP' },
  { id: 'dr-trust', name: 'Dr Trust', country: 'USA / India', tagline: 'Pioneering Healthcare Innovation', popularCategory: 'BP Monitors & Oximeters' },
  { id: 'omron', name: 'Omron', country: 'Japan', tagline: 'Global Clinical Precision', popularCategory: 'Nebulizers & BP' },
  { id: 'accu-chek', name: 'Accu-Chek', country: 'Germany (Roche)', tagline: 'Precision Diabetes Care', popularCategory: 'Test Strips & Glucometers' },
  { id: 'beurer', name: 'Beurer', country: 'Germany', tagline: 'German Health & Wellbeing', popularCategory: 'TENS Machines & Scales' },
  { id: 'bpl', name: 'BPL Medical', country: 'India', tagline: 'Decades of Indian Healthcare Trust', popularCategory: 'BP & Oximeters' },
  { id: 'tynor', name: 'Tynor', country: 'India', tagline: 'World-Class Orthopedic Support', popularCategory: 'Orthopedic Supports' },
  { id: 'flamingo', name: 'Flamingo', country: 'India', tagline: 'An Aid for a New Life', popularCategory: 'Heating Belts & Supports' },
  { id: 'vissco', name: 'Vissco', country: 'India', tagline: 'Physiotherapy & Orthopedic Care', popularCategory: 'Rehab & Braces' },
  { id: 'healthsense', name: 'HealthSense', country: 'India', tagline: 'Smart Health Monitoring', popularCategory: 'Weighing Scales' },
  { id: 'control-d', name: 'Control D', country: 'India', tagline: 'Affordable Daily Diabetes Care', popularCategory: 'Strips & Nebulizers' },
  { id: 'diamond', name: 'Diamond', country: 'India', tagline: 'Clinical Mercury & Dial BP Gear', popularCategory: 'Clinical Stetho & BP' },
  { id: 'rossmax', name: 'Rossmax', country: 'Switzerland', tagline: 'Total Health Monitoring', popularCategory: 'Digital Thermometers' },
  { id: 'mcp', name: 'MCP Healthcare', country: 'India', tagline: 'Affordable Medical Diagnostics', popularCategory: 'Stethoscopes & Walking Aids' },
  { id: 'kosmocare', name: 'KosmoCare', country: 'India', tagline: 'Mobility & Assisted Living', popularCategory: 'Wheelchairs & Walkers' }
];
