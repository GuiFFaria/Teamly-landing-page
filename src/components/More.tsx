import type { Dictionary } from "@/dictionaries/en";

export function More({ t }: { t: Dictionary["more"] }) {
  return (
    <section id="more">
      <div className="shead rv">
        <span className="cap">{t.cap}</span>
        <h2>{t.title}</h2>
      </div>
      <div className="bento">
        <article className="b purple w3 rv">
          <div className="chips" aria-hidden="true">
            {t.hub.chips.map((chip, i) => (
              <span className={i === 0 ? "chip on" : "chip"} key={chip}>{chip}</span>
            ))}
          </div>
          <div>
            <span className="tag">{t.hub.tag}</span>
            <h3>{t.hub.title}</h3>
            <p>{t.hub.body}</p>
          </div>
        </article>

        <article className="b orange w3 rv">
          <div className="mini" aria-hidden="true">
            {t.scouting.rows.map(([name, meta]) => (
              <div className="row" key={name}>
                <span className="nm">{name}</span>
                <span className="m">{meta}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="tag">{t.scouting.tag}</span>
            <h3>{t.scouting.title}</h3>
            <p>{t.scouting.body}</p>
          </div>
        </article>

        <article className="b green rv">
          <div className="mini" aria-hidden="true">
            {t.squad.rows.map(([number, name, tag]) => (
              <div className="row" key={number}>
                <span className="n">{number}</span>
                <span className="nm">{name}</span>
                <span className="pill ok">{tag}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="tag">{t.squad.tag}</span>
            <h3>{t.squad.title}</h3>
          </div>
        </article>

        <article className="b blue rv">
          <div className="pdfs" aria-hidden="true">
            <div className="pdf"><i className="h" /><i className="bk" /><i /><i className="w" /></div>
            <div className="pdf"><i className="h" /><i /><i className="bk" /><i className="w" /></div>
            <div className="pdf"><i className="h" /><i className="bk" /><i className="w" /></div>
          </div>
          <div>
            <span className="tag">{t.reports.tag}</span>
            <h3>{t.reports.title}</h3>
          </div>
        </article>

        <article className="b teal rv">
          <div className="swatches" aria-hidden="true">
            <i style={{ background: "#0069dd" }} />
            <i style={{ background: "#dc2626" }} />
            <i style={{ background: "#16a34a" }} />
          </div>
          <div>
            <span className="tag">{t.branding.tag}</span>
            <h3>{t.branding.title}</h3>
          </div>
        </article>
      </div>
    </section>
  );
}
