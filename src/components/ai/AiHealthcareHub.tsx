import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Globe,
  MapPin,
  Wand2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Stethoscope,
  Microscope,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { GeminiHealthcareChat } from './GeminiHealthcareChat';
import { GoogleSearchGroundingHub } from './GoogleSearchGroundingHub';
import { GoogleMapsGroundingLocator } from './GoogleMapsGroundingLocator';
import { GeminiImageStudio } from './GeminiImageStudio';

export type AiHubTab = 'chat' | 'search' | 'maps' | 'studio';

interface AiHealthcareHubProps {
  initialTab?: AiHubTab;
}

export const AiHealthcareHub: React.FC<AiHealthcareHubProps> = ({ initialTab = 'chat' }) => {
  const [activeTab, setActiveTab] = useState<AiHubTab>(initialTab);

  const hubTabs = [
    {
      id: 'chat' as AiHubTab,
      label: 'Gemini Healthcare Chat',
      shortLabel: 'AI Chat',
      icon: Bot,
      modelBadge: 'gemini-3.5-flash / Pro / Flash-Lite',
      desc: 'Multi-turn intelligent consultation for home medical devices, troubleshooting & specs',
      color: 'teal',
    },
    {
      id: 'search' as AiHubTab,
      label: 'Google Search Grounding',
      shortLabel: 'Search Grounding',
      icon: Globe,
      modelBadge: 'gemini-3.5-flash + Google Search',
      desc: 'Live real-time medical device regulations, CDSCO alerts, clinical trial accuracy & citations',
      color: 'sky',
    },
    {
      id: 'maps' as AiHubTab,
      label: 'Google Maps Grounding',
      shortLabel: 'Maps Locator',
      icon: MapPin,
      modelBadge: 'gemini-3.5-flash + Google Maps',
      desc: 'Locate nearby authorized surgical stores, oxygen dealers, hospital pharmacies & clinics',
      color: 'emerald',
    },
    {
      id: 'studio' as AiHubTab,
      label: 'AI Device Studio',
      shortLabel: 'Create & Edit Images',
      icon: Wand2,
      modelBadge: 'gemini-nano-banana-2.1',
      desc: 'Create and edit photorealistic medical device visualizations and equipment setups with text prompts',
      color: 'purple',
    },
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hub Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-teal-900 to-slate-950 text-white p-6 sm:p-8 relative overflow-hidden shadow-sm mb-8 border border-teal-800/40">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
              <span>Next-Gen Healthcare Intelligence</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-white">
              Azamgarh AI Healthcare Hub
            </h1>

            <p className="text-sm sm:text-base text-teal-100/90 mt-2 leading-relaxed">
              Powered by advanced Google Gemini models: Multi-turn device consulting, Google Search regulatory grounding, Google Maps healthcare locator, and gemini-nano-banana-2.1 medical image creation & editing.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-4 pt-4 border-t border-teal-800/60 text-xs text-teal-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Multi-Turn Conversation Memory
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Live Google Search & Maps Grounding
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Text-to-Image Creation & Editing
              </span>
            </div>
          </div>
        </div>

        {/* Feature Tabs Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {hubTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`p-2.5 rounded-xl ${
                        isActive
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[130px]">
                      {tab.modelBadge.split(' ')[0]}
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      isActive ? 'text-teal-950 font-display' : 'text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {tab.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-semibold ${
                      isActive ? 'text-teal-700' : 'text-slate-600'
                    }`}
                  >
                    {isActive ? 'Active Feature' : 'Switch Tab'}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-teal-700 translate-x-0.5' : 'text-slate-600'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div>
          {activeTab === 'chat' && (
            <div>
              <GeminiHealthcareChat />
            </div>
          )}

          {activeTab === 'search' && (
            <div>
              <GoogleSearchGroundingHub />
            </div>
          )}

          {activeTab === 'maps' && (
            <div>
              <GoogleMapsGroundingLocator />
            </div>
          )}

          {activeTab === 'studio' && (
            <div>
              <GeminiImageStudio />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
