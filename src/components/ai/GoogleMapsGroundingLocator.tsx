import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  ExternalLink,
  ShieldCheck,
  Building2,
  Phone,
  Star,
  Sparkles,
  AlertCircle,
  LocateFixed,
  Search
} from 'lucide-react';

interface MapPlace {
  title: string;
  url: string;
  reviewSnippets?: string[];
}

export const GoogleMapsGroundingLocator: React.FC = () => {
  const [query, setQuery] = useState('Authorized surgical equipment stores and medical device dealers in Azamgarh');
  const [selectedCity, setSelectedCity] = useState('Azamgarh');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 26.0689,
    longitude: 83.1859, // Azamgarh coordinates
  });
  const [locationName, setLocationName] = useState('Azamgarh, UP (26.0689, 83.1859)');
  const [locating, setLocating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    text: string;
    places: MapPlace[];
    modelUsed: string;
  } | null>(null);

  const cityPresets = [
    { name: 'Azamgarh', lat: 26.0689, lng: 83.1859 },
    { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
    { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Gorakhpur', lat: 26.7606, lng: 83.3732 },
    { name: 'Mau', lat: 25.9419, lng: 83.5611 },
    { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
  ];

  const presetQueries = [
    'Authorized medical device distributors and surgical shops near me',
    'Emergency oxygen and nebulizer supplier centers in Azamgarh',
    'Orthopedic support braces and wheelchair retail stores nearby',
    'Major district hospitals with 24x7 emergency pharmacies',
  ];

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ latitude: lat, longitude: lng });
        setLocationName(`Current GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
        setSelectedCity('Custom GPS');
        setLocating(false);
      },
      (err) => {
        setError(`Location access denied or unavailable (${err.message}). Using Azamgarh coordinates.`);
        setLocating(false);
      },
      { timeout: 10000 }
    );
  };

  const handleCitySelect = (city: { name: string; lat: number; lng: number }) => {
    setSelectedCity(city.name);
    setLocation({ latitude: city.lat, longitude: city.lng });
    setLocationName(`${city.name} (${city.lat.toFixed(4)}, ${city.lng.toFixed(4)})`);
    setQuery(`Authorized medical device stores and hospital supply centers in ${city.name}`);
  };

  const handleSearch = async (targetQuery?: string) => {
    const q = (targetQuery || query).trim();
    if (!q || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          location,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch map-grounded healthcare locations.');
      }

      setResult(data);
      if (targetQuery) setQuery(targetQuery);
    } catch (err: any) {
      setError(err.message || 'Error executing maps grounding.');
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
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <MapPin className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Google Maps Grounding Medical Locator
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              Google Maps Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Locate verified surgical stores, medical equipment retailers, authorized service points, and emergency hospital pharmacies using <span className="font-semibold text-slate-800">gemini-3.5-flash</span> with Google Maps Grounding.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          <Navigation className="w-4 h-4 text-emerald-600" />
          <span>Real-World Geospatial Retrieval</span>
        </div>
      </div>

      {/* Location Selector Controls */}
      <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Compass className="w-4 h-4 text-teal-700" />
            <span>Target Location Center:</span>
            <span className="text-teal-800 bg-white px-2 py-0.5 rounded border border-slate-200">
              {locationName}
            </span>
          </div>

          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={locating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-medium rounded-lg border border-slate-200 transition-all self-start sm:self-auto"
          >
            <LocateFixed className="w-3.5 h-3.5 text-emerald-600" />
            <span>{locating ? 'Detecting GPS...' : 'Use My Live GPS'}</span>
          </button>
        </div>

        {/* Quick City Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-600 mr-1">Switch Regional Hub:</span>
          {cityPresets.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => handleCitySelect(c)}
              className={`text-xs px-2.5 py-1 rounded-md transition-all ${
                selectedCity === c.name
                  ? 'bg-teal-700 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mt-4">
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
              placeholder="Search medical equipment stores, oxygen dealers, surgical retailers, or hospitals..."
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Locating with Maps...</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                <span>Find on Maps</span>
              </>
            )}
          </button>
        </form>

        {/* Preset Queries */}
        <div className="mt-3">
          <span className="text-xs text-slate-600 font-semibold block mb-1.5">
            Quick Healthcare Facility Prompts:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presetQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSearch(item)}
                className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-slate-700 px-3 py-1 rounded-lg border border-slate-200 transition-all text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
          <div>
            <p className="font-semibold">Unable to fetch location data</p>
            <p className="text-xs text-rose-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-200"></div>
            <div className="h-4 bg-emerald-200 rounded w-1/3"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
            <div className="h-3 bg-slate-200 rounded w-4/6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <div className="h-20 bg-slate-200 rounded-xl"></div>
            <div className="h-20 bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      )}

      {/* Result Cards */}
      {result && !loading && (
        <div className="mt-6 space-y-5">
          {/* Grounded Summary Text */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-200/50">
              <span className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Google Maps Grounded Healthcare Facilities
              </span>
              <span className="text-xs text-emerald-800 font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">
                {result.modelUsed}
              </span>
            </div>

            <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
              {result.text}
            </div>
          </div>

          {/* Place Cards with Clickable Google Maps Links (Required by Maps Grounding) */}
          {result.places && result.places.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <h4 className="text-sm font-semibold text-slate-900">
                  Verified Google Maps Place Links ({result.places.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.places.map((place, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-sm font-bold text-slate-900 line-clamp-2">
                          {place.title}
                        </h5>
                        <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      </div>

                      {place.reviewSnippets && place.reviewSnippets.length > 0 && (
                        <div className="mt-2 text-xs text-slate-600 italic line-clamp-3 bg-white p-2 rounded border border-slate-200">
                          "{place.reviewSnippets[0]}"
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-[11px] text-slate-600">Google Maps Verified</span>
                      <a
                        href={place.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                      >
                        <span>Navigate / View</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
