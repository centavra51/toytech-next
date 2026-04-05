import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import About from '../../components/About';
import Reviews from '../../components/Reviews';
import FAQ from '../../components/FAQ';
import CTA from '../../components/CTA';
import Footer from '../../components/Footer';
import AppointmentForm from '../../components/AppointmentForm';
import { getSiteContent } from '../../lib/site-content';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const content = await getSiteContent();
  const t = content.translations[locale as keyof typeof content.translations] ?? content.translations.ro;

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar locale={locale} t={t} />
      
      <div id="home">
        <Hero t={t} />
      </div>

      <div id="services">
        <Services locale={locale} t={t} servicesData={content.services} />
      </div>

      <div id="about">
        <About t={t} />
      </div>

      <div id="reviews">
        <Reviews t={t} />
      </div>

      <div id="faq">
        <FAQ t={t} />
      </div>

      <section id="appointment-form" className="py-24 bg-zinc-950/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <AppointmentForm t={t} />
        </div>
      </section>

      <CTA t={t} />

      <Footer t={t} locale={locale} />
    </main>
  );
}
