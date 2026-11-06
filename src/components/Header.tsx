import Link from "next/link";
import type { Dictionary } from "@/dictionaries/en";
import { otherLocale, type Locale } from "@/lib/i18n";
import { ThemedImage } from "./ThemedImage";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const other = otherLocale(locale);
  return (
    <div className="navbar">
      <div className="wrap">
        <nav className="topbar" aria-label={t.label}>
          <a className="brand" href="#top" aria-label={t.home}>
            <ThemedImage light="/brand/nav-light.png" dark="/brand/nav-dark.png" alt="Teamly" width={559} height={150} priority />
          </a>
          <div className="links">
            <a href="#tour">{t.product}</a>
            <a href="#more">{t.features}</a>
            <a href="#medical">{t.medical}</a>
            <a href="#plans">{t.plans}</a>
          </div>
          <div className="nav-right">
            <span className="lang" aria-label={t.language}>
              <b>{locale.toUpperCase()}</b>
              <span aria-hidden="true">/</span>
              <Link href={`/${other}/`} hrefLang={other} lang={other}>
                {other.toUpperCase()}
              </Link>
            </span>
            <ThemeToggle label={t.theme} />
            <a className="btn solid" href="#contact">
              {t.cta}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
