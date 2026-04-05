"use client";

import React, { useState } from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';
import type { Translation } from "../lib/i18n";

interface FAQProps {
  t: Translation;
}

export default function FAQ({ t }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
  ];

  return (
    <section id="faq" className="py-24 bg-zinc-900/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-bold uppercase tracking-widest">
            {t.faq.label}
          </div>
          <h2 className="text-4xl font-black text-white">{t.faq.title}</h2>
          <p className="text-lg text-zinc-400 font-medium">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div 
              key={i} 
              className={`group bg-zinc-900 border ${openIndex === i ? 'border-red-600/50' : 'border-zinc-800'} rounded-2xl overflow-hidden transition-all duration-300 shadow-xl`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${openIndex === i ? 'bg-red-600 text-white' : 'bg-red-600/10 text-red-600'}`}>
                    <CircleHelp className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">{item.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>

              <div className={`transition-all duration-300 ease-in-out px-10 pb-6 ml-6 ${openIndex === i ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'}`}>
                 <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-900/50">
                    <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                      {item.a}
                    </p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
