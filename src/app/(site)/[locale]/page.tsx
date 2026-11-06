import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Medical } from "@/components/Medical";
import { More } from "@/components/More";
import { Plans } from "@/components/Plans";
import { Statement } from "@/components/Statement";
import { Tour } from "@/components/Tour";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} t={t.nav} />
      <main>
        <div className="wrap">
          <Hero t={t.hero} floats={t.floats} />
          <Statement t={t.statement} cards={t.cards} />
          <Tour t={t.tour} />
          <More t={t.more} />
        </div>
        <Medical t={t.medical} />
        <div className="wrap">
          <Plans t={t.plans} />
          <Contact t={t.contact} />
          <Footer t={t.footer} />
        </div>
      </main>
    </>
  );
}
