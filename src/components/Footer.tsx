import type { Dictionary } from "@/dictionaries/en";
import { appUrl } from "@/lib/config";
import { ThemedImage } from "./ThemedImage";

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer>
      <div>
        <ThemedImage
          className="lockup"
          light="/brand/logo-horizontal-light.png"
          dark="/brand/logo-horizontal-dark.png"
          alt={t.logoAlt}
          width={900}
          height={230}
        />
        <p className="tg">{t.tagline}</p>
      </div>
      <div>
        <h4>{t.product}</h4>
        <a href="#tour">{t.tour}</a>
        <a href="#more">{t.features}</a>
        <a href="#medical">{t.medical}</a>
      </div>
      <div>
        <h4>{t.plans}</h4>
        <a href="#plans">{t.planPicker}</a>
        <a href="#contact">{t.talk}</a>
      </div>
      <div>
        <h4>{t.start}</h4>
        <a href="#contact">{t.request}</a>
        <a href={appUrl}>{t.app}</a>
      </div>
      <div className="copy">© {new Date().getFullYear()} Teamly. {t.rights}</div>
    </footer>
  );
}
