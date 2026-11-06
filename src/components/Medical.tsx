import Image from "next/image";
import type { Dictionary } from "@/dictionaries/en";

/**
 * What each access level can do, in the order of `rowLabels`
 * (read the record, edit and close, move the return-to-play stage, documents and export).
 * Mirrors the backend's clinical permission tiers.
 */
const ACCESS: readonly (readonly boolean[])[] = [
  [true, true, true, true], // Care team: doctor, physiotherapist
  [true, false, false, false], // Coaching staff: read-only
  [false, false, false, false], // Everyone else: no clinical access by default
];

export function Medical({ t }: { t: Dictionary["medical"] }) {
  return (
    <div className="dark-sec" id="medical">
      <Image className="bigmark" src="/brand/logo-mark.png" alt="" width={640} height={516} aria-hidden="true" />
      <div className="wrap">
        <div className="shead rv">
          <span className="cap">{t.cap}</span>
          <h2>
            {t.titleA}
            <span>{t.titleB}</span>
          </h2>
          <p>{t.body}</p>
        </div>
        <div className="views rv">
          {t.tiers.map((tier, tierIndex) => (
            <div className="view" key={tier.tag}>
              <span className="tier-tag">{tier.tag}</span>
              <h3>{tier.roles}</h3>
              <p className="tier-note">{tier.note}</p>
              <ul className="caps">
                {t.rowLabels.map((label, rowIndex) => {
                  const allowed = ACCESS[tierIndex][rowIndex];
                  return (
                    <li className={allowed ? "yes" : "no"} key={label}>
                      <span className="mark" aria-hidden="true">
                        {allowed ? "✓" : "–"}
                      </span>
                      <span>{label}</span>
                      <span className="sr-only">{allowed ? t.allowed : t.notAllowed}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <ul className="points rv">
          {t.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
