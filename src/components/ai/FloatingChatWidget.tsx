import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Bot,
  Sparkles,
  Maximize2,
  ChevronDown,
  Minimize2
} from 'lucide-react';
import { GeminiHealthcareChat } from './GeminiHealthcareChat';
import { useStore } from '../../context/StoreContext';

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveView } = useStore();

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-teal-800 to-teal-700 hover:from-teal-900 hover:to-teal-800 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/30"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-teal-200">
                <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-teal-800 animate-pulse"></span>
            </div>

            <div className="text-left">
              <span className="text-xs font-bold block leading-tight font-display flex items-center gap-1">
                AI Health Assistant
                <Sparkles className="w-3 h-3 text-amber-300" />
              </span>
              <span className="text-[10px] text-teal-200/90 block leading-tight">
                Gemini Device Consultant
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Slide-Up / Floating Modal */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[95vw] sm:w-[440px] max-w-[460px] h-[580px] max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-slate-300 animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Modal Header Bar */}
          <div className="bg-slate-900 text-white px-3 py-2 flex items-center justify-between text-xs border-b border-slate-800">
            <span className="font-semibold flex items-center gap-1.5 text-teal-300">
              <Bot className="w-4 h-4 text-teal-400" />
              Azamgarh AI Health Assistant
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setActiveView('ai-hub');
                }}
                title="Open Full AI Healthcare Hub"
                className="p-1.5 hover:bg-white/10 rounded text-slate-300 hover:text-white transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 hover:bg-white/10 rounded text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <GeminiHealthcareChat compact={true} />
          </div>
        </div>
      )}
    </>
  );
};
