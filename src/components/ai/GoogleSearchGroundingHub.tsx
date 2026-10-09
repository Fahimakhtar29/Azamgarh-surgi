import React, { useState } from 'react';
import {
  Search,
  Globe,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';

interface Citation {
  title: string;
  url: string;
}

export const GoogleSearchGroundingHub: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    citations: Citation[];
    searchQueries: string[];
    modelUsed: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presetQueries = [
    'CDSCO medical device registration rules & recall updates in India',
    'AAMI and ESH accuracy protocol guidelines for digital BP monitors',
    'Clinical shelf-life & humidity storage rules for blood glucose strips',
    'Omron and Dr. Morepen compressor nebulizer cleaning and hygiene standards',
    'Fingertip pulse oximeter accuracy limitations & nail polish effects',
  ];

  const handleSearch = async (targetQuery?: string) => {
    const q = (targetQuery || query).trim();
    if (!q || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch search-grounded medical insights.');
      }

      setResult(data);
      if (targetQuery) setQuery(targetQuery);
    } catch (err: any) {
      setError(err.message || 'Error executing search grounding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-100 text-sky-800">
              <Globe className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Google Search Grounding Hub
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-medium">
              Live Web Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time medical device regulations (CDSCO / FDA), clinical accuracy protocols, device recalls, and clinical safety updates powered by <span className="font-semibold text-slate-800">gemini-3.5-flash</span> with Google Search Grounding.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Web Grounding</span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mt-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search CDSCO advisories, device calibration, clinical trials, recall alerts..."
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching Web...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Verify with Google</span>
              </>
            )}
          </button>
        </form>

        {/* Preset Queries */}
        <div className="mt-3">
          <span className="text-xs text-slate-600 font-semibold block mb-1.5">
            Suggested Medical Research Topics:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presetQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSearch(item)}
                className="text-xs bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 text-slate-700 px-3 py-1 rounded-lg border border-slate-200 transition-all text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error View */}
      {error && (
        <div className="mt-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
          <div>
            <p className="font-semibold">Unable to fetch live search information</p>
            <p className="text-xs text-rose-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-sky-200"></div>
            <div className="h-4 bg-sky-200 rounded w-1/3"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
            <div className="h-3 bg-slate-200 rounded w-4/6"></div>
          </div>
          <div className="pt-3 border-t border-slate-200 flex gap-2">
            <div className="h-6 bg-slate-200 rounded-full w-24"></div>
            <div className="h-6 bg-slate-200 rounded-full w-32"></div>
          </div>
        </div>
      )}

      {/* Grounded Search Results */}
      {result && !loading && (
        <div className="mt-6 space-y-5">
          <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-200/50">
              <span className="text-xs font-semibold text-sky-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                Grounded Clinical & Regulatory Synthesis
              </span>
              <span className="text-xs text-sky-700 font-mono bg-white px-2 py-0.5 rounded border border-sky-200">
                {result.modelUsed}
              </span>
            </div>

            <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
              {result.text}
            </div>

            {/* Queries executed by Google Search */}
            {result.searchQueries && result.searchQueries.length > 0 && (
              <div className="mt-4 pt-3 border-t border-sky-200/60 text-xs text-sky-900">
                <span className="font-semibold block mb-1">Google Search queries executed:</span>
                <div className="flex flex-wrap gap-1.5">
                  {result.searchQueries.map((sq, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white text-slate-700 rounded border border-sky-200 font-mono text-[11px]"
                    >
                      "{sq}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Web Citation Sources (Grounding Chunks) */}
          {result.citations && result.citations.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-semibold text-slate-900">
                  Authoritative Web Citation Sources ({result.citations.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {result.citations.map((c, i) => (
                  <a
                    key={i}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between p-2.5 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all group"
                  >
                    <div className="pr-2">
                      <p className="text-xs font-semibold text-slate-800 group-hover:text-sky-700 line-clamp-1">
                        {c.title}
                      </p>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5 font-mono">
                        {c.url}
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-600 flex-shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
