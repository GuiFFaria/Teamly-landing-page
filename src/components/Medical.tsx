import Image from "next/image";
import type { Dictionary } from "@/dictionaries/en";

export function Medical({ t }: { t: Dictionary["medical"] }) {
  const { staff, coach } = t;
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
          <div className="view">
            <div className="who"><i aria-hidden="true">{staff.initials}</i>{staff.who}</div>
            <dl>
              {staff.rows.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
            <div className="logline">{staff.log}</div>
          </div>
          <div className="view">
            <div className="who"><i aria-hidden="true">{coach.initials}</i>{coach.who}</div>
            <dl>
              <div><dt>{coach.player}</dt><dd>{coach.playerValue}</dd></div>
              <div><dt>{coach.status}</dt><dd><span className="pill warn">{coach.statusValue}</span></dd></div>
              <div><dt>{coach.injury}</dt><dd className="locked">{coach.injuryValue}</dd></div>
              <div><dt>{coach.ret}</dt><dd className="locked">{coach.retValue}</dd></div>
            </dl>
            <div className="logline">{coach.log}</div>
          </div>
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
