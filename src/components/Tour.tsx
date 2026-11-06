"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries/en";
import { SCREEN_HEIGHT, SCREEN_WIDTH, screenSrc, type ScreenName } from "@/lib/screens";
import { ThemedImage } from "./ThemedImage";

const INTERVAL_MS = 6000;

export function Tour({ t }: { t: Dictionary["tour"] }) {
  const tabs = t.tabs;
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % tabs.length), INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [auto, index, tabs.length]);

  // Warm the cache so switching tabs never flashes an empty frame.
  useEffect(() => {
    for (const tab of tabs) {
      for (const theme of ["light", "dark"] as const) {
        const img = new window.Image();
        img.src = screenSrc(tab.id as ScreenName, theme);
      }
    }
  }, [tabs]);

  // Browsers without scroll-driven animations get the same reveal through IntersectionObserver.
  useEffect(() => {
    const frame = frameRef.current;
    const supportsViewTimeline = typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!frame || supportsViewTimeline || reduced || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-io");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const active = tabs[index];

  return (
    <section id="tour">
      <div className="shead rv">
        <span className="cap">{t.cap}</span>
        <h2>
          {t.titleA}
          <span>{t.titleB}</span>
        </h2>
      </div>
      <div className={`tour rv${auto ? "" : " paused"}`}>
        <div className="tabs" role="tablist" aria-label={t.tablist}>
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={i === index}
              aria-controls="tour-panel"
              className="tab"
              onClick={() => {
                setAuto(false);
                setIndex(i);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="caption" dangerouslySetInnerHTML={{ __html: active.caption }} />
        <div className="frame tour-frame shot" id="tour-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} ref={frameRef}>
          <ThemedImage
            key={active.id}
            light={screenSrc(active.id as ScreenName, "light")}
            dark={screenSrc(active.id as ScreenName, "dark")}
            alt={active.alt}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
          />
        </div>
      </div>
    </section>
  );
}
