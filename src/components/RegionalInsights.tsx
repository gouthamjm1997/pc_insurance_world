import type { CatastropheEvent, Insurer, RegionMarket } from "../types";

type RegionalInsightsProps = {
  region: RegionMarket;
  insurers: Insurer[];
  events: CatastropheEvent[];
};

export function RegionalInsights({ region, insurers, events }: RegionalInsightsProps) {
  const regionalInsurers = insurers
    .filter((insurer) => insurer.footprint.some((footprint) => footprint.regionId === region.id))
    .sort(
      (a, b) =>
        (b.footprint.find((footprint) => footprint.regionId === region.id)?.premiumsUsdBn ?? 0) -
        (a.footprint.find((footprint) => footprint.regionId === region.id)?.premiumsUsdBn ?? 0)
    );
  const regionalEvents = events.filter((event) => event.regionId === region.id).slice(0, 4);

  return (
    <section className="panel regional-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Regional drill-down</p>
          <h2>{region.name}</h2>
        </div>
        <span className="source-chip">{region.globalPcSharePct.toFixed(1)}% global P&C</span>
      </div>

      <p className="region-note">{region.notes}</p>

      <div className="metric-grid">
        <Metric label="Premiums" value={`$${region.premiumsUsdBn.toLocaleString()}B`} helper="Estimated P&C GWP" />
        <Metric label="Growth" value={`${region.growthPct.toFixed(1)}%`} helper="Nominal premium growth" />
        <Metric label="Combined ratio" value={`${region.combinedRatioPct.toFixed(1)}%`} helper="Underwriting pressure" />
        <Metric label="Protection gap" value={`${region.protectionGapPct}%`} helper="Uninsured catastrophe exposure" />
      </div>

      <div className="split-grid">
        <div>
          <h3>Top footprints</h3>
          <div className="footprint-list">
            {regionalInsurers.slice(0, 5).map((insurer) => {
              const footprint = insurer.footprint.find((candidate) => candidate.regionId === region.id);

              return (
                <div key={insurer.id} className="footprint-row">
                  <span className="carrier-dot" style={{ background: insurer.color }} />
                  <div>
                    <strong>{insurer.name}</strong>
                    <small>${footprint?.premiumsUsdBn.toFixed(1)}B regional premiums</small>
                  </div>
                  <em>{footprint?.sharePct}%</em>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3>Current risk queue</h3>
          <div className="event-mini-list">
            {regionalEvents.length > 0 ? (
              regionalEvents.map((event) => (
                <article key={event.id}>
                  <span>{event.type}</span>
                  <strong>{event.title}</strong>
                  <small>{event.location}</small>
                </article>
              ))
            ) : (
              <p className="empty-state">No live/seeded risk signals currently mapped to this region.</p>
            )}
          </div>
        </div>
      </div>

      <div className="risk-meter" aria-label={`Climate risk index ${region.climateRiskIndex} out of 100`}>
        <span>Climate-risk pressure</span>
        <div>
          <i style={{ width: `${region.climateRiskIndex}%` }} />
        </div>
        <strong>{region.climateRiskIndex}/100</strong>
      </div>
    </section>
  );
}

type MetricProps = {
  label: string;
  value: string;
  helper: string;
};

function Metric({ label, value, helper }: MetricProps) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </div>
  );
}
