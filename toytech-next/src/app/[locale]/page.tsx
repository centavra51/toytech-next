import React from 'react';
import { getTranslations } from '../../lib/i18n';
import servicesData from '../../lib/services.json';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import About from '../../components/About';
import Reviews from '../../components/Reviews';
import FAQ from '../../components/FAQ';
import CTA from '../../components/CTA';
import Footer from '../../components/Footer';
import AppointmentForm from '../../components/AppointmentForm';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar locale={locale} t={t} />
      
      <div id="home">
        <Hero t={t} />
      </div>

      <div id="services">
        <Services locale={locale} t={t} servicesData={servicesData} />
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
