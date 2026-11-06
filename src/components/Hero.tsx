import Image from "next/image";
import type { Dictionary } from "@/dictionaries/en";
import { appUrl } from "@/lib/config";
import { SCREEN_HEIGHT, SCREEN_WIDTH, screenSrc } from "@/lib/screens";
import { ThemedImage } from "./ThemedImage";

export function Hero({ t, floats }: { t: Dictionary["hero"]; floats: Dictionary["floats"] }) {
  return (
    <header className="hero" id="top">
      <div className="mesh" aria-hidden="true" />
      <div className="wm" aria-hidden="true">
        <Image src="/brand/logo-mark.png" alt="" width={640} height={516} priority />
      </div>
      <div className="hero-copy">
        <span className="tagpill">
          <Image src="/brand/logo-mark.png" alt="" width={640} height={516} />
          {t.tagline}
        </span>
        <h1>
          {t.headlineA}
          <span>{t.headlineB}</span>
        </h1>
        <p className="sub">{t.sub}</p>
        <div className="cta">
          <a className="btn blue lg" href="#contact">
            {t.cta} <span className="ar">→</span>
          </a>
          <a className="btn line lg" href={appUrl}>
            {t.app} <span className="ar">→</span>
          </a>
          <a className="tourlink" href="#tour">
            {t.tour} ↓
          </a>
        </div>
        <p className="note">{t.note}</p>
      </div>

      <div className="stage">
        <div className="frame hero-shot">
          <ThemedImage
            light={screenSrc("home", "light")}
            dark={screenSrc("home", "dark")}
            alt={t.shotAlt}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            priority
          />
        </div>
        <div className="floats">
          <div className="float f1">
            <span className="ic" style={{ background: "var(--green-soft)", color: "var(--green)" }} aria-hidden="true">⚽</span>
            <span><b>{floats.goalTitle}</b><small>{floats.goalSub}</small></span>
          </div>
          <div className="float f2">
            <span className="ic" style={{ background: "var(--warn-soft)", color: "var(--warn)" }} aria-hidden="true">!</span>
            <span><b>{floats.callupTitle}</b><small>{floats.callupSub}</small></span>
          </div>
          <div className="float f3">
            <span className="ic" style={{ background: "var(--primary-soft)", color: "var(--primary)" }} aria-hidden="true">▶</span>
            <span><b>{floats.clipTitle}</b><small>{floats.clipSub}</small></span>
          </div>
          <div className="float f4">
            <span className="ic" style={{ background: "var(--orange-soft)", color: "var(--orange)" }} aria-hidden="true">+</span>
            <span><b>{floats.playerTitle}</b><small>{floats.playerSub}</small></span>
          </div>
        </div>
      </div>
    </header>
  );
}
