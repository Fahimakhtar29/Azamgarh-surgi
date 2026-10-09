import React from 'react';
import { Activity, Droplet, HeartPulse, Thermometer, Scale, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';

// Real medical device photography assets
import bpMonitorImg from '../../assets/images/bp_monitor_device_1791454734358.jpg';
import glucometerImg from '../../assets/images/glucometer_device_kit_1791454747005.jpg';
import oximeterImg from '../../assets/images/pulse_oximeter_device_1791454757928.jpg';
import thermometerImg from '../../assets/images/infrared_thermometer_device_1791454768970.jpg';
import scaleImg from '../../assets/images/digital_weighing_scale_1791455095976.jpg';

export const HealthMonitoringSection: React.FC = () => {
  const { viewCategory } = useStore();

  const monitoringCards = [
    {
      title: 'Blood Pressure',
      subtitle: 'Cardiovascular Vital Tracking',
      desc: 'Automatic upper-arm monitors with WHO hypertension indicators and arrhythmia detection.',
      category: 'bp-monitors' as ProductCategory,
      image: bpMonitorImg,
      icon: Activity,
      stat: 'Target: 120/80 mmHg'
    },
    {
      title: 'Blood Sugar',
      subtitle: 'Daily Glycemic Control',
      desc: 'Fast 5-second digital glucometers and test strips with painless lancing systems.',
      category: 'glucometers' as ProductCategory,
      image: glucometerImg,
      icon: Droplet,
      stat: 'Fasting: 70-100 mg/dL'
    },
    {
      title: 'Oxygen Level',
      subtitle: 'SpO2 & Pulse Dynamics',
      desc: 'Fingertip pulse oximeters with Perfusion Index tracking for respiratory wellness.',
      category: 'pulse-oximeters' as ProductCategory,
      image: oximeterImg,
      icon: HeartPulse,
      stat: 'Normal: 95% - 100%'
    },
    {
      title: 'Temperature',
      subtitle: 'Fever & Infection Alert',
      desc: 'Clinically calibrated non-contact infrared forehead and waterproof digital thermometers.',
      category: 'thermometers' as ProductCategory,
      image: thermometerImg,
      icon: Thermometer,
      stat: 'Normal: 98.6°F / 37.0°C'
    },
    {
      title: 'Body Weight & BMI',
      subtitle: 'Metabolic & Physical Health',
      desc: 'Smart body composition scales tracking body fat percentage, visceral fat, and muscle mass.',
      category: 'weighing-scales' as ProductCategory,
      image: scaleImg,
      icon: Scale,
      stat: 'Precision: ±100g G-Sensors'
    }
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Vital Sign Diagnostics
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
            Monitor Your Health at Home
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Regular at-home vital sign monitoring helps detect trends early and gives your doctor accurate clinical logs between appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {monitoringCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-teal-600 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with metric tag */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-bold flex items-center gap-1">
                        <Icon className="w-3.5 h-3.5 text-teal-300" />
                        {item.title}
                      </span>
                      <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded font-mono">
                        {item.stat}
                      </span>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-4">
                    <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                      {item.subtitle}
                    </span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Shop Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => viewCategory(item.category)}
                    className="w-full py-2 bg-white hover:bg-teal-700 hover:text-white text-teal-800 border border-teal-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Shop {item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
