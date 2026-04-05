"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BatteryCharging, Cog, Zap, Wind, Brush, Bike, ShieldCheck, Gauge, Thermometer, Box, Droplets, AirVent } from 'lucide-react';

interface ServicesProps {
  locale: string;
  t: any;
  servicesData: any[];
}

const iconMap: any = {
  'battery-charging': BatteryCharging,
  'cog': Cog,
  'zap': Zap,
  'wind': Wind,
  'brush': Brush,
  'bike': Bike,
  'shield-check': ShieldCheck,
  'gauge': Gauge,
  'thermometer': Thermometer,
  'box': Box,
  'droplets': Droplets,
  'air-vent': AirVent,
};

export default function Services({ locale, t, servicesData }: ServicesProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? servicesData : servicesData.slice(0, 6);

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-bold uppercase tracking-widest">
            {t.services.label}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white">{t.services.title}</h2>
          <p className="text-lg text-zinc-400 font-medium">{t.services.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((svc) => {
            const IconComponent = iconMap[svc.icon as keyof typeof iconMap] || Cog || ArrowRight;
            const item = t.services[svc.id as keyof typeof t.services] as typeof t.services.s1;
            
            if (!item) return null;

            return (
              <div 
                key={svc.slug} 
                className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-red-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/5 overflow-hidden"
              >
                {/* Decorative background icon */}
                <div className="absolute top-0 right-0 p-8 transform translate-x-12 translate-y-[-12] rotate-[20deg] opacity-[0.03] group-hover:opacity-[0.05] transition-all group-hover:scale-110 pointer-events-none">
                  <IconComponent className="w-48 h-48" />
                </div>

                <div className="relative space-y-6">
                  {/* Icon & Label */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-red-500 transition-colors">
                      {item.price}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-extrabold text-white group-hover:text-red-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                       {item.desc}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link 
                    href={`/${locale}/services/${svc.slug}`}
                    className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all pb-1 border-b-2 border-zinc-800 group-hover:border-red-600"
                  >
                    <span>{t.services.btn_more}</span>
                    <ArrowRight className="w-5 h-5 text-red-600" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {!showAll && servicesData.length > 6 && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setShowAll(true)}
              className="bg-zinc-900 border border-zinc-800 hover:border-red-600 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-red-600/10"
            >
              {t.services.btn_more}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
