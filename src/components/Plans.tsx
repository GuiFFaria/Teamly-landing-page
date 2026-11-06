"use client";

import { useState } from "react";
import type { Dictionary } from "@/dictionaries/en";

/** Capacities of the platform's plan catalogue (Starter, Pro, Club, Elite). Pricing is intentionally absent. */
const PLANS = [
  { teams: 1, staff: 3, players: 20, storageGb: 2 },
  { teams: 3, staff: 10, players: 60, storageGb: 15 },
  { teams: 8, staff: 25, players: 150, storageGb: 30 },
  { teams: 25, staff: 100, players: 500, storageGb: 60 },
] as const;

const MIN_PLAYERS = 5;
const MAX_PLAYERS = 500;

export function Plans({ t }: { t: Dictionary["plans"] }) {
  const [players, setPlayers] = useState(45);
  const best = PLANS.findIndex((plan) => players <= plan.players);
  const plan = PLANS[best];
  const teamsLabel = `${plan.teams} ${plan.teams === 1 ? t.teamOne : t.teamMany}`;
  const recommendation = t.rec
    .replace("{n}", String(players))
    .replace("{plan}", t.names[best])
    .replace("{max}", String(plan.players))
    .replace("{teams}", teamsLabel);

  return (
    <section id="plans">
      <div className="shead rv">
        <span className="cap">{t.cap}</span>
        <h2>{t.title}</h2>
        <p>{t.body}</p>
      </div>
      <div className="picker rv">
        <div className="top">
          <label htmlFor="players-range" style={{ color: "inherit", fontSize: "inherit" }}>
            <span>{t.pickerLabel}</span>
          </label>
          <output htmlFor="players-range">{players}</output>
        </div>
        <input
          id="players-range"
          type="range"
          min={MIN_PLAYERS}
          max={MAX_PLAYERS}
          value={players}
          aria-label={t.pickerAria}
          onChange={(event) => setPlayers(Number(event.target.value))}
        />
        <p className="rec" dangerouslySetInnerHTML={{ __html: recommendation }} />
      </div>
      <div className="plans">
        {PLANS.map((p, i) => (
          <div className={`plan${i === best ? " on" : ""}`} key={t.names[i]}>
            <span className="badge">{t.bestFit}</span>
            <h3>{t.names[i]}</h3>
            <div className="big">
              {p.teams}
              <small>{p.teams === 1 ? t.teamOne : t.teamMany}</small>
            </div>
            <div className="spec">
              <div><span>{t.staff}</span><b>{p.staff}</b></div>
              <div><span>{t.players}</span><b>{p.players}</b></div>
              <div><span>{t.storage}</span><b>{p.storageGb} GB</b></div>
            </div>
          </div>
        ))}
      </div>
      <p className="fine">{t.fine}</p>
    </section>
  );
}
