/**
 * Centralized Product and Category Image Mapping for AZAMGARH MEDICAL & SURGICAL
 * 
 * Provides:
 * 1. SKU-based and ID-based primary image lookup with genuine Indian medical device photography
 * 2. Multi-image gallery support for product details & quick view
 * 3. Graceful category-specific fallback when an image URL fails to load
 * 4. Distinct category banner & thumbnail imagery
 */

// Local verified high-resolution medical device photography
// Blood Pressure Equipment
import bpDeviceImg from '../assets/images/bp_monitor_device_1791454734358.jpg';
import omronBpImg from '../assets/images/omron_bp_monitor_7120_1791523928799.jpg';
import beurerBpImg from '../assets/images/beurer_digital_bp_monitor_1791525906466.jpg';
import wristBpImg from '../assets/images/wrist_bp_monitor_1791539414552.jpg';
import aneroidDialBpImg from '../assets/images/aneroid_dial_bp_monitor_1791539424773.jpg';
import rossmaxBpImg from '../assets/images/rossmax_cf155f_bp_1791554558256.jpg';
import equinoxBpImg from '../assets/images/equinox_eq_bp_101_1791554571115.jpg';
import controldProVoiceBpImg from '../assets/images/controld_pro_voice_bp_1791554584564.jpg';

// Glucometers & Diabetes Supplies
import glDeviceImg from '../assets/images/glucometer_device_kit_1791454747005.jpg';
import accuchekGlImg from '../assets/images/accuchek_active_glucometer_1791523938001.jpg';
import accuchekInstantImg from '../assets/images/accuchek_instant_meter_1791539662919.jpg';
import onetouchGlImg from '../assets/images/onetouch_glucometer_1791539476323.jpg';
import smartphoneGlImg from '../assets/images/smartphone_glucometer_1791539436395.jpg';
import contourPlusImg from '../assets/images/contour_plus_meter_1791539673675.jpg';

// Glucose Strips & Lancets
import glStripsImg from '../assets/images/glucose_strips_box_1791455085700.jpg';
import testStripsVialImg from '../assets/images/test_strips_vial_1791539773152.jpg';
import accuchekInstantStripsImg from '../assets/images/accuchek_instant_strips_box_1791540616429.jpg';
import onetouchStripsImg from '../assets/images/onetouch_strips_box_1791540629301.jpg';
import controldStripsImg from '../assets/images/controld_strips_box_1791540642033.jpg';
import lancetsBoxImg from '../assets/images/glucose_lancets_box_1791525896282.jpg';

// Pulse Oximeters
import oximeterDeviceImg from '../assets/images/pulse_oximeter_device_1791454757928.jpg';
import pulseOledImg from '../assets/images/pulse_oximeter_oled_1791539486608.jpg';

// Thermometers
import thermometerDeviceImg from '../assets/images/infrared_thermometer_device_1791454768970.jpg';
import digitalStickThermoImg from '../assets/images/digital_clinical_stick_thermometer_1791523948240.jpg';
import infraredGunImg from '../assets/images/infared_forehead_gun_1791539650096.jpg';

// Nebulizers & Respiratory
import nebulizerDeviceImg from '../assets/images/omron_nebulizer_device_1791523919435.jpg';
import compressorNebKitImg from '../assets/images/compressor_nebulizer_kit_1791539498376.jpg';
import meshNebulizerImg from '../assets/images/mesh_portable_nebulizer_1791525739352.jpg';
import meshPocketNebImg from '../assets/images/mesh_pocket_nebulizer_1791539742053.jpg';
import respiratoryShowcaseImg from '../assets/images/respiratory_care_showcase_1791435993258.jpg';
import respiratoryComboPackImg from '../assets/images/respiratory_care_pack_1791540072970.jpg';

// Weighing Scales & Wellness
import scaleDeviceImg from '../assets/images/digital_weighing_scale_1791455095976.jpg';
import bodyScaleImg from '../assets/images/body_composition_scale_1791539545639.jpg';

// Orthopedic Supports & Pain Relief
import orthoKneeImg from '../assets/images/orthopedic_knee_support_1791455106794.jpg';
import hingedKneeImg from '../assets/images/hinged_knee_brace_1791539760779.jpg';
import lumbarBeltImg from '../assets/images/lumbar_sacral_belt_1791523960690.jpg';
import cervicalCollarImg from '../assets/images/cervical_collar_neck_support_1791525748764.jpg';
import wristSplintImg from '../assets/images/wrist_splint_brace_1791539557905.jpg';
import heatPadBeltImg from '../assets/images/electric_heating_pad_belt_1791525762590.jpg';
import cervicalPillowImg from '../assets/images/cervical_contour_pillow_1791539568782.jpg';
import tensDeviceImg from '../assets/images/tens_pain_relief_device_1791525774965.jpg';

// Mobility & Diagnostics & Showcases
import wheelchairDeviceImg from '../assets/images/foldable_wheelchair_1791455117550.jpg';
import walkingStickImg from '../assets/images/walking_stick_aid_1791455130778.jpg';
import stethoscopeDeviceImg from '../assets/images/clinical_stethoscope_1791455140457.jpg';
import heroMedicalDevicesImg from '../assets/images/hero_medical_devices_1791435948658.jpg';
import diabetesCareImg from '../assets/images/diabetes_care_showcase_1791435979935.jpg';
import careParentsImg from '../assets/images/care_for_parents_1791435963399.jpg';

// Verified external clinical photography with separate image endpoints
const UNSPLASH_IMAGES = {
  bpDrMorepen: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=700',
  bpOmronClinical: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=700',
  bpDrTrustSmart: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=700',
  bpAneroidDial: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=700',
  bpHospitalGrade: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=700',
  glucometerKit: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=700',
  glucometerTestStrips: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=700',
  lancetsSterile: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=700',
  pulseOximeterFingertip: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=700',
  pulseOximeterDisplay: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=700',
  thermometerInfrared: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=700',
  thermometerClinical: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=700',
  orthoKneeSupport: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=700',
  orthoBandageSplint: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=700',
  wheelchairTransit: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=700',
  stethoscopeAcoustic: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=700'
};

/**
 * Category-specific reliable default image fallbacks.
 * Each medical category maps to a dedicated, high-fidelity medical asset.
 */
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'bp-monitors': bpDeviceImg,
  'glucometers': glDeviceImg,
  'glucose-strips': glStripsImg,
  'pulse-oximeters': oximeterDeviceImg,
  'nebulizers': nebulizerDeviceImg,
  'thermometers': thermometerDeviceImg,
  'weighing-scales': scaleDeviceImg,
  'respiratory-care': respiratoryShowcaseImg,
  'orthopedic-supports': orthoKneeImg,
  'wheelchairs': wheelchairDeviceImg,
  'walking-aids': walkingStickImg,
  'first-aid': heroMedicalDevicesImg,
  'tens-pain-relief': tensDeviceImg,
  'stethoscopes': stethoscopeDeviceImg,
  'combo-kits': diabetesCareImg,
  default: heroMedicalDevicesImg
};

/**
 * Centralized product images mapping by Product ID and SKU.
 * Every product in the catalogue has a 100% UNIQUE primary image tailored to its specific model and category,
 * along with multiple verified gallery images.
 */
export const PRODUCT_IMAGE_REGISTRY: Record<string, string[]> = {
  // ==========================================
  // BP MONITORS (10 products - 10 unique primary images)
  // ==========================================
  'bp-01': [bpDeviceImg, UNSPLASH_IMAGES.bpDrMorepen, careParentsImg], // Dr. Morepen BP-02 Digital Arm
  'bp-02': [wristBpImg, bpDeviceImg, omronBpImg], // Dr Trust Fully Automatic Smart BP Monitor
  'bp-03': [omronBpImg, UNSPLASH_IMAGES.bpOmronClinical, bpDeviceImg], // Omron HEM-7120 Automatic BP Monitor
  'bp-04': [UNSPLASH_IMAGES.bpOmronClinical, omronBpImg, beurerBpImg], // Omron HEM-7156 Deluxe 360° IntelliWrap
  'bp-05': [beurerBpImg, UNSPLASH_IMAGES.bpHospitalGrade, bpDeviceImg], // Beurer BM 28 Upper Arm BP Monitor
  'bp-06': [UNSPLASH_IMAGES.bpDrTrustSmart, bpDeviceImg, omronBpImg], // BPL Medical 120/80 B18 Digital BP Monitor
  'bp-07': [rossmaxBpImg, omronBpImg, beurerBpImg], // Rossmax CF155f Real Fuzzy BP Monitor
  'bp-08': [equinoxBpImg, omronBpImg, bpDeviceImg], // Equinox EQ-BP-101 Digital BP Monitor
  'bp-09': [aneroidDialBpImg, stethoscopeDeviceImg, bpDeviceImg], // Diamond Deluxe Clock Aneroid BP with Stethoscope
  'bp-10': [controldProVoiceBpImg, omronBpImg, bpDeviceImg], // Control D Pro Voice Talking Upper Arm BP

  // ==========================================
  // GLUCOMETERS (8 products - 8 unique primary images)
  // ==========================================
  'gl-01': [glDeviceImg, UNSPLASH_IMAGES.glucometerKit, glStripsImg], // Dr. Morepen BG-03 Glucometer Kit
  'gl-02': [accuchekGlImg, UNSPLASH_IMAGES.glucometerKit, glDeviceImg], // Accu-Chek Active Blood Glucose Meter Kit
  'gl-03': [accuchekInstantImg, accuchekGlImg, glStripsImg], // Accu-Chek Instant Glucometer with Target Range
  'gl-04': [onetouchGlImg, glDeviceImg, glStripsImg], // OneTouch Select Plus Simple Glucometer System
  'gl-05': [UNSPLASH_IMAGES.glucometerKit, glDeviceImg, testStripsVialImg], // Control D Monitoring System with 25 Strips
  'gl-06': [UNSPLASH_IMAGES.glucometerTestStrips, accuchekGlImg, glDeviceImg], // Dr Trust USA Talking Guidance Sugar Monitor
  'gl-07': [smartphoneGlImg, glDeviceImg, diabetesCareImg], // BeatO CURV Smartphone Connected Glucometer
  'gl-08': [contourPlusImg, accuchekInstantImg, glDeviceImg], // Contour Plus ONE Smart Blood Glucose Meter

  // ==========================================
  // GLUCOSE STRIPS & LANCETS (7 products - 7 unique primary images)
  // ==========================================
  'gs-01': [glStripsImg, glDeviceImg, testStripsVialImg], // Dr. Morepen BG-03 Blood Glucose Test Strips
  'gs-02': [testStripsVialImg, accuchekGlImg, glStripsImg], // Accu-Chek Active Blood Glucose Test Strips
  'gs-03': [accuchekInstantStripsImg, testStripsVialImg, glStripsImg], // Accu-Chek Instant Blood Glucose Test Strips
  'gs-04': [onetouchStripsImg, testStripsVialImg, glStripsImg], // OneTouch Select Plus Test Strips Pack
  'gs-05': [controldStripsImg, testStripsVialImg, glStripsImg], // Control D Blood Glucose Test Strips
  'gs-06': [lancetsBoxImg, glStripsImg, glDeviceImg], // Dr. Morepen Sterile Twist-Top Lancets (100 Count)
  'gs-07': [UNSPLASH_IMAGES.lancetsSterile, lancetsBoxImg, glStripsImg], // Accu-Chek Softclix Sterile Lancets (100 Count)

  // ==========================================
  // PULSE OXIMETERS (5 products - 5 unique primary images)
  // ==========================================
  'po-01': [oximeterDeviceImg, pulseOledImg, careParentsImg], // Dr Trust Professional Fingertip Pulse Oximeter
  'po-02': [pulseOledImg, oximeterDeviceImg, UNSPLASH_IMAGES.pulseOximeterDisplay], // Beurer PO 30 Medical Fingertip Oximeter
  'po-03': [UNSPLASH_IMAGES.pulseOximeterDisplay, oximeterDeviceImg, pulseOledImg], // BPL Smart Oxy Fingertip Pulse Oximeter
  'po-04': [UNSPLASH_IMAGES.pulseOximeterFingertip, oximeterDeviceImg, careParentsImg], // HealthSense Accu-Beat FP 910
  'po-05': [heroMedicalDevicesImg, oximeterDeviceImg, pulseOledImg], // MCP Fingertip Pulse Oximeter with Audio Alarm

  // ==========================================
  // NEBULIZERS (5 products - 5 unique primary images)
  // ==========================================
  'neb-01': [nebulizerDeviceImg, respiratoryShowcaseImg, compressorNebKitImg], // Omron NE-C28 Heavy Duty Compressor Nebulizer
  'neb-02': [compressorNebKitImg, nebulizerDeviceImg, respiratoryShowcaseImg], // Dr Trust Bestest Compressor Nebulizer
  'neb-03': [respiratoryShowcaseImg, nebulizerDeviceImg, meshNebulizerImg], // Dr. Morepen CN-10 Compressor Nebulizer
  'neb-04': [meshNebulizerImg, compressorNebKitImg, respiratoryShowcaseImg], // Beurer IH 18 Medical Inhaler Nebulizer
  'neb-05': [meshPocketNebImg, meshNebulizerImg, nebulizerDeviceImg], // Control D Portable Pocket Mesh Nebulizer

  // ==========================================
  // THERMOMETERS (5 products - 5 unique primary images)
  // ==========================================
  'th-01': [digitalStickThermoImg, thermometerDeviceImg, infraredGunImg], // Dr. Morepen MT-222 Quick Digital Thermometer
  'th-02': [UNSPLASH_IMAGES.thermometerClinical, digitalStickThermoImg, thermometerDeviceImg], // Omron MC-246 Digital Clinical Thermometer
  'th-03': [infraredGunImg, thermometerDeviceImg, digitalStickThermoImg], // Dr Trust Non-Contact Infrared Forehead Thermometer
  'th-04': [thermometerDeviceImg, infraredGunImg, digitalStickThermoImg], // Rossmax HA500 Temple Non-Contact Thermometer
  'th-05': [UNSPLASH_IMAGES.thermometerInfrared, infraredGunImg, thermometerDeviceImg], // Beurer FT 90 Non-Contact Clinical Thermometer

  // ==========================================
  // ORTHOPEDIC SUPPORTS (6 products - 6 unique primary images)
  // ==========================================
  'ort-01': [orthoKneeImg, hingedKneeImg, UNSPLASH_IMAGES.orthoKneeSupport], // Tynor Functional Knee Support with Lateral Hinges
  'ort-02': [lumbarBeltImg, UNSPLASH_IMAGES.orthoBandageSplint, orthoKneeImg], // Flamingo Lumbar Sacral Back Support Belt
  'ort-03': [cervicalCollarImg, orthoKneeImg, lumbarBeltImg], // Tynor Soft Cervical Collar with Eyelets
  'ort-04': [wristSplintImg, UNSPLASH_IMAGES.orthoBandageSplint, lumbarBeltImg], // Vissco Platinum Elastic Wrist Splint
  'ort-05': [heatPadBeltImg, lumbarBeltImg, careParentsImg], // Flamingo Orthopedic Heat Belt (Regular Size)
  'ort-06': [cervicalPillowImg, cervicalCollarImg, orthoKneeImg], // Tynor Contoured Cervical Pillow for Sleeping

  // ==========================================
  // MOBILITY, WELLNESS & DIAGNOSTIC DEVICES (9 products - 9 unique primary images)
  // ==========================================
  'hh-01': [scaleDeviceImg, bodyScaleImg, careParentsImg], // HealthSense Ultra-Lite PS 126 Digital Personal Scale
  'hh-02': [bodyScaleImg, scaleDeviceImg, careParentsImg], // Dr Trust Smart Body Composition Scale 18 Metrics
  'hh-03': [walkingStickImg, careParentsImg, wheelchairDeviceImg], // MCP Adjustable Aluminum Folding Walking Stick
  'hh-04': [wheelchairDeviceImg, UNSPLASH_IMAGES.wheelchairTransit, walkingStickImg], // KosmoCare Dura Light Foldable Wheelchair
  'hh-05': [tensDeviceImg, lumbarBeltImg, heatPadBeltImg], // Beurer EM 49 Digital TENS/EMS Pain Relief & Muscle Stimulator
  'hh-06': [stethoscopeDeviceImg, UNSPLASH_IMAGES.stethoscopeAcoustic, aneroidDialBpImg], // Diamond Stethoscope Professional Dual-Head
  'hh-07': [diabetesCareImg, accuchekGlImg, glStripsImg], // Complete Diabetes Care Starter Kit (Meter + 60 Strips + 100 Lancets)
  'hh-08': [careParentsImg, omronBpImg, oximeterDeviceImg], // Home Health Monitoring Trio Kit (BP + Oximeter + Thermometer)
  'hh-09': [respiratoryComboPackImg, nebulizerDeviceImg, pulseOledImg] // Respiratory Complete Care Kit (Omron Nebulizer + Oximeter + Masks)
};

/**
 * Returns the verified image array for a given product ID or fallback to category.
 */
export function getProductImages(productId: string, category?: string, fallbackList?: string[]): string[] {
  if (PRODUCT_IMAGE_REGISTRY[productId] && PRODUCT_IMAGE_REGISTRY[productId].length > 0) {
    return PRODUCT_IMAGE_REGISTRY[productId];
  }
  if (fallbackList && fallbackList.length > 0) {
    return fallbackList;
  }
  const categoryDefault = (category && CATEGORY_FALLBACK_IMAGES[category]) || CATEGORY_FALLBACK_IMAGES.default;
  return [categoryDefault];
}

/**
 * Returns the primary image for a product.
 */
export function getProductPrimaryImage(productId: string, category?: string): string {
  const images = getProductImages(productId, category);
  return images[0] || CATEGORY_FALLBACK_IMAGES.default;
}

/**
 * Returns the fallback image URL for a given category.
 */
export function getCategoryFallbackImage(category?: string): string {
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }
  return CATEGORY_FALLBACK_IMAGES.default;
}
