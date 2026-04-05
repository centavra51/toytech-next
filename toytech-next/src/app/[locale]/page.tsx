import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import Advantages from '../../components/Advantages';
import ProcessSteps from '../../components/ProcessSteps';
import BrandsMarquee from '../../components/BrandsMarquee';
import About from '../../components/About';
import Gallery from '../../components/Gallery';
import Reviews from '../../components/Reviews';
import FAQ from '../../components/FAQ';
import CTA from '../../components/CTA';
import Footer from '../../components/Footer';
import AppointmentForm from '../../components/AppointmentForm';
import LocationMap from '../../components/LocationMap';
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

      <Advantages locale={locale} />

      <ProcessSteps locale={locale} />

      <div id="about">
        <About t={t} />
      </div>

      <BrandsMarquee locale={locale} />

      <div id="reviews">
        <Reviews t={t} />
      </div>

      <div id="faq">
        <FAQ t={t} />
      </div>

      <Gallery locale={locale} />

      <section id="appointment-form" className="py-24 bg-zinc-950/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <AppointmentForm t={t} services={content.services} />
        </div>
      </section>

      <CTA t={t} />

      <LocationMap t={t} />

      <Footer t={t} locale={locale} />
    </main>
  );
}
