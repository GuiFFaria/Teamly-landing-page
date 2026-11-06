"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import type { Dictionary } from "@/dictionaries/en";
import { appUrl, contactEmail } from "@/lib/config";

type Status = { kind: "idle" } | { kind: "error"; message: string } | { kind: "ok"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact({ t }: { t: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const club = String(data.get("club") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !club || !EMAIL_PATTERN.test(email)) {
      setStatus({ kind: "error", message: t.required });
      return;
    }
    if (!contactEmail) {
      setStatus({ kind: "error", message: t.unavailable });
      return;
    }

    const body = [
      `${t.mailName}: ${name}`,
      `${t.mailClub}: ${club}`,
      `${t.mailEmail}: ${email}`,
      message ? `\n${t.mailMessage}:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "ok", message: t.opened });
  }

  return (
    <div className="cta-wrap" id="contact">
      <div className="cta-card rv">
        <div>
          <h2>{t.title}</h2>
          <p className="lead">{t.lead}</p>
          <Image className="cta-logo" src="/brand/vertical-dark.png" alt={t.logoAlt} width={640} height={474} />
        </div>
        <form onSubmit={onSubmit} noValidate>
          <div className="two">
            <label htmlFor="f-name">
              {t.name}
              <input id="f-name" name="name" type="text" autoComplete="name" placeholder={t.namePh} required />
            </label>
            <label htmlFor="f-club">
              {t.club}
              <input id="f-club" name="club" type="text" placeholder={t.clubPh} required />
            </label>
          </div>
          <label htmlFor="f-email">
            {t.email}
            <input id="f-email" name="email" type="email" autoComplete="email" placeholder={t.emailPh} required />
          </label>
          <label htmlFor="f-message">
            {t.message}
            <textarea id="f-message" name="message" />
          </label>
          <button className="btn solid lg" type="submit">
            {t.submit} <span className="ar">→</span>
          </button>
          <p className="hint">
            {t.hint} {t.haveAccess}{" "}
            <a className="applink" href={appUrl}>
              {t.app} →
            </a>
          </p>
          <p className={`status${status.kind === "error" ? " error" : ""}`} role="status" hidden={status.kind === "idle"}>
            {status.kind === "idle" ? "" : status.message}
          </p>
        </form>
      </div>
    </div>
  );
}
