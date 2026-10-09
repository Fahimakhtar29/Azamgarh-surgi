import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Stethoscope,
  Microscope,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export type ChatRole = 'general' | 'complex' | 'fast';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiHealthcareChatProps {
  initialPrompt?: string;
  compact?: boolean;
}

export const GeminiHealthcareChat: React.FC<GeminiHealthcareChatProps> = ({
  initialPrompt,
  compact = false,
}) => {
  const [role, setRole] = useState<ChatRole>('general');
  const [input, setInput] = useState(initialPrompt || '');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        'Namaste! I am your AI Medical Device & Home Healthcare Consultant for Azamgarh Medical & Surgical.\n\nHow may I assist you with your home health monitoring equipment today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: 'Conversation history cleared. How can I help you choose or use your medical devices?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: role === 'complex' ? 'gemini-3.1-pro-preview' : role === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash',
      },
    ]);
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Build conversation history for multi-turn chat
      const payloadMessages = newMessages
        .filter((m) => m.id !== 'welcome-1' && m.id !== 'welcome-reset')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      // Ensure the current user message is always included
      if (payloadMessages.length === 0) {
        payloadMessages.push({ role: 'user', content: messageText });
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get medical response');
      }

      const assistantMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text || 'I could not generate an answer. Please rephrase your query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        content: `Error: ${err.message || 'Unable to connect to AI server.'} Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const suggestedQuestions = [
    'Which BP monitor is easiest for senior parents?',
    'How do I test blood sugar with Dr. Morepen BG-03?',
    'Difference between mesh and compressor nebulizer?',
    'What do SpO2 and Perfusion Index (PI) mean on an oximeter?',
  ];

  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${compact ? 'max-h-[600px]' : 'min-h-[620px]'}`}>
      {/* Top Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base">Gemini Healthcare Assistant</h3>
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active
                </span>
              </div>
              <p className="text-xs text-teal-200/80">Azamgarh Medical & Surgical • Multi-Turn AI</p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Model Role Selector */}
        <div className="mt-3 pt-3 border-t border-teal-700/50">
          <div className="flex items-center justify-between text-xs text-teal-200 mb-1.5">
            <span className="font-medium">Specialist Role & Model:</span>
            <span className="text-[11px] text-teal-300/80">
              {role === 'complex' ? 'gemini-3.1-pro-preview' : role === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 bg-black/20 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('fast')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                role === 'fast'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fast Lite</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('general')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                role === 'general'
                  ? 'bg-teal-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>General 3.5</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('complex')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                role === 'complex'
                  ? 'bg-indigo-500 text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Microscope className="w-3.5 h-3.5" />
              <span>Clinical Pro</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex-shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 ${
                isUser
                  ? 'bg-teal-700 text-white rounded-tr-sm shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
              }`}>
                {/* Message Header */}
                <div className="flex items-center justify-between gap-3 text-[11px] mb-1.5 pb-1 border-b border-black/5">
                  <span className={`font-semibold ${isUser ? 'text-teal-100' : 'text-teal-900'}`}>
                    {isUser ? 'You' : 'Azamgarh Medical AI'}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.modelUsed && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                        {msg.modelUsed}
                      </span>
                    )}
                    <span className={isUser ? 'text-teal-200' : 'text-slate-600'}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>

                {/* Message Footer / Copy */}
                {!isUser && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="text-[11px]">Home health guidance only</span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="inline-flex items-center gap-1 hover:text-teal-700 transition-colors p-1"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex-shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex-shrink-0 flex items-center justify-center mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]"></div>
              <span className="text-xs text-slate-600 ml-2 font-medium">
                {role === 'complex'
                  ? 'Analyzing clinical parameters with Gemini Pro...'
                  : role === 'fast'
                  ? 'Consulting quick database...'
                  : 'Consulting Gemini Healthcare Specialist...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 3 && !loading && (
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-600" />
            Quick Consultation Prompts:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(q)}
                className="text-xs bg-white hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-all text-left shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 items-end"
        >
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Ask ${
                role === 'complex'
                  ? 'clinical equipment specs & diagnostic standards...'
                  : role === 'fast'
                  ? 'quick medical device question...'
                  : 'about BP monitors, glucometers, nebulizers...'
              }`}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white resize-none max-h-24 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-teal-800 hover:bg-teal-900 disabled:bg-slate-300 text-white rounded-xl transition-all shadow-sm flex-shrink-0 disabled:cursor-not-allowed"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2 px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Azamgarh Medical Verified Knowledge Base
          </span>
          <span className="hidden sm:inline">Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};
