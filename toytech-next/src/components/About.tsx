"use client";

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Award, Zap, ShieldCheck, Heart, Wrench } from 'lucide-react';
import type { Translation } from "../lib/i18n";
import { toTelHref } from "../lib/contact-links";

interface AboutProps {
  t: Translation;
}

export default function About({ t }: AboutProps) {
  const features = [
    { icon: Award, text: t.about.f1 },
    { icon: Zap, text: t.about.f2 },
    { icon: ShieldCheck, text: t.about.f3 },
    { icon: Heart, text: t.about.f4 },
    { icon: Wrench, text: t.about.f5 },
    { icon: CheckCircle2, text: t.about.f6 },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-900/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-zinc-800">
              <Image 
                src="/images/master.png" 
                alt="ToyTech Team" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            </div>
            
            {/* Experience badge */}
            <div className="absolute -bottom-10 -right-10 bg-red-600 p-10 rounded-[2.5rem] shadow-2xl animate-bounce-slow">
              <div className="text-5xl font-black text-white">10+</div>
              <div className="text-sm font-bold text-red-100 uppercase tracking-widest">{t.about.since}</div>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-bold uppercase tracking-widest">
                {t.about.label}
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white" dangerouslySetInnerHTML={{ __html: t.about.title }} />
              <p className="text-lg text-zinc-300 leading-relaxed">
                {t.about.desc}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-zinc-200">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
               <a href={toTelHref(t.common.phone)} className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-red-600/20">
                 {t.hero.cta_call}
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
