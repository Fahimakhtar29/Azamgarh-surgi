import React from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Over 12,000 satisfied families across India monitor their health with our equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <h3 className="text-xs font-bold text-slate-900 leading-snug">
                  "{rev.title}"
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
                <div>
                  <span className="font-bold text-slate-800 block">
                    {rev.userName}
                  </span>
                  <span className="text-slate-400">{rev.location}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
