import { ProductCategory } from '../types';

import bpDeviceImg from '../assets/images/bp_monitor_device_1791454734358.jpg';
import glDeviceImg from '../assets/images/glucometer_device_kit_1791454747005.jpg';
import glStripsImg from '../assets/images/glucose_strips_box_1791455085700.jpg';
import oximeterDeviceImg from '../assets/images/pulse_oximeter_device_1791454757928.jpg';
import thermometerDeviceImg from '../assets/images/infrared_thermometer_device_1791454768970.jpg';
import nebulizerDeviceImg from '../assets/images/omron_nebulizer_device_1791523919435.jpg';
import respiratoryShowcaseImg from '../assets/images/respiratory_care_showcase_1791435993258.jpg';
import scaleDeviceImg from '../assets/images/digital_weighing_scale_1791455095976.jpg';
import orthoDeviceImg from '../assets/images/orthopedic_knee_support_1791455106794.jpg';
import lumbarBeltImg from '../assets/images/lumbar_sacral_belt_1791523960690.jpg';
import wheelchairDeviceImg from '../assets/images/foldable_wheelchair_1791455117550.jpg';
import walkingStickImg from '../assets/images/walking_stick_aid_1791455130778.jpg';
import stethoscopeDeviceImg from '../assets/images/clinical_stethoscope_1791455140457.jpg';
import heroMedicalDevicesImg from '../assets/images/hero_medical_devices_1791435948658.jpg';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  hindiName: string;
  shortDesc: string;
  count: number;
  iconName: string;
  image?: string;
  colorBg: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'bp-monitors',
    name: 'BP Monitors',
    hindiName: 'बीपी मॉनिटर',
    shortDesc: 'Digital upper-arm & wrist blood pressure monitors',
    count: 10,
    iconName: 'Activity',
    image: bpDeviceImg,
    colorBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'glucometers',
    name: 'Glucometers',
    hindiName: 'शुगर जांच मशीन',
    shortDesc: 'Instant blood glucose monitoring systems',
    count: 8,
    iconName: 'Droplet',
    image: glDeviceImg,
    colorBg: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  {
    id: 'glucose-strips',
    name: 'Glucose Strips & Lancets',
    hindiName: 'टेस्ट स्ट्रिप्स एवं लैंसेट',
    shortDesc: 'Compatible test strips, lancets & lancing pens',
    count: 7,
    iconName: 'Layers',
    image: glStripsImg,
    colorBg: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  {
    id: 'pulse-oximeters',
    name: 'Pulse Oximeters',
    hindiName: 'पल्स ऑक्सीमीटर',
    shortDesc: 'Fingertip SpO2 & pulse rate monitors',
    count: 5,
    iconName: 'HeartPulse',
    image: oximeterDeviceImg,
    colorBg: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'nebulizers',
    name: 'Nebulizers',
    hindiName: 'नेब्युलाइज़र मशीन',
    shortDesc: 'Compressor & mesh nebulizers with masks',
    count: 5,
    iconName: 'Wind',
    image: nebulizerDeviceImg,
    colorBg: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  {
    id: 'thermometers',
    name: 'Thermometers',
    hindiName: 'थर्मामीटर',
    shortDesc: 'Non-contact infrared & digital thermometers',
    count: 5,
    iconName: 'Thermometer',
    image: thermometerDeviceImg,
    colorBg: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'weighing-scales',
    name: 'Weighing Scales',
    hindiName: 'वजन तोलने की मशीन',
    shortDesc: 'Digital high-precision body composition scales',
    count: 4,
    iconName: 'Scale',
    image: scaleDeviceImg,
    colorBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'respiratory-care',
    name: 'Respiratory Care',
    hindiName: 'श्वसन देखभाल',
    shortDesc: 'Vaporizers, steam inhalers & oxygen accessories',
    count: 6,
    iconName: 'Airplay',
    image: respiratoryShowcaseImg,
    colorBg: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'orthopedic-supports',
    name: 'Orthopedic Supports',
    hindiName: 'हड्डी एवं जोड़ सहायता',
    shortDesc: 'Knee, back, wrist, cervical & lumbar belts',
    count: 6,
    iconName: 'ShieldAlert',
    image: orthoDeviceImg,
    colorBg: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    id: 'wheelchairs',
    name: 'Wheelchairs',
    hindiName: 'व्हीलचेयर',
    shortDesc: 'Foldable lightweight wheelchairs & commodes',
    count: 3,
    iconName: 'Accessibility',
    image: wheelchairDeviceImg,
    colorBg: 'bg-violet-50 text-violet-700 border-violet-200'
  },
  {
    id: 'walking-aids',
    name: 'Walking Aids',
    hindiName: 'वॉकिंग स्टिक व वॉकर',
    shortDesc: 'Quad canes, folding sticks & adult walkers',
    count: 4,
    iconName: 'Compass',
    image: walkingStickImg,
    colorBg: 'bg-stone-50 text-stone-700 border-stone-200'
  },
  {
    id: 'first-aid',
    name: 'First Aid & Wound Care',
    hindiName: 'प्राथमिक चिकित्सा',
    shortDesc: 'Medical bandages, antiseptics & emergency kits',
    count: 4,
    iconName: 'Cross',
    image: heroMedicalDevicesImg,
    colorBg: 'bg-red-50 text-red-700 border-red-200'
  },
  {
    id: 'tens-pain-relief',
    name: 'TENS & Pain Relief',
    hindiName: 'दर्द निवारण उपकरण',
    shortDesc: 'Electronic nerve stimulators & heating belts',
    count: 4,
    iconName: 'Zap',
    image: lumbarBeltImg,
    colorBg: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  },
  {
    id: 'stethoscopes',
    name: 'Stethoscopes',
    hindiName: 'स्टेथोस्कोप',
    shortDesc: 'Dual head clinical & diagnostic stethoscopes',
    count: 3,
    iconName: 'Headphones',
    image: stethoscopeDeviceImg,
    colorBg: 'bg-slate-50 text-slate-700 border-slate-200'
  }
];
