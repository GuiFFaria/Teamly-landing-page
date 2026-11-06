"use client";

import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import type { Dictionary } from "@/dictionaries/en";
import { SCREEN_HEIGHT, SCREEN_WIDTH, screenSrc, type ScreenName } from "@/lib/screens";
import { ThemedImage } from "./ThemedImage";

const INTERVAL_MS = 6000;
/** Matches the CSS slide transition (0.56s) plus a small margin before the loop snaps back. */
const SLIDE_MS = 600;
const SWIPE_PX = 40;

export function Tour({ t }: { t: Dictionary["tour"] }) {
  const tabs = t.tabs;
  const count = tabs.length;
  // `pos` is the slide position. Position `count` is a clone of slide 0 at the end of the track,
  // so the autoplay keeps sliding right to left when it wraps, then snaps back to 0 unseen.
  const [pos, setPos] = useState(0);
  const [auto, setAuto] = useState(true);
  const [snap, setSnap] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const active = pos % count;
  const slides = [...tabs, tabs[0]];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto || pos >= count) return;
    const timer = setTimeout(() => setPos((p) => p + 1), INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [auto, pos, count]);

  // After sliding onto the clone, jump back to the real first slide without animating.
  useEffect(() => {
    if (pos !== count) return;
    const timer = setTimeout(() => {
      setSnap(true);
      setPos(0);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [pos, count]);

  useEffect(() => {
    if (!snap) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setSnap(false)));
    return () => cancelAnimationFrame(id);
  }, [snap]);

  // Warm the cache so sliding never reveals an empty frame.
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

  function goTo(index: number) {
    setAuto(false);
    setPos(index);
  }

  function onTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    const start = touchStartX.current;
    touchStartX.current = null;
    const end = event.changedTouches[0]?.clientX;
    if (start === null || end === undefined || Math.abs(end - start) < SWIPE_PX) return;
    if (end < start) {
      // Swipe left: next slide, sliding through the clone when leaving the last one.
      goTo(active === count - 1 ? count : active + 1);
    } else {
      goTo((active - 1 + count) % count);
    }
  }

  const current = tabs[active];

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
              aria-selected={i === active}
              aria-controls="tour-panel"
              className="tab"
              onClick={() => goTo(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="caption" dangerouslySetInnerHTML={{ __html: current.caption }} />
        <div
          className="frame tour-frame shot"
          id="tour-panel"
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          ref={frameRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={`tour-track${snap ? " snap" : ""}`} style={{ "--pos": pos } as CSSProperties}>
            {slides.map((tab, i) => (
              <div className={`tour-slide${i === pos ? " active" : ""}`} key={i} aria-hidden={i !== active}>
                <ThemedImage
                  light={screenSrc(tab.id as ScreenName, "light")}
                  dark={screenSrc(tab.id as ScreenName, "dark")}
                  alt={i === count ? "" : tab.alt}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
