import type { Dictionary } from "@/dictionaries/en";

export function Statement({ t, cards }: { t: Dictionary["statement"]; cards: Dictionary["cards"] }) {
  const { plan, analyse, keep } = cards;
  const eventClasses = ["t", "t", "v", "m"] as const;
  return (
    <section>
      <p className="statement rv">
        {t.lead}
        <span>{t.rest}</span>
      </p>
      <div className="cards3">
        <article className="card rv">
          <div className="vis">
            <div className="week">
              {plan.days.map((day, i) => (
                <div className="d" key={day}>
                  <b>{day}</b>
                  <div className={`ev ${eventClasses[i]}`}>{plan.events[i]}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>{plan.title}</h3>
            <p>{plan.body}</p>
          </div>
        </article>

        <article className="card rv">
          <div className="vis">
            <div className="tl" aria-hidden="true">
              <span className="mk s" style={{ left: "8%" }} />
              <span className="mk f" style={{ left: "14%" }} />
              <span className="mk g" style={{ left: "22%" }} />
              <span className="mk s" style={{ left: "30%" }} />
              <span className="mk g" style={{ left: "58%" }} />
              <span className="mk f" style={{ left: "70%" }} />
              <span className="mk s" style={{ left: "86%" }} />
            </div>
            <div className="legend">
              <span style={{ "--c": "var(--green)" } as React.CSSProperties}>{analyse.goal}</span>
              <span style={{ "--c": "var(--primary)" } as React.CSSProperties}>{analyse.shot}</span>
              <span style={{ "--c": "var(--warn)" } as React.CSSProperties}>{analyse.foul}</span>
            </div>
          </div>
          <div>
            <h3>{analyse.title}</h3>
            <p>{analyse.body}</p>
          </div>
        </article>

        <article className="card rv">
          <div className="vis">
            <div className="search" aria-hidden="true">⌕ {keep.search}</div>
            <div className="chips" aria-hidden="true">
              {keep.chips.map((chip, i) => (
                <span className={i === 0 ? "chip on" : "chip"} key={chip}>{chip}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>{keep.title}</h3>
            <p>{keep.body}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
